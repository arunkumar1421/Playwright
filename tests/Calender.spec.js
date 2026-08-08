const {test,expect}= require('@playwright/test');

test("Calender E2E test", async({page})=>
{
    const year="2027";
    const day= "21";
    const month= "9";
    const date= [month,day,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__decade-view__years__year").filter({hasText:year}).click();
    //  await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(month-1).click();
    await page.locator("//abbr[text()='"+day+"']").click();

    const setupDate= page.locator("[inputmode='numeric']");
    for(let i=0;i<date.length;i++)
    {
        const value= await setupDate.nth(i).inputValue();
        await expect(value).toEqual(date[i]);
        console.log(value);
    }
    await page.pause();


})