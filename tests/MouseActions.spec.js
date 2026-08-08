
const {test,expect}= require('@playwright/test');

test('Mouse click actions', async({page})=>{

    await page.goto("https://vinothqaacademy.com/mouse-event/");

    /*click() defaults to left click.
    click({ button: 'right' }) simulates a right-click.
    You can also use await rightBtn.click({ button: 'middle' }) for middle-click.
    If you want to open the context menu and then select an option, you might need to wait for the menu to appear:
    Javascript

    await rightBtn.click({ button: 'right' });
    await page.getByRole('menuitem', { name: 'Copy' }).click();*/

    //double click
    const button= page.locator("#doubleBtn");
    await button.dblclick();

    // Right click action
    const rightbtn= page.getByRole('button', { name: 'Right Click Me' });
    await rightbtn.click({button :'right'});


    //Drag and drop
    const item= page.locator("#dragItem");
    const dropzone= page.locator("#dropZone");

    //There are 2 approach to do drap and drop action
    await item.hover();
    await page.mouse.down();

    await dropzone.hover();
    await page.mouse.up();

    //Hover() action
    const tooltip = page.locator("#tooltipTarget");
    await tooltip.hover();

    await page.waitForTimeout(3000);

})