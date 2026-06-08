import { Locator, Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeText: Locator;
  readonly titleField: Locator;
  readonly descriptionField: Locator;
  readonly prioritySelect: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly caseList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeText = page.locator('[data-testid="dashboard-welcome"]');
    this.titleField = page.locator('[data-testid="case-title"]');
    this.descriptionField = page.locator('[data-testid="case-description"]');
    this.prioritySelect = page.locator('[data-testid="case-priority"]');
    this.submitButton = page.locator('[data-testid="case-submit"]');
    this.errorMessage = page.locator('#case-error');
    this.successMessage = page.locator('#case-success');
    this.caseList = page.locator('[data-testid="case-list"]');
  }

  async expectDashboard() {
    await expect(this.welcomeText).toBeVisible();
  }

  async createTestCase(title: string, description: string, priority = 'Medium') {
    await this.titleField.fill(title);
    await this.descriptionField.fill(description);
    await this.prioritySelect.selectOption(priority);
    await this.submitButton.click();
  }

  async expectSuccess(text: string) {
    await expect(this.successMessage).toHaveText(text);
  }

  async expectError(text: string) {
    await expect(this.errorMessage).toHaveText(text);
  }

  async expectCaseVisible(title: string, description: string, priority: string) {
    const caseCard = this.caseList.locator('article', { hasText: title });
    await expect(caseCard).toContainText(title);
    await expect(caseCard).toContainText(description);
    await expect(caseCard).toContainText(priority);
  }
}
