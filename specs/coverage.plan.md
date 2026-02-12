# SauceDemo Cart Functionality Test Plan

## Application Overview

# SauceDemo Cart Functionality Test Plan

## Overview
This test plan covers the complete cart functionality in the SauceDemo e-commerce application. The plan includes comprehensive testing of adding items to cart, removing items, cart navigation, and edge cases.

## Test Environment
- **Application**: SauceDemo (https://www.saucedemo.com)
- **Starting State**: User is logged in and on the inventory page
- **Browser**: Cross-browser testing (Chromium, Firefox, WebKit)

## Key Functionality Areas
1. **Add to Cart Operations**
2. **Remove from Cart Operations** 
3. **Cart Navigation & Display**
4. **Multiple Item Management**
5. **Edge Cases & Error Handling

## Test Scenarios

### 1. Cart Functionality Tests

**Seed:** `tests/saucedemo/seed.spec.ts`

#### 1.1. Add Single Item to Cart

**File:** `tests/saucedemo/cart-add-single.spec.ts`

**Steps:**
  1. Navigate to inventory page
    - expect: Inventory page loads successfully
    - expect: All products are displayed
    - expect: Add to cart buttons are visible for each product
  2. Click Add to cart button for Sauce Labs Backpack
    - expect: Button text changes from 'Add to cart' to 'Remove'
    - expect: Shopping cart badge appears with number '1'
    - expect: Item is added to cart
  3. Click shopping cart link
    - expect: Navigates to cart page
    - expect: Cart page displays 'Your Cart' header
    - expect: Sauce Labs Backpack is listed in cart
    - expect: Quantity shows as 1
    - expect: Remove button is visible for the item
    - expect: Checkout button is visible
  4. Click Continue Shopping button
    - expect: Returns to inventory page
    - expect: Cart badge still shows '1'
    - expect: Remove button still visible for added item

#### 1.2. Remove Item from Cart

**File:** `tests/saucedemo/cart-remove.spec.ts`

**Steps:**
  1. Add Sauce Labs Backpack to cart
    - expect: Cart badge shows '1'
    - expect: Button changes to 'Remove'
  2. Click Remove button for Sauce Labs Backpack
    - expect: Button text changes from 'Remove' to 'Add to cart'
    - expect: Shopping cart badge disappears or shows '0'
    - expect: Item is removed from cart
  3. Click shopping cart link
    - expect: Cart page loads
    - expect: Cart is empty or shows no items
    - expect: Continue Shopping button is visible

#### 1.3. Add Multiple Items to Cart

**File:** `tests/saucedemo/cart-multiple-items.spec.ts`

**Steps:**
  1. Add Sauce Labs Backpack to cart
    - expect: Cart badge shows '1'
    - expect: Button changes to 'Remove'
  2. Add Sauce Labs Bike Light to cart
    - expect: Cart badge updates to '2'
    - expect: Both items show Remove buttons
  3. Add Sauce Labs Bolt T-Shirt to cart
    - expect: Cart badge updates to '3'
    - expect: Third item shows Remove button
  4. Click shopping cart link
    - expect: Cart page displays all 3 items
    - expect: Each item shows correct quantity (1)
    - expect: Total of 3 items shown in cart badge
  5. Remove Sauce Labs Bike Light from cart page
    - expect: Item is removed from cart list
    - expect: Cart badge updates to '2'
    - expect: Remaining items still visible

#### 1.4. Cart Persistence Across Navigation

**File:** `tests/saucedemo/cart-persistence.spec.ts`

**Steps:**
  1. Add two items to cart
    - expect: Cart badge shows '2'
  2. Navigate to cart page and back to inventory
    - expect: Cart badge still shows '2'
    - expect: Both items still show Remove buttons
  3. Refresh the inventory page
    - expect: Cart badge persists with '2'
    - expect: Items still show Remove buttons
  4. Log out and log back in
    - expect: Cart is empty (cart state should reset on logout)

#### 1.5. Edge Cases - Maximum Items

**File:** `tests/saucedemo/cart-edge-cases.spec.ts`

**Steps:**
  1. Add all 6 available products to cart
    - expect: Cart badge shows '6'
    - expect: All buttons show 'Remove'
  2. Navigate to cart page
    - expect: All 6 items are displayed
    - expect: Checkout button is enabled
  3. Remove all items from cart
    - expect: Cart badge disappears or shows '0'
    - expect: All buttons change to 'Add to cart'
    - expect: Cart page shows empty cart

#### 1.6. Product Details Navigation from Cart

**File:** `tests/saucedemo/cart-product-details.spec.ts`

**Steps:**
  1. Add Sauce Labs Backpack to cart
    - expect: Item added successfully
  2. Navigate to cart page
    - expect: Item displayed in cart
  3. Click on product name link in cart
    - expect: Navigates to product details page
    - expect: Product details are displayed
    - expect: Add to cart/Remove button reflects cart status
  4. Navigate back to cart
    - expect: Returns to cart page
    - expect: Item still in cart

#### 1.7. Sorting with Items in Cart

**File:** `tests/saucedemo/cart-sorting.spec.ts`

**Steps:**
  1. Add Sauce Labs Backpack and Sauce Labs Bike Light to cart
    - expect: Cart badge shows '2'
  2. Change sort order to 'Price (low to high)'
    - expect: Products reorder by price
    - expect: Cart badge still shows '2'
    - expect: Added items still show Remove buttons
  3. Change sort order to 'Name (Z to A)'
    - expect: Products reorder by name descending
    - expect: Cart badge persists
    - expect: Added items maintain Remove state
  4. Remove an item after sorting
    - expect: Item removed successfully
    - expect: Cart badge updates to '1'
    - expect: Remaining item maintains correct state
