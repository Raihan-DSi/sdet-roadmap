/* =========================================================
   SDET Blueprint — app logic
   Persistence: browser localStorage (works on any static host,
   no backend required). Falls back gracefully if storage is
   unavailable (private browsing, storage full, etc).
   ========================================================= */

const STORAGE_KEY = 'sdet-roadmap-progress';

let currentView = "start"; // "start" | "resources" | "month" | "search" | "bullets" | "jobs" | "glossary"
let currentMonth = 0;
let searchQuery = "";
let saveTimer = null;

const state = {};        // week completion: {"0-0": true}
const notesState = {};   // per-week notes: {"0-0": "text"}
const timeState = {};    // per-week hours logged: {"0-0": 6.5}
const linkState = {};    // per-week deliverable link: {"0-0": "https://..."}
let activityDates = [];  // array of "YYYY-MM-DD" strings — any day you touched the plan
let startDate = "";      // "YYYY-MM-DD" — when you began, for pacing
let theme = "dark";      // "dark" | "light"
let bullets = [];         // [{id, text}]
let jobs = [];             // [{id, company, dateApplied, status, contact, notes}]
const preflightState = {}; // {"env-python": true, ...}
let goalText = "";          // "why I'm doing this" reminder, shown in sidebar
let glossaryFilter = "";

const PREFLIGHT_ITEMS = [
  {id:"python", text:"Python 3.10+ installed (python --version works in your terminal)"},
  {id:"editor", text:"A code editor set up — VS Code recommended, with the Python extension"},
  {id:"git", text:"Git installed and a GitHub account created"},
  {id:"github-ssh", text:"GitHub authentication working (SSH key or a personal access token)"},
  {id:"terminal", text:"Comfortable opening a terminal and running basic commands (cd, ls/dir, pip)"}
];

const PHASES = [
  {fromMonth:0, label:"FOUNDATION · MONTHS 1-3"},
  {fromMonth:3, label:"CORE SKILLS · MONTHS 4-6"},
  {fromMonth:6, label:"SPECIALIZATION · MONTHS 7-9"},
  {fromMonth:9, label:"LAUNCH · MONTHS 10-12"}
];
const MONTH_MILESTONES = {
  5: "🏁 Mid-program checkpoint",
  8: "🔒 Specialization project shipped",
  9: "🏆 Capstone shipped",
  10: "📣 Portfolio live"
};

function weekKey(m,w){
  const wk = MONTHS[m] && MONTHS[m].weeks[w];
  return (wk && wk.id) ? wk.id : (m+"-"+w);
}
function totalWeeks(){ return MONTHS.reduce((s,m)=>s+m.weeks.length,0); }
function doneWeeks(){ return Object.values(state).filter(Boolean).length; }
function monthDone(mIdx){ return MONTHS[mIdx].weeks.every((_,wIdx)=>state[weekKey(mIdx,wIdx)]); }
function todayStr(){ return new Date().toISOString().slice(0,10); }
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }

/* ---------- STABLE WEEK IDS ----------
   Ids are derived from each week's title text rather than its array
   position, so saved progress keeps pointing at the right week even if
   the roadmap content is ever reordered later. Runs once at load. */
function slugify(s){
  return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'').slice(0,40);
}
(function assignWeekIds(){
  MONTHS.forEach(m=>{
    m.weeks.forEach(w=>{
      if(!w.id) w.id = 'w-' + slugify(w.title);
    });
  });
})();
function findWeekById(id){
  for(let mi=0; mi<MONTHS.length; mi++){
    for(let wi=0; wi<MONTHS[mi].weeks.length; wi++){
      if(MONTHS[mi].weeks[wi].id === id) return { mi, wi, week: MONTHS[mi].weeks[wi] };
    }
  }
  return null;
}
/* One-time migration: old saves used "monthIndex-weekIndex" keys.
   Remap them to the new stable ids using each key's CURRENT position
   (the last moment that position is still guaranteed correct). */
function migrateLegacyKeys(){
  const legacy = /^\d+-\d+$/;
  function migrateObj(obj){
    Object.keys(obj).filter(k=>legacy.test(k)).forEach(oldKey=>{
      const [mi,wi] = oldKey.split('-').map(Number);
      const wk = MONTHS[mi] && MONTHS[mi].weeks[wi];
      if(wk && wk.id && !(wk.id in obj)){ obj[wk.id] = obj[oldKey]; }
      delete obj[oldKey];
    });
  }
  migrateObj(state);
  migrateObj(notesState);
  migrateObj(timeState);
  migrateObj(linkState);
}

function markActivityToday(){
  const t = todayStr();
  if(!activityDates.includes(t)) activityDates.push(t);
}

/* ---------- STREAK ---------- */
function currentStreak(){
  if(activityDates.length === 0) return 0;
  const set = new Set(activityDates);
  let streak = 0;
  let d = new Date();
  // if nothing logged today yet, streak still counts backward from yesterday
  if(!set.has(todayStr())) d.setDate(d.getDate()-1);
  while(true){
    const key = d.toISOString().slice(0,10);
    if(set.has(key)){
      streak++;
      d.setDate(d.getDate()-1);
    } else break;
  }
  return streak;
}
function daysSinceLastActive(){
  if(activityDates.length === 0) return null;
  const last = activityDates.slice().sort().pop();
  const diff = Math.round((new Date(todayStr()) - new Date(last)) / 86400000);
  return diff;
}

/* ---------- PACING ---------- */
function pacingInfo(){
  if(!startDate) return null;
  const start = new Date(startDate+"T00:00:00");
  const now = new Date();
  const msPerWeek = 7*24*60*60*1000;
  let weeksElapsed = Math.floor((now - start)/msPerWeek);
  if(weeksElapsed < 0) weeksElapsed = 0;
  const done = doneWeeks();
  const diff = done - weeksElapsed;
  return { weeksElapsed, done, diff };
}

