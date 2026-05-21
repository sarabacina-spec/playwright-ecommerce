import BasePage from './base.page';
import type { Page } from '@playwright/test';

export default class HomePage extends BasePage {
  readonly signInLink;
  readonly cartIcon;
  readonly languageSelector;

  constructor(page: Page) {
    super(page);
    this.signInLink = this.page.getByRole('link', { name: /sign in/i });
    this.cartIcon = this.page.getByRole('link', { name: /cart/i });
    this.languageSelector = this.page.getByRole('combobox', { name: /language|select language/i });
  }

  async selectLanguage(language: string): Promise<void> {
    await this.languageSelector.selectOption({ label: language });
  }
}
