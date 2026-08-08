const {test,expect} = require('@playwright/test')

test('Handling Autosuggest Dropdown', async({page})=>{

    await page.goto('https://www.redbus.in/');

    await page.getByLabel('From').fill("Kurnool");
    await page.waitForSelector("//div[@role='option']")
    

    const options= page.locator('//div[@role="option"]');
    await options.first().waitFor();
    const count=await options.count();
    console.log(count);

    const option_Array = await options.allTextContents()
   // console.log(option_Array)
    for(let i=0;i<count;i++)
    {
        const value= await options.nth(i).textContent();
        console.log(value)
        if(value.trim().includes('C.CAMP-KURNOOL, Anantapur (andhra pradesh'))
        {
            await options.nth(i).click();
            break;
        }
    }

    await page.waitForTimeout(3000);
})