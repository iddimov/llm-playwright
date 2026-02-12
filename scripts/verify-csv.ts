import { parseCSV } from '../lib/csv-utils';
try {
    const data = parseCSV('fixtures/data/csv/employees.csv');
    console.log('CSV Parsed Successfully:', JSON.stringify(data, null, 2));
} catch (error) {
    console.error('CSV Parsing Failed:', error);
}
