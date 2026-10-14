import { test, expect } from '@playwright/test';

test.describe('Shop Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/shop');
        // Wait for animations to settle
        await page.waitForTimeout(1000);
    });

    test('loads successfully', async ({ page }) => {
        // Check for the shop hero header
        const heading = page.getByRole('heading', { name: /DIGITAL DOMINANCE/i });
        await expect(heading).toBeVisible();
    });

    test('service matrix tabs are visible', async ({ page }) => {
        // Check for some known category tabs
        const devTab = page.getByRole('button', { name: /WEBSITE DEVELOPMENT/i });
        await expect(devTab).toBeVisible();
        
        const aiTab = page.getByRole('button', { name: /DIGITAL ARCHITECTURE/i });
        await expect(aiTab).toBeVisible();
    });

    test('adding an item opens the cart drawer', async ({ page }) => {
        // Find an 'SECURE DOMINANCE' button
        const addToCartButton = page.getByRole('button', { name: /SECURE DOMINANCE/i }).first();
        await expect(addToCartButton).toBeVisible();
        
        // Click it
        await addToCartButton.click();
        
        // Wait for the drawer to appear (look for the CHECKOUT button or cart heading)
        const cartHeading = page.getByRole('heading', { name: /Sector \/\/ Armory/i }).first();
        await expect(cartHeading).toBeVisible();
        
        const checkoutButton = page.getByRole('button', { name: /INITIALIZE CHECKOUT/i }).first();
        await expect(checkoutButton).toBeVisible();
    });

    test('cart drawer can be closed', async ({ page }) => {
        // Open it first
        await page.getByRole('button', { name: /SECURE DOMINANCE/i }).first().click();
        
        // Wait for it to open
        const closeButton = page.getByRole('button', { name: /Close cart/i }).first();
        await expect(closeButton).toBeVisible();
        
        // Close it
        await closeButton.click();
        
        // Verify it closes (might just slide off screen, but usually not visible in viewport)
        await expect(page.getByRole('heading', { name: /Sector \/\/ Armory/i }).first()).not.toBeVisible();
    });
});
