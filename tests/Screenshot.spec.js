
const {test,expect}= require('@playwright/test');

test('Screenshot Demo', async({page})=>{

    await page.goto("https://www.google.com/");
    await page.screenshot({path:'google.png'});

    //performing UI visual testing using toMatchSnapshot() 
    expect (await page.screenshot({path:'home.png'})).toMatchSnapshot('google.png');

})