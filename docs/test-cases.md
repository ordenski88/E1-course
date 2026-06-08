# Test Cases

## 1. Login - Positive
- Description: Verify user can sign in with valid credentials.
- Steps:
  1. Open the login page.
  2. Enter `admin@example.com` and `Password123`.
  3. Click `Sign in`.
- Expected result: Dashboard is visible and welcome message is displayed.

## 2. Login - Negative: Invalid credentials
- Description: Verify invalid credentials are rejected.
- Steps:
  1. Open the login page.
  2. Enter invalid email and password.
  3. Click `Sign in`.
- Expected result: Error `Invalid credentials. Please try again.` is displayed.

## 3. Login - Negative: Locked account
- Description: Verify locked account shows a lock message.
- Steps:
  1. Open the login page.
  2. Enter `locked@example.com` and valid password.
  3. Click `Sign in`.
- Expected result: Error `Account locked. Please contact support.` is displayed.

## 4. New Test Case - Positive
- Description: Verify new test case can be created successfully.
- Steps:
  1. Sign in with valid credentials.
  2. Complete title, description, and priority.
  3. Submit the `Save Test Case` form.
- Expected result: Success message is displayed and the new case appears in the list.

## 5. New Test Case - Negative: Required fields
- Description: Verify missing title and description are rejected.
- Steps:
  1. Sign in with valid credentials.
  2. Leave title and description blank.
  3. Submit the form.
- Expected result: Error `Title and description are required and cannot be empty.` is displayed.

## 6. New Test Case - Negative: Title length constraints
- Description: Verify title length validation rejects too-long values.
- Steps:
  1. Sign in with valid credentials.
  2. Enter a title longer than 120 characters.
  3. Submit the form.
- Expected result: Error `Title must be 120 characters or fewer.` is displayed.
