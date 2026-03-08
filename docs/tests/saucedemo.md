# SauceDemo Automated Tests

This document maps the actual implemented Playwright tests to the documented features for SauceDemo.
All test files are located in `tests/saucedemo/`.

## 1. Authentication Tests

**File:** `tests/saucedemo/login.spec.ts`

This file covers the authentication flows defined in the feature specs (`specs/login.md`).

*   **Test Case**: `Valid Login`
    *   **Description**: Logs in with `standard_user` and `secret_sauce`.
    *   **Assertion**: Verifies the URL contains `inventory.html` indicating successful login.
*   **Test Case**: `Locked Out User`
    *   **Description**: Attempts to log in with `locked_out_user`.
    *   **Assertion**: Asserts the error text "Epic sadface: Sorry, this user has been locked out." is visible.
*   **Test Case**: `Invalid Credentials`
    *   **Description**: Attempts to log in with an incorrect username (`wrong_user`).
    *   **Assertion**: Asserts the error text "Epic sadface: Username and password do not match any user in this service" is visible.

## 2. Inventory & Sorting Tests

**File:** `tests/saucedemo/inventory.spec.ts`

*   **Test Case**: `should sort items by price (low to high)`
    *   **Description**: Logs in (via standard user fixture) and interacts with the sort dropdown.
    *   **Assertion**: Expects the items to be reordered on the page based on ascending price.

## 3. Checkout Tests

Currently, the cart and checkout functionality test cases (as outlined in `specs/coverage.plan.md` and `specs/checkout_cases.md`) are implemented within end-to-end checkout flow tests.

**File:** `tests/saucedemo/complete-checkout-flow.spec.ts` (Also similar counterparts: `e2e-checkout.spec.ts`, `generated_checkout.spec.ts`)

*   **Test Case**: `Complete Checkout Flow` / `should complete checkout successfully`
    *   **Description**: This represents an End-to-End (E2E) journey.
    *   **Steps Covered**:
        1. Login (handled by seed/fixture).
        2. Adding a specific item to the cart (e.g., "Sauce Labs Backpack").
        3. Navigating to the cart via the badge.
        4. Initiating the checkout process.
        5. Filling in user information (First Name: "Test", Last Name: "User", Zip: "12345").
        6. Proceeding to the overview and finishing the order.
    *   **Assertion**: Verifies that the complete header says "Thank you for your order!".

*Note: While `specs/coverage.plan.md` details granular tests for cart operations (e.g., specific files like `cart-add-single.spec.ts`, `cart-remove.spec.ts`), the current implementation relies heavily on these unified E2E checkout scripts to cover the core happy paths of adding to cart and checking out.*

## Auxiliary Files

*   **File:** `tests/saucedemo/seed.spec.ts`
    *   **Description**: Often used as a setup file or fixture to establish a baseline state (like a logged-in user session) before other tests run, optimizing execution time.
