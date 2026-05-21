import BasePage from '../base.page';
import type { Page } from '@playwright/test';

export default class PdpPage extends BasePage {
  readonly productName;
  readonly productPrice;
  readonly productDescription;
  readonly productImage;
  readonly addToCartButton;
  readonly quantityIncreaseButton;
  readonly quantityDecreaseButton;
  readonly quantityInput;

  constructor(page: Page) {
    super(page);
    this.productName = this.page.getByRole('heading', { level: 1 });
    this.productPrice = this.page.getByText(/\$\d+[.,]?\d*/).first();
    this.productDescription = this.page.getByRole('article').locator('p, .description, [data-testid="product-description"]');
    this.productImage = this.page.getByRole('img', { name: /product|image|photo/i });
    this.addToCartButton = this.page.getByRole('button', { name: /add to cart|add to basket|buy now/i });
    this.quantityIncreaseButton = this.page.getByRole('button', { name: '+' });
    this.quantityDecreaseButton = this.page.getByRole('button', { name: '-' });
    this.quantityInput = this.page.getByRole('spinbutton', { name: /quantity|qty/i });
  }

  async getProductName(): Promise<string | null> {
    return await this.productName.textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return await this.productPrice.textContent();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async increaseQuantity(): Promise<void> {
    await this.quantityIncreaseButton.click();
  }

  async decreaseQuantity(): Promise<void> {
    await this.quantityDecreaseButton.click();
  }

  async setQuantity(qty: number): Promise<void> {
    await this.quantityInput.fill(qty.toString());
  }

  async getQuantity(): Promise<number> {
    const value = await this.quantityInput.inputValue();
    return Number(value);
  }
}
