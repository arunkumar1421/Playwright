# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: E2ETest.spec.js >> End to End Testing
- Location: tests\E2ETest.spec.js:4:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.infoWrap').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | 
  2  | const {test,expect}= require('@playwright/test');
  3  | 
  4  | test ("End to End Testing", async({page})=>
  5  | {
  6  |     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  7  | 
  8  |     await page.locator("#userEmail").fill("arun098@gmail.com");
  9  |     await page.locator("#userPassword").fill("Arun@123");
  10 |     await page.locator("#login").click();
  11 | 
  12 |     const productName='ZARA COAT 3';
  13 |     await page.waitForLoadState("networkidle");
  14 |     const products= page.locator(".card-body");
  15 |     const count= await products.count();
  16 | 
  17 |     for(let i=0;i<count;i++)
  18 |     {
  19 |         const text= await products.nth(i).locator("b").textContent();
  20 |         if(text===productName)
  21 |         {
  22 |             await products.nth(i).locator("text= Add To Cart").click();
  23 |             break;
  24 |         }
  25 |     }
  26 | 
  27 |     await page.locator("[routerlink*='cart']").click();
> 28 |    await page.locator(".infoWrap").first().waitFor();
     |                                            ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  29 | 
  30 |   // await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();
  31 | 
  32 |    const cartProduct=  page.locator(".cart .infoWrap");
  33 |    const cartCount= await cartProduct.count();
  34 | 
  35 |    console.log(cartCount);
  36 |    for(let i=0;i<cartCount;i++)
  37 |    {
  38 |     const text1= await cartProduct.nth(i).locator("h3").textContent();
  39 |     
  40 |     if(text1===productName)
  41 |     {
  42 |         await cartProduct.nth(i).locator(".btn-primary").click();
  43 |         break;
  44 |     }
  45 | 
  46 |    }
  47 |     /*await page.locator("div li").first().waitFor();
  48 |    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  49 |    expect(bool).toBeTruthy();
  50 |    await page.locator("text=Checkout").click();*/
  51 | 
  52 |    await page.getByPlaceholder('Select Country').pressSequentially('ind',{delay:150});
  53 |    await page.locator(".ta-results").waitFor();
  54 |    const option = page.locator(".ta-results button");
  55 |    const Optcount = await option.count();
  56 |    const targetOption= ' India';
  57 | 
  58 |    for(let i=0;i<Optcount;i++)
  59 |    {
  60 |      if (targetOption===await option.nth(i).textContent())
  61 |      {
  62 |         await option.nth(i).click();
  63 |         break;
  64 |      }
  65 |     
  66 |    }
  67 |    await page.locator(".action__submit").click();
  68 | 
  69 |      await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
  70 | 
  71 |      console.log(" Thankyou for the order. ");
  72 | 
  73 |      const orderId= await page.locator("label[class='ng-star-inserted']").textContent();
  74 |      await page.getByRole("button",{name:'  ORDERS'}).click();
  75 | 
  76 |      await page.locator("tbody .ng-star-inserted").first().waitFor();
  77 |      const orders= page.locator("tbody .ng-star-inserted");
  78 |      const ordercount= await orders.count();
  79 |      console.count("ordercount:",ordercount);
  80 | 
  81 |      for(let i=0;i<ordercount;i++)
  82 |      {
  83 |         if(orderId.includes(await orders.nth(i).locator("th").textContent()))
  84 |         {
  85 |             await orders.nth(i).locator(".btn-primary").click();
  86 |             break;
  87 |         }
  88 |      }
  89 | 
  90 |      await page.locator(".col-text").waitFor();
  91 |      const orderIdDetails= await page.locator(".col-text").textContent();
  92 |      console.log("Order Id Details:", orderIdDetails)
  93 | 
  94 |      await expect(orderId.includes(orderIdDetails)).toBeTruthy();
  95 | 
  96 | 
  97 | 
  98 | })
```