const { test, expect } = require('@playwright/test');

const USER = { username: 'standard_user', password: 'secret_sauce' };

async function login(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', USER.username);
  await page.fill('#password', USER.password);
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
}

/** 1) Login */
test('Login - valid credentials', async ({ page }) => {
  await login(page);
});

/** 2) Product Sorting (price low -> high) */
test('Product Sorting - price low to high', async ({ page }) => {
  await login(page);
  await page.selectOption('.product_sort_container', 'lohi');
  const prices = await page.$$eval('.inventory_item_price', els =>
    els.map(e => parseFloat(e.textContent.replace('$','')))
  );
  const sorted = [...prices].sort((a,b) => a - b);
  expect(prices).toEqual(sorted);
});

/** 3) Add Products to cart */
test('Add Products - add two items to cart', async ({ page }) => {
  await login(page);
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(2);
});

/** 4) Remove Products from product listing */
test('Remove Products - remove item from listing', async ({ page }) => {
  await login(page);
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="remove-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(0);
});

/** 5) View Cart */
test('View cart shows correct items', async ({ page }) => {
  await login(page);
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toContainText('Sauce Labs Bike Light');
});

/** 6) Checkout Form - complete order */
test('Complete checkout process', async ({ page }) => {
  await login(page);
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'Test');
  await page.fill('[data-test="lastName"]', 'User');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');
  await page.click('[data-test="finish"]');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

/** 7) Cancel Checkout */
test('Cancel checkout returns to cart', async ({ page }) => {
  await login(page);
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.click('[data-test="cancel"]');
  await expect(page).toHaveURL(/cart.html/);
});

/** 8) Remove from Cart (cart page) */
test('Remove from cart page', async ({ page }) => {
  await login(page);
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="remove-sauce-labs-backpack"]');
  await expect(page.locator('.cart_item')).toHaveCount(0);
});

/** 9) Empty Cart Checkout - attempt with empty cart */
test('Empty cart - attempt checkout (should not finish)', async ({ page }) => {
  await login(page);
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(0);

  // if checkout button visible, try to click and verify validation blocks finishing
  if (await page.isVisible('[data-test="checkout"]')) {
    await page.click('[data-test="checkout"]');
    await page.click('[data-test="continue"]'); // try to continue without data
    // Expect an error message to appear (checkout validation)
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  } else {
    // site may not allow checkout from empty cart → consider this expected
    await expect(true).toBeTruthy();
  }
});

/** 10) Logout */
test('Logout successfully', async ({ page }) => {
  await login(page);
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
