import { Builder, Browser, By, Key } from "selenium-webdriver";

let driver = new Builder().forBrowser(Browser.CHROME).build();

const searchText = "MacBook Air";

async function addToCartTest() {
    await driver.manage().window().maximize();
    await driver.get("https://opencart.abstracta.us/");

    // Search the product
    await driver.findElement(By.name("search")).click();
    await driver.findElement(By.xpath("//input[@placeholder='Search']")).sendKeys(searchText, Key.ENTER);
    await driver.sleep(2000);

    // Click on the product name
    const product = await driver.findElement(By.xpath(`//h4/a[contains(text(),'${searchText}')]`));
    await product.click();
    console.log("Clicked product, Going to details page.");
    await driver.sleep(2000);

    //add product quantity
    const quantityInput = await driver.findElement(By.name("quantity"));
    await quantityInput.click();
    await driver.sleep(500);
    await quantityInput.clear(); //remove default 1 quantity 
    await driver.sleep(500);
    const updatedQty = "2"; //set own quantity
    await quantityInput.sendKeys(updatedQty); 
    console.log(`Quantity updated to ${updatedQty}`);
    await driver.sleep(1000);

    //add to cart from details page
    const addToCartBtn = await driver.findElement(By.xpath("//button[contains(@id,'button-cart')]"));
    await addToCartBtn.click();
    console.log("Clicked Add to Cart from Details Page");
    await driver.sleep(2000);

    // Check cart count
    await driver.findElement(By.id("cart-total")).click();
    await driver.sleep(2000);

    const viewcart = await driver.findElement(By.xpath("//strong/i[contains(@class,'fa fa-shopping-cart')]"));
    await viewcart.click();
    await driver.sleep(3000);

    const continueShopping = await driver.findElement(By.xpath("//div/a[contains(@class,'btn btn-default')]"));
    await continueShopping.click();

    await driver.sleep(1000);
    await driver.quit();
}

addToCartTest();