/* ---------- PERSISTENCE (localStorage) ---------- */
function isValidImportShape(p){
  if(!p || typeof p !== 'object') return false;
  const objFields = ['weeks','notes','times','links','preflight'];
  for(const f of objFields){
    if(p[f] !== undefined && (typeof p[f] !== 'object' || Array.isArray(p[f]))) return false;
  }
  const arrFields = ['activityDates','bullets','jobs'];
  for(const f of arrFields){
    if(p[f] !== undefined && !Array.isArray(p[f])) return false;
  }
  if(p.theme !== undefined && typeof p.theme !== 'string') return false;
  if(p.startDate !== undefined && typeof p.startDate !== 'string') return false;
  if(p.goalText !== undefined && typeof p.goalText !== 'string') return false;
  return true;
}

function loadProgress(){
  const statusEl = document.getElementById('save-status');
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const parsed = JSON.parse(raw);
      Object.assign(state, parsed.weeks || {});
      Object.assign(notesState, parsed.notes || {});
      Object.assign(timeState, parsed.times || {});
      Object.assign(linkState, parsed.links || {});
      activityDates = parsed.activityDates || [];
      startDate = parsed.startDate || "";
      theme = parsed.theme || "dark";
      bullets = parsed.bullets || [];
      jobs = parsed.jobs || [];
      Object.assign(preflightState, parsed.preflight || {});
      goalText = parsed.goalText || "";
      migrateLegacyKeys();
      statusEl.textContent = parsed.updatedAt ? `Last saved: ${new Date(parsed.updatedAt).toLocaleString()}` : 'Progress loaded.';
      statusEl.className = 'save-status ok';
    } else {
      statusEl.textContent = 'No saved progress yet — starting fresh.';
    }
  }catch(e){
    statusEl.textContent = 'No saved progress yet — starting fresh.';
  }
  applyTheme();
}

