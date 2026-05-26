import { test, expect } from '@playwright/test';
import PdpPage from '../../pages/catalog/pdp.page';

test.describe('Product Detail Page', () => {
  let pdpPage: PdpPage;

  test.beforeEach(async ({ page }) => {
    pdpPage = new PdpPage(page);
  });

  test('TC016 - Open PDP from product catalog', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-test^="product-"]').first().click();
    await page.waitForURL('**/product/**');

    expect(page.url()).toContain('/product/');
  });

  test('TC017 - Verify product name, price and description are displayed', async ({ page }) => {
    await pdpPage.navigate('01KSHZ2KKCM7EBEQEZWNH38WE1');
    await page.waitForLoadState('networkidle');

    expect(await pdpPage.getProductName()).toBeTruthy();
    expect(await pdpPage.getProductPrice()).toBeTruthy();
    expect(await pdpPage.getProductDescription()).toBeTruthy();
  });

  test('TC018 - Verify product image is displayed', async ({ page }) => {
    await pdpPage.navigate('01KSHZ2KKCM7EBEQEZWNH38WE1');
    await page.waitForLoadState('networkidle');

    expect(await pdpPage.isProductImageVisible()).toBeTruthy();
  });

  test('TC019 - Add product to cart from PDP', async ({ page }) => {
    await pdpPage.navigate('01KSHZ2KKCM7EBEQEZWNH38WE1');
    await page.waitForLoadState('networkidle');

    await pdpPage.addToCart();
    await page.waitForLoadState('networkidle');

    expect(await pdpPage.getCartQuantity()).toBe(1);
  });
});
