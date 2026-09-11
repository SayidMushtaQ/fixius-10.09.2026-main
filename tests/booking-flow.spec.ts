import { test, expect } from '@playwright/test';
import { TempMailHelper } from './helpers/temp-mail';

test.describe('Booking Flow E2E', () => {
  let tempMail: TempMailHelper;
  let userEmail: string;

  test.beforeAll(async () => {
    tempMail = new TempMailHelper();
  });

  test('Should allow a new craftsman to register and verify via Admin', async ({ page }) => {
    page.on('console', msg => console.log(`BROWSER: ${msg.text()}`));
    page.on('response', async response => {
      if (response.status() >= 400) {
        try {
          console.log(`API ERROR: ${response.url()} -> ${response.status()} ${await response.text()}`);
        } catch (e) {}
      }
    });
    userEmail = await tempMail.createAccount();
    console.log(`Using test email: ${userEmail}`);

    await page.goto('/registrieren');
    console.log('Navigated to /registrieren');

    // 0. Accept Cookies - be more aggressive
    try {
      const cookieButton = page.locator('button:has-text("Akzeptieren")');
      await cookieButton.waitFor({ state: 'visible', timeout: 5000 });
      await cookieButton.click();
      console.log('Accepted cookies');
      await expect(cookieButton).not.toBeVisible({ timeout: 10000 });
      console.log('Cookie banner is gone');
    } catch (e) {
      console.log('Cookie banner not found or already closed');
    }
    
    // Step 1: Select Service
    await page.waitForSelector('text=Maurer', { timeout: 15000 });
    console.log('Found Maurer text');
    await page.getByText('Maurer', { exact: true }).first().click({ force: true });
    console.log('Clicked Maurer card');

    // Wait for Step 2 to be ready
    console.log('Waiting for Step 2 form fields...');
    await expect(page.locator('#first_name')).toBeVisible({ timeout: 15000 });
    console.log('Step 2 form visible');

    await page.fill('#first_name', 'Test');
    await page.fill('#last_name', 'Craftsman');
    await page.fill('#company_name', `Test Company ${Math.floor(Math.random() * 10000)} GmbH`);
    await page.fill('#email_address', userEmail);
    await page.fill('#phone_number', '+491761234567');
    console.log('Filled form fields');
    
    // Address Autocomplete
    const addressInput = page.locator('input[placeholder*="Strasse, Hausnummer"]');
    await addressInput.focus();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('Friedrichstraße 1, 10969 Berlin, Deutschland', { delay: 50 });
    console.log('Typing address...');
    
    console.log('Waiting for address suggestions...');
    await page.waitForSelector('.pac-item', { state: 'visible', timeout: 20000 });
    await page.waitForTimeout(2000); 
    
    const items = await page.locator('.pac-item').allTextContents();
    console.log('Suggestions found:', items);

    // Select the first Berlin one
    const suggestion = page.locator('.pac-item').filter({ hasText: 'Berlin' }).first();
    await suggestion.click({ force: true });
    console.log('Selected Berlin address from Google Maps suggestions via Click');
    
    // Wait for state to update - look for ZIP code in the value
    console.log('Waiting for address state synchronization...');
    await expect(addressInput).toHaveValue(/\d{5}/, { timeout: 10000 });
    console.log('Address state synchronized (ZIP found)');

    // Click Next
    console.log(`Current URL: ${page.url()}`);
    console.log('Searching for Next button...');
    // await page.screenshot({ path: 'step2_debug_full.png', fullPage: true }); 

    // Try to find ANY input or button
    const firstNameEl = page.locator('#first_name');
    if (await firstNameEl.isVisible()) {
        console.log('First Name Element HTML:', await firstNameEl.evaluate(el => el.outerHTML));
    } else {
        console.log('First Name Element NOT VISIBLE at this point');
    }

    // Deep dive into inputs using Playwright locators
    const inputsCount = await page.locator('input').count();
    console.log(`Inputs count via Playwright: ${inputsCount}`);
    for (let i = 0; i < inputsCount; i++) {
        const input = page.locator('input').nth(i);
        const type = await input.getAttribute('type');
        const id = await input.getAttribute('id');
        const value = await input.inputValue().catch(() => '');
        const visible = await input.isVisible();
        console.log(`Input ${i}: id=${id}, type=${type}, value=${value}, visible=${visible}`);
    }

    const buttonsCount = await page.locator('button').count();
    console.log(`Buttons count via Playwright: ${buttonsCount}`);
    for (let i = 0; i < buttonsCount; i++) {
        const button = page.locator('button').nth(i);
        const text = await button.innerText();
        const type = await button.getAttribute('type');
        const visible = await button.isVisible();
        console.log(`Button ${i}: text="${text}", type=${type}, visible=${visible}`);
    }

    // The button has value="Weite" (typo in source)
    const nextButton = page.locator('input[value="Weite"], input[value="Weiter"], input[type="submit"], button:has-text("Weite"), button:has-text("Weiter")').first();
    await expect(nextButton).toBeVisible({ timeout: 10000 });
    await nextButton.click();
    console.log('Clicked Next');

    // Wait for transition or errors
    await page.waitForTimeout(2000);
    const errorsList = await page.locator('p.text-red-500').allInnerTexts();
    if (errorsList.length > 0) {
        console.log('Validation errors found:', errorsList);
        await page.screenshot({ path: 'step2_errors.png', fullPage: true });
    }

    // Step 3: Upload Documents
    await expect(page.locator('text=Gewerbeanmeldung hochladen')).toBeVisible({ timeout: 15000 });
    console.log('Reached document upload step');
    
    // Mock Cloudinary upload
    await page.route('**/cloudinary.com/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          secure_url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        }),
      });
    });
    console.log('Mocked Cloudinary upload API');

    // Use a real 1x1 black PNG pixel as buffer
    const blackPixelPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );

    await page.setInputFiles('input[id="dropzone-file1"]', {
      name: 'trade-license.png',
      mimeType: 'image/png',
      buffer: blackPixelPng,
    });
    console.log('Set dummy file for upload');

    // Wait for image to appear in UI (alt="Bild hochgeladen 0")
    await page.waitForSelector('img[alt*="hochgeladen"]', { timeout: 20000 });
    console.log('File upload confirmed appearing in UI');

    await page.click('button:has-text("Registrieren")');
    console.log('Clicked Registrieren');

    // Should redirect to home or show success
    await expect(page).toHaveURL('/', { timeout: 30000 });
    console.log('Redirected back to /');

    // 4. Admin Login and Verification
    await page.goto('/');
    // Click login button in header (using more specific text selector)
    await page.click('header >> text="Anmelden"');
    console.log('Opened login modal');
    
    // Wait for modal to be visible
    await page.waitForSelector('form >> #email', { state: 'visible' });
    await page.fill('form >> #email', 'admin-test@oficios24.de');
    await page.fill('form >> #password', 'Admin123!');
    
    // Click the submit button inside the form specifically
    await page.click('form button[type="submit"]:has-text("Anmelden")');
    console.log('Submitted admin login');

    // Wait for the login modal to disappear (indicating success)
    await expect(page.locator('div[fixed].z-50')).not.toBeVisible({ timeout: 10000 });
    console.log('Login modal closed');

    // Manually navigate to admin dashboard to ensure we get there
    await page.goto('/dashboard/admin');
    await expect(page).toHaveURL(/.*dashboard\/admin/);
    console.log('Reached admin dashboard');
    
    // 5. Verify Handyman in Admin Panel
    await page.goto('/dashboard/admin/handymanverification');
    console.log('Navigated to handyman verification');
    await expect(page.locator(`text=${userEmail}`)).toBeVisible({ timeout: 15000 });
    console.log('Verified handyman email is visible in admin list');
  });
});
