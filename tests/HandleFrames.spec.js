const {test,expect} = require('@playwright/test');

test.skip('Hnadle Frames', async({page})=>
{
    await  page.goto("https://demo.automationtesting.in/Frames.html");

   // Approach 1 using frame name or src
   // await page.frame("SingleFrame").locator("input[type='text']").fill("Welcome");
   // await page.frame({url:'SingleFrame.html'}).locator("input[type='text']").fill("Welcome"); 

   //recomended pattern use frameLocator()
   const frame= await page.frameLocator("#singleframe");
   await frame.locator("input[type='text']").fill('Welcome');

    await page.waitForTimeout(3000);

})

test('Handle inner or nested Frames', async({page})=>
{
    await  page.goto("https://demo.automationtesting.in/Frames.html");

   //recomended pattern use frameLocator()
   await page.getByRole('link',{name:'Iframe with in an Iframe'}).click()
  const frame = page.frame({ url: /MultipleFrames\.html/ });
   console.log(frame);
   console.log(typeof(frame));

   //get the inner frames using childFrames()
   const childframe=  frame.childFrames();
   // loacte an element
   childframe[0].locator("input[type='text']").fill("welcome");

    await page.waitForTimeout(3000);

})