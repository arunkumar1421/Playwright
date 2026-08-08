const {test, expect,request}= require('@playwright/test');

const loginData= {userEmail:"arun098@gmail.com",userPassword:"Arun@123"};
const orderPayload= {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;
test.beforeAll(async() =>
{
    const apiContext= await request.newContext({
        ignoreHTTPSErrors: true
    });
   const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginData
    })

    expect(loginResponse.ok()).toBeTruthy();
    const jsonResponse= await loginResponse.json();
    token= jsonResponse.token;
    console.log(token);


    const orderResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
{
    data: orderPayload,
    headers:{'authorization': token,
        'content-type': "application/json",
    }
})

const orderResponseJson= await orderResponse.json();
console.log(orderResponseJson);
 orderId= orderResponseJson.orders[0];
console.log(orderId);


})

test('Client login bypass',async({page})=>{

    await page.addInitScript(value=>{
    window.localStorage.setItem('token',value)}, token);
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    
    await page.getByRole("button",{name:'  ORDERS'}).click();

     await page.locator("tbody .ng-star-inserted").first().waitFor();
     const orders= page.locator("tbody .ng-star-inserted");
     const ordercount= await orders.count();
     console.count("ordercount:",ordercount);

     for(let i=0;i<ordercount;i++)
     {
        if(orderId.includes(await orders.nth(i).locator("th").textContent()))
        {
            await orders.nth(i).locator(".btn-primary").click();
            break;
        }
     }

     await page.locator(".col-text").waitFor();
     const orderIdDetails= await page.locator(".col-text").textContent();
     console.log("Order Id Details:", orderIdDetails)

     await expect(orderId.includes(orderIdDetails)).toBeTruthy();

    await page. pause();
})