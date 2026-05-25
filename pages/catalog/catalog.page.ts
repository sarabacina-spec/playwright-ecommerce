import BasePage from '../base.page';
import type { Page } from '@playwright/test';

export default class CatalogPage extends BasePage {
  private readonly sortDropdown = this.page.locator('[data-test="sort"]');
  private readonly handToolsCheckbox = this.page.locator('#filters').getByText('Hand Tools');
  private readonly powerToolsCheckbox = this.page.locator('#filters').getByText('Power Tools');
  private readonly otherCheckbox = this.page.locator('#filters').getByText('Other');
  private readonly priceSliderMin = this.page.getByRole('slider', { name: 'ngx-slider' });
  private readonly priceSliderMax = this.page.getByRole('slider', { name: 'ngx-slider-max' });
  private readonly productCards = this.page.locator('[data-test^="product-"]');
  private readonly productNames = this.page.locator('[data-test="product-name"]');
  private readonly productPrices = this.page.locator('[data-test="product-price"]');

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  async filterByCategory(category: 'Hand Tools' | 'Power Tools' | 'Other'): Promise<void> {
    let checkbox;
    switch (category) {
      case 'Hand Tools':
        checkbox = this.handToolsCheckbox;
        break;
      case 'Power Tools':
        checkbox = this.powerToolsCheckbox;
        break;
      case 'Other':
        checkbox = this.otherCheckbox;
        break;
    }
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.click();
  }

  async sortBy(option: 'name,asc' | 'name,desc' | 'price,desc' | 'price,asc'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map((price) => {
      const cleanPrice = price.replace(/[^\d.]/g, '');
      return parseFloat(cleanPrice);
    });
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  async setPriceRange(min: number, max: number): Promise<void> {
  // Move min slider right by 'min' steps
  await this.priceSliderMin.click();
  for (let i = 0; i < min; i++) {
    await this.page.keyboard.press('ArrowRight');
  }

  // Move max slider left from 200 to 'max'
  await this.priceSliderMax.click();
  const stepsLeft = 200 - max;
  for (let i = 0; i < stepsLeft; i++) {
    await this.page.keyboard.press('ArrowLeft');
  }
}
}
