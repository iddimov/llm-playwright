import { Page, Locator } from '@playwright/test';

export class EmployeePageLocators {
    readonly addButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly saveButton: Locator;
    readonly successMessage: Locator;
    readonly addEmployeeHeader: Locator;
    readonly employeeIdInput: Locator;
    readonly toastContainer: Locator;
    readonly loadingSpinner: Locator;

    constructor(page: Page) {
        this.addButton = page.getByRole('button', { name: /Add/i });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.saveButton = page.locator('button[type="submit"]');
        this.successMessage = page.getByText('Successfully Saved');
        this.addEmployeeHeader = page.getByRole('heading', { level: 6, name: 'Add Employee' });
        this.employeeIdInput = page.locator('input.oxd-input:below(label:has-text("Employee Id"))');
        this.toastContainer = page.locator('.oxd-toast-container');
        this.loadingSpinner = page.locator('.oxd-loading-spinner');
    }
}
