import BasePage from '../base.page';
import type { Page } from '@playwright/test';

export default class PdpPage extends BasePage {
  private readonly productName = this.page.locator('[data-test="product-name"]');
  private readonly productPrice = this.page.locator('[data-test="unit-price"]');
  private readonly productDescription = this.page.locator('[data-test="product-description"]');
  private readonly productImage = this.page.locator('.figure-img');
  private readonly addToCartButton = this.page.locator('[data-test="add-to-cart"]');
  private readonly cartQuantity = this.page.locator('[data-test="cart-quantity"]');

  constructor(page: Page) {
    super(page);
  }

  async navigate(productId: string): Promise<void> {
    await this.page.goto(`/product/${productId}`);
    await this.waitForPageLoad();
  }

  async getProductName(): Promise<string | null> {
    return await this.productName.textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return await this.productPrice.textContent();
  }

  async getProductDescription(): Promise<string | null> {
    return await this.productDescription.textContent();
  }

  async isProductImageVisible(): Promise<boolean> {
    if (!(await this.productImage.isVisible())) {
      return false;
    }
    return await this.productImage.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getCartQuantity(): Promise<number> {
    const text = await this.cartQuantity.textContent();
    if (!text) {
      return 0;
    }
    const quantity = parseInt(text.replace(/[^0-9]/g, ''), 10);
    return Number.isNaN(quantity) ? 0 : quantity;
  }
}
