# Test Coverage

## Purpose

This document describes the coverage approach for the sandbox app, including the current UI coverage and future API coverage expectations.

## Coverage Overview

### UI Coverage

The existing automated tests cover the primary UI workflows in the sandbox application:

- Login flow
  - Valid login
  - Invalid credentials
  - Locked account handling
- New Test Case workflow
  - Successful case creation
  - Required field validation
  - Title length validation
- Persistence behavior via localStorage when cases are saved and displayed

### API Coverage

The current sandbox application is a static browser-based UI using localStorage as persistence. There is no backend API available in this repository today.

Future API coverage should include:

- Authentication endpoints
  - Login success
  - Invalid credentials
  - Locked account handling
- Test case management endpoints
  - Create test case
  - Read test cases
  - Update and delete test cases if supported
- Error handling and validation responses
- Security checks such as authentication, authorization, and data validation

## Coverage Matrix

| Area | Current Status | Notes |
|------|----------------|-------|
| Login UI | Covered | `tests/login.spec.ts` |
| New Test Case UI | Covered | `tests/new-test-case.spec.ts` |
| Local storage persistence | Covered implicitly | Verified through UI flows that render saved cases |
| Backend API | Not applicable yet | No backend exists in this project |

## Future API Test Setup

When a backend API is added, use Playwright API testing capabilities:

- `test.request` / `APIRequestContext` for direct endpoint validation
- Schema and response assertions for REST payloads
- Authentication token handling for protected routes
- Failure path coverage for invalid data and unauthorized requests

## References

- `docs/test-plan.md`
- `docs/test-strategy.md`
- `tests/login.spec.ts`
- `tests/new-test-case.spec.ts`
