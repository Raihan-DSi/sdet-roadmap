const MONTHS = [
{
  title:"Programming Foundations",
  short:"Python + Git",
  desc:"Before any test tool matters, you need to write real code without hesitating. This month builds that baseline — everything after this assumes you have it solid.",
  weeks:[
    { id:"w-python-syntax-data-types-control-flow", title:"Python syntax, data types & control flow", time:"6-8 hrs", why:"Every automation script you'll ever write is built from these primitives — skipping ahead here just means debugging syntax later instead of logic.",
      learn:["Variables, numbers, strings, booleans, type conversion","if / elif / else, for and while loops, break / continue","Lists, tuples, dictionaries, sets — when to reach for each","String methods and f-string formatting"],
      resources:[{t:"Automate the Boring Stuff — ch.1-4 (free)", u:"https://automatetheboringstuff.com/"},{t:"Python.org official tutorial, sections 3-5", u:"https://docs.python.org/3/tutorial/"},{t:"Exercism Python track (free, mentored)", u:"https://exercism.org/tracks/python"}],
      deliverable:"Solve 10 small problems (FizzBuzz, string reversal, palindrome check, word-frequency counter, etc.) as plain .py scripts. Push to a new GitHub repo named python-fundamentals." },
    { id:"w-functions-file-i-o-error-handling", title:"Functions, file I/O & error handling", time:"6-8 hrs", why:"Automation frameworks live or die on clean error handling — a script that crashes on the first unexpected popup is worse than no automation at all.",
      learn:["Defining functions, parameters, default args, return values","Reading/writing files with context managers (with open(...) as f)","try / except / finally, raising custom exceptions","List, dict, and set comprehensions"],
      resources:[{t:"Automate the Boring Stuff — ch.6, 8-9", u:"https://automatetheboringstuff.com/"},{t:"Real Python — Python Exceptions: An Introduction", u:"https://realpython.com/python-exceptions/"}],
      deliverable:"Build a command-line to-do list app that reads/writes tasks to a text file, with proper error handling for a missing or corrupted file." },
    { id:"w-object-oriented-python", title:"Object-Oriented Python", time:"6-8 hrs", why:"Page Object Model — the pattern your entire framework will be built on in Month 3 — is just OOP applied to web pages. Get comfortable with classes now and POM will feel obvious later.",
      learn:["Classes, objects, __init__, instance vs. class attributes","Inheritance and method overriding","Magic methods: __str__, __repr__, __eq__","Composition vs. inheritance — when to use which"],
      resources:[{t:"Real Python — OOP in Python 3", u:"https://realpython.com/python3-object-oriented-programming/"},{t:"Corey Schafer's OOP YouTube series", u:"https://www.youtube.com/results?search_query=corey+schafer+python+oop"}],
      deliverable:"Refactor your to-do app using classes (Task, TaskList). Keep this repo — you'll recognize the exact same shape when you build your first Page Object in Month 3." },
    { id:"w-git-github-for-solo-and-team-workflows", title:"Git & GitHub for solo and team workflows", time:"5-6 hrs", why:"Your GitHub profile is the resume that matters most for this transition. A hiring manager reads your README before your CV.",
      learn:["init, clone, add, commit, push, pull, status, log","Branching, merging, and resolving merge conflicts","Writing a genuinely useful README.md and .gitignore","Opening and reviewing a pull request end to end"],
      resources:[{t:"Git Immersion (free, interactive)", u:"https://gitimmersion.com/"},{t:"GitHub's official Hello World guide", u:"https://docs.github.com/en/get-started/quickstart/hello-world"}],
      deliverable:"Push all Month 1 code to GitHub across clean, meaningfully-messaged commits. Write a README for python-fundamentals that explains what each script does, not just how to run it. Then check your logged hours for Weeks 1-4: if you averaged under 8 hrs/week, stay on the 12-month plan; if you averaged 11+ and finished early, read the plan note on the Start page." }
  ]
},
{
  title:"Testing Fundamentals & Playwright Basics",
  short:"Pytest + first automation",
  desc:"You already understand testing conceptually from QA — now you translate that instinct into pytest and write your first real Playwright scripts.",
  weeks:[
    { id:"w-pytest-fundamentals", title:"Pytest fundamentals", time:"6-8 hrs", why:"Pytest is the test runner underneath almost every Python SDET framework — fluency here is non-negotiable, not optional tooling.",
      learn:["Writing test functions, assert statements, test discovery rules","Running tests via CLI: pytest -v, -k, -x, --lf","Organizing test files, naming conventions that scale"],
      resources:[{t:"pytest docs — Get Started + Basic patterns", u:"https://docs.pytest.org/en/stable/getting-started.html"},{t:"Real Python — Effective Python Testing With Pytest", u:"https://realpython.com/pytest-python-testing/"}],
      deliverable:"Write a pytest suite of 15+ tests for a small function library you build yourself (a calculator or string-utils module)." },
    { id:"w-pytest-fixtures-parametrization", title:"Pytest fixtures & parametrization", time:"6-8 hrs", why:"Fixtures are how real frameworks avoid repeating setup code in every test — this is the difference between 'scripts' and an actual framework.",
      learn:["@pytest.fixture and fixture scopes (function, module, session)","conftest.py — sharing fixtures across multiple files","@pytest.mark.parametrize for data-driven tests","Markers for grouping, skipping, and tagging tests (e.g. @smoke, @regression)"],
      resources:[{t:"pytest docs — Fixtures", u:"https://docs.pytest.org/en/stable/how-to/fixtures.html"},{t:"pytest docs — Parametrizing tests", u:"https://docs.pytest.org/en/stable/how-to/parametrize.html"}],
      deliverable:"Rewrite your Week 5 suite using fixtures and parametrize to eliminate all duplicated setup code." },
    { id:"w-playwright-installation-first-script", title:"Playwright installation & first script", time:"6-8 hrs", why:"Playwright is overtaking Selenium in 2026 hiring specifically because of what you'll learn this week — its auto-waiting model eliminates most of the flakiness that plagues older frameworks.",
      learn:["Installing Playwright for Python + browser binaries","sync_api basics: launch, new_page, goto, close","Locator strategies: get_by_role, get_by_text, get_by_label — prefer these over raw CSS/XPath since they survive UI changes better","Understanding Playwright's auto-waiting model (why you should almost never need time.sleep())"],
      resources:[{t:"playwright.dev/python — Getting Started", u:"https://playwright.dev/python/docs/intro"},{t:"playwright codegen — record a flow and read the generated code", u:"https://playwright.dev/python/docs/codegen"}],
      deliverable:"Write a script that opens saucedemo.com, logs in, and prints the page title. Then run 'playwright codegen' on the same flow and compare your code to the generated version." },
    { id:"w-core-interactions-web-first-assertions", title:"Core interactions & web-first assertions", time:"7-9 hrs", why:"'Web-first' assertions (expect(...)) retry automatically instead of failing on the first check — this single habit prevents most of the flaky tests that make automation suites untrustworthy.",
      learn:["click, fill, check, select_option, hover, press","Handling navigation, new tabs, and popups","Screenshots and page.pause() for live debugging","expect() assertions: to_have_text, to_be_visible, to_have_url — and why these beat plain assert statements on UI state"],
      resources:[{t:"playwright.dev — Actions", u:"https://playwright.dev/python/docs/input"},{t:"playwright.dev — Assertions", u:"https://playwright.dev/python/docs/test-assertions"}],
      deliverable:"Automate 5 full test cases against saucedemo.com (login, add to cart, checkout, sort products, logout) using expect() assertions throughout, not print statements." }
  ]
},
{
  title:"Framework Design",
  short:"Advanced Playwright + POM",
  desc:"This is where scripts become a framework. By the end of this month you'll have your first genuine portfolio project — built with the same debugging tools professional teams rely on.",
  weeks:[
    { id:"w-advanced-locators-waits-trace-viewer-a11", title:"Advanced locators, waits, Trace Viewer & a11y", time:"7-9 hrs", why:"The Trace Viewer is what turns 'this test fails in CI but works on my machine' from a nightmare into a five-minute fix — and accessibility failures are bugs, not polish. Both show up in 2026 SDET interviews more than they used to.",
      learn:["Handling dynamic IDs and unstable selectors","Condition-based waiting vs. hard waits — deleting every time.sleep()","iframes, alerts/dialogs, file upload and download handling","Recording and reading traces: trace: 'on-first-retry' in config, then opening the trace viewer on a failure","Accessibility locators (get_by_role, get_by_label) plus an axe-core scan via axe-playwright — fail the test on serious/critical violations"],
      resources:[{t:"playwright.dev — Trace Viewer", u:"https://playwright.dev/python/docs/trace-viewer-intro"},{t:"playwright.dev — Locators deep dive", u:"https://playwright.dev/python/docs/locators"},{t:"axe-playwright (Deque)", u:"https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/README.md"}],
      deliverable:"Extend your suite to handle one genuinely tricky element (a modal, iframe, or file upload). Run axe against login + inventory, fail on serious/critical issues, and capture a trace from a deliberately broken test." },
    { id:"w-page-object-model-design", title:"Page Object Model design", time:"7-9 hrs", why:"POM is the single most-asked-about design pattern in SDET interviews — 'walk me through your framework' almost always means 'show me you understand POM'.",
      learn:["Why POM exists: separating 'what the page can do' from 'what the test asserts'","One class per page, exposing methods, not raw selectors","Keeping locators private to their page class","test.step() to wrap POM methods into named, readable steps that show up cleanly in the Trace Viewer"],
      resources:[{t:"playwright.dev — Page Object Models guide", u:"https://playwright.dev/python/docs/pom"},{t:"Martin Fowler — PageObject pattern", u:"https://martinfowler.com/bliki/PageObject.html"}],
      deliverable:"Refactor your Month 2 tests into a pages/ folder with one class per page (LoginPage, InventoryPage, CartPage), each method wrapped in test.step()." },
    { id:"w-network-mocking-config-parallel-executio", title:"Network mocking, config & parallel execution", time:"7-9 hrs", why:"Network mocking means your UI tests stop depending on a live backend being up, fast, and in the right state — this is what makes a suite reliable enough to trust in CI.",
      learn:["page.route() to intercept, modify, or mock any HTTP request","pytest-playwright's built-in page/browser/context fixtures","pytest-xdist for parallel test runs, and sharding for splitting suites across CI machines","Managing environment config (base URLs, credentials) via env vars, never hardcoded"],
      resources:[{t:"playwright.dev — Network / Mock APIs", u:"https://playwright.dev/python/docs/mock"},{t:"pytest-xdist docs", u:"https://pytest-xdist.readthedocs.io/"}],
      deliverable:"Add a config setup so your suite runs against dev/staging by changing one variable. Mock one flaky or slow API call so that test no longer depends on the live backend." },
    { id:"w-portfolio-project-1-full-user-journey", title:"Portfolio Project #1: full user journey", time:"8-10 hrs", why:"This is the first artifact a recruiter or hiring manager will actually open — treat the README as seriously as the code. Sauce Demo is fine for learning; do not let it become the only UI you ever automate.",
      learn:["Combining everything into one coherent, config-driven framework","Writing a README that explains architecture decisions, not just 'how to run this'","Adding a project structure diagram or folder tree","Skimming one well-starred Playwright Python framework on GitHub — steal structure, not the demo site"],
      resources:[{t:"Search 'playwright python framework' on GitHub, sort by stars, for README style", u:"https://github.com/search?q=playwright+python+framework&type=repositories&s=stars"},{t:"Restful Booker Platform — capstone target (UI + API)", u:"https://automationintesting.online/"}],
      done:"A fresh clone, one install command and one run command give all tests green; the README has a folder tree and explains design decisions.",
      deliverable:"Ship a complete checkout-flow automation project (10+ tests, full POM, config-driven, at least one mocked network call, axe scan on 2 pages) as a standalone GitHub repo with a genuinely thorough README. Sauce Demo is acceptable for this first repo; Month 9's capstone must use a different target. Also this week: create your GitHub profile README and start a running resume draft — from here on, add one bullet per shipped deliverable." }
  ]
},
{
  title:"API Testing",
  short:"requests, pytest, schema validation",
  desc:"Modern SDET work lives as much in APIs as in the browser. This is consistently cited as the single highest-leverage skill for the QA-to-SDET jump.",
  weeks:[
    { id:"w-http-rest-fundamentals", title:"HTTP & REST fundamentals", time:"6-8 hrs", why:"You cannot automate what you don't understand manually first — a week of hands-on Postman work makes every automated test afterward click faster.",
      learn:["HTTP methods, status codes, headers, request/response bodies","REST principles and resource-based URL design","Manual API testing in Postman: collections, environments, variables"],
      resources:[{t:"MDN Web Docs — HTTP overview", u:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview"},{t:"Postman — Getting Started learning path", u:"https://learning.postman.com/docs/getting-started/overview/"}],
      deliverable:"Build a Postman collection of 10+ requests against a free public API (reqres.in or jsonplaceholder.typicode.com) covering GET/POST/PUT/DELETE." },
    { id:"w-api-automation-with-python", title:"API automation with Python", time:"7-9 hrs", why:"Recruiters specifically screen for 'can this person automate API tests, not just click through Postman' — this week is exactly that line.",
      learn:["The requests library: get, post, put, delete, headers, params","Asserting on status codes, response bodies, and headers in pytest","Validating response schema with pydantic or jsonschema"],
      resources:[{t:"Real Python — Python's Requests Library", u:"https://realpython.com/python-requests/"},{t:"pydantic docs — basic models", u:"https://docs.pydantic.dev/latest/"}],
      deliverable:"Convert your Postman collection into an automated pytest suite using requests, with schema validation on at least 3 endpoints." },
    { id:"w-authentication-test-data-management", title:"Authentication & test data management", time:"6-8 hrs", why:"Almost every real-world API you'll test in a job requires auth — and hardcoded shared users are how suites flake. Factories make data disposable.",
      learn:["API keys, bearer tokens, OAuth2 basics","Setting up and tearing down test data via API calls (faster and more reliable than doing it through the UI)","Test data factories (Faker or small factory functions) so each test gets its own user/booking instead of one shared record","Basic mocking with the responses library for isolated, network-independent tests"],
      resources:[{t:"Auth0 — OAuth2 in plain English", u:"https://auth0.com/intro-to-iam/what-is-oauth-2"},{t:"Faker for Python", u:"https://faker.readthedocs.io/"},{t:"responses library docs", u:"https://github.com/getsentry/responses"},{t:"restful-booker practice API", u:"https://restful-booker.herokuapp.com/apidoc/index.html"}],
      deliverable:"Add an authenticated flow to your API suite: a login endpoint returning a token, used in subsequent requests. Create users/bookings through a factory (not a hardcoded JSON blob) and delete them in teardown." },
    { id:"w-combining-ui-api-in-one-framework", title:"Combining UI + API in one framework", time:"7-9 hrs", why:"This is the exact skill that separates SDETs from testers who 'only know Selenium' — using APIs to set up state means your UI tests get faster and less brittle at the same time.",
      learn:["Using API calls to seed test data instead of slow UI steps","Structuring a framework with both ui/ and api/ folders sharing config","The test pyramid in practice: deciding what to test at the API layer vs. the UI layer"],
      resources:[{t:"Google Testing Blog — Test Sizes", u:"https://testing.googleblog.com/2010/12/test-sizes.html"}],
      deliverable:"Update your Month 3 checkout project: use an API call to log in or seed cart data, then verify the result in the UI." }
  ]
},
{
  title:"Databases & CI/CD Basics",
  short:"SQL + GitHub Actions",
  desc:"SDETs verify what actually happened underneath the UI, and ship tests that run themselves without anyone remembering to click 'run'. This month adds both.",
  weeks:[
    { id:"w-sql-fundamentals", title:"SQL fundamentals", time:"5-7 hrs", why:"SQL comes up in nearly every SDET interview, and it's the fastest way to verify a bug actually happened at the data layer, not just visually.",
      learn:["SELECT, WHERE, ORDER BY, LIMIT","JOIN types: inner, left, right, full","GROUP BY and aggregate functions (COUNT, SUM, AVG)"],
      resources:[{t:"SQLZoo (free, interactive)", u:"https://sqlzoo.net/"},{t:"Mode Analytics SQL tutorial", u:"https://mode.com/sql-tutorial/"}],
      deliverable:"Complete SQLZoo's core tutorials and solve 15+ practice queries on your own." },
    { id:"w-sql-for-testers", title:"SQL for testers", time:"6-8 hrs", why:"A test that only checks the UI can pass while the database is silently wrong — this week closes that gap.",
      learn:["Verifying backend state after a UI or API action","Connecting Python to a database (sqlite3, or psycopg2 for Postgres)","Writing assertions against query results directly in pytest"],
      resources:[{t:"Python docs — sqlite3 module", u:"https://docs.python.org/3/library/sqlite3.html"},{t:"psycopg2 basic tutorial", u:"https://www.psycopg.org/docs/usage.html"}],
      deliverable:"Add a DB-verification test to your framework: perform an action via UI/API, then confirm the resulting row exists via a direct SQL query." },
    { id:"w-team-git-workflows-ci-fundamentals", title:"Team Git workflows + CI fundamentals", time:"6-8 hrs", why:"Every company you interview with runs some CI pipeline — being able to say 'I built one from scratch' beats 'I've used one' every time.",
      learn:["Branching strategies (trunk-based, feature branches), PR review etiquette","YAML basics for pipeline configuration","GitHub Actions concepts: workflows, jobs, steps, triggers"],
      resources:[{t:"GitHub Actions — Quickstart", u:"https://docs.github.com/en/actions/quickstart"}],
      deliverable:"Write a basic .github/workflows/tests.yml that checks out code and installs dependencies. Don't run tests yet — get the pipeline mechanics right first." },
    { id:"w-automated-ci-pipeline-reporting", title:"Automated CI pipeline + reporting", time:"7-9 hrs", why:"'My tests run automatically on every push and produce a shareable report' is one of the strongest single sentences you can say in an SDET interview.",
      learn:["Running your full pytest + Playwright suite inside GitHub Actions","Generating HTML test reports (pytest-html or Allure)","Publishing reports as downloadable build artifacts","Configuring retries for CI runs (retries: 2 in CI, 0 locally) — a real 2026 best practice, not a workaround"],
      resources:[{t:"pytest-html plugin docs", u:"https://pytest-html.readthedocs.io/"},{t:"Allure Framework docs", u:"https://allurereport.org/docs/"}],
      done:"A push to main triggers the run on its own, the HTML report downloads from the build artifacts, and a deliberately broken test shows red.",
      deliverable:"Get your framework auto-running on every push, producing a downloadable HTML report with retries configured for CI." }
  ]
},
{
  title:"Docker & Cloud Fundamentals",
  short:"Containers + AWS basics",
  desc:"Enough infrastructure literacy to run tests anywhere and speak credibly about deployment in interviews — not a full DevOps deep-dive.",
  weeks:[
    { id:"w-docker-basics", title:"Docker basics", time:"6-8 hrs", why:"'Works on my machine' is the single most common excuse in software — containerizing your framework removes the excuse entirely.",
      learn:["Images vs. containers, Dockerfile syntax","Building and running a custom image","docker-compose for multi-service setups"],
      resources:[{t:"Docker — Get Started guide", u:"https://docs.docker.com/get-started/"}],
      deliverable:"Write a Dockerfile that containerizes your test framework so it runs identically on any machine." },
    { id:"w-running-playwright-in-containers", title:"Running Playwright in containers", time:"5-7 hrs", why:"Most real CI pipelines run tests inside containers by default — this week connects your Month 5 pipeline to how it actually works in industry.",
      learn:["Official Playwright Docker images","Running headless browsers inside CI containers","Common containerized-browser debugging issues"],
      resources:[{t:"playwright.dev — Docker", u:"https://playwright.dev/python/docs/docker"}],
      deliverable:"Update your GitHub Actions pipeline to run tests inside a Playwright Docker container." },
    { id:"w-cloud-fundamentals-aws", title:"Cloud fundamentals (AWS)", time:"6-8 hrs", why:"You don't need to be a cloud engineer — you need enough vocabulary that a technical interview about 'where does this get deployed' doesn't stall you out.",
      learn:["Core services: EC2, S3, IAM — what each is for, in plain terms","How a staging environment typically gets hosted","Enough vocabulary to discuss deployment architecture credibly in interviews"],
      resources:[{t:"AWS Skill Builder — Cloud Practitioner Essentials (free)", u:"https://skillbuilder.aws/"}],
      deliverable:"Complete AWS's free Cloud Practitioner Essentials course. The certification exam itself is optional — see the Resources page for the honest verdict on whether it's worth the $100." },
    { id:"w-buffer-week-catch-up-read-code-checkpoin", title:"Buffer week — catch up, read code, checkpoint", time:"4-8 hrs (whatever you actually owe)", why:"Months 1–6 are fully loaded. This week exists so a slip does not become a cram. Do not start Month 7 with unfinished Month 3–5 deliverables.",
      learn:["Finish any incomplete deliverable from Months 1–6 — repos first, reading second","Read one well-starred Playwright or pytest framework that is not yours: fixtures, config, what you would steal vs throw away","Optional if you are on pace: Slack/email on CI failure, Allure categories/attachments","Update a running resume draft with what you have actually shipped so far"],
      resources:[{t:"GitHub search — playwright python framework, sort by stars", u:"https://github.com/search?q=playwright+python+framework&type=repositories&s=stars"},{t:"Allure Framework — advanced reporting docs", u:"https://allurereport.org/docs/"}],
      deliverable:"Zero open deliverables from Months 1–6. Write a one-page critique of someone else's framework (structure, weak spots, three things you will copy). Resume draft updated. If you were already on pace, add CI failure notifications as the stretch goal. A second optional stretch: use an AI assistant or Playwright MCP to generate one test, then review and fix it by hand and note in 5 lines what it got wrong." }
  ]
},
{
  title:"Specialization — Foundations",
  short:"Pick a track",
  desc:"Time to differentiate. Pick Security, Performance, or AI/LLM below — the next eight weeks are real content for that track, not a table you have to remix yourself. Security is a solid default if you like adversarial work; Performance and AI/LLM convert equally well if they fit how you think.",
  trackComparison:true,
  weeks:[]
},
{
  title:"Specialization — Depth",
  short:"Applied track project",
  desc:"Go from 'I understand the concepts' to 'I can show a real project that proves it.' Content follows the track you picked in Month 7.",
  weeks:[]
},
{
  title:"Capstone Framework",
  short:"Everything combined",
  desc:"One comprehensive project that proves every skill from Months 1-8 in a single, cohesive, well-documented framework.",
  weeks:[
    { id:"w-architecture-planning", title:"Architecture & planning", time:"6-8 hrs", why:"Planning before coding is itself a skill interviewers probe for — a one-page architecture doc shows judgment, not just typing speed. Do not use Sauce Demo here; hiring managers have seen that checkout suite hundreds of times.",
      learn:["Target app: Restful Booker Platform (automationintesting.online) — real UI + API + booking domain, not another Sauce Demo clone","Planning framework structure: ui/, api/, db/, <track>/, config/, ci/","How you will seed data via API factories instead of clicking through setup"],
      resources:[{t:"Restful Booker Platform", u:"https://automationintesting.online/"},{t:"Restful Booker API docs", u:"https://restful-booker.herokuapp.com/apidoc/index.html"},{t:"Review your own Month 3-7 repos as reference material", u:"#"}],
      deliverable:"Write an architecture doc (even one page) naming the target, folder layout, and what lives at UI vs API vs your specialization layer — before writing any code." },
    { id:"w-build-ui-api-layers", title:"Build: UI + API layers", time:"9-11 hrs", why:"This week is the actual proof that you can build something production-shaped, not just follow a tutorial.",
      learn:["Applying POM and API-client patterns cleanly together","Sharing config and fixtures across UI and API tests"],
      resources:[{t:"Your own Month 3 & 4 code as a base", u:"#"}],
      deliverable:"Build out 15+ UI tests and 15+ API tests in the new unified framework." },
    { id:"w-build-db-validation-ci-cd-docker", title:"Build: DB validation + CI/CD + Docker", time:"9-11 hrs", why:"Wiring every previous month's skill into one pipeline is exactly the kind of system-level thinking senior SDETs are evaluated on.",
      learn:["Wiring together everything from Months 5-6 into one pipeline","Making the whole suite runnable in one command, locally or in CI"],
      resources:[{t:"Your own Month 5 & 6 pipelines as a base", u:"#"}],
      deliverable:"Get the full suite running in GitHub Actions inside Docker, with an Allure report published on every run." },
    { id:"w-buffer-week-specialization-layer-polish-", title:"Buffer week — specialization layer, polish, ship", time:"4-10 hrs (finish what you owe)", why:"Capstone weeks overrun. This week is for wiring your Month 7-8 track into the same pipeline and shipping — not for starting a fourth feature.",
      learn:["Integrating your track project (security scans, k6 suite, or LLM evals) into the same CI pipeline","Axe pass on the main UI journeys if you skipped it earlier","Final cleanup: naming, dead code, README that a stranger can run in 15 minutes"],
      resources:[{t:"Self-review pass as if you were interviewing the code", u:"#"}],
      done:"A stranger can clone, run and see green UI + API + CI in 15 minutes using only your README.",
      deliverable:"Ship the finished capstone against Restful Booker Platform (or an equivalent non-Sauce-Demo app you can run locally) with a thorough README: architecture diagram, how to run it, what it demonstrates. If UI+API+CI are not green yet, that is this week's only job — skip new track features." }
  ]
},
{
  title:"Portfolio & Public Presence",
  short:"Resume, GitHub, LinkedIn",
  desc:"The best framework in the world doesn't get you hired if no one can find or understand it. This month is entirely about visibility.",
  weeks:[
    { id:"w-write-the-capstone-case-study", title:"Write the capstone case study", time:"5-7 hrs", why:"Recruiters and hiring managers skim — a case study with visuals gets read in 60 seconds where a wall of code never gets opened.",
      learn:["Explaining design decisions, not just listing features","Including screenshots or a short screen-recording GIF of a test run"],
      resources:[{t:"Re-read your Week 32 write-up for tone consistency", u:"#"}],
      deliverable:"Publish a detailed blog post or LinkedIn article on your capstone project's design and the problems it solves." },
    { id:"w-polish-your-github-profile", title:"Polish your GitHub profile", time:"4-6 hrs", why:"Recruiters searching GitHub for SDET candidates decide whether to keep reading within seconds of landing on your profile.",
      learn:["Pinning your best 3-4 repos","Writing a profile README","Keeping commit history clean and genuinely readable"],
      resources:[{t:"Browse well-regarded SDET GitHub profiles for pinned-repo style", u:"https://github.com/search?q=SDET+playwright&type=users"}],
      deliverable:"Pin your capstone + Month 3 + Month 7/8 repos. Make sure every pinned repo has a genuinely good README. Optional: port one Playwright test to TypeScript and note it in the capstone README — many remote postings ask for it." },
    { id:"w-resume-rewrite", title:"Resume rewrite", time:"6-8 hrs", why:"The single highest-leverage rewrite you can make: leading with 'built and shipped X' instead of 'responsible for testing Y'. See the Resume Toolkit on the Resources page for exact bullet formulas and action verbs.",
      learn:["Reframing QA experience in automation/framework language","Leading bullets with impact and tooling, not task descriptions","Using strong action verbs (Built, Automated, Reduced, Architected) instead of weak ones (Responsible for, Helped, Assisted)"],
      resources:[{t:"See Resources page → Resume Toolkit for bullet formulas", u:"#"}],
      done:"Your top third shows what you built (tools plus numbers), every bullet follows the action-verb formula, and one outside reviewer has commented.",
      deliverable:"Produce a resume version that leads with your SDET skills and capstone project, with your QA + teaching background as supporting context. Get at least one outside review." },
    { id:"w-linkedin-community-presence", title:"LinkedIn & community presence", time:"4-6 hrs", why:"Visibility compounds — a recruiter who's seen your name twice before your application is far more likely to open it.",
      learn:["Optimizing your headline and About section for SDET recruiter search","Where to genuinely engage: Ministry of Testing, r/QualityAssurance, SDET-focused LinkedIn groups"],
      resources:[{t:"Ministry of Testing community (free to join)", u:"https://www.ministryoftesting.com/"}],
      deliverable:"Update your LinkedIn fully and make 1-2 genuine posts or comments in a testing community this week." }
  ]
},
{
  title:"Interview Preparation",
  short:"Technical + behavioral",
  desc:"Knowing the material and performing well under interview pressure are different skills. This month trains the second one specifically.",
  weeks:[
    { id:"w-sdet-interview-theory", title:"SDET interview theory", time:"6-8 hrs", why:"'Walk me through your framework' is asked in nearly every SDET interview — rehearsing it out loud now means you won't freeze on it later.",
      learn:["Common conceptual questions: test pyramid, flaky tests, POM rationale","Practicing a 3-5 minute framework walkthrough, timed"],
      resources:[{t:"navtutorial.com — free SDET tutorial hub + interview question bank", u:"https://www.navtutorial.com/"}],
      deliverable:"Record yourself giving a 5-minute framework walkthrough. Watch it back and tighten it." },
    { id:"w-coding-practice", title:"Coding practice", time:"7-9 hrs", why:"SDET coding interviews lean on strings/arrays/hash maps far more than advanced algorithms — practice the categories that actually show up.",
      learn:["LeetCode easy/medium — Array, String, Hash Table categories specifically","Practicing explaining your thought process while coding, not just arriving at an answer"],
      resources:[{t:"LeetCode — filter by Easy + Array/String/Hash Table", u:"https://leetcode.com/problemset/"}],
      deliverable:"Solve 20+ problems this week, narrating your approach out loud each time." },
    { id:"w-mock-interviews", title:"Mock interviews", time:"6-8 hrs", why:"The gap between 'knows the material' and 'performs under pressure' only closes with repetition under real time pressure.",
      learn:["Simulating real interview pressure and screen-sharing","Light system-design-style questions: 'how would you design a test framework for X'"],
      resources:[{t:"Pramp — free peer mock interviews", u:"https://www.pramp.com/"}],
      deliverable:"Complete at least 2 full mock interviews this week and note what you fumbled each time." },
    { id:"w-behavioral-prep", title:"Behavioral prep", time:"5-7 hrs", why:"Your QA + teaching background gives you genuinely strong material here — most candidates have nothing this rich to draw on for mentoring/ownership stories.",
      learn:["STAR method structuring","Turning QA + teaching experience into ownership and mentoring stories"],
      resources:[{t:"Draft 6 STAR stories: a bug you caught that mattered, a process you improved, a mentoring moment, a professional disagreement", u:"#"}],
      deliverable:"Have all 6 stories written out and rehearsed, ready to adapt to whatever's actually asked." }
  ]
},
{
  title:"Job Search & Negotiation",
  short:"Apply, interview, close",
  desc:"Everything built over 11 months converts to an offer here. Target remote and international roles specifically — that's where the real income multiplier lives for you.",
  weeks:[
    { id:"w-target-list-tailored-applications", title:"Target list & tailored applications", time:"6-8 hrs", why:"A tailored list beats a spray-and-pray approach — 10 well-matched applications typically outperform 50 generic ones.",
      learn:["Building a list split between local companies and remote-friendly international ones","Tailoring resume keywords per posting without losing your core story","Weekly cadence until offers land: about 10 tailored applications, 5 networking messages and 2 follow-ups"],
      resources:[{t:"We Work Remotely", u:"https://weworkremotely.com/"},{t:"RemoteOK", u:"https://remoteok.com/"}],
      deliverable:"Build a list of 30+ target roles and submit your first 10 tailored applications." },
    { id:"w-active-applications-networking", title:"Active applications & networking", time:"6-8 hrs", why:"Referrals convert at dramatically higher rates than cold applications — this is the highest-ROI hour of your whole job search.",
      learn:["Reaching out for referrals instead of only cold-applying","Following up professionally without being pushy"],
      resources:[{t:"Track everything in a simple spreadsheet: company, date, status, contact", u:"#"}],
      deliverable:"Submit 15-20 more applications and send 5 genuine networking messages to people at target companies." },
    { id:"w-interview-loops-take-homes", title:"Interview loops & take-homes", time:"varies", why:"A take-home assignment is your capstone project's format, applied live — the practice from Months 9-10 pays off directly here.",
      learn:["Managing a take-home assignment under real time constraints","Following up promptly and professionally after each round"],
      resources:[{t:"Reuse your capstone's own patterns for any take-home request", u:"#"}],
      deliverable:"Complete any live interview loops or take-home assignments that come in, applying everything from Month 11." },
    { id:"w-offer-evaluation-negotiation", title:"Offer evaluation & negotiation", time:"varies", why:"The single highest-value hour of the entire year might be this one — a well-negotiated first offer compounds through every raise that follows it.",
      learn:["Reading an offer against real market data (SDET salary bands by level and region)","Negotiating professionally: asking for time, comparing offers, countering with data — not just asking for 'more'"],
      resources:[{t:"Revisit the salary comparison data from earlier in this roadmap as your anchor", u:"#"}],
      deliverable:"When an offer comes in, don't accept on the spot. Evaluate it against market bands, and counter at least once with a clear, specific number." }
  ]
}
];

const SPEC_MONTH_INDEX = 6; // Month 7 in the UI (0-based)

const SPECIALIZATION_TRACKS = {
  security: {
    id:"security",
    label:"Security Testing",
    fit:"Adversarial thinking, finding what breaks trust",
    tools:"Burp Suite, OWASP ZAP, pip-audit",
    months:[
      {
        title:"Specialization — Foundations",
        short:"Security foundations",
        desc:"Vocabulary, then tools, then CI. You cannot test for vulnerabilities you cannot name.",
        weeks:[
          { id:"w-owasp-top-10-conceptual-foundation", title:"OWASP Top 10 — conceptual foundation", time:"6-8 hrs", why:"You cannot test for vulnerabilities you can't name — this week is pure vocabulary and mental models before any tooling.",
            learn:["Injection (SQL, command), broken authentication, XSS","Broken access control, security misconfiguration","Insecure deserialization, vulnerable and outdated components"],
            resources:[{t:"OWASP Top 10 official project page", u:"https://owasp.org/www-project-top-ten/"}],
            deliverable:"Write a one-paragraph, plain-English explanation of each of the 10 categories in your own words — this becomes real interview prep material later." },
          { id:"w-burp-suite-fundamentals", title:"Burp Suite fundamentals", time:"7-9 hrs", why:"Burp Suite is the industry-standard tool for manual security testing — PortSwigger's own free academy is the single best resource in this entire roadmap for one topic.",
            learn:["Intercepting and modifying requests with the Proxy","Repeater for manual request manipulation","Intruder for basic automated fuzzing"],
            resources:[{t:"PortSwigger Web Security Academy (free)", u:"https://portswigger.net/web-security"},{t:"OWASP Juice Shop (practice target)", u:"https://owasp.org/www-project-juice-shop/"}],
            deliverable:"Install OWASP Juice Shop (a deliberately vulnerable practice app) locally, and use Burp to find and document 2 vulnerabilities." },
          { id:"w-api-security-testing", title:"API security testing", time:"7-9 hrs", why:"API security is the fastest-growing sub-specialty in this space right now — most apps' real attack surface today is the API layer, not the UI.",
            learn:["Broken Object Level Authorization (BOLA) testing","Rate-limiting and input validation checks","OWASP ZAP automated baseline scans"],
            resources:[{t:"OWASP API Security Top 10", u:"https://owasp.org/www-project-api-security/"},{t:"OWASP ZAP — Getting Started", u:"https://www.zaproxy.org/getting-started/"}],
            deliverable:"Run a ZAP baseline scan against a test API and document 3 findings with severity and a suggested fix for each." },
          { id:"w-security-checks-in-ci", title:"Security checks in CI", time:"6-8 hrs", why:"Anyone can run a manual scan once — automating it into CI is what proves you think like an engineer, not just a one-time auditor.",
            learn:["Dependency vulnerability scanning (pip-audit or similar)","Integrating a ZAP baseline scan into a CI pipeline","Interpreting and triaging scan output without chasing noise"],
            resources:[{t:"pip-audit docs", u:"https://github.com/pypa/pip-audit"},{t:"ZAP Automation Framework docs", u:"https://www.zaproxy.org/docs/automate/"}],
            deliverable:"Add an automated dependency scan + ZAP scan step to your Month 5 CI pipeline, so security checks run alongside functional tests." }
        ]
      },
      {
        title:"Specialization — Depth",
        short:"Applied security project",
        desc:"Go from 'I understand the concepts' to 'I can show a real project that proves it.'",
        weeks:[
          { id:"w-structured-vulnerability-assessment", title:"Structured vulnerability assessment", time:"8-10 hrs", why:"A messy list of 'found some bugs' doesn't read as professional — a structured report is what makes this project interview-ready.",
            learn:["Writing a proper vulnerability report: severity, reproduction steps, impact, fix","Prioritizing findings the way a real security review would"],
            resources:[{t:"PortSwigger Academy — intermediate modules", u:"https://portswigger.net/web-security/all-labs"}],
            deliverable:"Perform a full assessment of OWASP Juice Shop, documenting 8-10 findings in a structured report format." },
          { id:"w-secure-api-design-review", title:"Secure API design review", time:"6-8 hrs", why:"This is the exact skill that separates a 'security-aware SDET' from a dedicated pentester — you're reviewing design, not just running scans.",
            learn:["Reviewing an API's auth flow for weaknesses","Testing for excessive data exposure and mass assignment"],
            resources:[{t:"OWASP API Security Top 10 — injection & auth deep dive", u:"https://owasp.org/www-project-api-security/"}],
            deliverable:"Add API-specific findings to your assessment report from the previous week." },
          { id:"w-capstone-specialization-project", title:"Capstone specialization project", time:"8-10 hrs", why:"Automated, repeatable security checks are worth far more to an employer than a one-time manual report — this is what makes the skill durable and demonstrable.",
            learn:["Combining your automation framework with your security testing skill","Automating repeatable security checks instead of only manual findings"],
            resources:[{t:"ZAP Automation Framework docs", u:"https://www.zaproxy.org/docs/automate/"}],
            deliverable:"Build a 'security regression suite' repo: automated ZAP scan + a handful of scripted BOLA/auth checks against a test app, runnable via one command." },
          { id:"w-write-it-up", title:"Write it up", time:"5-7 hrs", why:"A published write-up does double duty: it's a portfolio piece AND practice for explaining technical work clearly, which is exactly what interviews test.",
            learn:["Turning technical work into a readable case study","Framing findings for both technical and non-technical audiences"],
            resources:[{t:"HackerOne Hacktivity — public bug bounty writeups", u:"https://hackerone.com/hacktivity"}],
            deliverable:"Publish a short write-up (blog post or LinkedIn article) walking through your security assessment project and what you learned." }
        ]
      }
    ]
  },
  performance: {
    id:"performance",
    label:"Performance Testing",
    fit:"Systems thinking, numbers, bottlenecks",
    tools:"k6, Grafana, GitHub Actions",
    months:[
      {
        title:"Specialization — Foundations",
        short:"Performance foundations",
        desc:"Latency, throughput, and SLIs first — then k6 scripts you can run in CI. JMeter is useful vocabulary; k6 is the 2026 default for a code-first SDET.",
        weeks:[
          { id:"w-performance-testing-vocabulary", title:"Performance testing vocabulary", time:"6-8 hrs", why:"You cannot set a useful threshold if you cannot name what you are measuring — interviews stall here more often than on tool syntax.",
            learn:["Latency vs throughput vs error rate; p50/p95/p99","Load vs stress vs spike vs soak","SLI/SLO basics, and why 'the site felt slow' is not a finding"],
            resources:[{t:"k6 docs — Test types", u:"https://grafana.com/docs/k6/latest/testing-guides/test-types/"},{t:"Google SRE book — SLIs and SLOs (free)", u:"https://sre.google/sre-book/service-level-objectives/"}],
            deliverable:"Write a one-page glossary in your own words: load/stress/spike/soak, plus what p95 means and one example SLO for a booking API." },
          { id:"w-k6-first-scripts", title:"k6 first scripts", time:"7-9 hrs", why:"k6 is code (JavaScript) you can review in PRs — that is the SDET-shaped performance skill, not a recorded JMeter GUI session.",
            learn:["Installing k6, http.get/post, checks, thresholds","Virtual users, duration, ramping","Reading the summary output without lying to yourself"],
            resources:[{t:"k6 — Get started", u:"https://grafana.com/docs/k6/latest/get-started/installation/"},{t:"k6 — HTTP requests", u:"https://grafana.com/docs/k6/latest/javascript-api/k6-http/"}],
            deliverable:"A k6 script against restful-booker (or jsonplaceholder) with checks and a p95 threshold. Commit it. Fail the script on purpose by tightening the threshold, then fix it." },
          { id:"w-api-load-test-data-and-realistic-scenari", title:"API load, test data, and realistic scenarios", time:"7-9 hrs", why:"A login-only spike is a demo. Booking create/list with unique data is closer to a real performance test.",
            learn:["Scenario functions, shared vs unique test data","Think time vs closed vs open models at a basic level","When a 401 or 429 is a product finding vs a bad script"],
            resources:[{t:"k6 — Scenarios", u:"https://grafana.com/docs/k6/latest/using-k6/scenarios/"},{t:"Restful Booker API", u:"https://restful-booker.herokuapp.com/apidoc/index.html"}],
            deliverable:"A scenario that creates bookings with unique payloads, lists them, and asserts error rate + p95. Document assumed environment limits so you do not DDoS a public demo." },
          { id:"w-performance-checks-in-ci", title:"Performance checks in CI", time:"6-8 hrs", why:"A load test you run once locally does not survive a job change. Wiring k6 into GitHub Actions is what you can point at in an interview.",
            learn:["k6 in GitHub Actions, storing summary output as an artifact","Keeping CI load small (smoke/load-lite) vs a heavier nightly job","Reading failures: threshold miss vs environment flake"],
            resources:[{t:"k6 — Running in CI", u:"https://grafana.com/docs/k6/latest/testing-guides/automated-performance-testing/"}],
            deliverable:"Add a k6 smoke job to your Month 5 pipeline that fails the build if thresholds miss. Keep VU count tiny so you do not abuse a public API from CI." }
        ]
      },
      {
        title:"Specialization — Depth",
        short:"Applied performance project",
        desc:"Go from 'I ran k6 once' to a repo a hiring manager can execute and understand.",
        weeks:[
          { id:"w-bottlenecks-soak-and-reading-results", title:"Bottlenecks, soak, and reading results", time:"8-10 hrs", why:"The skill is explaining *why* p95 moved — CPU, chatty APIs, missing indexes — not pasting a green summary.",
            learn:["Soak vs spike on the same script","Correlating k6 output with basic server/app logs if you run a local target","Writing findings: hypothesis, evidence, next experiment"],
            resources:[{t:"k6 — Analyze results", u:"https://grafana.com/docs/k6/latest/results-output/"}],
            deliverable:"Run soak (low VU, longer) and spike against a target you are allowed to hit. Write a 1–2 page findings note with charts or pasted summaries and one bottleneck hypothesis." },
          { id:"w-frontend-performance-awareness", title:"Frontend performance awareness", time:"6-8 hrs", why:"SDET interviews still mix API load with 'why is this page slow' — Web Vitals literacy is enough; you do not need to become a perf engineer.",
            learn:["LCP, CLS, INP at a conceptual level","Playwright tracing / HAR as a way to see slow requests in a UI journey","When to push a problem to API tests vs a single UI timer"],
            resources:[{t:"web.dev — Web Vitals", u:"https://web.dev/articles/vitals"},{t:"Playwright — Trace Viewer (network)", u:"https://playwright.dev/python/docs/trace-viewer-intro"}],
            deliverable:"Pick one Restful Booker Platform (or your Month 3) UI journey, capture a trace, and write which requests dominate. Add one Playwright timing assertion that is not a hard sleep." },
          { id:"w-perf-capstone-specialization-project", title:"Capstone specialization project", time:"8-10 hrs", why:"A runnable k6 suite with README, thresholds, and CI is the performance equivalent of a security regression repo.",
            learn:["Repo layout: scenarios/, thresholds, README with how to run locally vs CI","What not to test against public internet at full load"],
            resources:[{t:"k6 examples", u:"https://github.com/grafana/k6/tree/master/examples"}],
            deliverable:"Ship a 'performance suite' repo: at least 3 scenarios, thresholds, CI smoke job, README with assumptions and how to read a failure." },
          { id:"w-perf-write-it-up", title:"Write it up", time:"5-7 hrs", why:"Performance work that is not explained does not count in interviews — they will ask you to walk through a graph.",
            learn:["Turning numbers into a story: baseline, change, result","Framing findings for both engineers and a hiring manager"],
            resources:[{t:"Grafana k6 documentation", u:"https://grafana.com/docs/k6/latest/"}],
            deliverable:"Publish a short write-up of your performance project: what you measured, what broke (or what did not), and what you would do next with more time." }
        ]
      }
    ]
  },
  ai: {
    id:"ai",
    label:"AI / LLM Testing",
    fit:"Ambiguity, evaluating non-deterministic output",
    tools:"promptfoo, DeepEval, RAG evals",
    months:[
      {
        title:"Specialization — Foundations",
        short:"AI/LLM testing foundations",
        desc:"Evals, not vibes. You already know how to write pytest; this track is how you score outputs that are not a single correct string.",
        weeks:[
          { id:"w-how-to-test-non-deterministic-systems", title:"How to test non-deterministic systems", time:"6-8 hrs", why:"Asserting exact strings against an LLM is how eval suites rot. You need a model for pass/fail when answers vary.",
            learn:["Evals vs unit tests vs production traces","Hallucination, jailbreak, toxicity, faithfulness as categories","LLM-as-judge: useful, biased, and not a free pass"],
            resources:[{t:"promptfoo docs — intro", u:"https://www.promptfoo.dev/docs/intro/"},{t:"DeepEval docs — getting started", u:"https://www.deepeval.com/docs/getting-started"}],
            deliverable:"A one-page note: three failure modes you would test for a support chatbot, and why 'the answer looks good' is not a metric." },
          { id:"w-first-eval-suite-promptfoo-or-deepeval", title:"First eval suite (promptfoo or DeepEval)", time:"7-9 hrs", why:"A tiny eval file you can run in a terminal is the equivalent of your first pytest — everything after this is more cases.",
            learn:["A fixture set of prompts + expected properties","Assertions: contains, similar, cheaper heuristics before jumping to an LLM judge","Running locally and reading a failure"],
            resources:[{t:"promptfoo — assertions", u:"https://www.promptfoo.dev/docs/configuration/expected-outputs/"},{t:"DeepEval — pytest-style metrics", u:"https://www.deepeval.com/docs/metrics-introduction"}],
            deliverable:"20+ eval cases against a small prompt (or a public model you are allowed to call). At least 3 should fail on purpose so you know the runner works." },
          { id:"w-prompt-injection-rag-and-data-you-actual", title:"Prompt injection, RAG, and data you actually own", time:"7-9 hrs", why:"The interesting bugs are retrieval misses and injection, not 'the model wrote a poem'. RAG is the architecture most product companies will ask about.",
            learn:["Prompt injection vs jailbreak in plain language","Faithfulness / context recall as RAG metrics (Ragas or DeepEval)","Building a tiny eval dataset from docs you control — not from production user data"],
            resources:[{t:"OWASP LLM Top 10", u:"https://owasp.org/www-project-top-10-for-large-language-model-applications/"},{t:"Ragas — getting started", u:"https://docs.ragas.io/en/stable/getstarted/"}],
            deliverable:"Add injection and at least one RAG-style faithfulness check to your eval suite. Document the dataset: where it came from and what 'pass' means." },
          { id:"w-evals-in-ci", title:"Evals in CI", time:"6-8 hrs", why:"Same bar as every other track — if it does not run on a push, it is a hobby.",
            learn:["Running a subset of evals in GitHub Actions","Cost/rate-limit awareness: smoke evals vs nightly full set","Quarantining flaky judges instead of deleting the assertion"],
            resources:[{t:"promptfoo — CI", u:"https://www.promptfoo.dev/docs/integrations/ci-cd/"}],
            deliverable:"A CI job that runs a cheap eval subset and fails the build on regressions. README explains how to run the full set locally." }
        ]
      },
      {
        title:"Specialization — Depth",
        short:"Applied AI eval project",
        desc:"A dataset, a runner, and a write-up — the hire-ready shape of this track in 2026.",
        weeks:[
          { id:"w-eval-dataset-design", title:"Eval dataset design", time:"8-10 hrs", why:"The suite is only as good as the cases. Gold answers, edge cases, and known-bad prompts are the work.",
            learn:["Coverage: happy path, refusal, injection, stale retrieval","Versioning the dataset next to the code","When a human must label instead of an LLM judge"],
            resources:[{t:"promptfoo — configuration guide", u:"https://www.promptfoo.dev/docs/configuration/guide/"}],
            deliverable:"Expand to a structured dataset (CSV/JSON) with tags. Include a short data card: size, labels, known gaps." },
          { id:"w-guardrails-and-what-to-assert-in-product", title:"Guardrails and what to assert in product tests", time:"6-8 hrs", why:"SDETs in AI teams often own 'this must not ship' checks — PII leak, off-topic, prompt leak — more than model training.",
            learn:["Input/output filters vs evals vs observability","A Playwright or API test that asserts a guardrail, not the model quality","False positives: a guardrail that blocks legitimate users"],
            resources:[{t:"OWASP LLM Top 10", u:"https://owasp.org/www-project-top-10-for-large-language-model-applications/"}],
            deliverable:"Add 3 product-level tests (API or UI) that assert a guardrail or safe refusal. Keep them deterministic — do not call a paid model if a stub will do." },
          { id:"w-ai-capstone-specialization-project", title:"Capstone specialization project", time:"8-10 hrs", why:"One repo: dataset + runner + CI + README. That is what you walk through in an interview, not a chat log with ChatGPT.",
            learn:["Combining evals with your existing pytest layout where it fits","Honest limitations section — models change, judges drift"],
            resources:[{t:"DeepEval GitHub", u:"https://github.com/confident-ai/deepeval"}],
            deliverable:"Ship an 'llm-eval-suite' repo: runnable one command, CI smoke, dataset, and README that a skeptic can follow." },
          { id:"w-ai-write-it-up", title:"Write it up", time:"5-7 hrs", why:"Hiring managers need you to explain probabilistic testing without sounding like a blog post. Practice that now.",
            learn:["Explaining evals to someone who only knows assertEqual","What you still review by hand when Copilot writes the cases"],
            resources:[{t:"promptfoo docs", u:"https://www.promptfoo.dev/docs/intro/"}],
            deliverable:"Publish a short write-up of the eval project: what you measured, what the judge got wrong, and how you would use this at a company." }
        ]
      }
    ]
  }
};

function applySpecializationTrack(trackId){
  const track = SPECIALIZATION_TRACKS[trackId] || SPECIALIZATION_TRACKS.security;
  track.months.forEach((specMonth, offset)=>{
    const target = MONTHS[SPEC_MONTH_INDEX + offset];
    if(!target) return;
    target.title = specMonth.title;
    target.short = specMonth.short;
    target.desc = specMonth.desc;
    target.weeks = specMonth.weeks;
  });
}
applySpecializationTrack("security");

const START_CONTENT = `
    <div class="sheet-label">SHEET 00 — ORIENTATION</div>
    <h1 class="sheet-title">How to use this roadmap</h1>
    <p class="sheet-desc">This is a 12-month, 48-week plan from QA Engineer to a hire-ready SDET, built around your specific situation: 4 years of QA experience, a teaching background, based in Dhaka, targeting remote/international SDET roles. Treat AI as a tool you will use and review — not as something the job is immune to.</p>

    <div class="info-box">
      <div class="info-label">YOUR PROGRESS IS NOW SAVED AUTOMATICALLY</div>
      <p>Every checkbox and note you make is saved as you go — close this file and reopen it later, and everything is exactly where you left it. Use the <strong>Export backup</strong> button in the sidebar occasionally as a safety copy, especially before switching computers or browsers, since saved progress is tied to where you opened this file.</p>
    </div>

    <div class="info-box">
      <div class="info-label">TIME COMMITMENT</div>
      <p>Every week is estimated assuming you're doing this alongside a full-time job — most weeks run 6-9 hours, roughly 1-1.5 hours on weeknights plus a longer weekend session. Months 6 and 9 each end in an explicit <strong>buffer week</strong>: finish overdue deliverables instead of cramming two weeks into one. If you can consistently do more, you'll finish faster than 12 months; if a week runs short, don't panic and don't skip the deliverable — let it land in the buffer.</p>
    </div>

    <div class="info-box amber">
      <div class="info-label">THE ONE RULE THAT MATTERS MOST</div>
      <p>Every week has a "deliverable" — an actual thing you build, not just a topic you read about. If you only have time for one or the other, skip the reading and do the deliverable. You learn Playwright by writing broken Playwright code and fixing it, not by finishing a course.</p>
    </div>

    <div class="info-box">
      <div class="info-label">THE 12-MONTH PLAN IS THE DEFAULT — HERE'S WHEN TO CHANGE IT</div>
      <p>Stay on 12 months unless your own numbers say otherwise. <strong>Weeks 1-4 are a test:</strong> log hours on every week, set your start date, and check your real weekly average at the end of Month 1.</p>
      <p><strong>Under about 8 hrs/week, or finishing late:</strong> stay on 12 months. That is the plan working as designed, not failing.</p>
      <p><strong>About 11+ hrs/week sustained, and finishing deliverables early:</strong> you can aim for roughly 9 months. Skip the optional stretches, keep one specialization track but treat Month 8 as lighter, and start your resume and first applications around Month 7 instead of waiting for Month 12. You don't need every week finished to apply — a shipped framework, an API suite and CI is already a credible portfolio.</p>
      <p>Whichever you pick, don't cut a deliverable to save calendar time.</p>
    </div>

    <div class="info-box">
      <div class="info-label">IF YOU FALL BEHIND</div>
      <p>Don't try to catch up by cramming multiple weeks into one. Instead, cut a resource, never cut a deliverable. The GitHub repos are the actual proof of your work — a roadmap you followed perfectly but built nothing from is worth less than a slower pace with real commits.</p>
    </div>

    <div class="info-box">
      <div class="info-label">HOW TO USE THE NOTES FIELD</div>
      <p>Every week has a small notes box once you expand it — use it for things worth remembering later: a bug you hit and how you fixed it, a question to ask in a community, or a resume bullet draft. These notes are exactly what you'll mine in Month 10 when writing your capstone case study.</p>
    </div>

    <div class="info-box">
      <div class="info-label">WHERE TO GO NEXT</div>
      <p>Open the <strong>Resources</strong> page in the sidebar for the master tool list, free practice sites, the Resume Toolkit, an honest verdict on which certifications are worth your time, and interview-prep links. Then start on Month 1, Week 1.</p>
    </div>
`;

const RESOURCES_CONTENT = `
    <div class="sheet-label">REFERENCE SHEET</div>
    <h1 class="sheet-title">Master tool & resource list</h1>
    <p class="sheet-desc">Everything referenced across the 12 months, gathered in one place — plus the parts most roadmaps skip: which certifications are actually worth your time, real resume bullet formulas, and where to practice for free.</p>

    <div class="res-section">
      <h3>Free practice playgrounds</h3>
      <div class="res-grid">
        <div class="res-card"><div class="res-cat">UI AUTOMATION</div><div class="res-name"><a href="https://www.saucedemo.com/" target="_blank">saucedemo.com</a></div><div class="res-desc">The standard e-commerce demo site for automation practice — use it for Months 2-3.</div></div>
        <div class="res-card"><div class="res-cat">UI AUTOMATION</div><div class="res-name"><a href="https://the-internet.herokuapp.com/" target="_blank">the-internet.herokuapp.com</a></div><div class="res-desc">Dozens of small pages built specifically to practice tricky elements: iframes, alerts, dynamic loading, file uploads.</div></div>
        <div class="res-card"><div class="res-cat">UI AUTOMATION</div><div class="res-name"><a href="https://demoqa.com/" target="_blank">demoqa.com</a></div><div class="res-desc">Wider variety of form elements, tables, and widgets for locator practice.</div></div>
        <div class="res-card"><div class="res-cat">API TESTING</div><div class="res-name"><a href="https://reqres.in/" target="_blank">reqres.in</a></div><div class="res-desc">Simple hosted REST API purpose-built for practicing GET/POST/PUT/DELETE.</div></div>
        <div class="res-card"><div class="res-cat">API TESTING</div><div class="res-name"><a href="https://jsonplaceholder.typicode.com/" target="_blank">jsonplaceholder.typicode.com</a></div><div class="res-desc">Fake but realistic REST API with posts, comments, and users — good for schema validation practice.</div></div>
        <div class="res-card"><div class="res-cat">API TESTING</div><div class="res-name"><a href="https://restful-booker.herokuapp.com/apidoc/index.html" target="_blank">restful-booker</a></div><div class="res-desc">Purpose-built practice API with a real authentication flow — the best free option for Month 4's auth week.</div></div>
        <div class="res-card"><div class="res-cat">SECURITY</div><div class="res-name"><a href="https://owasp.org/www-project-juice-shop/" target="_blank">OWASP Juice Shop</a></div><div class="res-desc">The standard deliberately-vulnerable app for practicing security testing — runs locally via Docker.</div></div>
        <div class="res-card"><div class="res-cat">SECURITY</div><div class="res-name"><a href="https://portswigger.net/web-security" target="_blank">PortSwigger Web Security Academy</a></div><div class="res-desc">Free, extremely well-regarded hands-on labs for every OWASP Top 10 category, with a real Burp Suite environment.</div></div>
      </div>
    </div>

    <div class="res-section">
      <h3>Salary benchmarks (2026, for negotiation reference)</h3>
      <div class="info-box amber">
        <div class="info-label">USE THESE AS AN ANCHOR, NOT A QUOTE — READ MONTH 12</div>
        <p>Figures below are approximate 2026 market ranges pulled from Glassdoor, Payscale, and industry salary guides — they move fast and vary by company, domain, and how you negotiate. The point isn't to memorize a number, it's to walk into Month 12's negotiation week with a real anchor instead of guessing.</p>
      </div>
      <table class="track-table">
        <tr><th></th><th>US remote, per year</th><th>Notes</th></tr>
        <tr><td class="rowlabel">Entry-level</td><td>$65,000 – $95,000</td><td>Where a strong portfolio (this roadmap's capstone) matters most — it's the difference between the low and high end.</td></tr>
        <tr><td class="rowlabel">Mid-level</td><td>$95,000 – $140,000</td><td>Typical Glassdoor "remote" average sits around $103k–$109k for this band.</td></tr>
        <tr><td class="rowlabel">Senior</td><td>$140,000 – $190,000+</td><td>Multi-year target, not a Month-12 target — included so you know where the ladder leads.</td></tr>
      </table>
      <div class="res-card" style="margin-top:10px;">
        <div class="res-name">The remote-from-Bangladesh arbitrage</div>
        <div class="res-desc">Local Dhaka-market SDET pay is a small fraction of the numbers above — industry guides put remote international roles at roughly 3-5× local Bangladesh rates once you land a US/EU-based remote employer, which is exactly why Month 11-12 explicitly targets remote-friendly international companies over local-only applications.</div>
      </div>
    </div>

    <div class="res-section">
      <h3>Performance, mobile & AI/LLM testing tools</h3>
      <p class="sheet-desc" style="margin-top:-4px;">Referenced in the track comparison table in Month 7 and in the "common pitfalls" list below — you don't need deep expertise in any of these, but credible familiarity with one outside your main specialization noticeably widens the roles you qualify for.</p>
      <div class="res-grid">
        <div class="res-card"><div class="res-cat">PERFORMANCE</div><div class="res-name"><a href="https://jmeter.apache.org/" target="_blank">Apache JMeter</a></div><div class="res-desc">The long-standing free/open-source load testing standard — GUI-based, huge community, still widely asked about in interviews.</div></div>
        <div class="res-card"><div class="res-cat">PERFORMANCE</div><div class="res-name"><a href="https://k6.io/" target="_blank">k6</a></div><div class="res-desc">Modern, code-first load testing (JavaScript test scripts) — the tool most performance-track job postings mention alongside JMeter in 2026.</div></div>
        <div class="res-card"><div class="res-cat">PERFORMANCE</div><div class="res-name"><a href="https://grafana.com/" target="_blank">Grafana</a></div><div class="res-desc">Pairs with k6/JMeter output to visualize load-test results — worth a few hours just to recognize dashboards in an interview.</div></div>
        <div class="res-card"><div class="res-cat">MOBILE</div><div class="res-name"><a href="https://appium.io/" target="_blank">Appium</a></div><div class="res-desc">The standard free/open-source mobile automation framework (iOS + Android) — even a single weekend project mentioning Appium meaningfully expands the roles you qualify for.</div></div>
        <div class="res-card"><div class="res-cat">AI / LLM TESTING</div><div class="res-name"><a href="https://www.promptfoo.dev/" target="_blank">promptfoo</a></div><div class="res-desc">Free, CLI-first tool for testing and red-teaming prompts/LLM outputs — the fastest way to get hands-on with this track's core workflow.</div></div>
        <div class="res-card"><div class="res-cat">AI / LLM TESTING</div><div class="res-name"><a href="https://deepeval.com/" target="_blank">DeepEval</a></div><div class="res-desc">Open-source LLM evaluation framework built to feel like "pytest for LLMs" — the most natural fit if your background is already pytest-based.</div></div>
        <div class="res-card"><div class="res-cat">AI / LLM TESTING</div><div class="res-name"><a href="https://docs.ragas.io/" target="_blank">Ragas</a></div><div class="res-desc">Specializes in evaluating RAG (retrieval-augmented generation) pipelines specifically — pair with DeepEval if your target app is RAG-based.</div></div>
      </div>
    </div>

    <div class="res-section">
      <h3>Core tools by month</h3>
      <div class="res-grid">
        <div class="res-card"><div class="res-cat">MONTH 1-3</div><div class="res-name">Python, Git, Playwright, pytest</div><div class="res-desc">VS Code with the Playwright Test extension + Pylance is the recommended setup.</div></div>
        <div class="res-card"><div class="res-cat">MONTH 4</div><div class="res-name">Postman, requests, pydantic</div><div class="res-desc">Postman for manual/exploratory API work, requests + pydantic for automated schema-validated tests.</div></div>
        <div class="res-card"><div class="res-cat">MONTH 5</div><div class="res-name">SQLite/Postgres, GitHub Actions</div><div class="res-desc">SQLite is enough to practice with — no server setup required.</div></div>
        <div class="res-card"><div class="res-cat">MONTH 6</div><div class="res-name">Docker, AWS Free Tier</div><div class="res-desc">AWS's free tier covers everything needed for the Cloud Practitioner Essentials course.</div></div>
        <div class="res-card"><div class="res-cat">MONTH 7-8</div><div class="res-name">Burp Suite Community, OWASP ZAP</div><div class="res-desc">Both have free editions that are more than sufficient for this roadmap.</div></div>
      </div>
    </div>

    <div class="res-section">
      <h3>If you pick AI / LLM Testing instead of Security</h3>
      <div class="res-card" style="margin-bottom:10px;">
        <div class="res-desc">This field is real but still settling in 2026 — it's organized around three layers, and free open-source tools exist for each: <strong style="color:var(--text);">Evals</strong> (testing whether model output is correct — try <a href="https://github.com/promptfoo/promptfoo" target="_blank">promptfoo</a> or <a href="https://github.com/confident-ai/deepeval" target="_blank">DeepEval</a>, both free and open-source), <strong style="color:var(--text);">Guardrails</strong> (runtime filters catching bad input/output before it reaches a user — prompt injection, PII leaks, off-topic responses), and <strong style="color:var(--text);">Observability</strong> (tracing what an AI agent actually did in production). Your QA instinct for edge cases transfers directly here — the difference is the output is probabilistic, not deterministic, so 'did this pass or fail' becomes a judgment call instead of a simple assert.</div>
      </div>
    </div>

    <div class="res-section">
      <h3>Certifications — the honest verdict</h3>
      <div class="res-card" style="margin-bottom:10px;">
        <div class="res-name">ISTQB Foundation Level (CTFL) <span class="verdict-pill verdict-later">CONSIDER LATER</span></div>
        <div class="res-desc" style="margin-top:6px;">~$200-230, tool-agnostic vocabulary and concepts, no expiry once earned. It carries real weight for enterprise, regulated-industry, and certain regional markets (India, Gulf, Germany — all relevant if you're targeting remote work from Bangladesh). But for product-company and remote-first hiring, a strong GitHub portfolio consistently outweighs it. <strong>Recommendation: skip it during this 12-month plan; revisit afterward only if you're specifically targeting enterprise/regulated employers or Gulf-region remote roles.</strong></div>
      </div>
      <div class="res-card" style="margin-bottom:10px;">
        <div class="res-name">ISTQB CTAL — Test Automation Engineering <span class="verdict-pill verdict-skip">SKIP FOR NOW</span></div>
        <div class="res-desc" style="margin-top:6px;">A genuinely useful credential on test automation architecture — but it requires the Foundation Level first, and your portfolio will demonstrate the same architecture knowledge more convincingly at this career stage. Revisit at senior level, not now.</div>
      </div>
      <div class="res-card" style="margin-bottom:10px;">
        <div class="res-name">AWS Cloud Practitioner <span class="verdict-pill verdict-later">OPTIONAL</span></div>
        <div class="res-desc" style="margin-top:6px;">The free Skill Builder training (Month 6) gives you the vocabulary either way. The ~$100 exam itself is a nice-to-have resume line, not a requirement — only sit it if you finish Month 6 early and want a concrete credential.</div>
      </div>
      <div class="res-card">
        <div class="res-name">Postman API Fundamentals Student Expert <span class="verdict-pill verdict-yes">FREE — WHY NOT</span></div>
        <div class="res-desc" style="margin-top:6px;">Free badge, takes a few hours, reinforces Month 4 directly. Low cost, mild benefit — worth doing if you have a spare afternoon.</div>
      </div>
    </div>

    <div class="res-section">
      <h3>AI-assisted testing awareness (2026 interview must-know)</h3>
      <div class="info-box">
        <p>You don't need deep expertise here, just informed familiarity — interviewers in 2026 routinely ask "how do you use AI in your testing workflow" as a throwaway question, and having a real answer (not a blank stare) is the whole bar.</p>
      </div>
      <div class="res-grid">
        <div class="res-card"><div class="res-cat">CODE ASSISTANT</div><div class="res-name">GitHub Copilot / Claude / ChatGPT for test authoring</div><div class="res-desc">Using an AI assistant to scaffold test cases, generate test data, or draft a first-pass POM class is now a normal, expected workflow — be ready to describe how you use one, and where you still review its output by hand.</div></div>
        <div class="res-card"><div class="res-cat">SELF-HEALING LOCATORS</div><div class="res-name">Playwright's AI-assisted codegen</div><div class="res-desc">You already used <code>playwright codegen</code> in Month 2, Week 3 — mention that experience directly; it's the same underlying idea interviewers are probing for.</div></div>
        <div class="res-card"><div class="res-cat">AGENTIC BROWSER CONTROL</div><div class="res-name"><a href="https://github.com/microsoft/playwright-mcp" target="_blank">Playwright MCP</a></div><div class="res-desc">Microsoft's official, free/open-source MCP server (<code>npx @playwright/mcp@latest</code>) — lets an AI agent (Claude, GPT, etc.) drive a real browser through Playwright. This is the concrete 2026 answer if an interviewer asks how AI agents fit into browser test automation specifically.</div></div>
        <div class="res-card"><div class="res-cat">TEST DATA</div><div class="res-name">Prompting an LLM for edge-case test data</div><div class="res-desc">Generating boundary values, malformed inputs, or realistic fake records via a quick prompt is a fast, legitimate technique — worth having one concrete example ready to describe.</div></div>
      </div>
    </div>

    <div class="res-section">
      <h3>Glossary</h3>
      <p class="sheet-desc" style="margin-top:-4px;">Every acronym and term used across the 48 weeks, defined in one place — see the <strong>Glossary</strong> page in the sidebar for the full searchable list. Useful as a fast pre-interview refresher in Month 11.</p>
    </div>


      <div class="res-card" style="margin-bottom:14px;">
        <div class="res-name" style="margin-bottom:8px;">Use strong action verbs — avoid weak ones</div>
        <div>
          <span class="verb-pill">Built</span><span class="verb-pill">Automated</span><span class="verb-pill">Architected</span><span class="verb-pill">Reduced</span><span class="verb-pill">Integrated</span><span class="verb-pill">Designed</span><span class="verb-pill">Implemented</span><span class="verb-pill">Established</span>
        </div>
        <div style="margin-top:6px;">
          <span class="verb-pill weak">Responsible for</span><span class="verb-pill weak">Helped</span><span class="verb-pill weak">Assisted</span><span class="verb-pill weak">Participated in</span><span class="verb-pill weak">Worked on</span>
        </div>
      </div>
      <div class="res-card" style="margin-bottom:14px;">
        <div class="res-name" style="margin-bottom:8px;">The bullet formula: Action verb + what you built + tool + measurable impact</div>
        <div class="bullet-example">"Built a Playwright automation framework in Python covering 40+ test cases across 5 user journeys, integrated with GitHub Actions — cut full regression time from 8 hours (manual) to 45 minutes."</div>
        <div class="bullet-example">"Developed an API test suite using Python Requests and pytest, covering 25 endpoints with JSON schema validation — caught 3 breaking changes before they reached production."</div>
        <div class="bullet-example">"Automated dependency and OWASP ZAP security scans directly into the CI pipeline, surfacing vulnerabilities before every release instead of during ad-hoc audits."</div>
        <div style="font-size:12.5px; color:var(--text-dim); margin-top:8px;">Notice each one names the tool, states what was built, and ends with a number or outcome — never just a task description. Your Month 3, 4, and 7-9 deliverables are written specifically so you'll have real numbers to slot into this exact formula.</div>
      </div>
      <div class="res-card">
        <div class="res-name" style="margin-bottom:6px;">Framing your current QA + teaching background</div>
        <div class="res-desc">Don't hide these years — reframe them. "4 years as a QA Engineer, including hands-on ownership of manual and regression testing" is a strength, not a gap, when it sits above your new automation skills rather than instead of them. Your AIUB lecturer line becomes: "Trained and mentored CSE students in software testing principles as a part-time lecturer" — this signals communication skill that most SDET candidates simply don't have on paper.</div>
      </div>
    </div>

    <div class="res-section">
      <h3>Interview prep & communities</h3>
      <div class="res-grid">
        <div class="res-card"><div class="res-cat">INTERVIEW PREP</div><div class="res-name"><a href="https://www.navtutorial.com/" target="_blank">navtutorial.com</a></div><div class="res-desc">Free, comprehensive SDET tutorial hub with a built-in 12-month roadmap, company-wise interview questions, and a 30-day prep plan.</div></div>
        <div class="res-card"><div class="res-cat">CODING PRACTICE</div><div class="res-name"><a href="https://leetcode.com/" target="_blank">LeetCode (free tier)</a></div><div class="res-desc">Filter to Easy + Array/String/Hash Table tags — that combination covers most SDET coding rounds.</div></div>
        <div class="res-card"><div class="res-cat">COMMUNITY</div><div class="res-name"><a href="https://www.ministryoftesting.com/" target="_blank">Ministry of Testing</a></div><div class="res-desc">The largest dedicated QA/testing community — free to join, active discussion, job postings.</div></div>
        <div class="res-card"><div class="res-cat">COMMUNITY</div><div class="res-name">r/QualityAssurance, r/ExperiencedDevs</div><div class="res-desc">Useful for real-world sanity checks on interview experiences and salary data.</div></div>
        <div class="res-card"><div class="res-cat">FREE COURSES</div><div class="res-name"><a href="https://testautomationu.applitools.com/" target="_blank">Test Automation University</a></div><div class="res-desc">Free, well-produced courses by Applitools covering Playwright, API testing, and more — a good supplement if a particular week needs reinforcing.</div></div>
      </div>
    </div>

    <div class="res-section">
      <h3>Common pitfalls (from real SDET hiring feedback)</h3>
      <div class="res-card" style="margin-bottom:10px;"><div class="res-desc"><strong style="color:var(--text);">Resumes that still read like a tester, not an engineer.</strong> Current hiring guidance is blunt about this: if your resume leads with test-case design and manual execution, it gets routed to junior pipelines regardless of years of experience. Lead with what you built.</div></div>
      <div class="res-card" style="margin-bottom:10px;"><div class="res-desc"><strong style="color:var(--text);">Treating AI testing awareness as optional.</strong> 2026 interviews increasingly probe familiarity with AI-assisted testing tools (Copilot, Playwright's own AI features) — you don't need deep expertise, just informed familiarity.</div></div>
      <div class="res-card" style="margin-bottom:10px;"><div class="res-desc"><strong style="color:var(--text);">Skipping performance and mobile entirely.</strong> Even basic JMeter or Appium exposure meaningfully expands the roles you qualify for — you don't need to specialize in either to mention them credibly.</div></div>
      <div class="res-card"><div class="res-desc"><strong style="color:var(--text);">Weak, unreproducible bug/finding reports.</strong> SDETs are paid for clarity, not just for finding problems. Every deliverable in this roadmap that involves writing something up is training this exact muscle — don't skip those.</div></div>
    </div>
`;

const GLOSSARY_TERMS = [
  {term:"SDET", def:"Software Development Engineer in Test — a tester who writes production-quality code to build and maintain automation, not just execute manual test cases.", cat:"Role"},
  {term:"QA vs SDET", def:"QA typically focuses on manual/exploratory testing and test-case design. SDET adds software engineering skills — automation frameworks, CI/CD, infrastructure — on top of that testing instinct.", cat:"Role"},
  {term:"POM (Page Object Model)", def:"A design pattern that separates 'what a page can do' (locators + actions, in a class) from 'what the test asserts' — keeps tests readable and locators in one maintainable place.", cat:"Automation"},
  {term:"Locator", def:"A strategy for finding an element on a page (by role, text, label, CSS, XPath). Playwright's get_by_role/get_by_text style locators are preferred because they survive UI changes better than raw CSS/XPath.", cat:"Automation"},
  {term:"Web-first assertion", def:"An assertion (like Playwright's expect()) that automatically retries until it passes or times out, instead of checking once and failing immediately — the main reason well-written Playwright tests avoid flakiness.", cat:"Automation"},
  {term:"Flaky test", def:"A test that sometimes passes and sometimes fails with no code change — usually caused by timing issues, hard waits (time.sleep), or unstable test data/environment.", cat:"Automation"},
  {term:"Trace Viewer", def:"Playwright's built-in debugging tool — records a full timeline, DOM snapshots, and network activity for a test run so you can see exactly why it failed, without reproducing it locally.", cat:"Automation"},
  {term:"Test pyramid", def:"A model for balancing test types: many fast, cheap unit/API tests at the base, fewer slower UI/end-to-end tests at the top — guides what you test at which layer.", cat:"Strategy"},
  {term:"Fixture (pytest)", def:"Reusable setup/teardown code shared across tests, declared with @pytest.fixture and often centralized in conftest.py to avoid duplicating setup in every test.", cat:"Automation"},
  {term:"Parametrize", def:"A pytest feature (@pytest.mark.parametrize) that runs the same test function against multiple sets of input data, instead of writing near-duplicate tests by hand.", cat:"Automation"},
  {term:"Schema validation", def:"Verifying that an API response's structure/types match an expected schema (via pydantic or jsonschema), not just checking individual field values.", cat:"API"},
  {term:"BOLA (Broken Object Level Authorization)", def:"An API vulnerability where a user can access or modify another user's data just by changing an ID in the request — the single most common finding in API security testing (OWASP API Top 10 #1).", cat:"Security"},
  {term:"OWASP Top 10", def:"The industry-standard list of the ten most critical web application security risks, maintained by the Open Web Application Security Project — the baseline vocabulary for security testing.", cat:"Security"},
  {term:"Burp Suite", def:"The industry-standard tool for manual web security testing — intercepts and lets you modify HTTP requests in transit (via its Proxy and Repeater tools).", cat:"Security"},
  {term:"OWASP ZAP", def:"A free, open-source automated web security scanner — commonly wired into CI pipelines to catch vulnerabilities on every build, complementing manual Burp Suite testing.", cat:"Security"},
  {term:"CI/CD", def:"Continuous Integration / Continuous Delivery — automatically building, testing, and (for CD) deploying code on every change, instead of doing it manually. GitHub Actions is the tool used throughout this roadmap.", cat:"Infra"},
  {term:"Sharding", def:"Splitting a large test suite across multiple parallel machines/workers in CI so the whole suite finishes faster than running it sequentially on one machine.", cat:"Infra"},
  {term:"pytest-xdist", def:"A pytest plugin that runs tests in parallel across multiple CPU cores/processes, cutting total suite runtime.", cat:"Infra"},
  {term:"Network mocking", def:"Intercepting and faking an HTTP request/response (via Playwright's page.route()) so a UI test doesn't depend on a real backend being up, fast, or in a specific state.", cat:"Automation"},
  {term:"Allure report", def:"A popular test-reporting tool that turns raw pytest results into a rich, shareable HTML report with history, categories, and attachments — commonly published as a CI artifact.", cat:"Infra"},
  {term:"RAG (Retrieval-Augmented Generation)", def:"An LLM architecture pattern where the model retrieves relevant documents/data before generating a response — the specific thing tools like Ragas are built to evaluate.", cat:"AI/LLM"},
  {term:"LLM-as-judge", def:"Using one LLM to grade the output of another (e.g. in promptfoo/DeepEval) — a common but imperfect technique for scoring non-deterministic AI outputs at scale.", cat:"AI/LLM"},
  {term:"Playwright MCP", def:"Microsoft's official MCP (Model Context Protocol) server that exposes Playwright's browser controls as tools an AI agent can call — lets an LLM drive a real browser (click, navigate, fill forms) instead of just generating test code.", cat:"AI/LLM"},
  {term:"STAR method", def:"Situation, Task, Action, Result — a structure for answering behavioral interview questions with a concrete story instead of a vague generality.", cat:"Interview"}
];
