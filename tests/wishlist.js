import { Builder, Browser, By, Key, until } from "selenium-webdriver";

let driver = new Builder().forBrowser(Browser.CHROME).build();

async function wishlistTest() {
    try {
        await driver.manage().window().maximize();
        await driver.get("https://opencart.abstracta.us/");

        const searchProduct = "iPhone";

        // Search
        await driver.findElement(By.name("search")).sendKeys(searchProduct, Key.ENTER);
        await driver.sleep(2000);

        // Find correct product by name
        const productXpath = `//a[contains(text(), '${searchProduct}')]`;
        await driver.wait(until.elementLocated(By.xpath(productXpath)), 10000);

        const productElement = await driver.findElement(By.xpath(productXpath));
        const productName = await productElement.getText();

        console.log("Found Product:", productName);

        await productElement.click();
        await driver.sleep(1500);

        // Add to Wishlist
        const wishlistBtn = await driver.findElement(By.xpath("//button/i[contains(@class,'fa-heart')]"));
        await wishlistBtn.click();
        await driver.sleep(2000);
        console.log(`Added to Wishlist: ${productName}`);

        // Go to Wishlist
        await driver.findElement(By.id("wishlist-total")).click();
        await driver.sleep(2000);

        // Login
        await driver.findElement(By.name("email")).sendKeys("firozhasan@gmail.com");
        await driver.findElement(By.name("password")).sendKeys("1234567");
        await driver.findElement(By.xpath("//input[@value='Login']")).click();
        await driver.sleep(2000);

        // Wishlist Verification
        const wishlistItem = await driver.findElement(By.xpath("//table//a[contains(@href,'product')]"));
        const wishlistName = await wishlistItem.getText();

        if (wishlistName.includes(productName)) {
            console.log(`Wishlist Verified: ${wishlistName}`);
        } else {
            console.log(`Mismatch! Wishlist shows: ${wishlistName}`);
        }

        // Remove
        const removeBtn = await driver.findElement(By.css("a.btn-danger"));
        await removeBtn.click();
        await driver.sleep(2000);

        console.log(`Removed from Wishlist: ${productName}`);

    } catch (error) {
        console.log("ERROR:", error);
    } finally {
        await driver.quit();
    }
}

wishlistTest();
