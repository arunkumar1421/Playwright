const {test,expect} = require('@playwright/test');

test('Handle Inputbox', async({page})=>{

await page.goto('https://demoqa.com/automation-practice-form');

//await expect(page.getByRole('checkbox', {id: 'hobbies-checkbox-1'})).toBevisible()
await expect(page.getByRole('checkbox', {name:'Sports'})).toBeEnabled()

await page.getByRole('checkbox', {name: 'Sports'}).check()
await expect.soft(page.getByRole('checkbox', {name: 'Sports'})).toBeChecked()
  
  //handling multiple checkbox
  const checkbox=  page.locator("//div[@id='hobbiesWrapper']//input");
const count= await checkbox.count()
  for(let i =0;i<=count;i++)
  {
     //const cb = checkbox.nth(i);
    if(await checkbox.nth(i).isChecked())
    {
        await checkbox.nth(i).uncheck();
    }
    else{
        await checkbox.nth(i).check()
    }
  }

  await page.waitForTimeout(3000);

  // handling thought array
  /*const locator= [
    strore locators handles here and iterated as same
  ]*/


})