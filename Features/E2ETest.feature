Feature: End to End test of placing order
    Scenario: Placing order and confirming order
        Given Login application with "arun098@gmail.com" and "Arun@123"
        When Add product "ZARA COAT 3" to cart
        Then confirm product "ZARA COAT 3" in cart
        When add the other deatils to place order
        Then Confrim the orderId
