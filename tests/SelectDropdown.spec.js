
const {test,expect}= require('@playwright/test')

test('Handling Select DropDown', async({page})=>{

    await page.goto('https://www.globalsqa.com/demo-site/select-dropdown-menu/')

   const dropdown= page.locator("//div[@class='single_tab_div']//p//select");
   /* const options= page.locator("//div[@class='single_tab_div']//p//select//option");
   
   //recommended options
   //await dropdown.selectOption({label: 'India'});
   //await dropdown.selectOption('India');

   //not recomended
   //await dropdown.selectOption({value:'AND'})
   //await dropdown.selectOption({index:2})

   // count 
   const count= await options.count();
    console.log('Options count:',count);
    
    //all options text
    const option= await options.allTextContents()
    console.log(option); 

    //Assert 
   // await expect(options).toHaveCount(249)
   // await expect(count).toBe(249)

    // checking the presence of option
    await expect(option.includes('India')).toBeTruthy();

   */
   
    // using loop
    

    //using array
   /*  const optionarray= await page.$$("//div[@class='single_tab_div']//p//select//option");

     const c= await optionarray.length;
     console.log ("option array lenght:", c)

     let status = false;
     for(const option of optionarray)
     {
        const text= await option.textContent();
        if(text=='India')
        {
            status=true;
            await page.selectOption("//div[@class='single_tab_div']//p//select", {label:text});
            break;
        }
     }
     expect(status).toBeTruthy();

     await page.waitForTimeout(3000); */

     const options= await dropdown.textContent();
     console.log(options);
     console.log(await dropdown.count());





    


})