import { test, expect } from '@playwright/test';
import CatalogPage from '../../pages/catalog/catalog.page';

test.describe('Product Catalog', () => {
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    catalogPage = new CatalogPage(page);
    await catalogPage.navigate();
  });

  test('TC008 - Filter products by category (Hand Tools)', async ({ page }) => {
    await catalogPage.filterByCategory('Hand Tools');
    await page.waitForLoadState('networkidle');

    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    const productNames = await catalogPage.getProductNames();
    expect(productNames.length).toBeGreaterThan(0);
    productNames.forEach((name) => {
      expect(name).toBeTruthy();
    });
  });

  test.skip('TC010 - Filter products by price range', async ({ page }) => {
    await catalogPage.setPriceRange(10, 50);
    await page.waitForLoadState('networkidle');

    const productPrices = await catalogPage.getProductPrices();
    expect(productPrices.length).toBeGreaterThan(0);

    productPrices.forEach((price) => {
      expect(price).toBeGreaterThanOrEqual(10);
      expect(price).toBeLessThanOrEqual(50);
    });
  });

  test('TC011 - Sort products by price low to high', async ({ page }) => {
    await catalogPage.sortBy('price,asc');
    await page.waitForLoadState('networkidle');

    const productPrices = await catalogPage.getProductPrices();
    expect(productPrices.length).toBeGreaterThan(0);

    for (let i = 1; i < productPrices.length; i++) {
      expect(productPrices[i]).toBeGreaterThanOrEqual(productPrices[i - 1]);
    }
  });

  test('TC012 - Sort products by price high to low', async ({ page }) => {
    await catalogPage.sortBy('price,desc');
    await page.waitForLoadState('networkidle');

    const productPrices = await catalogPage.getProductPrices();
    expect(productPrices.length).toBeGreaterThan(0);

    for (let i = 1; i < productPrices.length; i++) {
      expect(productPrices[i]).toBeLessThanOrEqual(productPrices[i - 1]);
    }
  });

  test('TC013 - Sort products by name A-Z', async ({ page }) => {
    await catalogPage.sortBy('name,asc');
    await page.waitForLoadState('networkidle');

    const productNames = await catalogPage.getProductNames();
    expect(productNames.length).toBeGreaterThan(0);

    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

  test('TC014 - Filter and sort combined', async ({ page }) => {
    await catalogPage.filterByCategory('Power Tools');
    await page.waitForLoadState('networkidle');

    await catalogPage.sortBy('price,asc');
    await page.waitForTimeout(1000);

    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    const productPrices = await catalogPage.getProductPrices();
    for (let i = 1; i < productPrices.length; i++) {
      expect(productPrices[i]).toBeGreaterThanOrEqual(productPrices[i - 1]);
    }
  });

  
});