function saveProgress(){
  const statusEl = document.getElementById('save-status');
  try{
    const payload = JSON.stringify({
      weeks: state, notes: notesState, times: timeState, links: linkState,
      activityDates, startDate, theme, bullets, jobs,
      preflight: preflightState, goalText,
      updatedAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEY, payload);
    statusEl.textContent = `Saved ✓ ${new Date().toLocaleTimeString()}`;
    statusEl.className = 'save-status ok';
  }catch(e){
    statusEl.textContent = 'Save failed — try Export backup instead.';
    statusEl.className = 'save-status err';
  }
}

function debouncedSave(){
  if(saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(saveProgress, 500);
}

function exportProgress(){
  const payload = JSON.stringify({
    weeks: state, notes: notesState, times: timeState, links: linkState,
    activityDates, startDate, theme, bullets, jobs,
    preflight: preflightState, goalText,
    updatedAt: new Date().toISOString()
  }, null, 2);
  const blob = new Blob([payload], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sdet-roadmap-progress-backup.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ---------- CALENDAR EXPORT (.ics) ---------- */
function pad2(n){ return String(n).padStart(2,'0'); }
function formatICSDate(d){ return d.getFullYear()+pad2(d.getMonth()+1)+pad2(d.getDate()); }
function icsEscape(s){ return (s||'').replace(/[\r\n]+/g,' ').replace(/([,;])/g, '\\$1'); }
function exportCalendar(){
  const base = startDate ? new Date(startDate+"T00:00:00") : new Date();
  const lines = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//SDET Blueprint//Roadmap//EN","CALSCALE:GREGORIAN"];
  let idx = 0;
  MONTHS.forEach(m=>{
    m.weeks.forEach(w=>{
      const start = new Date(base); start.setDate(start.getDate() + idx*7);
      const end = new Date(start); end.setDate(end.getDate() + 7);
      lines.push(
        "BEGIN:VEVENT",
        "UID:" + (w.id || ('w'+idx)) + "@sdet-blueprint",
        "DTSTART;VALUE=DATE:" + formatICSDate(start),
        "DTEND;VALUE=DATE:" + formatICSDate(end),
        "SUMMARY:SDET Week " + pad2(idx+1) + ": " + icsEscape(w.title),
        "DESCRIPTION:" + icsEscape(w.why + " Deliverable: " + w.deliverable),
        "END:VEVENT"
      );
      idx++;
    });
  });
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.join("\r\n")], {type:'text/calendar'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sdet-roadmap-schedule.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importProgress(evt){
  const file = evt.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e){
    let parsed;
    try{
      parsed = JSON.parse(e.target.result);
    }catch(err){
      document.getElementById('save-status').textContent = 'Import failed — not valid JSON.';
      document.getElementById('save-status').className = 'save-status err';
      return;
    }
    if(!isValidImportShape(parsed)){
      document.getElementById('save-status').textContent = 'Import failed — file doesn\'t match the expected backup format.';
      document.getElementById('save-status').className = 'save-status err';
      return;
    }
    try{
      Object.assign(state, parsed.weeks || {});
      Object.assign(notesState, parsed.notes || {});
      Object.assign(timeState, parsed.times || {});
      Object.assign(linkState, parsed.links || {});
      if(parsed.activityDates) activityDates = parsed.activityDates;
      if(parsed.startDate) startDate = parsed.startDate;
      if(parsed.theme) theme = parsed.theme;
      if(parsed.bullets) bullets = parsed.bullets;
      if(parsed.jobs) jobs = parsed.jobs;
      if(parsed.preflight) Object.assign(preflightState, parsed.preflight);
      if(parsed.goalText) goalText = parsed.goalText;
      migrateLegacyKeys();
      saveProgress();
      applyTheme();
      renderAll();
    }catch(err){
      document.getElementById('save-status').textContent = 'Import failed — unexpected file contents.';
      document.getElementById('save-status').className = 'save-status err';
    }
  };
  reader.readAsText(file);
  evt.target.value = '';
}

function resetProgress(){
  if(!confirm('Reset ALL progress, notes, bullets and job tracker? This cannot be undone unless you exported a backup.')) return;
  Object.keys(state).forEach(k=>delete state[k]);
  Object.keys(notesState).forEach(k=>delete notesState[k]);
  Object.keys(timeState).forEach(k=>delete timeState[k]);
  Object.keys(linkState).forEach(k=>delete linkState[k]);
  Object.keys(preflightState).forEach(k=>delete preflightState[k]);
  activityDates = [];
  startDate = "";
  bullets = [];
  jobs = [];
  goalText = "";
  saveProgress();
  renderAll();
}

/* ---------- THEME ---------- */
function applyTheme(){
  document.body.classList.toggle('light', theme === 'light');
}
function toggleTheme(){
  theme = theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  debouncedSave();
  renderSidebarFooter();
}

/* ---------- SEARCH ---------- */
function handleSearch(query){
  searchQuery = query.trim().toLowerCase();
  if(searchQuery.length === 0){
    if(currentView === "search") currentView = "start";
  } else {
    currentView = "search";
  }
  renderAll();
}

function searchMatches(){
  const results = [];
  MONTHS.forEach((m, mi)=>{
    m.weeks.forEach((w, wi)=>{
      const haystack = (w.title + " " + w.why + " " + w.learn.join(" ") + " " + w.deliverable).toLowerCase();
      if(haystack.includes(searchQuery)){
        results.push({ mi, wi, month: m, week: w });
      }
    });
  });
  return results;
}

/* ---------- ACTIVITY HEATMAP ---------- */
function activityHeatmapHTML(){
  const days = 84; // 12 weeks
  const today = new Date();
  const cells = [];
  for(let i=days-1; i>=0; i--){
    const d = new Date(today); d.setDate(d.getDate()-i);
    const key = d.toISOString().slice(0,10);
    cells.push({ date:key, active: activityDates.includes(key), isToday: i===0 });
  }
  let grid = '<div style="display:flex; gap:3px; overflow-x:auto; padding:6px 2px;">';
  const cols = Math.ceil(cells.length/7);
  for(let col=0; col<cols; col++){
    grid += '<div style="display:flex; flex-direction:column; gap:3px;">';
    for(let row=0; row<7; row++){
      const idx = col*7+row;
      if(idx >= cells.length){ grid += '<div style="width:11px;height:11px;"></div>'; continue; }
      const c = cells[idx];
      const bg = c.active ? 'var(--amber)' : 'var(--border)';
      const ring = c.isToday ? 'box-shadow:0 0 0 1px var(--blue);' : '';
      grid += `<div title="${c.date}${c.active?' — active':''}" style="width:11px;height:11px;border-radius:2px;background:${bg};${ring}"></div>`;
    }
    grid += '</div>';
  }
  grid += '</div>';
  return `<div class="info-box" style="margin-top:20px;">
    <div class="info-label">ACTIVITY — LAST 12 WEEKS</div>
    <p style="margin-bottom:4px;">Every filled square is a day you touched the plan — checked a box, wrote a note, updated a tracker. A long empty stretch is the earliest warning sign, well before a missed month shows up anywhere else.</p>
    ${grid}
  </div>`;
}

/* ---------- RESUME NEXT ---------- */
function firstUnfinished(){
  for(let mi=0; mi<MONTHS.length; mi++){
    for(let wi=0; wi<MONTHS[mi].weeks.length; wi++){
      if(!state[weekKey(mi,wi)]) return {mi, wi};
    }
  }
  return null;
}

/* ---------- NAV RENDER ---------- */
function renderTopNav(){
  const nav = document.getElementById('top-nav');
  nav.innerHTML = '';
  const items = [
    {key:"start", label:"Start Here", icon:"◆"},
    {key:"notes", label:"My Notes", icon:"◆"},
    {key:"glossary", label:"Glossary", icon:"◆"},
    {key:"bullets", label:"Resume Bullets", icon:"◆"},
    {key:"jobs", label:"Job Tracker", icon:"◆"},
    {key:"resources", label:"Resources", icon:"◆"}
  ];
  items.forEach(it=>{
    const li = document.createElement('div');
    li.className = 'month-item' + (currentView===it.key ? ' active':'');
    li.setAttribute('role','button');
    li.setAttribute('tabindex','0');
    li.setAttribute('aria-label', it.label);
    li.innerHTML = `<span class="month-num">${it.icon}</span><span class="month-name">${it.label}</span>`;
    li.onclick = ()=>{ currentView = it.key; document.getElementById('search-input').value=''; searchQuery=''; renderAll(); window.scrollTo(0,0); };
    nav.appendChild(li);
  });
}

function renderMonthNav(){
  const nav = document.getElementById('month-nav');
  nav.innerHTML = '';
  MONTHS.forEach((m, i)=>{
    const phase = PHASES.find(p=>p.fromMonth===i);
    if(phase){
      const label = document.createElement('div');
      label.className = 'nav-group-label' + (i>0 ? ' phase-divider' : '');
      label.textContent = phase.label;
      nav.appendChild(label);
    }
    const li = document.createElement('div');
    li.className = 'month-item' + (currentView==="month" && i===currentMonth ? ' active':'') + (monthDone(i) ? ' month-done':'');
    li.setAttribute('role','button');
    li.setAttribute('tabindex','0');
    li.setAttribute('aria-label', `Month ${i+1}: ${m.short}${monthDone(i)?' — complete':''}`);
    li.innerHTML = `<span class="month-num">${String(i+1).padStart(2,'0')}</span><span class="month-name">${m.short}</span><span class="month-check">${monthDone(i)?'✓':''}</span>`;
    li.onclick = ()=>{ currentView="month"; currentMonth = i; document.getElementById('search-input').value=''; searchQuery=''; renderAll(); window.scrollTo(0,0); };
    nav.appendChild(li);
    if(MONTH_MILESTONES[i]){
      const ms = document.createElement('div');
      ms.className = 'milestone-badge';
      ms.textContent = MONTH_MILESTONES[i];
      nav.appendChild(ms);
    }
  });
}

function renderOverall(){
  const total = totalWeeks();
  const done = doneWeeks();
  document.getElementById('overall-count').textContent = `${done} / ${total} weeks`;
  document.getElementById('overall-bar').style.width = (done/total*100)+'%';

  // streak + pacing box
  const box = document.getElementById('streak-box');
  const streak = currentStreak();
  const daysSince = daysSinceLastActive();
  const pace = pacingInfo();
  let paceHtml = '';
  if(pace){
    const {weeksElapsed, done: d, diff} = pace;
    let cls = 'ontrack', msg = `On pace — week ${weeksElapsed} of your plan`;
    if(diff > 0){ cls='ahead'; msg = `${diff} week${diff===1?'':'s'} ahead of pace`; }
    else if(diff < 0){ cls='behind'; msg = `${Math.abs(diff)} week${Math.abs(diff)===1?'':'s'} behind pace`; }
    paceHtml = `<div class="pace-line ${cls}">${msg}</div>`;
  } else {
    paceHtml = `<div class="pace-setup">Set a start date to track pacing:
      <input type="date" id="start-date-input" value="${startDate}" onchange="setStartDate(this.value)">
    </div>`;
  }
  let lastActiveHtml = '';
  if(streak === 0 && daysSince !== null && daysSince > 0){
    lastActiveHtml = `<div class="pace-line behind">Last active ${daysSince} day${daysSince===1?'':'s'} ago — jump back in</div>`;
  }
  box.innerHTML = `
    <div class="streak-row"><span>STREAK</span><span class="streak-flame">${streak > 0 ? '🔥 ' : ''}${streak} day${streak===1?'':'s'}</span></div>
    ${lastActiveHtml}
    ${paceHtml}
  `;
}

function setStartDate(v){
  startDate = v;
  debouncedSave();
  renderOverall();
  renderRightRail();
}
function focusStartDateInput(){
  const input = document.getElementById('start-date-input');
  if(input){
    input.scrollIntoView({behavior:'smooth', block:'center'});
    input.focus();
  }
}

function renderSidebarFooter(){
  const el = document.getElementById('theme-toggle-btn');
  if(el) el.textContent = theme === 'dark' ? '☀ Light mode' : '● Dark mode';
}

/* ---------- WEEK CARD ---------- */
function trackComparisonHTML(){
  return `
    <div class="info-box">
      <div class="info-label">CHOOSING YOUR SPECIALIZATION TRACK</div>
      <p>The weeks below are written for <strong>Security Testing</strong>, the default recommendation for your background. If Performance or AI/LLM Testing genuinely fits you better, swap the topics using this table as your guide — the surrounding framework (Months 7-8 structure, portfolio approach) stays the same either way. See the Resources page for a note on free AI/LLM testing tools if that's your pick.</p>
      <table class="track-table">
        <tr><th></th><th>Security Testing</th><th>Performance Testing</th><th>AI / LLM Testing</th></tr>
        <tr><td class="rowlabel">Best fit if you like</td><td>Adversarial thinking, finding what breaks trust</td><td>Systems thinking, numbers, bottlenecks</td><td>Ambiguity, evaluating non-deterministic output</td></tr>
        <tr><td class="rowlabel">Core tools</td><td>Burp Suite, OWASP ZAP</td><td>JMeter, k6, Grafana</td><td>promptfoo, DeepEval, Ragas (all free/open-source)</td></tr>
        <tr><td class="rowlabel">Pay premium</td><td>High</td><td>Moderate</td><td>Highest, but role definitions are still settling</td></tr>
        <tr><td class="rowlabel">AI-resistance</td><td>Very high — needs adversarial human judgment</td><td>High — needs systems intuition</td><td>High, but ironically the newest and least standardized field</td></tr>
        <tr><td class="rowlabel">Learning curve from QA</td><td>Moderate</td><td>Moderate</td><td>Steeper — fewer mature learning resources exist yet</td></tr>
      </table>
    </div>
  `;
}

function renderWeekCard(mi, wi, w, options){
  options = options || {};
  const key = weekKey(mi, wi);
  const checked = !!state[key];
  const note = notesState[key] || '';
  const time = timeState[key] || '';
  const link = linkState[key] || '';
  const globalWeekNum = MONTHS.slice(0,mi).reduce((s,mo)=>s+mo.weeks.length,0) + wi + 1;
  const resourcesHtml = w.resources.map(r=>{
    if(r.u && r.u !== '#'){ return `<li><a href="${r.u}" target="_blank" rel="noopener">${r.t}</a></li>`; }
    return `<li>${r.t}</li>`;
  }).join('');
  return `
      <div class="week-card ${options.openByDefault?'open':''}" data-month="${mi}" data-week="${wi}">
        <div class="week-head">
          <div class="week-checkbox ${checked?'checked':''}" role="checkbox" aria-checked="${checked}" aria-label="Mark week ${globalWeekNum} complete" tabindex="0" onclick="toggleWeek(${mi},${wi}, event)"></div>
          <div class="week-titleblock" onclick="toggleOpen(${mi},${wi})">
            <div class="week-num-row">
              <div class="week-num">WEEK ${String(globalWeekNum).padStart(2,'0')}${options.showMonth ? ' · ' + options.showMonth : ''}</div>
              <div class="week-time">${w.time}</div>
              ${note ? '<span class="week-note-dot" title="Has a note"></span>' : ''}
            </div>
            <div class="week-title">${w.title}</div>
            <div class="week-why">${w.why}</div>
          </div>
          <div class="toggle-hint" onclick="toggleOpen(${mi},${wi})">▾ details</div>
        </div>
        <div class="week-body">
          <div class="week-section">
            <div class="week-section-label">WHAT TO LEARN</div>
            <ul>${w.learn.map(l=>`<li>${l}</li>`).join('')}</ul>
          </div>
          <div class="week-section">
            <div class="week-section-label">RESOURCES</div>
            <ul>${resourcesHtml}</ul>
          </div>
          <div class="week-section">
            <div class="week-section-label">DELIVERABLE</div>
            <p class="deliverable">${w.deliverable}</p>
            <div style="margin-top:8px;">
              <span class="view-toggle" onclick="quickAddBulletFromWeek('${w.id}')">+ Draft resume bullet from this week</span>
            </div>
          </div>
          <div class="week-section">
            <div class="week-section-label">TRACK IT</div>
            <div class="week-extra-row">
              <div class="week-extra-field">
                <label>Hours actually spent</label>
                <input type="number" min="0" step="0.5" placeholder="e.g. 7.5" value="${time}" onchange="updateTime(${mi},${wi},this.value)">
              </div>
              <div class="week-extra-field">
                <label>Deliverable link (repo / post)</label>
                <input type="url" placeholder="https://github.com/..." value="${link}" onchange="updateLink(${mi},${wi},this.value)">
              </div>
            </div>
          </div>
          <div class="week-section">
            <div class="week-section-label">YOUR NOTES</div>
            <textarea class="week-note-area" placeholder="Anything worth remembering — a bug you hit, a question, a resume bullet draft..." oninput="updateNote(${mi},${wi},this.value)">${note}</textarea>
          </div>
        </div>
      </div>
  `;
}

/* ---------- MAIN VIEWS ---------- */
function renderMain(){
  const main = document.getElementById('main');

  if(currentView === "start"){
    main.innerHTML = START_CONTENT + preflightHTML() + goalHTML() + activityHeatmapHTML() + hoursChartHTML() + resumeButtonHTML();
    attachStartHandlers();
    return;
  }
  if(currentView === "resources"){ main.innerHTML = RESOURCES_CONTENT; return; }
  if(currentView === "bullets"){ renderBulletsView(); return; }
  if(currentView === "jobs"){ renderJobsView(); return; }
  if(currentView === "glossary"){ renderGlossaryView(); return; }
  if(currentView === "notes"){ renderNotesView(); return; }

  if(currentView === "search"){
    const results = searchMatches();
    let html = `
      <div class="sheet-label">SEARCH</div>
      <h1 class="sheet-title">Results for "${searchQuery}"</h1>
      <p class="sheet-desc">${results.length} week${results.length===1?'':'s'} matched. Click any result to jump to it.</p>
    `;
    if(results.length === 0){
      html += `<div class="info-box"><p>No weeks matched that search. Try a shorter or different keyword — e.g. "docker", "sql", "resume", "burp".</p></div>`;
    } else {
      html += `<div class="search-results-list">`;
      results.forEach(r=>{
        html += `<div class="search-result" onclick="jumpToWeek(${r.mi},${r.wi})">
          <div class="sr-month">MONTH ${r.mi+1} — ${r.month.short}</div>
          <div class="sr-title">${r.week.title}</div>
          <div class="sr-why">${r.week.why}</div>
        </div>`;
      });
      html += `</div>`;
    }
    main.innerHTML = html;
    return;
  }

  const m = MONTHS[currentMonth];
  const monthDoneCount = m.weeks.filter((_,i)=>state[weekKey(currentMonth,i)]).length;

  let html = `
    <div class="sheet-header">
      <div class="sheet-label">SHEET ${String(currentMonth+1).padStart(2,'0')} / 12 — MONTH ${currentMonth+1}</div>
      <h1 class="sheet-title">${m.title}</h1>
      <p class="sheet-desc">${m.desc}</p>
    </div>
    <div class="sheet-progress">
      <span>${monthDoneCount}/${m.weeks.length} WEEKS</span>
      <div class="bar-track"><div class="bar-fill" style="width:${(monthDoneCount/m.weeks.length*100)}%"></div></div>
      <span class="view-toggle" onclick="expandAll(${currentMonth})">Expand all</span>
      <span class="view-toggle" onclick="collapseAll(${currentMonth})">Collapse all</span>
      <span class="view-toggle" onclick="window.print()">🖨 Print month</span>
    </div>
  `;

  if(m.trackComparison){ html += trackComparisonHTML(); }

  m.weeks.forEach((w, wi)=>{ html += renderWeekCard(currentMonth, wi, w, {}); });

  html += `<div class="footer-note">Your progress and notes save automatically to this browser (localStorage). Use "Export backup" in the sidebar periodically, and definitely before switching devices or browsers — it downloads a small JSON file you can re-import anytime with "Import".</div>`;
  main.innerHTML = html;
}

function resumeButtonHTML(){
  const next = firstUnfinished();
  if(!next){
    return `<div style="margin-top:20px;"><button class="resume-next-btn done">🎉 All 48 weeks complete — nothing left to resume.</button></div>`;
  }
  const gw = MONTHS.slice(0,next.mi).reduce((s,mo)=>s+mo.weeks.length,0) + next.wi + 1;
  return `<div style="margin-top:20px;"><button class="resume-next-btn" id="resume-next-btn">▶ Resume where you left off — Week ${String(gw).padStart(2,'0')}: ${MONTHS[next.mi].weeks[next.wi].title}</button></div>`;
}
function attachResumeButton(){
  const btn = document.getElementById('resume-next-btn');
  if(btn){
    btn.onclick = ()=>{
      const next = firstUnfinished();
      if(next) jumpToWeek(next.mi, next.wi);
    };
  }
}

/* ---------- PRE-FLIGHT CHECKLIST ---------- */
function preflightHTML(){
  const doneCount = PREFLIGHT_ITEMS.filter(i=>preflightState[i.id]).length;
  const items = PREFLIGHT_ITEMS.map(i=>{
    const checked = !!preflightState[i.id];
    return `<div class="preflight-item ${checked?'done':''}">
      <div class="preflight-check ${checked?'checked':''}" role="checkbox" aria-checked="${checked}" aria-label="${escapeAttr(i.text)}" tabindex="0" data-preflight-id="${i.id}"></div>
      <div class="preflight-text" data-preflight-id="${i.id}">${i.text}</div>
    </div>`;
  }).join('');
  return `
    <div class="info-box" style="margin-top:20px;">
      <div class="info-label">BEFORE WEEK 1 — ENVIRONMENT CHECKLIST (${doneCount}/${PREFLIGHT_ITEMS.length})</div>
      <p style="margin-bottom:10px;">Get these out of the way before Month 1 starts, so day one is spent learning Python, not fighting your terminal.</p>
      ${items}
    </div>
  `;
}
function togglePreflight(id){
  preflightState[id] = !preflightState[id];
  markActivityToday();
  debouncedSave();
  renderMain();
  attachStartHandlers();
}

/* ---------- PERSONAL GOAL REMINDER ---------- */
function goalHTML(){
  return `
    <div class="info-box goal-box" style="margin-top:20px;">
      <div class="info-label">WHY YOU'RE DOING THIS</div>
      <p style="margin-bottom:8px;">A short note to your future self for month 5-6, when motivation is hardest to keep — target role, target salary, whatever makes this concrete for you. It'll show up as a quiet reminder in the sidebar.</p>
      <textarea id="goal-input" placeholder="e.g. Remote SDET role, $2,500+/month, offer by next September...">${goalText}</textarea>
    </div>
  `;
}
function attachStartHandlers(){
  attachResumeButton();
  document.querySelectorAll('[data-preflight-id]').forEach(el=>{
    el.onclick = ()=> togglePreflight(el.getAttribute('data-preflight-id'));
  });
  const goalInput = document.getElementById('goal-input');
  if(goalInput){
    goalInput.oninput = (e)=>{
      goalText = e.target.value;
      markActivityToday();
      debouncedSave();
      renderSidebarGoal();
    };
  }
}
function renderSidebarGoal(){
  const el = document.getElementById('sidebar-goal');
  if(!el) return;
  el.innerHTML = goalText ? `<div class="goal-reminder"><span class="goal-label">YOUR GOAL</span>${escapeHtml(goalText)}</div>` : '';
}

/* ---------- HOURS CHART ---------- */
function hoursChartHTML(){
  const total = totalWeeks();
  const hours = [];
  for(let mi=0; mi<MONTHS.length; mi++){
    for(let wi=0; wi<MONTHS[mi].weeks.length; wi++){
      const v = parseFloat(timeState[weekKey(mi,wi)]);
      hours.push(isNaN(v) ? 0 : v);
    }
  }
  const max = Math.max(1, ...hours);
  const sum = hours.reduce((a,b)=>a+b, 0);
  const bars = hours.map((h,i)=>{
    const heightPct = Math.round((h/max)*100);
    return `<div class="hours-bar ${h>0?'logged':''}" style="height:${Math.max(heightPct,2)}%" title="Week ${i+1}: ${h||0}h"></div>`;
  }).join('');
  return `
    <div class="info-box" style="margin-top:20px;">
      <div class="info-label">TIME INVESTED SO FAR — ${sum.toFixed(1)} HRS TOTAL</div>
      <p style="margin-bottom:0;">Logged from the "Hours actually spent" field on each week. Bars fill in as you go — a flat stretch of empty bars is an early warning sign before it becomes a lost month.</p>
      <div class="hours-chart">${bars}</div>
      <div class="hours-axis"><span>Week 1</span><span>Week ${total}</span></div>
    </div>
  `;
}

/* ---------- MY NOTES (compiled view) ---------- */
function renderNotesView(){
  const main = document.getElementById('main');
  const entries = [];
  MONTHS.forEach((m, mi)=>{
    m.weeks.forEach((w, wi)=>{
      const note = notesState[weekKey(mi, wi)];
      if(note && note.trim()) entries.push({ mi, wi, month:m, week:w, note });
    });
  });
  let html = `
    <div class="sheet-label">COMPILED</div>
    <h1 class="sheet-title">My notes</h1>
    <p class="sheet-desc">Every note you've written across all 48 weeks, gathered in one place — exactly what you'll want open when writing your Month 10 case study. Click any entry to jump back to that week.</p>
  `;
  if(entries.length === 0){
    html += `<div class="info-box"><p>No notes yet. Expand any week and use the "Your notes" field — entries show up here automatically as you write them.</p></div>`;
  } else {
    entries.forEach(e=>{
      const gw = MONTHS.slice(0,e.mi).reduce((s,mo)=>s+mo.weeks.length,0) + e.wi + 1;
      html += `<div class="week-card open">
        <div class="week-head" style="cursor:pointer;" onclick="jumpToWeek(${e.mi},${e.wi})">
          <div class="week-titleblock">
            <div class="week-num-row"><div class="week-num">WEEK ${String(gw).padStart(2,'0')} · MONTH ${e.mi+1} — ${e.month.short}</div></div>
            <div class="week-title">${e.week.title}</div>
          </div>
          <div class="toggle-hint">jump to week →</div>
        </div>
        <div class="week-body" style="display:block;">
          <div class="week-section"><p style="white-space:pre-wrap;">${escapeHtml(e.note)}</p></div>
        </div>
      </div>`;
    });
  }
  main.innerHTML = html;
}

/* ---------- GLOSSARY ---------- */
function renderGlossaryView(){
  const main = document.getElementById('main');
  const q = glossaryFilter.trim().toLowerCase();
  const filtered = GLOSSARY_TERMS.filter(g =>
    !q || g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q) || g.cat.toLowerCase().includes(q)
  );
  let html = `
    <div class="sheet-label">REFERENCE</div>
    <h1 class="sheet-title">Glossary</h1>
    <p class="sheet-desc">Every term and acronym used across the 48 weeks, in one place. Good for a fast refresher before Month 11's mock interviews.</p>
    <input type="text" class="glossary-filter" placeholder="Filter terms... (e.g. security, pytest, POM)" value="${glossaryFilter}" oninput="filterGlossary(this.value)">
  `;
  if(filtered.length === 0){
    html += `<div class="info-box"><p>No terms matched that filter.</p></div>`;
  } else {
    filtered.forEach(g=>{
      html += `<div class="glossary-item">
        <div class="glossary-term">${g.term}<span class="glossary-cat">${g.cat}</span></div>
        <div class="glossary-def">${g.def}</div>
      </div>`;
    });
  }
  main.innerHTML = html;
}
function filterGlossary(v){
  glossaryFilter = v;
  renderGlossaryView();
  const input = document.querySelector('.glossary-filter');
  if(input){ input.focus(); input.setSelectionRange(v.length, v.length); }
}

/* ---------- RESUME BULLETS PAGE ---------- */
function weekOptionsHTML(selectedId){
  let html = '<option value="">— not linked to a week —</option>';
  MONTHS.forEach((m, mi)=>{
    html += `<optgroup label="Month ${mi+1} — ${m.short}">`;
    m.weeks.forEach((w, wi)=>{
      const gw = MONTHS.slice(0,mi).reduce((s,mo)=>s+mo.weeks.length,0) + wi + 1;
      html += `<option value="${w.id}" ${w.id===selectedId?'selected':''}>Week ${String(gw).padStart(2,'0')}: ${escapeAttr(w.title)}</option>`;
    });
    html += `</optgroup>`;
  });
  return html;
}
function renderBulletsView(){
  const main = document.getElementById('main');
  let html = `
    <div class="sheet-label">SCRATCHPAD</div>
    <h1 class="sheet-title">Resume bullets</h1>
    <p class="sheet-desc">Draft a bullet the moment you ship a deliverable, while it's fresh — don't wait until Month 10 to reconstruct it from memory. Use the formula from the Resources page: action verb + what you built + tool + measurable impact. Link each bullet to the week it came from so you can trace it back to the project later.</p>
  `;
  if(bullets.length === 0){
    html += `<div class="info-box"><p>No bullets yet. Add one below right after your next deliverable — or use "+ Draft resume bullet from this week" on any week card.</p></div>`;
  } else {
    bullets.forEach(b=>{
      const linked = b.weekId ? findWeekById(b.weekId) : null;
      html += `<div class="bullet-item" style="flex-direction:column; align-items:stretch;">
        <div style="display:flex; gap:8px; align-items:flex-start;">
          <textarea oninput="updateBullet('${b.id}', this.value)" placeholder="Built a Playwright framework covering...">${b.text}</textarea>
          <span class="bullet-del" onclick="deleteBullet('${b.id}')">✕ remove</span>
        </div>
        <select style="margin-top:8px; background:var(--bg-deep); border:1px solid var(--border); color:var(--text-muted); font-family:var(--mono); font-size:11px; padding:5px 8px; border-radius:3px;" onchange="updateBulletWeek('${b.id}', this.value)">
          ${weekOptionsHTML(b.weekId)}
        </select>
        ${linked ? `<div style="font-family:var(--mono); font-size:10px; color:var(--blue); margin-top:5px; cursor:pointer;" onclick="jumpToWeek(${linked.mi},${linked.wi})">↳ from Month ${linked.mi+1}, Week ${String(MONTHS.slice(0,linked.mi).reduce((s,mo)=>s+mo.weeks.length,0)+linked.wi+1).padStart(2,'0')} — jump there</div>` : ''}
      </div>`;
    });
  }
  html += `<div class="add-btn" onclick="addBullet()">+ Add a bullet draft</div>`;
  main.innerHTML = html;
}
function addBullet(weekId){
  bullets.push({id: uid(), text: "", weekId: weekId || null});
  markActivityToday();
  debouncedSave();
  renderBulletsView();
  const areas = document.querySelectorAll('.bullet-item textarea');
  if(areas.length) areas[areas.length-1].focus();
}
function updateBullet(id, value){
  const b = bullets.find(x=>x.id===id);
  if(b){ b.text = value; markActivityToday(); debouncedSave(); }
}
function updateBulletWeek(id, weekId){
  const b = bullets.find(x=>x.id===id);
  if(b){ b.weekId = weekId || null; markActivityToday(); debouncedSave(); renderBulletsView(); }
}
function deleteBullet(id){
  bullets = bullets.filter(x=>x.id!==id);
  debouncedSave();
  renderBulletsView();
}
function quickAddBulletFromWeek(weekId){
  bullets.push({id: uid(), text: "", weekId});
  markActivityToday();
  debouncedSave();
  currentView = "bullets";
  renderAll();
  setTimeout(()=>{
    const areas = document.querySelectorAll('.bullet-item textarea');
    if(areas.length) areas[areas.length-1].focus();
  }, 30);
}

/* ---------- JOB TRACKER PAGE ---------- */
const JOB_STATUSES = ["Wishlist","Applied","Screening","Interviewing","Take-home","Offer","Rejected","Withdrawn"];

function renderJobsView(){
  const main = document.getElementById('main');
  let html = `
    <div class="sheet-label">MONTH 11-12 SUPPORT</div>
    <h1 class="sheet-title">Job application tracker</h1>
    <p class="sheet-desc">Company, date applied, status, and a contact — the same table the roadmap tells you to keep in a spreadsheet, just built in. Referrals convert far better than cold applications, so the contact column is worth filling in whenever you have one.</p>
    <div class="job-table-wrap">
    <table class="job-table">
      <tr><th style="width:20%">Company</th><th style="width:14%">Date applied</th><th style="width:16%">Status</th><th style="width:18%">Contact</th><th>Notes</th><th style="width:4%"></th></tr>
  `;
  jobs.forEach(j=>{
    html += `<tr>
      <td><input value="${escapeAttr(j.company)}" onchange="updateJob('${j.id}','company',this.value)" placeholder="Company"></td>
      <td><input type="date" value="${j.dateApplied||''}" onchange="updateJob('${j.id}','dateApplied',this.value)"></td>
      <td><select onchange="updateJob('${j.id}','status',this.value)">${JOB_STATUSES.map(s=>`<option value="${s}" ${j.status===s?'selected':''}>${s}</option>`).join('')}</select></td>
      <td><input value="${escapeAttr(j.contact)}" onchange="updateJob('${j.id}','contact',this.value)" placeholder="Name / referral"></td>
      <td><input value="${escapeAttr(j.notes)}" onchange="updateJob('${j.id}','notes',this.value)" placeholder="Round, comp, follow-up date..."></td>
      <td><span class="job-del" onclick="deleteJob('${j.id}')">✕</span></td>
    </tr>`;
  });
  html += `</table></div>`;
  html += `<div class="add-btn" onclick="addJob()">+ Add application</div>`;
  if(jobs.length){
    const counts = {};
    jobs.forEach(j=>{ counts[j.status||'Wishlist'] = (counts[j.status||'Wishlist']||0)+1; });
    html += `<div class="info-box" style="margin-top:20px;"><div class="info-label">SUMMARY</div><p>${Object.entries(counts).map(([k,v])=>`${k}: ${v}`).join(' · ')}</p></div>`;
  }
  main.innerHTML = html;
}
function escapeAttr(s){ return (s||'').replace(/"/g,'&quot;'); }
function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function addJob(){
  jobs.push({id: uid(), company:"", dateApplied: todayStr(), status:"Wishlist", contact:"", notes:""});
  markActivityToday();
  debouncedSave();
  renderJobsView();
}
function updateJob(id, field, value){
  const j = jobs.find(x=>x.id===id);
  if(j){ j[field] = value; markActivityToday(); debouncedSave(); }
}
function deleteJob(id){
  jobs = jobs.filter(x=>x.id!==id);
  debouncedSave();
  renderJobsView();
}

/* ---------- INTERACTIONS ---------- */
function jumpToWeek(mi, wi){
  currentView = "month";
  currentMonth = mi;
  document.getElementById('search-input').value = '';
  searchQuery = '';
  renderAll();
  window.scrollTo(0,0);
  setTimeout(()=>{
    const card = document.querySelector(`.week-card[data-month="${mi}"][data-week="${wi}"]`);
    if(card){ card.classList.add('open'); card.scrollIntoView({behavior:'smooth', block:'center'}); }
  }, 50);
}

function toggleOpen(m, w){
  const card = document.querySelector(`.week-card[data-month="${m}"][data-week="${w}"]`);
  card.classList.toggle('open');
}
function toggleWeek(m, w, evt){
  evt.stopPropagation();
  const key = weekKey(m,w);
  state[key] = !state[key];
  markActivityToday();
  debouncedSave();
  renderAll();
  const card = document.querySelector(`.week-card[data-month="${m}"][data-week="${w}"]`);
  if(card) card.classList.add('open');
}
function updateNote(m, w, value){
  const key = weekKey(m,w);
  notesState[key] = value;
  markActivityToday();
  debouncedSave();
}
function updateTime(m, w, value){
  const key = weekKey(m,w);
  timeState[key] = value;
  markActivityToday();
  debouncedSave();
}
function updateLink(m, w, value){
  const key = weekKey(m,w);
  linkState[key] = value;
  markActivityToday();
  debouncedSave();
}
function expandAll(mi){
  document.querySelectorAll(`.week-card[data-month="${mi}"]`).forEach(c=>c.classList.add('open'));
}
function collapseAll(mi){
  document.querySelectorAll(`.week-card[data-month="${mi}"]`).forEach(c=>c.classList.remove('open'));
}

/* ---------- RIGHT RAIL (fills empty space on wide screens) ---------- */
const RAIL_QUICK_LINKS = [
  {cat:"DOCS", t:"Playwright — Python docs", u:"https://playwright.dev/python/docs/intro"},
  {cat:"PRACTICE", t:"LeetCode — Easy/Array/String/Hash", u:"https://leetcode.com/problemset/"},
  {cat:"SECURITY", t:"PortSwigger Web Security Academy", u:"https://portswigger.net/web-security"},
  {cat:"COMMUNITY", t:"Ministry of Testing", u:"https://www.ministryoftesting.com/"}
];

function renderRightRail(){
  const rail = document.getElementById('right-rail');
  if(!rail) return;

  const total = totalWeeks();
  const done = doneWeeks();
  const pct = Math.round((done/total)*100);
  const streak = currentStreak();
  const pace = pacingInfo();
  let paceValue = 'Not set';
  if(pace){
    const {diff} = pace;
    paceValue = diff > 0 ? `${diff} wk${diff===1?'':'s'} ahead` : diff < 0 ? `${Math.abs(diff)} wk${Math.abs(diff)===1?'':'s'} behind` : 'On pace';
  }
  const paceCta = !pace ? `<div class="rail-cta" onclick="focusStartDateInput()">Set start date →</div>` : '';

  const next = firstUnfinished();
  let nextHtml;
  if(next){
    const gw = MONTHS.slice(0,next.mi).reduce((s,mo)=>s+mo.weeks.length,0) + next.wi + 1;
    nextHtml = `
      <div class="rail-next">
        <span class="rail-next-month">WEEK ${String(gw).padStart(2,'0')} · MONTH ${next.mi+1}</span>
        ${MONTHS[next.mi].weeks[next.wi].title}
      </div>
      <button class="rail-btn" onclick="jumpToWeek(${next.mi},${next.wi})">Jump in →</button>
    `;
  } else {
    nextHtml = `<div class="rail-empty">🎉 All 48 weeks done.</div>`;
  }

  const linksHtml = RAIL_QUICK_LINKS.map(l=>`
    <li><a href="${l.u}" target="_blank" rel="noopener"><span class="rail-link-cat">${l.cat}</span>${l.t}</a></li>
  `).join('');

  let jobsHtml = '';
  if(jobs.length){
    const active = jobs.filter(j=>!['Rejected','Withdrawn'].includes(j.status)).length;
    const offers = jobs.filter(j=>j.status==='Offer').length;
    jobsHtml = `
      <div class="rail-card">
        <div class="rail-label">JOB PIPELINE</div>
        <div class="rail-stat-row"><span>Applications</span><span class="rail-stat-val">${jobs.length}</span></div>
        <div class="rail-stat-row"><span>Active</span><span class="rail-stat-val">${active}</span></div>
        <div class="rail-stat-row"><span>Offers</span><span class="rail-stat-val">${offers}</span></div>
      </div>
    `;
  }

  rail.innerHTML = `
    <div class="rail-card">
      <div class="rail-label">QUICK STATS</div>
      <div class="rail-stat-row"><span>Overall</span><span class="rail-stat-val">${pct}%</span></div>
      <div class="rail-stat-row"><span>Weeks done</span><span class="rail-stat-val">${done} / ${total}</span></div>
      <div class="rail-stat-row"><span>Streak</span><span class="rail-stat-val">${streak > 0 ? '🔥 ' : ''}${streak}d</span></div>
      <div class="rail-stat-row"><span>Pacing</span><span class="rail-stat-val">${paceValue}</span></div>
      ${paceCta}
    </div>
    <div class="rail-card">
      <div class="rail-label">UP NEXT</div>
      ${nextHtml}
    </div>
    ${jobsHtml}
    <div class="rail-card">
      <div class="rail-label">QUICK LINKS</div>
      <ul class="rail-link-list">${linksHtml}</ul>
    </div>
  `;
}

function renderAll(){
  renderTopNav();
  renderMonthNav();
  renderOverall();
  renderSidebarFooter();
  renderSidebarGoal();
  renderMain();
  renderRightRail();
}

/* ---------- KEYBOARD SHORTCUTS & ACCESSIBILITY ---------- */
document.addEventListener('keydown', (e)=>{
  const tag = (document.activeElement && document.activeElement.tagName) || '';
  const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  if(e.key === '/' && !typing){
    e.preventDefault();
    document.getElementById('search-input').focus();
  }
  if(e.key === 'Escape' && typing){
    document.activeElement.blur();
  }
  // Enter/Space activates any keyboard-focused custom control (checkboxes, nav items)
  if((e.key === 'Enter' || e.key === ' ') && !typing){
    const el = document.activeElement;
    if(el && el.getAttribute && (el.getAttribute('role') === 'button' || el.getAttribute('role') === 'checkbox')){
      e.preventDefault();
      el.click();
    }
  }
});

/* ---------- INIT ---------- */
(function init(){
  loadProgress();
  renderAll();
})();
