# SDET Blueprint — 12-Month Roadmap

An interactive, self-contained roadmap for a QA Engineer → SDET transition.
No backend, no build step, no dependencies beyond a browser — just static
files you can open directly or host anywhere.

## Project structure

```
sdet-roadmap/
├── index.html          # page shell — sidebar, layout, script tags
├── css/
│   └── styles.css      # all styling (dark + light theme)
├── js/
│   ├── data.js         # the actual content: 12 months × 4 weeks,
│   │                    orientation page, resources page
│   └── app.js          # all logic: rendering, persistence, search,
│                        streak/pacing, resume bullets, job tracker
└── README.md
```

## Running it locally

No install needed. Either:

- Double-click `index.html` to open it directly in a browser, or
- Serve it (recommended, avoids some browsers' file:// restrictions):

  ```bash
  cd sdet-roadmap
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

## Deploying it (any static host works)

Since it's plain HTML/CSS/JS with no server-side code, you can drop the
`sdet-roadmap/` folder onto any static host:

- **GitHub Pages** — push this folder to a repo, enable Pages on the
  `main` branch (root or `/docs`), done.
- **Netlify / Vercel** — drag-and-drop the folder in their dashboard, or
  connect the repo. Zero config needed (no build command).
- **Cloudflare Pages** — same idea, "no framework" preset.
- Any plain web server (nginx, Apache, S3 static site, etc.) — just
  needs to serve static files.

## How progress is saved

All state (checkboxes, notes, hours logged, deliverable links, streak
history, start date, resume bullets, job tracker rows, theme) is saved
to the browser's `localStorage`, debounced ~500ms after each change.
This means:

- Progress persists across reloads and browser restarts on the **same
  browser + device**.
- It does **not** sync across devices/browsers on its own — this is a
  static site with no backend/account system.
- Use **Export backup** in the sidebar to download a JSON snapshot, and
  **Import** to restore it — do this before switching browsers/devices,
  clearing site data, or just periodically as a safety copy.
- If you host this somewhere permanent (e.g. GitHub Pages) and always
  use the same URL/browser, you generally won't need to think about
  this at all — it just works.

## Features

- 12 months × 4 weeks of structured content (learn / resources /
  deliverable / notes per week)
- Full-text search across all 48 weeks (press `/` to jump to search)
- Per-week: completion checkbox, notes field, hours-spent field,
  deliverable link field
- Streak counter (consecutive days you touched the plan)
- Pacing indicator (set a start date, see if you're ahead/behind
  schedule)
- "Resume where you left off" button — jumps straight to your first
  unfinished week
- Resume Bullets scratchpad — draft bullets right after each
  deliverable, in the same formula used in the Resources page
- Job Application Tracker — company / date / status / contact / notes,
  for Month 11-12
- Dark / light theme toggle
- Print-friendly view (print current month only, via the 🖨 button)
- Export/Import JSON backup, Reset all
- Right-side stats rail on wide screens (>1300px) — quick stats, "up next"
  week with a jump button, job pipeline summary, and a few pinned quick
  links, so the extra horizontal space isn't wasted
- Resources page includes 2026 salary benchmarks (entry/mid/senior,
  remote-from-Bangladesh context), a Performance/Mobile/AI-LLM
  testing tools section (JMeter, k6, Grafana, Appium, promptfoo,
  DeepEval, Ragas), and an AI-assisted-testing-awareness primer
- Pre-flight environment checklist on the Start page (Python, editor,
  git/GitHub, terminal basics) with its own persisted checkboxes
- "Why you're doing this" personal goal note — set once on the Start
  page, quietly resurfaces as a reminder in the sidebar
- Time-invested bar chart on the Start page, built from the
  hours-logged field on every week
- Phase grouping in the sidebar (Foundation / Core Skills /
  Specialization / Launch) plus milestone badges at key transitions
  (mid-program checkpoint, capstone shipped, portfolio live)
- Glossary page — 20+ terms/acronyms used across the roadmap
  (POM, BOLA, flaky test, test pyramid, RAG, STAR method, etc.),
  with a live filter

## Editing the content

All roadmap content lives in `js/data.js` as three plain JS constants:

- `MONTHS` — an array of 12 month objects, each with a `weeks` array
  of 4 week objects (`title`, `time`, `why`, `learn[]`, `resources[]`,
  `deliverable`)
- `START_CONTENT` — the "Start Here" page HTML
- `RESOURCES_CONTENT` — the "Resources" reference page HTML

Edit that file directly — no build step, just save and refresh.
