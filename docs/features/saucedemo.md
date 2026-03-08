# SauceDemo Features

This document outlines the core functional features of the SauceDemo application that are within the scope of our automated testing framework.

## 1. Authentication (Login)

The application provides a login gateway for users. It must handle valid credentials and appropriate error messages for invalid attempts.

*   **Valid Login**: Users with correct credentials (e.g., `standard_user`) should successfully log in and be redirected to the inventory page.
*   **Locked Out User**: Specific accounts (e.g., `locked_out_user`) represent accounts that are locked for security reasons. Attempting to log in with these should present a specific error message ("Epic sadface: Sorry, this user has been locked out.").
*   **Invalid Credentials**: Any combination of incorrect usernames or passwords must result in a standard error message ("Epic sadface: Username and password do not match any user in this service").

## 2. Cart & Inventory Management

Once logged in, users can view products, and manage their shopping cart.

*   **Viewing Inventory**: Users should be able to see a list of products on the main inventory page.
*   **Adding Items to Cart**: Users can add items (like the "Sauce Labs Backpack" or "Sauce Labs Bike Light") to their cart. The UI should reflect this change (e.g., button text changes to "Remove", cart badge count increases).
*   **Removing Items from Cart**: Users can remove items from the cart, either directly from the inventory page or from the cart page itself.
*   **Multiple Item Management**: The cart must accurately maintain the state and quantity (though usually fixed at 1 per item in this app) when multiple distinct items are added.
*   **Cart Persistence**: The contents of the cart should persist across page navigations (e.g., going back and forth between the cart and inventory pages) and page refreshes.
*   **Product Sorting**: The inventory must allow sorting by price (low to high, high to low) and name (A to Z, Z to A). Sorting should not affect the current contents of the user's cart.
*   **Product Details**: Users can click on an item to view its details and add/remove it from the cart from that detailed view.

## 3. Checkout Flow

The application features a complete checkout process for purchasing items in the cart.

*   **Checkout Initiation**: Users can begin the checkout process from the cart page.
*   **Customer Information Collection**: The system must collect the user's First Name, Last Name, and Zip/Postal Code.
*   **Order Review (Overview)**: Before final submission, users review their order sumary, including items, payment information, shipping information, and total price.
*   **Order Completion**: Upon finishing the checkout, a confirmation screen must be displayed (e.g., "Thank you for your order!").
