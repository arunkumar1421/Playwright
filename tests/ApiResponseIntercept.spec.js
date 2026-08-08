const {test,expect,request} = require('@playwright/test');
const fakebody= {data:[],message:"No Orders"};

test.use({ ignoreHTTPSErrors: true });

test('@Api Api response Intercept', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator("#userEmail").fill("arun098@gmail.com");
    await page.locator("#userPassword").fill("Arun@123");
    await page.locator("#login").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
       async route=>{
            const response= await page.request.fetch(route.request());
            let body=JSON.stringify(fakebody);
            await route.fulfill({
                response,
                body
        })

});

 await page.getByRole("button",{name:'  ORDERS'}).click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
   await page.pause();
    console.log(await page.locator(".mt-4").textContent());

});