# SauceDemo Automation Tests using Playwright

This repository contains end-to-end automated tests for the SauceDemo website using Playwright and JavaScript. The tests cover typical user actions, including login, product sorting, adding/removing items from the cart, checkout, and logout.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running Tests](#running-tests)
5. [Test Scenarios](#test-scenarios)
6. [Viewing the HTML Report](#viewing-the-html-report)
7. [Challenges and Solutions](#challenges-and-solutions)
8. [Author](#author)

---

## Project Overview
This automation project validates the functionality of SauceDemo's e-commerce features. It includes tests for:

- Logging in with standard user credentials
- Sorting products by name and price
- Adding and removing products from the shopping cart
- Viewing the cart and verifying item counts
- Performing checkout (complete and canceled)
- Continuing shopping after adding items
- Logging out successfully

The tests are written in Playwright with JavaScript, using Chromium browser in non-headless mode for visual verification.

## Test Scenarios

The automated tests cover at least six of the following scenarios:
Login — successful authentication with valid credentials
Product Sorting — verify sorting by price or name
Add Products — add items to the cart
Remove Products — remove items from the cart
View Cart — verify cart contents
Checkout Form — complete checkout information
Cancel Checkout — verify cancellation during checkout
Remove from Cart — remove items from shopping cart
Empty Cart Checkout — attempt checkout with empty cart
Logout — verify successful logout
  
---
## Viewing the HTML Report

After running the tests, an HTML report should be generated automatically.
Note: I attempted to generate and view the HTML report on my local machine, but due to setup issues. 
I was unable to display it. The test code is complete and ready to execute.
running the tests on a properly configured environment will generate the report successfully.

  
---
## Challenges and Solutions

Challenge 1: Handling dynamic product sorting for verification.
Solution: Implemented waits and locators to check sorting accurately, but the filtering scenario could not be fully resolved.

Challenge 2: Verifying checkout cancellation without affecting the cart state.
Solution: Steps implemented to reset the cart and validate behavior, but some edge cases were not fully resolved.

Challenge 3: Generating the HTML report for test results.
Solution: Attempted multiple approaches locally but was unable to resolve due to environment/setup issues.

Other Challenges: Maintaining readability and modularity of test scripts.
Solution: Structured code using descriptive functions, reusable locators, and proper comments.  
  
  
  ## Prerequisites
Before running the tests, make sure you have:

- Node.js installed (v14 or above recommended)
- npm installed (comes with Node.js)
- Git installed (if cloning from GitHub)

---

## Installation
Clone the repository:

```bash
git clone https://github.com/username/playwright-saucedemo.git
cd playwright-saucedemo


