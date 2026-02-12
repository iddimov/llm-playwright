import { test } from '../../fixtures/pages/pages.fixtures';
import { parseCSV } from '../../lib/csv-utils';

type Employee = {
    firstName: string;
    lastName: string;
};

const employees = parseCSV('fixtures/data/csv/employees.csv') as Employee[];

test.describe('OrangeHRM Employee Management', () => {

    for (const employee of employees) {
        test(`should add and verify new employee: ${employee.firstName} ${employee.lastName}`, async ({ orangeLoginPage, dashboardPage, employeePage }) => {
            // Increase timeout for this test to handle potential slow network or server responses
            test.setTimeout(60000);

            await test.step('Login to OrangeHRM', async () => {
                await orangeLoginPage.goto();
                // Relying on default credentials in Page Object for now, or env vars if updated
                // ideally: process.env.ORANGE_USER, process.env.ORANGE_PASSWORD
                await orangeLoginPage.login();
            });

            await test.step('Navigate to PIM module', async () => {
                await dashboardPage.navigateToPIM();
            });

            await test.step(`Add employee: ${employee.firstName} ${employee.lastName}`, async () => {
                await employeePage.addEmployee(employee.firstName, employee.lastName);
            });

            await test.step('Verify employee added successfully', async () => {
                await employeePage.verifyEmployeeAdded();
            });
        });
    }
});

