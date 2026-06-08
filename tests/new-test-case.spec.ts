import test from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';
import { DashboardPage } from './page-objects/DashboardPage';

const validEmail = 'admin@example.com';
const validPassword = 'Password123';

test.describe('New test case feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);
  });

  test('should create a new test case successfully', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.expectDashboard();
    await dashboard.createTestCase(
      'Verify login and create case flow',
      'Create a test case after logging in with valid credentials.',
      'High'
    );
    await dashboard.expectSuccess('Test case saved successfully.');
    await dashboard.expectCaseVisible(
      'Verify login and create case flow',
      'Create a test case after logging in with valid credentials.',
      'High'
    );
  });

  test('should show validation error when required fields are missing', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.createTestCase('', '', 'Low');
    await dashboard.expectError('Title and description are required and cannot be empty.');
  });

  test('should show validation error when title exceeds maximum length', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const longTitle = 'A'.repeat(121);
    await dashboard.createTestCase(longTitle, 'Description is valid.', 'Medium');
    await dashboard.expectError('Title must be 120 characters or fewer.');
  });
});
