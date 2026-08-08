/*
Assertions are validation checks in tests
They compare actual vs expected behavior
Without assertions → test is just automation (not validation)

Playwright’s assertion system is:
Key features: 
1. Auto‑retrying (Web‑first) assertions
    Most Playwright assertions automatically retry until:
    the condition passes, or
    a timeout is reached (default ~5 seconds). [playwright.dev]
    This makes tests stable and less flaky, especially for dynamic UIs.
2. Built‑in waiting
    Assertions auto-wait instead of failing immediately
    Eliminates need for manual waits (sleep, waitForTimeout)Built-in (expect)
    Default assertion timeout: 5 seconds
    Auto-waiting & retrying
3. built-in expect
Focused on UI, page, API, and value checks
Designed to reduce flakiness and improve test reliability
*/

const{test,expect} = require('@playwright/test');
const { waitForDebugger } = require('node:inspector');

test('Assertions Demo', async({page})=>{

    await page.goto("https://demoqa.com/automation-practice-form");
   /* await page.getByRole('textbox', {name: 'FirstName'}).fill('Arun ');
    await page.getByRole('textbox', {name: 'LastName'}).fill('Kumar');
    await page.locator('#Email').fill('test123@gmail.com');
    await page.getByRole('checkbox', {type : 'checkbox'}).uncheck();
    
    await page.fill('#Password','Test@123');
    await page.fill('#ConfirmPassword' , 'Test@123');
    await page.getByRole('button',{id : 'register-button'}).click();*/

    // toHaveURL()
    await expect(page).toHaveURL('https://demoqa.com/automation-practice-form');

    //toHaveTitle()
    await expect(page).toHaveTitle('demosite');

    //await expect(locator).toBeVisible()
    await expect(page.getByRole('heading',{name:'Practice Form'})).toBeVisible();
     

    //toBeChecked()
    const male=await page.locator("#gender-radio-1").check()
    await expect(page.locator("#gender-radio-1")).toBeChecked();

    //await expect(locator).toBeDisabled()
    await expect.soft(page.getByText('Select City', { exact: true })).toBeDisabled();

    //toBeEditable()
    await expect(page.getByPlaceholder('Mobile Number')).toBeEditable();

    //toBeEnabled()
    await expect(page.locator('#firstName')).toBeEnabled();

    //toHaveText()
    await expect(page.getByRole('button', {name: 'Submit'})).toHaveText('Submit');


    page.close();


})