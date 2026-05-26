import { test, expect } from '@playwright/test';
import CartPage from '../../pages/cart/cart.page';
import PdpPage from '../../pages/catalog/pdp.page';

test.describe('Shopping Cart', () => {
  let cartPage: CartPage;
  let pdpPage: PdpPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.evaluate(() => sessionStorage.clear());
    await page.reload();

    cartPage = new CartPage(page);
    pdpPage = new PdpPage(page);
  });

  test('TC021 - Add single product to cart', async ({ page }) => {
    await pdpPage.navigate('01KSJ2GJC5CYF8XJV7QZ5T6B32');
    await pdpPage.addToCart();
    await page.waitForLoadState('networkidle');

    await cartPage.navigate();
    await page.waitForLoadState('networkidle');

    expect(await cartPage.getCartItemCount()).toBe(1);
    const names = await cartPage.getCartItemNames();
    expect(names[0]).toContain('Combination Pliers');
  });

  test('TC022 - Add multiple products to cart', async ({ page }) => {
    await pdpPage.navigate('01KSJ2GJC5CYF8XJV7QZ5T6B32');
    await pdpPage.addToCart();
    await page.waitForLoadState('networkidle');

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test^="product-"]').nth(1).click();
    await page.waitForURL('**/product/**');
    await pdpPage.addToCart();
    await page.waitForLoadState('networkidle');

    await cartPage.navigate();
    await page.waitForLoadState('networkidle');

    expect(await cartPage.getCartItemCount()).toBe(2);
  });

  test('TC023 - Update product quantity in cart', async ({ page }) => {
    await pdpPage.navigate('01KSJ2GJC5CYF8XJV7QZ5T6B32');
    await pdpPage.addToCart();
    await page.waitForLoadState('networkidle');

    await cartPage.navigate();
    await page.waitForLoadState('networkidle');

    const initialTotal = await cartPage.getCartTotal();
    await cartPage.updateQuantity(0, 3);
    await page.waitForLoadState('networkidle');

    const updatedTotal = await cartPage.getCartTotal();
    expect(updatedTotal).toBeGreaterThan(initialTotal);
  });

  test('TC024 - Remove product from cart', async ({ page }) => {
    await pdpPage.navigate('01KSJ2GJC5CYF8XJV7QZ5T6B32');
    await pdpPage.addToCart();
    await page.waitForLoadState('networkidle');

    await cartPage.navigate();
    await page.waitForLoadState('networkidle');

    await cartPage.removeItem(0);
    await page.waitForLoadState('networkidle');

    const count = await cartPage.getCartItemCount();
    expect(count === 0 || (await cartPage.isCartEmpty())).toBeTruthy();
  });

  test('TC025 - Verify cart total is calculated correctly', async ({ page }) => {
    await pdpPage.navigate('01KSJ2GJC5CYF8XJV7QZ5T6B32');
    await pdpPage.addToCart();
    await page.waitForLoadState('networkidle');

    await cartPage.navigate();
    await page.waitForLoadState('networkidle');

    const total = await cartPage.getCartTotal();
    expect(total).toBeGreaterThan(0);
  });

  test('TC026 - Verify cart is empty after removing all items', async ({ page }) => {
    await pdpPage.navigate('01KSJ2GJC5CYF8XJV7QZ5T6B32');
    await pdpPage.addToCart();
    await page.waitForLoadState('networkidle');

    await cartPage.navigate();
    await page.waitForLoadState('networkidle');

    const itemCount = await cartPage.getCartItemCount();
    for (let i = itemCount - 1; i >= 0; i--) {
      await cartPage.removeItem(i);
      await page.waitForLoadState('networkidle');
    }

    expect(await cartPage.isCartEmpty()).toBeTruthy();
  });
});
