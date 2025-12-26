import { test, expect } from '@playwright/test';

test('Currency converter app', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Initial state
  const fromInput = page.locator('input[type="number"]').first();
  await expect(fromInput).toHaveValue('1');
  const toInput = page.locator('input[type="number"]').nth(1);
  await expect(toInput).not.toHaveValue('0');

  // Swap
  await page.getByRole('button', { name: 'swap' }).click();

  // After swap
  await expect(toInput).toHaveValue('1');
  await expect(fromInput).not.toHaveValue('0');

  // Conversion
  await fromInput.fill('2');
  await page.getByRole('button', { name: /Convert/ }).click();
  await expect(toInput).not.toHaveValue('1');
});
