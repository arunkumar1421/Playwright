const { Given, Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('Login application with {string} and {string}', async function (email, password) {
    // Write code here that turns the phrase above into concrete actions
    const browser = await playwright.chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    this.page=page;
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await this.page.locator("#userEmail").fill(email);
    await this.page.locator("#userPassword").fill(password);
    await this.page.locator("#login").click();

});

When('Add product {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
     await this.page.waitForLoadState("networkidle");
    const products= this.page.locator(".card-body");
    const count= await products.count();

    for(let i=0;i<count;i++)
    {
        const text= await products.nth(i).locator("b").textContent();
        if(text===productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
});

Then('confirm product {string} in cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
await this.page.locator("[routerlink*='cart']").click();
   await this.page.locator(".infoWrap").first().waitFor();
  // await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

   const cartProduct=  this.page.locator(".cart .infoWrap");
   const cartCount= await cartProduct.count();

   console.log(cartCount);
   for(let i=0;i<cartCount;i++)
   {
    const text1= await cartProduct.nth(i).locator("h3").textContent();
    
    if(text1===productName)
    {
        await cartProduct.nth(i).locator(".btn-primary").click();
        break;
    }

   }
});

When('add the other deatils to place order', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.page.getByPlaceholder('Select Country').pressSequentially('ind',{delay:150});
   await this.page.locator(".ta-results").waitFor();
   const option = this.page.locator(".ta-results button");
   const Optcount = await option.count();
   const targetOption= ' India';

   for(let i=0;i<Optcount;i++)
   {
     if (targetOption===await option.nth(i).textContent())
     {
        await option.nth(i).click();
        break;
     }
    
   }
   await this.page.locator(".action__submit").click();
});

Then('Confrim the orderId',async function(){
    
     await expect(this.page.getByText(" Thankyou for the order. ")).toBeVisible();

     console.log(" Thankyou for the order. ");

     const orderId= await this.page.locator("label[class='ng-star-inserted']").textContent();
     await this.page.getByRole("button",{name:'  ORDERS'}).click();

     await this.page.locator("tbody .ng-star-inserted").first().waitFor();
     const orders= this.page.locator("tbody .ng-star-inserted");
     const ordercount= await orders.count();
     console.count("ordercount:",ordercount);

     for(let i=0;i<ordercount;i++)
     {
        if(orderId.includes(await orders.nth(i).locator("th").textContent()))
        {
            await orders.nth(i).locator(".btn-primary").click();
            break;
        }
     }

     await this.page.locator(".col-text").waitFor();
     const orderIdDetails= await this.page.locator(".col-text").textContent();
     console.log("Order Id Details:", orderIdDetails)

     await expect(orderId.includes(orderIdDetails)).toBeTruthy();
})
