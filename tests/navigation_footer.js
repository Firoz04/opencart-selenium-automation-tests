import { Builder, Browser, By, until } from "selenium-webdriver";
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
      { main: "MP3 Players", sub: "Show All MP3 Players" },
    ];

    for (let item of navbarMenu) {
      // Click main menu
      const mainMenu = await driver.findElement(By.linkText(item.main));
      await mainMenu.click();
      await driver.sleep(1500);

      if (item.sub) {
        // Click submenu
        const submenuXPath = `//a[text()='${item.main}']/following-sibling::div//a[text()='${item.sub}']`;
        const submenu = await driver.wait(until.elementLocated(By.xpath(submenuXPath)),5000);
        await submenu.click();
      }

      await driver.sleep(1000);
      console.log(`Navbar "${item.main}" = Page Title: ${await driver.getTitle()}`);
      await driver.navigate().back();
      await driver.sleep(1500);
    }

    //FOOTER TEST
    const footerLinks = [
      "About Us",
      "Delivery Information",
      "Privacy Policy",
      "Terms & Conditions",
      "Contact Us",
      "Returns",
      "Site Map",
      "Brands",
      "Gift Certificates",
      "Affiliate",
      "Specials",
      "Order History",
      "Wish List",
      "Newsletter",
    ];

    for (let linkText of footerLinks) {
      try {
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");//Always scroll to bottom before clicking footer
        await driver.sleep(1000);
        const link = await driver.findElement(By.linkText(linkText));
        await link.click();
        await driver.wait(until.titleIs(await driver.getTitle()), 5000);
        const title = await driver.getTitle();
        await driver.sleep(1500);
        console.log(`Footer Link "${linkText}" = opens page with title: "${title}"`);
        await driver.navigate().back();
        await driver.sleep(1500);
      } catch (err) {
        console.log(`Footer Link "${linkText}" failed:`, err.message);
      }
    }

    console.log("\nNavigation & Footer Links Test Completed.");
  } catch (error) {
    console.log(" ERROR:", error);
  } finally {
    await driver.quit();
  }
}

navigationFooterTest();
