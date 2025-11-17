import { Builder, Browser, By, Key } from "selenium-webdriver";

let driver = new Builder().forBrowser(Browser.CHROME).build();

async function registerAndLoginTest() {
    try {
        await driver.manage().window().maximize();
        await driver.get("https://opencart.abstracta.us/");

        //Go to Register page
        const myAccountNav = await driver.findElement(By.xpath("//span[text()='My Account']"));
        await myAccountNav.click();
        await driver.sleep(2000);

        const registerLink = await driver.findElement(By.xpath("//a[text()='Register']"));
        await registerLink.click();
        await driver.sleep(2000);

        // Fill Registration Form
        const timestamp = new Date().getTime(); // unique email
        const email = `user${timestamp}@example.com`;
        await driver.sleep(2000);

        await driver.findElement(By.name("firstname")).sendKeys("Firoz");
        await driver.sleep(1000);
        await driver.findElement(By.name("lastname")).sendKeys("Hasan");
        await driver.sleep(1000);
        await driver.findElement(By.name("email")).sendKeys(email);
        await driver.sleep(1000);
        await driver.findElement(By.name("telephone")).sendKeys("123456789");
        await driver.sleep(1000);
        await driver.findElement(By.name("password")).sendKeys("Test@1234");
        await driver.sleep(1000);
        await driver.findElement(By.name("confirm")).sendKeys("Test@1234");
        await driver.sleep(2000);

        const agree = await driver.findElement(By.name("agree"));
        await agree.click();
        await driver.sleep(1000);

        const continueBtn = await driver.findElement(By.xpath("//input[@value='Continue']"));
        await continueBtn.click();
        console.log("Account registered successfully");
        await driver.sleep(3000);

        // Logout after registration
        const logout = await driver.findElement(By.xpath("//div/a[contains(.,'Logout')]"));
        await logout.click();
        console.log("Logged out after registration");
        await driver.sleep(2000);

        // Login with new account
        const myAccountNav2 = await driver.findElement(By.xpath("//span[text()='My Account']"));
        await myAccountNav2.click();
        await driver.sleep(2000);

        const loginLink = await driver.findElement(By.xpath("//a[text()='Login']"));
        await loginLink.click();
        await driver.sleep(2000);

        await driver.findElement(By.name("email")).sendKeys(email);
        await driver.findElement(By.name("password")).sendKeys("Test@1234");
        await driver.findElement(By.xpath("//input[@value='Login']")).click();
        console.log("Login successful for registered user");
        await driver.sleep(3000);

        // Logout again after login
        const myAccountNav3 = await driver.findElement(By.xpath("//span[text()='My Account']"));
        await myAccountNav3.click();
        await driver.sleep(1000);

        const logoutLink2 = await driver.findElement(By.xpath("//a[text()='Logout']"));
        await logoutLink2.click();
        console.log("Logged out after login");
        await driver.sleep(2000);
        await driver.findElement(By.className('btn btn-primary')).click();
        await driver.sleep(1000);
    } catch (error) {
        console.log("ERROR:", error);
    } finally {
        await driver.quit();
    }
}

registerAndLoginTest();
