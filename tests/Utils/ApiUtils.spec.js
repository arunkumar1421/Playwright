
class ApiUtils
{
    
    constructor(apiContext,loginPayload)
    {
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }
    async getToken()
    {
        const loginResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            })
            const jsonResponse= await loginResponse.json();
            const token= jsonResponse.token;
            console.log(token);
            return token;
    }

    async createOrder(orderPayload)
    {
       // let response={}; is used to store all the return data instead returning one by one 
       // response.token=await this.getToken();
        const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
       {
            data: orderPayload,
            headers:{
             //   'authorization': response.token, this using object to return all varibles to next test
                'authorization': await this.getToken(),
                'content-type': "application/json",
            }
        })

        
        const orderResponseJson= await orderResponse.json();
        console.log(orderResponseJson);
        const orderId= orderResponseJson.orders[0];
        console.log(orderId);
        //response.orderId= orderId;
        //return response.orderId;
        return orderId;

    }
}

module.exports={ApiUtils};