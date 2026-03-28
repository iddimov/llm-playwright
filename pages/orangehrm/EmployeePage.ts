import { Page, expect } from '@playwright/test';
import { EmployeePageLocators } from './Locators/EmployeePageLocators';

export class EmployeePage {
    readonly page: Page;
    private readonly locators: EmployeePageLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new EmployeePageLocators(page);
    }

    async addEmployee(firstName: string, lastName: string) {
        // Wait for and click the Add button
        await this.locators.addButton.first().click({ timeout: 10000 });
        
        // Wait for the Add Employee form to be visible
        await expect(this.locators.addEmployeeHeader).toBeVisible({ timeout: 10000 });
        
        // Fill in the employee details
        await this.locators.firstNameInput.fill(firstName, { timeout: 5000 });
        await this.locators.lastNameInput.fill(lastName, { timeout: 5000 });

        // Generate a unique Employee ID to avoid duplicate errors
        const timestamp = Date.now();
        const uniqueId = `EMP${timestamp.toString().slice(-6)}`;
        
        // Try to find and fill the employee ID field if it exists
        if (await this.locators.employeeIdInput.count() > 0) {
            await this.locators.employeeIdInput.fill(uniqueId, { timeout: 5000 });
        }

        // Click save and wait for navigation or success message
        await this.locators.saveButton.click({ timeout: 10000 });
        
        // Wait for any loading to complete
        await this.locators.loadingSpinner.waitFor({ state: 'hidden', timeout: 15000 });
        
        // Wait for success message to appear in toast container
        // Handle both success and error cases
        try {
            await expect(this.locators.toastContainer).toBeVisible({ timeout: 15000 });
            await expect(this.locators.successMessage).toBeVisible({ timeout: 10000 });
        } catch (error) {
            // Check if there's an error message instead
            const errorMessage = this.page.locator('text=Failed to Save').or(this.page.locator('text=Error')).or(this.page.locator('text=Duplicate'));
            if (await errorMessage.count() > 0) {
                throw new Error(`Failed to add employee: ${await errorMessage.first().textContent()}`);
            }
            throw error;
        }
    }

    async verifyEmployeeAdded() {
        // Verify that the employee was added successfully by checking for success message
        await expect(this.locators.successMessage).toBeVisible({ timeout: 10000 });
        
        // Also verify we're still on the Add Employee page or have been redirected
        try {
            await expect(this.locators.addEmployeeHeader).toBeVisible({ timeout: 5000 });
        } catch {
            await expect(this.page).toHaveURL(/.*viewEmployeeList/, { timeout: 5000 });
        }
    }
}
