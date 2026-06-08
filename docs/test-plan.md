# Test Plan

## Scope
Test the sandbox app login functionality and the New Test Case creation workflow.

## Objectives
- Verify valid login and dashboard access.
- Verify invalid login handling and locked account handling.
- Verify test case creation workflow with valid and invalid inputs.
- Capture reports and evidence for positive and negative paths.

## Test Cases
- Login success with valid credentials.
- Login failure with incorrect credentials.
- Login failure for locked account.
- New Test Case creation success.
- New Test Case required field validation.
- New Test Case maximum title length validation.

## Execution Approach
- Use Playwright for UI-driven automation.
- Use Page Object Model to keep tests maintainable.
- Run against local sandbox app served from `http://localhost:3000`.
- Publish HTML report and test artifacts.
- Document UI coverage and future API coverage expectations.

## Environment
- Node.js / npm
- Playwright with Chromium
- Local sandbox web app served from `src/app`
