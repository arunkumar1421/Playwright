const Exceljs = require('exceljs');
const {test,expect}= require('@playwright/test');

// Reading data from Excel file
async function readExcelFile(filepath, sheet) {
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filepath);
    const worksheet = workbook.getWorksheet(sheet);

    worksheet.eachRow((row, rowNumber) => {
        console.log(rowNumber);
        row.eachCell((cell, cellNumber) => {
            console.log(cell.value);

        })
    })
}

// Writing/changing data to file


async function writeExcelFile(filepath, sheet, searchText, replaceText) {
    let output = {};
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filepath);
    const worksheet = workbook.getWorksheet(sheet);
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, cellnumber) => {
            if (cell.value === searchText) {
                // console.log(rowNumber,cellnumber);
                //output={rowNumber,cellnumber};
                cell.value = replaceText;
            }
        })
    })

    //const cell= sheet.getCell(output.rowNumber,output.cellnumber);
    //cell.value= "Arun";
    await workbook.xlsx.writeFile(filepath);
    //return output;
}

test.only("Downloading and uplaoding excel File", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise= page.waitForEvent('download');
    await page.getByRole("button",{name:'Download'}).click();
    const download= await downloadPromise;
    const filepath= await download.path();
    await writeExcelFile(filepath,"Sheet1","Mango","king of Fruits");
    console.log("After changes:");
    await readExcelFile(filepath,"Sheet1");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filepath);
    const desiredLocation= await page.locator("#row-0");
    await expect(desiredLocation.getByText("King of Fruits")).toBeVisible();
    await page.waitForTimeout(3000);
    
});