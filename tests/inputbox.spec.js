
const {test,expect} = require('@playwright/test');

test('Handle Inputbox', async({page})=>{

    await page.goto('https://demoqa.com/automation-practice-form');
    //assertion on input box
    await expect(page.locator('#firstName')).toBeEmpty()
    await expect(page.locator('#firstName')).toBeVisible()
    await expect(page.locator('#firstName')).toBeEnabled()
    await expect(page.locator('#firstName')).toBeEditable()

    await page.fill('#firstName','Arun');
    
    await expect.soft(page.locator('#firstName')).toHaveValue('Arun');
   // await page.locator('#firstName').fill('Arun');
    
})