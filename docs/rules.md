# Test Automation Rules

## Architecture
- Use Page Object Model (POM) for UI interactions.
- Keep page objects thin and expressive with high-level actions.
- Tests should express intent, not locator details.

## Locators
- Prefer semantic locators first: text, labels, role, accessible names.
- Use `data-testid` attributes as stable locators.
- Use CSS selectors only as a fallback when semantic locators are insufficient.
- Avoid brittle XPath selectors unless absolutely necessary.

## Data
- Test data should be defined in fixtures or inline within the test scope.
- Use stable randomized values only when uniqueness is required.
- Maintain explicit values for validation checks and negative path assertions.
- Keep fixture data centralized and reusable.

## Coding Standards
- File layout:
  - `tests/page-objects` for POM classes
  - `tests/*.spec.ts` for test scenarios
  - `src/app` for the sandbox app source
- Naming:
  - Page objects in `PascalCase`
  - Tests in `camelCase` with descriptive names
  - Assertions should use Playwright `expect` with clear messages
- Assertions:
  - Verify visible state, error messages, and success messages.
  - Prefer exact text assertions for user-facing content.
- Retries/Timeouts:
  - Use Playwright built-in waits and expected conditions.
  - Keep action timeouts limited to 10 seconds, test timeouts to 30 seconds.
- Error handling:
  - Fail fast on validation mismatch.
  - Capture screenshots and traces for failure analysis.

## Framework-Specific Rules
- Use `@playwright/test` as the test runner.
- Create page objects for shared UI regions:
  - `LoginPage`
  - `DashboardPage`
- Keep page object methods focused on user workflows.
- Use `test.beforeEach` to navigate to the base URL and reset app state if needed.

## Reporting
- Use Playwright HTML report as the primary published artifact.
- Store reports in `html-report` and test outputs in `test-results`.
- Generate screenshot and trace artifacts for failures.
- Document execution results in `docs/test-report.md`.
