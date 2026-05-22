import BasePage from './base.page';
import type { Page } from '@playwright/test';

export default class HomePage extends BasePage {
  readonly signInLink;
  readonly cartIcon;
  readonly languageSelector;
  readonly userMenuLink;
  readonly logoutButton;

  constructor(page: Page) {
    super(page);
    this.signInLink = this.page.locator('[data-test="nav-sign-in"]');
    this.cartIcon = this.page.getByRole('link', { name: /cart/i });
    this.languageSelector = this.page.getByRole('combobox', { name: /language|select language/i });
    this.userMenuLink = this.page.locator('[data-test="nav-menu"]');
    this.logoutButton = this.page.locator('[data-test="nav-sign-out"]');
  }

  async selectLanguage(language: string): Promise<void> {
    await this.languageSelector.selectOption({ label: language });
  }

  async getUserName(): Promise<string | null> {
    return await this.userMenuLink.textContent();
  }

  async logout(): Promise<void> {
    await this.userMenuLink.click();
    await this.logoutButton.click();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.userMenuLink.isVisible().catch(() => false);
  }

  async isLoggedOut(): Promise<boolean> {
    return await this.signInLink.isVisible().catch(() => false);
  }
}
