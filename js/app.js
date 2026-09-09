/* =========================================================
   SDET Blueprint — app logic
   Persistence: browser localStorage (works on any static host,
   no backend required). Falls back gracefully if storage is
   unavailable (private browsing, storage full, etc).
   ========================================================= */

const STORAGE_KEY = 'sdet-roadmap-progress';

let currentView = "start"; // "start" | "resources" | "month" | "search" | "bullets" | "jobs"
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

function weekKey(m,w){ return m+"-"+w; }
function totalWeeks(){ return MONTHS.reduce((s,m)=>s+m.weeks.length,0); }
function doneWeeks(){ return Object.values(state).filter(Boolean).length; }
function monthDone(mIdx){ return MONTHS[mIdx].weeks.every((_,wIdx)=>state[weekKey(mIdx,wIdx)]); }
function todayStr(){ return new Date().toISOString().slice(0,10); }
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }

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

function importProgress(evt){
  const file = evt.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e){
    try{
      const parsed = JSON.parse(e.target.result);
      Object.assign(state, parsed.weeks || {});
      Object.assign(notesState, parsed.notes || {});
      Object.assign(timeState, parsed.times || {});
      Object.assign(linkState, parsed.links || {});
      if(parsed.activityDates) activityDates = parsed.activityDates;
      if(parsed.startDate) startDate = parsed.startDate;
      if(parsed.theme) theme = parsed.theme;
      if(parsed.bullets) bullets = parsed.bullets;
      if(parsed.jobs) jobs = parsed.jobs;
      saveProgress();
      applyTheme();
      renderAll();
    }catch(err){
      document.getElementById('save-status').textContent = 'Import failed — invalid file.';
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
  activityDates = [];
  startDate = "";
  bullets = [];
  jobs = [];
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
    {key:"bullets", label:"Resume Bullets", icon:"◆"},
    {key:"jobs", label:"Job Tracker", icon:"◆"},
    {key:"resources", label:"Resources", icon:"◆"}
  ];
  items.forEach(it=>{
    const li = document.createElement('li');
    li.className = 'month-item' + (currentView===it.key ? ' active':'');
    li.innerHTML = `<span class="month-num">${it.icon}</span><span class="month-name">${it.label}</span>`;
    li.onclick = ()=>{ currentView = it.key; document.getElementById('search-input').value=''; searchQuery=''; renderAll(); window.scrollTo(0,0); };
    nav.appendChild(li);
  });
}

function renderMonthNav(){
  const nav = document.getElementById('month-nav');
  nav.innerHTML = '';
  MONTHS.forEach((m, i)=>{
    const li = document.createElement('li');
    li.className = 'month-item' + (currentView==="month" && i===currentMonth ? ' active':'') + (monthDone(i) ? ' month-done':'');
    li.innerHTML = `<span class="month-num">${String(i+1).padStart(2,'0')}</span><span class="month-name">${m.short}</span><span class="month-check">${monthDone(i)?'✓':''}</span>`;
    li.onclick = ()=>{ currentView="month"; currentMonth = i; document.getElementById('search-input').value=''; searchQuery=''; renderAll(); window.scrollTo(0,0); };
    nav.appendChild(li);
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
  box.innerHTML = `
    <div class="streak-row"><span>STREAK</span><span class="streak-flame">${streak > 0 ? '🔥 ' : ''}${streak} day${streak===1?'':'s'}</span></div>
    ${paceHtml}
  `;
}

function setStartDate(v){
  startDate = v;
  debouncedSave();
  renderOverall();
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
          <div class="week-checkbox ${checked?'checked':''}" onclick="toggleWeek(${mi},${wi}, event)"></div>
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

  if(currentView === "start"){ main.innerHTML = START_CONTENT + resumeButtonHTML(); attachResumeButton(); return; }
  if(currentView === "resources"){ main.innerHTML = RESOURCES_CONTENT; return; }
  if(currentView === "bullets"){ renderBulletsView(); return; }
  if(currentView === "jobs"){ renderJobsView(); return; }

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

/* ---------- RESUME BULLETS PAGE ---------- */
function renderBulletsView(){
  const main = document.getElementById('main');
  let html = `
    <div class="sheet-label">SCRATCHPAD</div>
    <h1 class="sheet-title">Resume bullets</h1>
    <p class="sheet-desc">Draft a bullet the moment you ship a deliverable, while it's fresh — don't wait until Month 10 to reconstruct it from memory. Use the formula from the Resources page: action verb + what you built + tool + measurable impact.</p>
  `;
  if(bullets.length === 0){
    html += `<div class="info-box"><p>No bullets yet. Add one below right after your next deliverable.</p></div>`;
  } else {
    bullets.forEach(b=>{
      html += `<div class="bullet-item">
        <textarea oninput="updateBullet('${b.id}', this.value)" placeholder="Built a Playwright framework covering...">${b.text}</textarea>
        <span class="bullet-del" onclick="deleteBullet('${b.id}')">✕ remove</span>
      </div>`;
    });
  }
  html += `<div class="add-btn" onclick="addBullet()">+ Add a bullet draft</div>`;
  main.innerHTML = html;
}
function addBullet(){
  bullets.push({id: uid(), text: ""});
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
function deleteBullet(id){
  bullets = bullets.filter(x=>x.id!==id);
  debouncedSave();
  renderBulletsView();
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

function renderAll(){
  renderTopNav();
  renderMonthNav();
  renderOverall();
  renderSidebarFooter();
  renderMain();
}

/* ---------- KEYBOARD SHORTCUTS ---------- */
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
});

/* ---------- INIT ---------- */
(function init(){
  loadProgress();
  renderAll();
})();
