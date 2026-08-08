const {test,expect} = require('@playwright/test');
const { url } = require('node:inspector');

test('SampleTest',async({page})=>{
    
    await page.goto("https://demoblaze.com/");

    const page_title= await page.title();

    await expect(page).toHaveTitle(page_title);
    console.log("Page title is:",page_title);

    const page_url= await page.url();

   await expect(page).toHaveURL(page_url);
    console.log('Current page URL is: ',page_url);

})