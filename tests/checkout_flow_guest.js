import { Builder, Browser, By, Key, until } from "selenium-webdriver";

let driver = new Builder().forBrowser(Browser.CHROME).build();

async function guestCheckoutTest() {
    try {
        await driver.manage().window().maximize();
        await driver.get("https://opencart.abstracta.us/");
        
        // Search Product
        const searchProduct = "iphone";
        await driver.findElement(By.name("search")).click();
        await driver.findElement(By.xpath("//input[@placeholder='Search']")).sendKeys(searchProduct, Key.ENTER);
        await driver.sleep(2000);

        // Click product
        const product = await driver.findElement(By.xpath("//div/a[contains(@href,'search=iphone')]"));
        await product.click();
        await driver.sleep(2000);

        // Add to Cart
        const addToCartBtn = await driver.findElement(By.id("button-cart"));
        await addToCartBtn.click();
        await driver.sleep(2000);

        // Go to Cart
        await driver.findElement(By.id("cart-total")).click();
        await driver.sleep(2000);
        const Checkout = await driver.findElement(By.xpath("//strong/i[contains(@class,'fa fa-share')]"));
        await Checkout.click();
        await driver.sleep(2000);

        //Guest Checkout Option
        const guestRadio = await driver.findElement(By.xpath("//input[@value='guest']"));
        await guestRadio.click();
        await driver.sleep(2000);

        const guestContinue = await driver.findElement(By.id("button-account"));
        await guestContinue.click();
        console.log("Selected Guest Checkout");
        await driver.sleep(2000);

        //Billing Details
        await driver.wait(until.elementLocated(By.id("input-payment-firstname")));
        await driver.sleep(10000);

        const firstname = await driver.findElement(By.id("input-payment-firstname"));
        await firstname.sendKeys("Firoz");
        await driver.sleep(1500);
        const lastname = await driver.findElement(By.id("input-payment-lastname"));
        await lastname.sendKeys("Hasan");
        await driver.sleep(1500);
        const email = await driver.findElement(By.id("input-payment-email"));
        await email.sendKeys("guest@example.com");
        await driver.sleep(1500);
        const phone = await driver.findElement(By.id("input-payment-telephone"));
        await phone.sendKeys("123456789");
        await driver.sleep(1500);
        await driver.findElement(By.id("input-payment-address-1")).sendKeys("123 Test Street");
        await driver.sleep(1500);
        await driver.findElement(By.id("input-payment-city")).sendKeys("Dhaka");
        await driver.sleep(1500);
        await driver.findElement(By.id("input-payment-postcode")).sendKeys("1200");
        await driver.sleep(1500);
        await driver.findElement(By.id("input-payment-country")).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath("//option[contains(text(),'Bangladesh')]")).click();
        await driver.sleep(1500);
        await driver.findElement(By.id("input-payment-zone")).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath("//option[contains(text(),'Dhaka')]")).click();
        await driver.sleep(1000);
        
        // Continue Billing
        const billingContinue = await driver.findElement(By.id("button-guest"));
        await billingContinue.click();
        console.log("Billing details submitted");
        await driver.sleep(2000);
     
        // Delivery Method
        await driver.findElement(By.id("button-shipping-method")).click();
        console.log("Shipping method continued");
        await driver.sleep(2000);

        // Payment Method
         const paymentRadio = await driver.findElement(By.xpath("//input[@value='cod']"));
        await paymentRadio.click();
        await driver.sleep(1000);
        const agreeTerms = await driver.findElement(By.name("agree"));
        await agreeTerms.click();
        await driver.sleep(1000);

        await driver.findElement(By.id("button-payment-method")).click();
        console.log("Payment method continued");
        await driver.sleep(3000);

        // Confirm Order
        await driver.findElement(By.id("button-confirm")).click();
        console.log("Order Confirmed... waiting for success page");
        await driver.sleep(5000);

        // Verify Success Page
        const successMsg = await driver.findElement(By.xpath("//h1[contains(text(),'Your order has been placed!')]"));
        const text = await successMsg.getText();

        if (text.includes("Your order has been placed!")) {
            console.log("TEST PASSED: Order placed successfully!");
        } else {
            console.log("TEST FAILED: Order success message not found.");
        }

        await driver.sleep(3000);
    } catch (error) {
        console.log("ERROR:", error);
    } finally {
        await driver.quit();
    }
}

guestCheckoutTest();
