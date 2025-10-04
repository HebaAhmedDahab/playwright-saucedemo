const { test, expect, chromium } = require('@playwright/test');

test.describe('SauceDemo Full Flow Tests', () => {
  let browser;
  let context;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({ viewport: null });
    page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.waitForTimeout(3000);
  });

  // ---------- TEST 1 (Product Sorting - all filters) ----------
  test('Product Sorting - all filters', async () => {
    test.setTimeout(5000); // increase timeout to 90s

    const filters = [
      { value: 'az', label: 'Name (A to Z)' },
      { value: 'za', label: 'Name (Z to A)' },
      { value: 'lohi', label: 'Price (low to high)' },
      { value: 'hilo', label: 'Price (high to low)' },
    ];

    for (const filter of filters) {
      console.log(`Testing filter: ${filter.label}`);
      await page.selectOption('[data-test="product_sort_container"]', filter.value);
      await page.waitForTimeout(3000);

      // Confirm the sorting dropdown value is selected correctly
      const selected = await page.$eval(
        '[data-test="product_sort_container"]',
        el => el.value
      );
      expect(selected).toBe(filter.value);
    }

    // Verify that price sorting (low to high) actually works
    await page.selectOption('[data-test="product_sort_container"]', 'lohi');
    await page.waitForTimeout(2000);
    const prices = await page.$$eval('.inventory_item_price', els =>
      els.map(el => parseFloat(el.textContent.replace('$', '')))
    );
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  // ---------- TEST 2 (Add products to cart) ----------
  test('Add Products', async () => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.waitForTimeout(2000);
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.waitForTimeout(2000);

    const cartCount = await page.locator('.shopping_cart_badge');
    await expect(cartCount).toHaveText('2');
  });

  // ---------- TEST 3 (Remove products from cart) ----------
  test('Remove Products', async () => {
    await page.click('[data-test="remove-sauce-labs-bike-light"]');
    await page.waitForTimeout(2000);

    const cartCount = await page.locator('.shopping_cart_badge');
    await expect(cartCount).toHaveText('1');
  });

  // ---------- TEST 4 (View cart) ----------
  test('View Cart', async () => {
    await page.click('.shopping_cart_link');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/cart.html/);
  });

  // ---------- TEST 5 (Checkout form) ----------
  test('Complete Checkout Process', async () => {
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Asmaa');
    await page.fill('[data-test="lastName"]', 'Hussien');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await page.waitForTimeout(2000);
  });

  // ---------- TEST 6 (Cancel checkout) ----------
  test('Cancel Checkout', async () => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.click('[data-test="cancel"]');
    await expect(page).toHaveURL(/cart.html/);
  });

  // ---------- TEST 7 (Remove from cart) ----------
  test('Remove from Cart Page', async () => {
    await page.click('[data-test="remove-sauce-labs-fleece-jacket"]');
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  // ---------- TEST 8 (Empty cart checkout) ----------
  test('Empty Cart Checkout Attempt', async () => {
    await page.goto('https://www.saucedemo.com/cart.html');
    const itemsCount = await page.locator('.cart_item').count();
    expect(itemsCount).toBe(0); // Cart should be empty
  });

  // ---------- TEST 9 (Add product and continue shopping) ----------
  test('Add Product and Continue Shopping', async () => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.click('[data-test="add-to-cart-sauce-labs-onesie"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="continue-shopping"]');
    await expect(page).toHaveURL(/inventory.html/);
  });

  // ---------- TEST 10 (Logout) ----------
  test('Logout successfully', async () => {
    await page.click('#react-burger-menu-btn');
    await page.waitForSelector('#logout_sidebar_link');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test.afterAll(async () => {
    await browser.close();
  });
});
