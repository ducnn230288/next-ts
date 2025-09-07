import { expect, test } from '@playwright/test';

test('manual image comparison', async ({ page }) => {
  await page.goto('http://localhost:3000/en/auth/login');

  await page.waitForLoadState('networkidle');

  await page.evaluate(() => document.fonts.ready);
  const element = page.getByRole('main');
  await expect(element).toHaveScreenshot('login.png', {
    // mask: [page.locator('.password-field')], // Che các phần tử nhạy cảm
    maxDiffPixels: 1, // Số pixel khác biệt tối đa cho phép
    threshold: 0.2, // Ngưỡng so sánh (0-1)
    animations: 'disabled', // Tắt animations
  });
});
