# OrangeHRM Automated Tests

This document maps the actual implemented Playwright tests to the documented features for OrangeHRM.
All test files are located in `tests/orangehrm/`.

## 1. Employee Management Tests (PIM)

**File:** `tests/orangehrm/employee.spec.ts`

This test suite manages the end-to-end flow of adding employees and is designed to run in a data-driven manner using a CSV file.

*   **Test Suite Objective**: Add and verify new employees.
    *   **Data Source**: `fixtures/data/csv/employees.csv`
    *   **Description**: The test iterates over records found in the CSV file (containing `firstName` and `lastName`) and executes the following sequence for each entry:
        1. **Login**: Navigates to the OrangeHRM login page and authenticates (using default credentials configured in the Page Object).
        2. **Navigation**: Navigates from the Dashboard to the PIM (Personnel Information Management) module.
        3. **Creation**: Adds the employee using the provided First and Last Names.
        4. **Verification**: Verifies that the employee was added successfully.
    *   **Assertion/Verification**: The `verifyEmployeeAdded` step confirms the creation was successful within the application UI.
    *   **Note**: The timeout is explicitly increased (`60000`ms) to accommodate potentially slow network or server responses during this multi-step flow.
