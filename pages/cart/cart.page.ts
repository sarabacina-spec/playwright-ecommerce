import BasePage from '../base.page';
import type { Page } from '@playwright/test';

export default class CartPage extends BasePage {
  private readonly cartItems = this.page.locator('[data-test="product-title"]');
  private readonly quantityInput = this.page.locator('[data-test="product-quantity"]');
  private readonly removeButtons = this.page.locator('.btn-danger');
  private readonly cartTotal = this.page.locator('[data-test="cart-total"]');
  private readonly emptyCartMessage = this.page.locator('p').filter({ hasText: 'The cart is empty' });
  private readonly proceedToCheckoutButton = this.page.locator('[data-test="proceed-1"]');

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/checkout');
    await this.waitForPageLoad();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.cartItems.allTextContents();
  }

  async updateQuantity(index: number, quantity: number): Promise<void> {
    const input = this.quantityInput.nth(index);
    await input.fill(quantity.toString());
    await input.press('Enter');
  }

  async removeItem(index: number): Promise<void> {
    const button = this.removeButtons.nth(index);
    await button.click();
  }

  async getCartTotal(): Promise<number> {
    const totalText = await this.cartTotal.textContent();
    if (!totalText) {
      return 0;
    }
    const numeric = totalText.replace(/[^\d.]/g, '');
    const value = parseFloat(numeric);
    return Number.isNaN(value) ? 0 : value;
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible().catch(() => false);
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
