const {test,expect} = require('@playwright/test');

test('LocatorDemo', async({page})=>{

    await page.goto("https://demoblaze.com/");

    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("pavanol");
    await page.locator("#loginpassword").fill("test@123");
    await page.locator("//button[normalize-space()='Log in']").click();
    const logout= await page.locator("#logout2");
    await expect(logout).toBeVisible();

    // locating multiple elements
  // const product_list= await page.$$("//div[@id='tbodyid']//div//h4/a");
  const products_list= await page.locator("//div[@id='tbodyid']//div//h4/a");
  const count= await products_list.count();
  const textx= await products_list.allTextContents();
 await console.log("products count:"+count);
  await console.log("products:"+ textx);

  /* for(const product of products_list)
   {
       const text = await product.textContent();
       console.log(text);

   }*/

    await page.close();
});
