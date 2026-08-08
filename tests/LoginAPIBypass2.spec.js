
const {test,expect}= require('@playwright/test');
let stateContext;

test.beforeAll(async({browser})=>{

    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("arun098@gmail.com");
    await page.locator("#userPassword").fill("Arun@123");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
   await context.storageState({path:'state.json'});
   stateContext= await browser.newContext({storageState:'state.json'});
})

test ("End to End Testing", async()=>
{

    const page= await stateContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const productName='ZARA COAT 3';
    await page.waitForLoadState("networkidle");
    const products= page.locator(".card-body");
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

    await page.locator("[routerlink*='cart']").click();
   await page.locator(".infoWrap").first().waitFor();

  // await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

   const cartProduct=  page.locator(".cart .infoWrap");
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
    /*await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();*/

   await page.getByPlaceholder('Select Country').pressSequentially('ind',{delay:150});
   await page.locator(".ta-results").waitFor();
   const option = page.locator(".ta-results button");
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
   await page.locator(".action__submit").click();

     await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

     console.log(" Thankyou for the order. ");

     const orderId= await page.locator("label[class='ng-star-inserted']").textContent();
     await page.getByRole("button",{name:'  ORDERS'}).click();

     await page.locator("tbody .ng-star-inserted").first().waitFor();
     const orders= page.locator("tbody .ng-star-inserted");
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

     await page.locator(".col-text").waitFor();
     const orderIdDetails= await page.locator(".col-text").textContent();
     console.log("Order Id Details:", orderIdDetails)

     await expect(orderId.includes(orderIdDetails)).toBeTruthy();



})
