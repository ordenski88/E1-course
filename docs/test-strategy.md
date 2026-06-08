# Test Strategy

## Purpose

This document defines the testing strategy for the `sandbox-ai-test-automation` project. It describes the approach for validating the sandbox web app, including the login workflow and the New Test Case creation feature, using Playwright-based UI automation.

## Project Overview

- Application type: browser-based sandbox web app
- Test framework: Playwright with TypeScript
- Test structure: Page Object Model (POM)
- Executed against: local sandbox app served from `http://localhost:3000`
- Artifact storage: `html-report`, `test-results`

## Test Objectives

- Verify that valid login credentials succeed and display the dashboard.
- Verify invalid login credentials show an appropriate error.
- Verify locked-user login is blocked with the correct message.
- Verify creating a new test case succeeds with valid inputs.
- Verify required field validation prevents blank test case submission.
- Verify maximum title length validation blocks too-long titles.

## Scope

### In scope

- Login flow
- Dashboard access after login
- New Test Case creation workflow
- UI validation messages for both positive and negative scenarios
- Playwright automation execution and reporting

### Out of scope

- Backend API-only tests
- Performance, load, or security testing
- Cross-browser coverage beyond Chromium in the current CI configuration
- Accessibility testing unless added later

## Test Approach

### Automation approach

- Use Playwright UI tests to exercise the application through the browser.
- Apply a Page Object Model design to separate page interactions from assertions.
- Cover both positive and negative user flows.
- Execute tests against the locally served app via `npm test` or `npm run test:ci`.

### Test types

- Functional testing: validate the application behaves correctly for core user flows.
- Regression testing: ensure existing login and test case workflows remain stable.
- Smoke testing: verify critical login and creation paths before deeper execution.

## Test Design

### Test case focus areas

- Valid authentication
- Invalid credentials handling
- Locked account handling
- Successful creation of new test cases
- Required field validation on the New Test Case form
- Title length validation on the New Test Case form

### Test structure

- `tests/login.spec.ts` covers login scenarios.
- `tests/new-test-case.spec.ts` covers New Test Case creation scenarios.
- Page objects in `tests/page-objects` encapsulate UI interactions.

## Coverage

- UI coverage is the current focus, covering login and New Test Case workflows.
- API coverage is noted as a future enhancement because the current sandbox app has no backend API.
- A dedicated coverage reference is available in `docs/test-coverage.md`.

## Environment and Tools

- Node.js and npm
- Playwright with Chromium
- `http-server` to serve `src/app` locally on port `3000`
- `start-server-and-test` to run the app and execute tests sequentially
- `prettier` for formatting documentation and source files

## Execution

### Local run

- Install dependencies: `npm install`
- Install Playwright browser: `npm run install:browsers`
- Start the sandbox app: `npm run start`
- Run tests: `npm test`

### CI-ready run

- Clean and install browsers: `npm run test:ci`

### Reporting

- HTML report generation path: `html-report`
- Playwright output path: `test-results`
- Failure artifacts: screenshots and traces for failing tests
- View report: `npx playwright show-report`

## Entry and Exit Criteria

### Entry criteria

- Dependencies installed
- Playwright browser installed
- Sandbox app accessible at `http://localhost:3000`
- Test code available and up to date

### Exit criteria

- All automated tests pass
- Report generated successfully
- No high-severity regressions detected in the tested flows

## Risks and Assumptions

- The test suite currently targets Chromium only.
- The sandbox app is assumed to be stable and available locally on port `3000`.
- Any UI changes in the sandbox app may require test updates.

## Maintenance

- Keep tests aligned with application UI changes.
- Extend coverage when new workflows are introduced.
- Add cross-browser and non-functional tests when the project grows.
