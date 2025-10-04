# SauceDemo Automation Tests using Playwright

This repository contains end-to-end automated tests for the [SauceDemo](https://www.saucedemo.com/) website using **Playwright** and **JavaScript**. The tests cover the full flow of typical user actions, including login, product sorting, adding/removing items from the cart, checkout, and logout.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running Tests](#running-tests)
5. [Test Scenarios](#test-scenarios)
6. [Author](#author)

---

## Project Overview
This automation project is designed to validate the functionality of SauceDemo's e-commerce features. It includes tests for:

- Logging in with standard user credentials
- Sorting products by name and price
- Adding and removing products from the shopping cart
- Viewing the cart and verifying item counts
- Performing checkout (complete and canceled)
- Continuing shopping after adding items
- Logging out successfully

The tests are written in **Playwright** with **JavaScript**, using `chromium` browser in non-headless mode for visual verification.

---

## Prerequisites
Before running the tests, make sure you have:

- [Node.js](https://nodejs.org/) installed (v14 or above recommended)
- npm installed (comes with Node.js)
- Git installed (if cloning from GitHub)

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/username/playwright-saucedemo.git
cd playwright-saucedemo
