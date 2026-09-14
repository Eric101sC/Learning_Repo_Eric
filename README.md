# Playwright Learning Repo

A hands-on repo for learning end-to-end test automation with **Playwright** and **TypeScript**, built from scratch rather than cloned from a template. Each module adds one capability and the commit history is meant to be readable as a learning trail.

Maintained by Eric Becker (QA Engineer, spriteCloud).

## Applications under test

Tests run against two public practice applications, kept as separate Playwright projects:

| Project | Application | Why |
|---|---|---|
| `saucedemo` | [Swag Labs](https://www.saucedemo.com) | Stable, login-gated, ships deliberately broken user accounts (`problem_user`, `performance_glitch_user`) that are useful for practising flake and failure diagnosis |
| `toolshop` | [Practice Software Testing](https://practicesoftwaretesting.com) | Has a public REST API behind the same data, so UI state can be seeded via API rather than clicked through |

Neither app is owned by spriteCloud or any client. Both are public sandboxes intended for test automation practice.

## Prerequisites

- Node.js 20 or higher
- npm

## Setup

```bash
git clone git@gitlab.spritecloud.com:Eric101/learning-repo-eric.git
cd learning-repo-eric
npm install
npx playwright install
```

`npx playwright install` downloads the browser binaries (~400MB). It is separate from `npm install` and is required once per machine.

## Running tests

```bash
npx playwright test                       # everything, both projects
npx playwright test --project=saucedemo   # one project
npx playwright test --project=toolshop
npx playwright test --ui                  # interactive UI mode
npx playwright test --list                # list discovered tests without running them
npx playwright show-report                # open the last HTML report
```

`--list` is the quickest way to tell a discovery problem (wrong `testDir`) from a code problem.

To explore an application and see suggested locators:

```bash
npx playwright codegen https://www.saucedemo.com
```

Codegen output is a first draft, not a finished test — see conventions below.

## Structure

```
.
├── playwright.config.ts     # projects, baseURLs, shared settings
├── tests/
│   ├── saucedemo/           # project: saucedemo
│   └── toolshop/            # project: toolshop
├── playwright-report/       # generated, gitignored
└── test-results/            # generated, gitignored
```

Configuration is layered: shared settings (trace, test-ID attribute) live in the top-level `use` block, and per-application settings (`baseURL`) live in each project. Adding a third application means adding a project, not restructuring the repo.

## Conventions

Rules this repo holds itself to:

- **Locators**: prefer `getByRole` and `getByLabel`; fall back to `getByTestId` (the `data-test` attribute is registered via `testIdAttribute`). No CSS class selectors. No XPath.
- **No hard waits**: no `waitForTimeout`, no sleeps. Playwright's web-first assertions auto-wait by design.
- **Relative navigation**: `page.goto('/')`, never a hard-coded host — the project's `baseURL` supplies it.
- **Assertions must be able to fail**: an assertion that restates its own locator (finding an element by its text, then asserting that text) cannot detect a broken feature. Assert on result sets and observable outcomes.
- **Every test gets deliberately broken once**: change the expectation, confirm it fails for the right reason, restore it. A test that has never been seen to fail is not yet a test.

## Learning roadmap

| # | Module | Status |
|---|---|---|
| 1 | Repo from scratch | Done |
| 2 | Locators | In progress |
| 3 | Assertions and auto-waiting | |
| 4 | Test structure and isolation | |
| 5 | Fixtures | |
| 6 | Page objects | |
| 7 | API testing and state setup | |
| 8 | Authentication and `storageState` | |
| 9 | Config, projects, environments | Partly done |
| 10 | CI pipelines | |
| 11 | Traces and flake triage | |
| 12 | Risk-based test selection | |

## Known gaps

- Current tests hard-code full URLs instead of using the configured `baseURL`.
- Current tests use raw `[data-test="..."]` selectors instead of `getByTestId`.
- The search assertion in `tests/toolshop` is circular and would pass against a broken search.
- `.github/workflows/playwright.yml` is a GitHub Actions workflow and does nothing on GitLab; a `.gitlab-ci.yml` is needed instead.
