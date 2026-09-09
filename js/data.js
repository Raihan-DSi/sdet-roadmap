const MONTHS = [
{
  title:"Programming Foundations",
  short:"Python + Git",
  desc:"Before any test tool matters, you need to write real code without hesitating. This month builds that baseline — everything after this assumes you have it solid.",
  weeks:[
    { title:"Python syntax, data types & control flow", time:"6-8 hrs", why:"Every automation script you'll ever write is built from these primitives — skipping ahead here just means debugging syntax later instead of logic.",
      learn:["Variables, numbers, strings, booleans, type conversion","if / elif / else, for and while loops, break / continue","Lists, tuples, dictionaries, sets — when to reach for each","String methods and f-string formatting"],
      resources:[{t:"Automate the Boring Stuff — ch.1-4 (free)", u:"https://automatetheboringstuff.com/"},{t:"Python.org official tutorial, sections 3-5", u:"https://docs.python.org/3/tutorial/"},{t:"Exercism Python track (free, mentored)", u:"https://exercism.org/tracks/python"}],
      deliverable:"Solve 10 small problems (FizzBuzz, string reversal, palindrome check, word-frequency counter, etc.) as plain .py scripts. Push to a new GitHub repo named python-fundamentals." },
    { title:"Functions, file I/O & error handling", time:"6-8 hrs", why:"Automation frameworks live or die on clean error handling — a script that crashes on the first unexpected popup is worse than no automation at all.",
      learn:["Defining functions, parameters, default args, return values","Reading/writing files with context managers (with open(...) as f)","try / except / finally, raising custom exceptions","List, dict, and set comprehensions"],
      resources:[{t:"Automate the Boring Stuff — ch.6, 8-9", u:"https://automatetheboringstuff.com/"},{t:"Real Python — Python Exceptions: An Introduction", u:"https://realpython.com/python-exceptions/"}],
      deliverable:"Build a command-line to-do list app that reads/writes tasks to a text file, with proper error handling for a missing or corrupted file." },
    { title:"Object-Oriented Python", time:"6-8 hrs", why:"Page Object Model — the pattern your entire framework will be built on in Month 3 — is just OOP applied to web pages. Get comfortable with classes now and POM will feel obvious later.",
      learn:["Classes, objects, __init__, instance vs. class attributes","Inheritance and method overriding","Magic methods: __str__, __repr__, __eq__","Composition vs. inheritance — when to use which"],
      resources:[{t:"Real Python — OOP in Python 3", u:"https://realpython.com/python3-object-oriented-programming/"},{t:"Corey Schafer's OOP YouTube series", u:"https://www.youtube.com/results?search_query=corey+schafer+python+oop"}],
      deliverable:"Refactor your to-do app using classes (Task, TaskList). Keep this repo — you'll recognize the exact same shape when you build your first Page Object in Month 3." },
    { title:"Git & GitHub for solo and team workflows", time:"5-6 hrs", why:"Your GitHub profile is the resume that matters most for this transition. A hiring manager reads your README before your CV.",
      learn:["init, clone, add, commit, push, pull, status, log","Branching, merging, and resolving merge conflicts","Writing a genuinely useful README.md and .gitignore","Opening and reviewing a pull request end to end"],
      resources:[{t:"Git Immersion (free, interactive)", u:"https://gitimmersion.com/"},{t:"GitHub's official Hello World guide", u:"https://docs.github.com/en/get-started/quickstart/hello-world"}],
      deliverable:"Push all Month 1 code to GitHub across clean, meaningfully-messaged commits. Write a README for python-fundamentals that explains what each script does, not just how to run it." }
  ]
},
{
  title:"Testing Fundamentals & Playwright Basics",
  short:"Pytest + first automation",
  desc:"You already understand testing conceptually from QA — now you translate that instinct into pytest and write your first real Playwright scripts.",
  weeks:[
    { title:"Pytest fundamentals", time:"6-8 hrs", why:"Pytest is the test runner underneath almost every Python SDET framework — fluency here is non-negotiable, not optional tooling.",
      learn:["Writing test functions, assert statements, test discovery rules","Running tests via CLI: pytest -v, -k, -x, --lf","Organizing test files, naming conventions that scale"],
      resources:[{t:"pytest docs — Get Started + Basic patterns", u:"https://docs.pytest.org/en/stable/getting-started.html"},{t:"Real Python — Effective Python Testing With Pytest", u:"https://realpython.com/pytest-python-testing/"}],
      deliverable:"Write a pytest suite of 15+ tests for a small function library you build yourself (a calculator or string-utils module)." },
    { title:"Pytest fixtures & parametrization", time:"6-8 hrs", why:"Fixtures are how real frameworks avoid repeating setup code in every test — this is the difference between 'scripts' and an actual framework.",
      learn:["@pytest.fixture and fixture scopes (function, module, session)","conftest.py — sharing fixtures across multiple files","@pytest.mark.parametrize for data-driven tests","Markers for grouping, skipping, and tagging tests (e.g. @smoke, @regression)"],
      resources:[{t:"pytest docs — Fixtures", u:"https://docs.pytest.org/en/stable/how-to/fixtures.html"},{t:"pytest docs — Parametrizing tests", u:"https://docs.pytest.org/en/stable/how-to/parametrize.html"}],
      deliverable:"Rewrite your Week 5 suite using fixtures and parametrize to eliminate all duplicated setup code." },
    { title:"Playwright installation & first script", time:"6-8 hrs", why:"Playwright is overtaking Selenium in 2026 hiring specifically because of what you'll learn this week — its auto-waiting model eliminates most of the flakiness that plagues older frameworks.",
      learn:["Installing Playwright for Python + browser binaries","sync_api basics: launch, new_page, goto, close","Locator strategies: get_by_role, get_by_text, get_by_label — prefer these over raw CSS/XPath since they survive UI changes better","Understanding Playwright's auto-waiting model (why you should almost never need time.sleep())"],
      resources:[{t:"playwright.dev/python — Getting Started", u:"https://playwright.dev/python/docs/intro"},{t:"playwright codegen — record a flow and read the generated code", u:"https://playwright.dev/python/docs/codegen"}],
      deliverable:"Write a script that opens saucedemo.com, logs in, and prints the page title. Then run 'playwright codegen' on the same flow and compare your code to the generated version." },
    { title:"Core interactions & web-first assertions", time:"7-9 hrs", why:"'Web-first' assertions (expect(...)) retry automatically instead of failing on the first check — this single habit prevents most of the flaky tests that make automation suites untrustworthy.",
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
    { title:"Advanced locators, waits & the Trace Viewer", time:"7-9 hrs", why:"The Trace Viewer is what turns 'this test fails in CI but works on my machine' from a nightmare into a five-minute fix — it gives you a full timeline, DOM snapshots, and network activity for every action.",
      learn:["Handling dynamic IDs and unstable selectors","Condition-based waiting vs. hard waits — deleting every time.sleep()","iframes, alerts/dialogs, file upload and download handling","Recording and reading traces: trace: 'on-first-retry' in config, then opening the trace viewer on a failure"],
      resources:[{t:"playwright.dev — Trace Viewer", u:"https://playwright.dev/python/docs/trace-viewer-intro"},{t:"playwright.dev — Locators deep dive", u:"https://playwright.dev/python/docs/locators"}],
      deliverable:"Extend your suite to handle one genuinely tricky element (a modal, iframe, or file upload). Deliberately break one test, capture its trace, and practice reading it." },
    { title:"Page Object Model design", time:"7-9 hrs", why:"POM is the single most-asked-about design pattern in SDET interviews — 'walk me through your framework' almost always means 'show me you understand POM'.",
      learn:["Why POM exists: separating 'what the page can do' from 'what the test asserts'","One class per page, exposing methods, not raw selectors","Keeping locators private to their page class","test.step() to wrap POM methods into named, readable steps that show up cleanly in the Trace Viewer"],
      resources:[{t:"playwright.dev — Page Object Models guide", u:"https://playwright.dev/python/docs/pom"},{t:"Martin Fowler — PageObject pattern", u:"https://martinfowler.com/bliki/PageObject.html"}],
      deliverable:"Refactor your Month 2 tests into a pages/ folder with one class per page (LoginPage, InventoryPage, CartPage), each method wrapped in test.step()." },
    { title:"Network mocking, config & parallel execution", time:"7-9 hrs", why:"Network mocking means your UI tests stop depending on a live backend being up, fast, and in the right state — this is what makes a suite reliable enough to trust in CI.",
      learn:["page.route() to intercept, modify, or mock any HTTP request","pytest-playwright's built-in page/browser/context fixtures","pytest-xdist for parallel test runs, and sharding for splitting suites across CI machines","Managing environment config (base URLs, credentials) via env vars, never hardcoded"],
      resources:[{t:"playwright.dev — Network / Mock APIs", u:"https://playwright.dev/python/docs/mock"},{t:"pytest-xdist docs", u:"https://pytest-xdist.readthedocs.io/"}],
      deliverable:"Add a config setup so your suite runs against dev/staging by changing one variable. Mock one flaky or slow API call so that test no longer depends on the live backend." },
    { title:"Portfolio Project #1: full user journey", time:"8-10 hrs", why:"This is the first artifact a recruiter or hiring manager will actually open — treat the README as seriously as the code.",
      learn:["Combining everything into one coherent, config-driven framework","Writing a README that explains architecture decisions, not just 'how to run this'","Adding a project structure diagram or folder tree"],
      resources:[{t:"Search 'playwright python framework' on GitHub, sort by stars, for README style", u:"https://github.com/search?q=playwright+python+framework&type=repositories&s=stars"}],
      deliverable:"Ship a complete checkout-flow automation project (10+ tests, full POM, config-driven, at least one mocked network call) as a standalone GitHub repo with a genuinely thorough README." }
  ]
},
{
  title:"API Testing",
  short:"requests, pytest, schema validation",
  desc:"Modern SDET work lives as much in APIs as in the browser. This is consistently cited as the single highest-leverage skill for the QA-to-SDET jump.",
  weeks:[
    { title:"HTTP & REST fundamentals", time:"6-8 hrs", why:"You cannot automate what you don't understand manually first — a week of hands-on Postman work makes every automated test afterward click faster.",
      learn:["HTTP methods, status codes, headers, request/response bodies","REST principles and resource-based URL design","Manual API testing in Postman: collections, environments, variables"],
      resources:[{t:"MDN Web Docs — HTTP overview", u:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview"},{t:"Postman — Getting Started learning path", u:"https://learning.postman.com/docs/getting-started/overview/"}],
      deliverable:"Build a Postman collection of 10+ requests against a free public API (reqres.in or jsonplaceholder.typicode.com) covering GET/POST/PUT/DELETE." },
    { title:"API automation with Python", time:"7-9 hrs", why:"Recruiters specifically screen for 'can this person automate API tests, not just click through Postman' — this week is exactly that line.",
      learn:["The requests library: get, post, put, delete, headers, params","Asserting on status codes, response bodies, and headers in pytest","Validating response schema with pydantic or jsonschema"],
      resources:[{t:"Real Python — Python's Requests Library", u:"https://realpython.com/python-requests/"},{t:"pydantic docs — basic models", u:"https://docs.pydantic.dev/latest/"}],
      deliverable:"Convert your Postman collection into an automated pytest suite using requests, with schema validation on at least 3 endpoints." },
    { title:"Authentication & test data management", time:"6-8 hrs", why:"Almost every real-world API you'll test in a job requires auth — practicing this now avoids a nasty surprise in your first week on the job.",
      learn:["API keys, bearer tokens, OAuth2 basics","Setting up and tearing down test data via API calls (faster and more reliable than doing it through the UI)","Basic mocking with the responses library for isolated, network-independent tests"],
      resources:[{t:"Auth0 — OAuth2 in plain English", u:"https://auth0.com/intro-to-iam/what-is-oauth-2"},{t:"responses library docs", u:"https://github.com/getsentry/responses"},{t:"restful-booker practice API", u:"https://restful-booker.herokuapp.com/apidoc/index.html"}],
      deliverable:"Add an authenticated flow to your API suite: a login endpoint returning a token, used in subsequent requests." },
    { title:"Combining UI + API in one framework", time:"7-9 hrs", why:"This is the exact skill that separates SDETs from testers who 'only know Selenium' — using APIs to set up state means your UI tests get faster and less brittle at the same time.",
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
    { title:"SQL fundamentals", time:"5-7 hrs", why:"SQL comes up in nearly every SDET interview, and it's the fastest way to verify a bug actually happened at the data layer, not just visually.",
      learn:["SELECT, WHERE, ORDER BY, LIMIT","JOIN types: inner, left, right, full","GROUP BY and aggregate functions (COUNT, SUM, AVG)"],
      resources:[{t:"SQLZoo (free, interactive)", u:"https://sqlzoo.net/"},{t:"Mode Analytics SQL tutorial", u:"https://mode.com/sql-tutorial/"}],
      deliverable:"Complete SQLZoo's core tutorials and solve 15+ practice queries on your own." },
    { title:"SQL for testers", time:"6-8 hrs", why:"A test that only checks the UI can pass while the database is silently wrong — this week closes that gap.",
      learn:["Verifying backend state after a UI or API action","Connecting Python to a database (sqlite3, or psycopg2 for Postgres)","Writing assertions against query results directly in pytest"],
      resources:[{t:"Python docs — sqlite3 module", u:"https://docs.python.org/3/library/sqlite3.html"},{t:"psycopg2 basic tutorial", u:"https://www.psycopg.org/docs/usage.html"}],
      deliverable:"Add a DB-verification test to your framework: perform an action via UI/API, then confirm the resulting row exists via a direct SQL query." },
    { title:"Team Git workflows + CI fundamentals", time:"6-8 hrs", why:"Every company you interview with runs some CI pipeline — being able to say 'I built one from scratch' beats 'I've used one' every time.",
      learn:["Branching strategies (trunk-based, feature branches), PR review etiquette","YAML basics for pipeline configuration","GitHub Actions concepts: workflows, jobs, steps, triggers"],
      resources:[{t:"GitHub Actions — Quickstart", u:"https://docs.github.com/en/actions/quickstart"}],
      deliverable:"Write a basic .github/workflows/tests.yml that checks out code and installs dependencies. Don't run tests yet — get the pipeline mechanics right first." },
    { title:"Automated CI pipeline + reporting", time:"7-9 hrs", why:"'My tests run automatically on every push and produce a shareable report' is one of the strongest single sentences you can say in an SDET interview.",
      learn:["Running your full pytest + Playwright suite inside GitHub Actions","Generating HTML test reports (pytest-html or Allure)","Publishing reports as downloadable build artifacts","Configuring retries for CI runs (retries: 2 in CI, 0 locally) — a real 2026 best practice, not a workaround"],
      resources:[{t:"pytest-html plugin docs", u:"https://pytest-html.readthedocs.io/"},{t:"Allure Framework docs", u:"https://allurereport.org/docs/"}],
      deliverable:"Get your framework auto-running on every push, producing a downloadable HTML report with retries configured for CI." }
  ]
},
{
  title:"Docker & Cloud Fundamentals",
  short:"Containers + AWS basics",
  desc:"Enough infrastructure literacy to run tests anywhere and speak credibly about deployment in interviews — not a full DevOps deep-dive.",
  weeks:[
    { title:"Docker basics", time:"6-8 hrs", why:"'Works on my machine' is the single most common excuse in software — containerizing your framework removes the excuse entirely.",
      learn:["Images vs. containers, Dockerfile syntax","Building and running a custom image","docker-compose for multi-service setups"],
      resources:[{t:"Docker — Get Started guide", u:"https://docs.docker.com/get-started/"}],
      deliverable:"Write a Dockerfile that containerizes your test framework so it runs identically on any machine." },
    { title:"Running Playwright in containers", time:"5-7 hrs", why:"Most real CI pipelines run tests inside containers by default — this week connects your Month 5 pipeline to how it actually works in industry.",
      learn:["Official Playwright Docker images","Running headless browsers inside CI containers","Common containerized-browser debugging issues"],
      resources:[{t:"playwright.dev — Docker", u:"https://playwright.dev/python/docs/docker"}],
      deliverable:"Update your GitHub Actions pipeline to run tests inside a Playwright Docker container." },
    { title:"Cloud fundamentals (AWS)", time:"6-8 hrs", why:"You don't need to be a cloud engineer — you need enough vocabulary that a technical interview about 'where does this get deployed' doesn't stall you out.",
      learn:["Core services: EC2, S3, IAM — what each is for, in plain terms","How a staging environment typically gets hosted","Enough vocabulary to discuss deployment architecture credibly in interviews"],
      resources:[{t:"AWS Skill Builder — Cloud Practitioner Essentials (free)", u:"https://skillbuilder.aws/"}],
      deliverable:"Complete AWS's free Cloud Practitioner Essentials course. The certification exam itself is optional — see the Resources page for the honest verdict on whether it's worth the $100." },
    { title:"Logging, reporting & mid-program checkpoint", time:"6-8 hrs", why:"Halfway through the year is exactly when momentum quietly dies — this checkpoint exists to force a look back before you keep going.",
      learn:["Structured logging in test frameworks","Allure report customization (categories, attachments, history trends)","Slack or email notifications on CI failure"],
      resources:[{t:"Allure Framework — advanced reporting docs", u:"https://allurereport.org/docs/"}],
      deliverable:"Add Slack or email notification on pipeline failure. Then stop and review: look back at your 3 portfolio repos, and update a running resume draft with what you've actually built so far." }
  ]
},
{
  title:"Specialization — Foundations",
  short:"Security testing (default track)",
  desc:"Time to differentiate. See the track comparison below before committing — Security is the default recommendation for you, but Performance and AI/LLM Testing are equally valid if they fit you better.",
  trackComparison:true,
  weeks:[
    { title:"OWASP Top 10 — conceptual foundation", time:"6-8 hrs", why:"You cannot test for vulnerabilities you can't name — this week is pure vocabulary and mental models before any tooling.",
      learn:["Injection (SQL, command), broken authentication, XSS","Broken access control, security misconfiguration","Insecure deserialization, vulnerable and outdated components"],
      resources:[{t:"OWASP Top 10 official project page", u:"https://owasp.org/www-project-top-ten/"}],
      deliverable:"Write a one-paragraph, plain-English explanation of each of the 10 categories in your own words — this becomes real interview prep material later." },
    { title:"Burp Suite fundamentals", time:"7-9 hrs", why:"Burp Suite is the industry-standard tool for manual security testing — PortSwigger's own free academy is the single best resource in this entire roadmap for one topic.",
      learn:["Intercepting and modifying requests with the Proxy","Repeater for manual request manipulation","Intruder for basic automated fuzzing"],
      resources:[{t:"PortSwigger Web Security Academy (free)", u:"https://portswigger.net/web-security"},{t:"OWASP Juice Shop (practice target)", u:"https://owasp.org/www-project-juice-shop/"}],
      deliverable:"Install OWASP Juice Shop (a deliberately vulnerable practice app) locally, and use Burp to find and document 2 vulnerabilities." },
    { title:"API security testing", time:"7-9 hrs", why:"API security is the fastest-growing sub-specialty in this space right now — most apps' real attack surface today is the API layer, not the UI.",
      learn:["Broken Object Level Authorization (BOLA) testing","Rate-limiting and input validation checks","OWASP ZAP automated baseline scans"],
      resources:[{t:"OWASP API Security Top 10", u:"https://owasp.org/www-project-api-security/"},{t:"OWASP ZAP — Getting Started", u:"https://www.zaproxy.org/getting-started/"}],
      deliverable:"Run a ZAP baseline scan against a test API and document 3 findings with severity and a suggested fix for each." },
    { title:"Security checks in CI", time:"6-8 hrs", why:"Anyone can run a manual scan once — automating it into CI is what proves you think like an engineer, not just a one-time auditor.",
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
    { title:"Structured vulnerability assessment", time:"8-10 hrs", why:"A messy list of 'found some bugs' doesn't read as professional — a structured report is what makes this project interview-ready.",
      learn:["Writing a proper vulnerability report: severity, reproduction steps, impact, fix","Prioritizing findings the way a real security review would"],
      resources:[{t:"PortSwigger Academy — intermediate modules", u:"https://portswigger.net/web-security/all-labs"}],
      deliverable:"Perform a full assessment of OWASP Juice Shop, documenting 8-10 findings in a structured report format." },
    { title:"Secure API design review", time:"6-8 hrs", why:"This is the exact skill that separates a 'security-aware SDET' from a dedicated pentester — you're reviewing design, not just running scans.",
      learn:["Reviewing an API's auth flow for weaknesses","Testing for excessive data exposure and mass assignment"],
      resources:[{t:"OWASP API Security Top 10 — injection & auth deep dive", u:"https://owasp.org/www-project-api-security/"}],
      deliverable:"Add API-specific findings to your assessment report from Week 29." },
    { title:"Capstone specialization project", time:"8-10 hrs", why:"Automated, repeatable security checks are worth far more to an employer than a one-time manual report — this is what makes the skill durable and demonstrable.",
      learn:["Combining your automation framework with your security testing skill","Automating repeatable security checks instead of only manual findings"],
      resources:[{t:"Combine tools from Weeks 26-28 into one repeatable script suite", u:"#"}],
      deliverable:"Build a 'security regression suite' repo: automated ZAP scan + a handful of scripted BOLA/auth checks against a test app, runnable via one command." },
    { title:"Write it up", time:"5-7 hrs", why:"A published write-up does double duty: it's a portfolio piece AND practice for explaining technical work clearly, which is exactly what interviews test.",
      learn:["Turning technical work into a readable case study","Framing findings for both technical and non-technical audiences"],
      resources:[{t:"HackerOne Hacktivity — public bug bounty writeups", u:"https://hackerone.com/hacktivity"}],
      deliverable:"Publish a short write-up (blog post or LinkedIn article) walking through your security assessment project and what you learned." }
  ]
},
{
  title:"Capstone Framework",
  short:"Everything combined",
  desc:"One comprehensive project that proves every skill from Months 1-8 in a single, cohesive, well-documented framework.",
  weeks:[
    { title:"Architecture & planning", time:"6-8 hrs", why:"Planning before coding is itself a skill interviewers probe for — a one-page architecture doc shows judgment, not just typing speed.",
      learn:["Choosing a realistic target app (an open demo e-commerce or booking site)","Planning framework structure: ui/, api/, db/, security/, config/, ci/"],
      resources:[{t:"Review your own Month 3-7 repos as reference material", u:"#"}],
      deliverable:"Write an architecture doc (even one page) before writing any code — this itself becomes a strong interview artifact." },
    { title:"Build: UI + API layers", time:"9-11 hrs", why:"This week is the actual proof that you can build something production-shaped, not just follow a tutorial.",
      learn:["Applying POM and API-client patterns cleanly together","Sharing config and fixtures across UI and API tests"],
      resources:[{t:"Your own Month 3 & 4 code as a base", u:"#"}],
      deliverable:"Build out 15+ UI tests and 15+ API tests in the new unified framework." },
    { title:"Build: DB validation + CI/CD + Docker", time:"9-11 hrs", why:"Wiring every previous month's skill into one pipeline is exactly the kind of system-level thinking senior SDETs are evaluated on.",
      learn:["Wiring together everything from Months 5-6 into one pipeline","Making the whole suite runnable in one command, locally or in CI"],
      resources:[{t:"Your own Month 5 & 6 pipelines as a base", u:"#"}],
      deliverable:"Get the full suite running in GitHub Actions inside Docker, with an Allure report published on every run." },
    { title:"Build: specialization layer + polish", time:"8-10 hrs", why:"A polished final pass is what separates 'a project that works' from 'a project a hiring manager would actually want to hire the author of.'",
      learn:["Integrating your security regression suite into the same pipeline","Final code cleanup: consistent naming, removing dead code, comments where they genuinely help"],
      resources:[{t:"Self-review pass as if you were interviewing the code", u:"#"}],
      deliverable:"Ship the finished capstone with a thorough README (architecture diagram, how to run it, what it demonstrates)." }
  ]
},
{
  title:"Portfolio & Public Presence",
  short:"Resume, GitHub, LinkedIn",
  desc:"The best framework in the world doesn't get you hired if no one can find or understand it. This month is entirely about visibility.",
  weeks:[
    { title:"Write the capstone case study", time:"5-7 hrs", why:"Recruiters and hiring managers skim — a case study with visuals gets read in 60 seconds where a wall of code never gets opened.",
      learn:["Explaining design decisions, not just listing features","Including screenshots or a short screen-recording GIF of a test run"],
      resources:[{t:"Re-read your Week 32 write-up for tone consistency", u:"#"}],
      deliverable:"Publish a detailed blog post or LinkedIn article on your capstone project's design and the problems it solves." },
    { title:"Polish your GitHub profile", time:"4-6 hrs", why:"Recruiters searching GitHub for SDET candidates decide whether to keep reading within seconds of landing on your profile.",
      learn:["Pinning your best 3-4 repos","Writing a profile README","Keeping commit history clean and genuinely readable"],
      resources:[{t:"Browse well-regarded SDET GitHub profiles for pinned-repo style", u:"https://github.com/search?q=SDET+playwright&type=users"}],
      deliverable:"Pin your capstone + Month 3 + Month 7/8 repos. Make sure every pinned repo has a genuinely good README." },
    { title:"Resume rewrite", time:"6-8 hrs", why:"The single highest-leverage rewrite you can make: leading with 'built and shipped X' instead of 'responsible for testing Y'. See the Resume Toolkit on the Resources page for exact bullet formulas and action verbs.",
      learn:["Reframing QA experience in automation/framework language","Leading bullets with impact and tooling, not task descriptions","Using strong action verbs (Built, Automated, Reduced, Architected) instead of weak ones (Responsible for, Helped, Assisted)"],
      resources:[{t:"See Resources page → Resume Toolkit for bullet formulas", u:"#"}],
      deliverable:"Produce a resume version that leads with your SDET skills and capstone project, with your QA + teaching background as supporting context. Get at least one outside review." },
    { title:"LinkedIn & community presence", time:"4-6 hrs", why:"Visibility compounds — a recruiter who's seen your name twice before your application is far more likely to open it.",
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
    { title:"SDET interview theory", time:"6-8 hrs", why:"'Walk me through your framework' is asked in nearly every SDET interview — rehearsing it out loud now means you won't freeze on it later.",
      learn:["Common conceptual questions: test pyramid, flaky tests, POM rationale","Practicing a 3-5 minute framework walkthrough, timed"],
      resources:[{t:"navtutorial.com — free SDET tutorial hub + interview question bank", u:"https://www.navtutorial.com/"}],
      deliverable:"Record yourself giving a 5-minute framework walkthrough. Watch it back and tighten it." },
    { title:"Coding practice", time:"7-9 hrs", why:"SDET coding interviews lean on strings/arrays/hash maps far more than advanced algorithms — practice the categories that actually show up.",
      learn:["LeetCode easy/medium — Array, String, Hash Table categories specifically","Practicing explaining your thought process while coding, not just arriving at an answer"],
      resources:[{t:"LeetCode — filter by Easy + Array/String/Hash Table", u:"https://leetcode.com/problemset/"}],
      deliverable:"Solve 20+ problems this week, narrating your approach out loud each time." },
    { title:"Mock interviews", time:"6-8 hrs", why:"The gap between 'knows the material' and 'performs under pressure' only closes with repetition under real time pressure.",
      learn:["Simulating real interview pressure and screen-sharing","Light system-design-style questions: 'how would you design a test framework for X'"],
      resources:[{t:"Pramp — free peer mock interviews", u:"https://www.pramp.com/"}],
      deliverable:"Complete at least 2 full mock interviews this week and note what you fumbled each time." },
    { title:"Behavioral prep", time:"5-7 hrs", why:"Your QA + teaching background gives you genuinely strong material here — most candidates have nothing this rich to draw on for mentoring/ownership stories.",
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
    { title:"Target list & tailored applications", time:"6-8 hrs", why:"A tailored list beats a spray-and-pray approach — 10 well-matched applications typically outperform 50 generic ones.",
      learn:["Building a list split between local companies and remote-friendly international ones","Tailoring resume keywords per posting without losing your core story"],
      resources:[{t:"We Work Remotely", u:"https://weworkremotely.com/"},{t:"RemoteOK", u:"https://remoteok.com/"}],
      deliverable:"Build a list of 30+ target roles and submit your first 10 tailored applications." },
    { title:"Active applications & networking", time:"6-8 hrs", why:"Referrals convert at dramatically higher rates than cold applications — this is the highest-ROI hour of your whole job search.",
      learn:["Reaching out for referrals instead of only cold-applying","Following up professionally without being pushy"],
      resources:[{t:"Track everything in a simple spreadsheet: company, date, status, contact", u:"#"}],
      deliverable:"Submit 15-20 more applications and send 5 genuine networking messages to people at target companies." },
    { title:"Interview loops & take-homes", time:"varies", why:"A take-home assignment is your capstone project's format, applied live — the practice from Months 9-10 pays off directly here.",
      learn:["Managing a take-home assignment under real time constraints","Following up promptly and professionally after each round"],
      resources:[{t:"Reuse your capstone's own patterns for any take-home request", u:"#"}],
      deliverable:"Complete any live interview loops or take-home assignments that come in, applying everything from Month 11." },
    { title:"Offer evaluation & negotiation", time:"varies", why:"The single highest-value hour of the entire year might be this one — a well-negotiated first offer compounds through every raise that follows it.",
      learn:["Reading an offer against real market data (SDET salary bands by level and region)","Negotiating professionally: asking for time, comparing offers, countering with data — not just asking for 'more'"],
      resources:[{t:"Revisit the salary comparison data from earlier in this roadmap as your anchor", u:"#"}],
      deliverable:"When an offer comes in, don't accept on the spot. Evaluate it against market bands, and counter at least once with a clear, specific number." }
  ]
}
];

const START_CONTENT = `
    <div class="sheet-label">SHEET 00 — ORIENTATION</div>
    <h1 class="sheet-title">How to use this roadmap</h1>
    <p class="sheet-desc">This is a 12-month, 48-week plan from QA Engineer to a hire-ready SDET, built around your specific situation: 4 years of QA experience, a teaching background, based in Dhaka, targeting AI-resistant work with real salary growth.</p>

    <div class="info-box">
      <div class="info-label">YOUR PROGRESS IS NOW SAVED AUTOMATICALLY</div>
      <p>Every checkbox and note you make is saved as you go — close this file and reopen it later, and everything is exactly where you left it. Use the <strong>Export backup</strong> button in the sidebar occasionally as a safety copy, especially before switching computers or browsers, since saved progress is tied to where you opened this file.</p>
    </div>

    <div class="info-box">
      <div class="info-label">TIME COMMITMENT</div>
      <p>Every week is estimated assuming you're doing this alongside a full-time job — most weeks run 6-9 hours, roughly 1-1.5 hours on weeknights plus a longer weekend session. If you can consistently do more, you'll finish faster than 12 months; if a week runs short, don't panic and don't skip the deliverable — just let it spill into the following week.</p>
    </div>

    <div class="info-box amber">
      <div class="info-label">THE ONE RULE THAT MATTERS MOST</div>
      <p>Every week has a "deliverable" — an actual thing you build, not just a topic you read about. If you only have time for one or the other, skip the reading and do the deliverable. You learn Playwright by writing broken Playwright code and fixing it, not by finishing a course.</p>
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
      <h3>Resume Toolkit</h3>
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
