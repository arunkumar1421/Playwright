
const{test,expect} = require('@playwright/test')

test('Handling Multiselect Dropdown', async({page})=>{

    await page.goto('https://semantic-ui.com/modules/dropdown.html');

    const dropdown=  page.locator("//div[@class='ui fluid dropdown selection multiple']");
    await dropdown.click();
    //const option= page.locator("//div[@class='ui fluid dropdown selection multiple upward']//div[@class='item']");
   const option = dropdown.locator('.item');
   await options.first().waitFor();
    const count= await option.count();
    console.log("No.of.Options:", count);

    //selecting multiple elemnts
    for(let i=0;i<count;i++)
    {
        const value= await option.nth(i).textContent();
        if(value=='HTML'||value=='Meteor')
        {
            await option.nth(i).click();
        }
    }

    await page.waitForTimeout(7000);

    
})