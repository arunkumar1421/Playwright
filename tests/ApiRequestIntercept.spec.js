const { test, expect } = require('@playwright/test');

test.use({ ignoreHTTPSErrors: true });

test('@Api Api Request Intercept', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator("#userEmail").fill("arun098@gmail.com");
    await page.locator("#userPassword").fill("Arun@123");
    await page.locator("#login").click();
    await page.getByRole("button", { name: '  ORDERS' }).click();

    await page.locator("tbody .ng-star-inserted").first().waitFor();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async (route) => {
            await route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a56756185b8849b49e9e6e4" })
        }
    );
    await page.locator("button:has-text('View')").first().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*");
    await page.pause();

});