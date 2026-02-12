import { Page, expect } from '@playwright/test';

export class EmployeePage {
    readonly page: Page;
    private readonly locators = {
        addButton: 'button:has-text("Add"), button:has-text("Add Employee")',
        firstNameInput: 'input[placeholder="First Name"]',
        lastNameInput: 'input[placeholder="Last Name"]',
        saveButton: 'button[type="submit"]',
        successMessage: 'text=Successfully Saved',
        addEmployeeHeader: 'h6:has-text("Add Employee")',
        employeeIdInput: 'input.oxd-input:below(label:has-text("Employee Id"))',
        toastContainer: '.oxd-toast-container',
        loadingSpinner: '.oxd-loading-spinner'
    };

    constructor(page: Page) {
        this.page = page;
    }

    async addEmployee(firstName: string, lastName: string) {
        // Wait for and click the Add button
        await this.page.locator(this.locators.addButton).first().click();
        
        // Wait for the Add Employee form to be visible
        await expect(this.page.locator(this.locators.addEmployeeHeader)).toBeVisible();
        
        // Fill in the employee details
        await this.page.locator(this.locators.firstNameInput).fill(firstName);
        await this.page.locator(this.locators.lastNameInput).fill(lastName);

        // Generate a unique Employee ID to avoid duplicate errors
        // Use a more robust selector for the Employee ID field
        const timestamp = Date.now();
        const uniqueId = `EMP${timestamp.toString().slice(-6)}`;
        
        // Try to find and fill the employee ID field if it exists
        const employeeIdField = this.page.locator(this.locators.employeeIdInput);
        if (await employeeIdField.count() > 0) {
            await employeeIdField.fill(uniqueId);
        }

        // Click save and wait for navigation or success message
        await this.page.locator(this.locators.saveButton).click();
        
        // Wait for any loading to complete
        await this.page.waitForSelector(this.locators.loadingSpinner, { state: 'detached', timeout: 10000 });
        
        // Wait for success message to appear in toast container
        await expect(this.page.locator(this.locators.toastContainer)).toBeVisible({ timeout: 15000 });
        await expect(this.page.locator(this.locators.successMessage)).toBeVisible({ timeout: 5000 });
    }

    async verifyEmployeeAdded() {
        // Verify that the employee was added successfully by checking for success message
        // Note: After adding an employee in OrangeHRM, we stay on the same page with a success toast
        await expect(this.page.locator(this.locators.successMessage)).toBeVisible({ timeout: 10000 });
        
        // Also verify we're still on the Add Employee page or have been redirected
        // This ensures the save operation completed successfully
        try {
            await expect(this.page.locator(this.locators.addEmployeeHeader)).toBeVisible({ timeout: 5000 });
        } catch {
            // If we're not on the Add Employee page, check if we're on the employee list page
            await expect(this.page).toHaveURL(/.*viewEmployeeList/, { timeout: 5000 });
        }
    }
}
