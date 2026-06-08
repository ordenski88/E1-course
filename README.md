# AI-Accelerated Test Automation

This repository contains a simple test automation framework for a sandbox web app.
It uses Playwright with a Page Object Model structure, positive and negative flows, and automated reporting.

## What is included

- `src/app` — sandbox application source code
- `tests` — Playwright UI test suite with POM classes
- `docs` — documentation for rules, plan, test cases, report, and prompt summary
- `html-report` — generated Playwright HTML report after running tests

## Setup

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browser dependencies:

```bash
npm run install:browsers
```

## Run the sandbox app and tests

Start the sandbox app:

```bash
npm run start
```

Run the test suite:

```bash
npm test
```

Run the full CI-ready flow:

```bash
npm run test:ci
```

## Test Reporting

- HTML report is generated in `html-report`
- Playwright result output is stored in `test-results`
- Screenshots and traces are captured for failures

## Docs

All assignment documentation is available in the `docs/` folder.

- `docs/test-strategy.md` — test strategy for the Playwright automation suite
- `docs/test-coverage.md` — UI and API coverage approach
