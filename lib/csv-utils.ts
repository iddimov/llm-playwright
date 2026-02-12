import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function parseCSV(filePath: string) {
    const fullPath = path.resolve(__dirname, '..', filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    return parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });
}
