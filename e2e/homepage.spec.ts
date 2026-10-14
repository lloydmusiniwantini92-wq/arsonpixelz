import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('has expected title', async ({ page }) => {
        await expect(page).toHaveTitle(/Arson/i);
    });

    test('hero section is visible', async ({ page }) => {
        // Look for the main hero heading
        const heading = page.locator('h1').first();
        await expect(heading).toBeVisible();
    });

    test('navigation is present', async ({ page }) => {
        // Look for the Shop link in the navigation
        const shopLink = page.getByRole('link', { name: 'Shop', exact: true });
        await expect(shopLink).toBeVisible();
    });

    test('navigation links work', async ({ page }) => {
        // Click the shop link and verify URL changes
        const shopLink = page.getByRole('link', { name: 'Shop', exact: true });
        await expect(shopLink).toBeVisible();
        await shopLink.click();
        
        await expect(page).toHaveURL(/.*\/shop/);
    });

    test('footer is visible', async ({ page }) => {
        // Scroll to the bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        
        // Ensure footer content is there
        const footerText = page.getByText(/ARSON PIXELZ/i).last();
        await expect(footerText).toBeVisible();
    });
});
