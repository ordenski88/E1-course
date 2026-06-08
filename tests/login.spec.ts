import test, { expect } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';
import { DashboardPage } from './page-objects/DashboardPage';

const validEmail = 'admin@example.com';
const validPassword = 'Password123';

test.describe('Login flow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should sign in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await loginPage.login(validEmail, validPassword);
    await dashboard.expectDashboard();
    await expect(dashboard.welcomeText).toHaveText('Welcome, admin@example.com');
  });

  test('should show an error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('wrong@example.com', 'BadPassword');
    await loginPage.expectError('Invalid credentials. Please try again.');
  });

  test('should show an account locked message for locked users', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('locked@example.com', 'Password123');
    await loginPage.expectError('Account locked. Please contact support.');
  });
});
