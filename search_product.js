import { Builder, Browser, By, Key } from "selenium-webdriver";
import { expect } from "chai";

let driver = new Builder().forBrowser(Browser.CHROME).build();

const searchText = "MacBook";
const expectedProduct = "MacBook Pro";

async function searchTest() {
    await driver.manage().window().maximize();
    await driver.get("https://opencart.abstracta.us/");

    // Search
    await driver.findElement(By.name("search")).click();
    await driver.findElement(By.xpath("//input[@placeholder='Search']")).sendKeys(searchText, Key.ENTER);
    await driver.sleep(1000);

    // Product Collection Check using XPath
    const results = await driver.findElements(By.xpath("//div[contains(@class,'product-layout')]//div[contains(@class,'caption')]//h4/a"));

    let foundExpectedProduct = false;

    for (let i = 0; i < results.length; i++) {
        let productName = await results[i].getText();
        console.log("Found:", productName);

        try {
            expect(productName.toLowerCase()).to.contain(expectedProduct.toLowerCase());
            foundExpectedProduct = true;
            console.log("Expected product FOUND!");
            break;
        } catch (error) {
            console.log("This product does not match expected Product.");
        }
    }

    if (!foundExpectedProduct) {
        throw new Error(`Expected product '${expectedProduct}' not found in search results.`);
    }

    console.log("Test Passed: Expected product found.");
    await driver.sleep(2000);
    await driver.quit();
}

searchTest();
