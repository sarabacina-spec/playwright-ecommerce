import BasePage from '../base.page';
import type { Page } from '@playwright/test';

export default class CartPage extends BasePage {
  readonly cartItems;
  readonly cartTotal;

  constructor(page: Page) {
    super(page);
    this.cartItems = this.page.locator('[data-testid="cart-item"], .cart-item');
    this.cartTotal = this.page.getByText(/total/i).locator('..').locator('text=/\$\d+[.,]?\d*/');
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async updateQuantity(index: number, qty: string): Promise<void> {
    const item = this.cartItems.nth(index);
    const quantityInput = item.getByRole('spinbutton').first();
    await quantityInput.fill(qty);
    await quantityInput.press('Enter');
  }

  async removeItem(index: number): Promise<void> {
    const item = this.cartItems.nth(index);
    const removeButton = item.getByRole('button', { name: /remove|delete|trash/i });
    await removeButton.click();
  }

  async getTotal(): Promise<string | null> {
    return await this.cartTotal.first().textContent();
  }
}
