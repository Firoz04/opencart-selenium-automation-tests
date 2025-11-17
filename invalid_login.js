import { Builder, Browser, By,} from "selenium-webdriver";

let driver = new Builder().forBrowser(Browser.CHROME).build();

async function invalidLoginTest() {
    try {
        await driver.manage().window().maximize();
        await driver.get("https://opencart.abstracta.us/");

        // Go to Login page
        const myAccount = await driver.findElement(By.xpath("//span[text()='My Account']"));
        await myAccount.click();
        await driver.sleep(2000);

        const loginLink = await driver.findElement(By.xpath("//a[text()='Login']"));
        await loginLink.click();
        await driver.sleep(2000);

        // Enter invalid credentials
        await driver.findElement(By.name("email")).sendKeys("wrong@example.com");
         await driver.sleep(1000);
        await driver.findElement(By.name("password")).sendKeys("wrongpassword");
        await driver.sleep(2000);

        // Click Login
        const loginBtn = await driver.findElement(By.xpath("//input[@value='Login']"));
        await loginBtn.click();
        await driver.sleep(2000);

        // Verify error message
        const warningMsg = await driver.findElement(By.css(".alert-danger"));
        const text = await warningMsg.getText();
        await driver.sleep(3000);

        if (text.includes("Warning: No match for E-Mail Address and/or Password.")) {
            console.log("TEST PASSED: Correct error message displayed for invalid login.");
        } else {
            console.log("TEST FAILED: Error message not found.");
        }
        
    } catch (error) {
        console.log("ERROR:", error);
    } finally {
        await driver.quit();
    }
}

invalidLoginTest();
