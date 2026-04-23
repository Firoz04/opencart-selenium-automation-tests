# OpenCart Selenium WebDriver Automation

This project contains **Selenium automation scripts** for the OpenCart website using **Selenium WebDriver**, **JavaScript (Node.js)**. There **Chai** for assertions. All file names and structure remain exactly as in the repository.  OpenCart website:

 👉 http://opencart.abstracta.us/

## 📂 Project Structure

opencart-selenium-automation-tests/

│

├── tests/                          # All test scripts

│   ├── add_to_cart.js

│   ├── checkout_flow_guest.js

│   ├── invalid_login.js

│   ├── navigation_footer.js

│   ├── register_and_valid_login_logout.js

│   ├── search_product.js

│   └── wishlist.js

├── package.json

├── package-lock.json

└── README.md

## ⚙️ Installation & Setup
### 1️⃣ Clone the Repository
```
git clone <repo-url>
cd <project-folder>
```
### 2️⃣ Install Dependencies
```
npm install selenium-webdriver chai
```
### 3️⃣ Run Any Test Script
```
node <file name>.js
npm run testAll  #All test run  
```


## 🔍 Test Case Overview

| File  | Description |
|---------------|-------------|
|`invalid_login.js` |	Tests invalid login attempts and checks for error messages  |
|`register_and_valid_login_logout.js`	    |       Tests user registration, valid login, and logout flows |
|`search_product.js`	 |   Tests product search functionality |
|`add_to_cart.js`	 |   Tests adding products to the cart |
|`wishlist.js`   |  	Tests wishlist features |
|`navigation_footer.js`	 | Verifies navigation and footer links |
|`checkout_flow_guest.js`	  |  Tests guest checkout process |

## 👤 Author

Md. Firoz Hasan  
GitHub: [Firoz04](https://github.com/Firoz04)


