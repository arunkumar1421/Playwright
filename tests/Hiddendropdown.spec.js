const {test, expect}= require("@playwright/test");

test ('Hidden dropdown', async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.fill("//input[@placeholder='Username']",'Admin');
    await page.fill("//input[@placeholder='Password']",'admin123');
    await page.click("//button[@type='submit']");

    await page.getByRole('link',{name:'PIM'}).click();
    
    const dropdown = page.locator('.oxd-select-text').nth(2);
    await dropdown.click();

    await page.waitForSelector("//div[@role='listbox']//span");
    await expect(page.getByRole('listbox')).toBeVisible();
    const options= await page.$$("//div[@role='listbox']//span")
    const count= await options.length;
     console.log(count);
    for(const option of options)
    {
        const value= await option.textContent();
       // console.log(value);
       if(value.includes("QA Engineer"))
       {
        option.click();
       }

    }
    
})