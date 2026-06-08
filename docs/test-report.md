# Test Report

## Execution Summary

- Framework: Playwright UI automation
- Environment: local sandbox app served at `http://localhost:3000`
- Report artifacts: `html-report`
- Test result storage: `test-results`

## Results

- Total executed: 6 tests
- Passed: 6
- Failed: 0

## Coverage

- Login: positive valid credentials
- Login: negative invalid credentials
- Login: negative locked account
- New Test Case: positive create workflow
- New Test Case: negative missing required fields
- New Test Case: negative title length constraint

## Artifact Locations

- HTML report: `html-report/index.html`
- Test results: `test-results`
- Failure artifacts: screenshots and traces captured on failure (none were needed in this run)

## Notes

- All positive and negative scenarios were executed successfully.
- Negative scenarios are validated by expected error messages, providing coverage for both valid and invalid flows.
- The report is ready to publish or inspect locally using `npx playwright show-report`.
