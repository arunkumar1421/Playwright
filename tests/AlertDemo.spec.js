
const {test,expect}= require('@playwright/test');

test.only('Alert with OK', async({page})=>
{
    await page.goto("https://demoqa.com/alerts");

    page.on('dialog',async dailog=>{
        console.log( dailog.type());
        console.log( dailog.message());

        //Assetions
        await expect(dailog.type()).toContain('alert');
        await expect(dailog.message()).toContain("You clicked a button");

        await dailog.accept();
    })

    await page.locator('#alertButton').click();
});

test.skip('Confirmation alert', async({page})=>
{
    await page.goto("https://demoqa.com/alerts");

    page.on('dialog',async dailog=>{
        console.log(await dailog.type());
        console.log(await dailog.message());

        //Assetions
        await expect(dailog.type()).toBe('confirm');
        await expect(dailog.message()).toContain("Do you confirm action?");

      //  await dailog.accept();
        await dailog.dismiss();
    })

    await page.locator('#confirmButton').click();
    await expect(page.locator("#confirmResult")).toContainText('You selected Cancel');
});

test('Prompt alert', async({page})=>
{
    await page.goto("https://demoqa.com/alerts");

    page.on('dialog',async dailog=>{
        console.log(await dailog.type());
        console.log(await dailog.message());
        console.log(await dailog.defaultValue())


        //Assetions
        await expect(dailog.type()).toBe('prompt');
        await expect(dailog.message()).toContain("Please enter your name");
        await expect(dailog.defaultValue()).toBe("");
        await dailog.accept('Hanuman');
    })

    await page.locator('#promtButton').click();
    await expect(page.locator("#promptResult")).toContainText('You entered Hanuman');
});
