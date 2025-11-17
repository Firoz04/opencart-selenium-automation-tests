
import { Builder, Browser, By, until} from "selenium-webdriver";
let driver = new Builder().forBrowser(Browser.CHROME).build();
async function navigationFooterTest() {
    try {
        await driver.get("https://opencart.abstracta.us/");
        await driver.manage().window().maximize();
        
        //NAVBAR TEST
        const navbarMenu = [
            { main: "Desktops", sub: "Show All Desktops" },
            { main: "Laptops & Notebooks", sub: "Show All Laptops & Notebooks" },
            { main: "Components", sub: "Show All Components" },
            { main: "Tablets" },
            { main: "Software" },
            { main: "Phones & PDAs" },
            { main: "Cameras" },
            { main: "MP3 Players" },
        ];

        for (let item of navbarMenu) {
            // Click main menu
            const mainMenu = await driver.findElement(By.linkText(item.main));
            await mainMenu.click();
            await driver.sleep(1500);

            if (item.sub) {
                // Click submenu 
                const submenuXPath = `//a[text()='${item.main}']/following-sibling::div//a[text()='${item.sub}']`;

                const submenu = await driver.wait(until.elementLocated(By.xpath(submenuXPath)), 5000);
                await submenu.click();
            }

            await driver.sleep(2000);
            console.log(`Navbar "${item.main}" = Page Title: ${await driver.getTitle()}`);
            await driver.navigate().back();
            await driver.sleep(1500);
        }

    } catch (error) {
        console.log(" ERROR:", error);
    } finally {
        await driver.quit();
    }
}

navigationFooterTest();
