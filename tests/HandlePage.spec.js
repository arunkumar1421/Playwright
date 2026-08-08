
const{test,expect, chromium}=require('@playwright/test')

test('Handling multiple pages', async()=>{

    const browser= await chromium.launch();
    const context= await browser.newContext();

    const page1= await context.newPage();
    const page2= await context.newPage();

    const allPages= context.pages();
    console.log('No.of pages:',allPages);

// two different pages
   await  page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
   await page2.goto("https://orangehrm.com/")

   await page1.waitForTimeout(3000)
})

test.only('Handling new pages', async()=>{

    const browser= await chromium.launch();
    const context= await browser.newContext();

    const page= await context.newPage();

// two different pages
   await  page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

   const promise=  context.waitForEvent('page');
  await page.locator("//a[normalize-space()='OrangeHRM, Inc']").click();

  const newPage= await promise;
  console.log(await newPage.title());

  await page.bringToFront();
  console.log(await page.title());
  await page.locator("//input[@placeholder='Username']").fill("Admin");
  await expect(page.locator("//input[@placeholder='Username']")).toHaveValue("Admin");

   await page.waitForTimeout(3000)
})