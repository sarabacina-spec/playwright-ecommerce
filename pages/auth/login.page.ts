import BasePage from '../base.page';
import type { Page } from '@playwright/test';

export default class LoginPage extends BasePage {
  readonly emailInput;
  readonly passwordInput;
  readonly loginButton;
  readonly errorMessage;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByLabel(/email/i);
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.getByRole('button', { name: /log in|login/i });
    this.errorMessage = this.page.getByText('Invalid email or password');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
}
