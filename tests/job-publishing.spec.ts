import { test, expect } from '@playwright/test';

test.describe('Job Publishing Flow', () => {
  test('Should navigate to /auftrag-erstellen when clicking a service card', async ({ page }) => {
    await page.goto('/');
    
    // Wait for services section
    await page.waitForSelector('text=Unsere Dienstleistungen');
    
    // Click on a service card (e.g., Maler)
    const malerCard = page.locator('text=Maler').first();
    await malerCard.click();
    
    // Check URL
    await expect(page).toHaveURL(/\/auftrag-erstellen\?service=maler/);
    
    // Verify Page 1 of the flow
    await expect(page.locator('text=Schritt 1 / 8')).toBeVisible();
    await expect(page.locator('text=Maler')).toBeVisible();
  });

  test('Should handle "Abbrechen" and navigate back', async ({ page }) => {
    await page.goto('/auftrag-erstellen?service=maler');
    
    await expect(page.locator('text=Schritt 1 / 8')).toBeVisible();
    
    const cancelButton = page.locator('button:has-text("Abbrechen")');
    await cancelButton.click();
    
    // Should navigate back (to home since we went directly)
    await expect(page).toHaveURL('/');
  });
});
