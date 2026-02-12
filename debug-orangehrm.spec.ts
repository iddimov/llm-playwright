import { test, expect } from '@playwright/test';

test('Debug OrangeHRM navigation', async ({ page }) => {
  // Increase timeout
  test.setTimeout(60000);
  
  // Navigate to OrangeHRM
  await page.goto('https://opensource-demo.orangehrmlive.com/', { waitUntil: 'domcontentloaded' });
  
  // Wait for login form
  await page.waitForSelector('form.oxd-form', { timeout: 10000 });
  
  // Login
  await page.locator('input[placeholder="Username"], input[name="username"]').first().fill('Admin');
  await page.locator('input[placeholder="Password"], input[name="password"]').first().fill('admin123');
  await page.locator('button[type="submit"], button:has-text("Login")').first().click();
  
  // Wait for dashboard
  await expect(page).toHaveURL(/.*dashboard\/index/, { timeout: 20000 });
  
  console.log('Logged in successfully, current URL:', page.url());
  
  // Try to click PIM link
  const pimLink = page.locator('a:has-text("PIM"), span:has-text("PIM")').first();
  await expect(pimLink).toBeVisible({ timeout: 10000 });
  console.log('PIM link is visible');
  
  // Click with longer timeout
  await pimLink.click({ timeout: 15000 });
  console.log('Clicked PIM link');
  
  // Wait for navigation with multiple possible URLs
  await expect(page).toHaveURL(/.*viewPimModule|.*viewEmployeeList|.*pim\/viewEmployeeList/, { timeout: 30000 });
  console.log('Navigation successful, current URL:', page.url());
  
  // Take a screenshot for debugging
  await page.screenshot({ path: 'debug-orangehrm.png', fullPage: true });
});