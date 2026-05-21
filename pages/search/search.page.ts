import BasePage from '../base.page';
import type { Page } from '@playwright/test';

export default class SearchPage extends BasePage {
  readonly searchInput;
  readonly resultsList;
  readonly noResultsMessage;

  constructor(page: Page) {
    super(page);
    this.searchInput = this.page.getByRole('searchbox', { name: /search/i });
    this.resultsList = this.page.getByRole('list', { name: /search results|results/i });
    this.noResultsMessage = this.page.getByText(/no results|nothing found/i);
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async getResultNames(): Promise<string[]> {
    return await this.resultsList.locator('li').allTextContents();
  }

  async getNoResultsMessage(): Promise<string | null> {
    return await this.noResultsMessage.textContent();
  }
}
