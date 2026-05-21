import BasePage from '../base.page';
import type { Page } from '@playwright/test';

export default class CatalogPage extends BasePage {
  readonly categoryFilter;
  readonly subcategoryFilter;
  readonly priceMinInput;
  readonly priceMaxInput;
  readonly sortDropdown;
  readonly productList;

  constructor(page: Page) {
    super(page);
    this.categoryFilter = this.page.getByLabel(/category/i);
    this.subcategoryFilter = this.page.getByLabel(/subcategory/i);
    this.priceMinInput = this.page.getByLabel(/price.*min|min price/i);
    this.priceMaxInput = this.page.getByLabel(/price.*max|max price/i);
    this.sortDropdown = this.page.getByRole('combobox', { name: /sort/i });
    this.productList = this.page.locator('[data-testid="product-list"], .product-list, .products');
  }

  async filterByCategory(name: string): Promise<void> {
    await this.categoryFilter.selectOption({ label: name });
  }

  async filterBySubcategory(name: string): Promise<void> {
    await this.subcategoryFilter.selectOption({ label: name });
  }

  async filterByPriceRange(min: string, max: string): Promise<void> {
    await this.priceMinInput.fill(min);
    await this.priceMaxInput.fill(max);
    await this.priceMaxInput.press('Enter');
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }

  async getProductNames(): Promise<string[]> {
    return await this.productList.locator('text, h2, h3, .product-name').allTextContents();
  }
}
