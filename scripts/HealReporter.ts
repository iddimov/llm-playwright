import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import { exec } from 'child_process';
import path from 'path';

class HealReporter implements Reporter {
    private failedTests: { title: string; file: string; error: string }[] = [];

    onTestEnd(test: TestCase, result: TestResult) {
        if (result.status === 'failed' || result.status === 'timedOut') {
            this.failedTests.push({
                title: test.title,
                file: test.location.file,
                error: result.error?.message || 'Unknown error',
            });
        }
    }

    async onEnd(result: FullResult) {
        if (this.failedTests.length === 0) {
            return;
        }

        console.log('\n==================================================');
        console.log(`❌ Found ${this.failedTests.length} failed tests.`);

        const autoHeal = process.env.AUTO_HEAL === 'true';

        if (autoHeal) {
            console.log('🚑 AUTO_HEAL is enabled. Triggering Healer Agent...');
            // Heal the first failure for now to avoid chaos
            const failure = this.failedTests[0];
            const task = `Fix test "${failure.title}" in file "${failure.file}". Error: ${failure.error}`;

            this.runHealer(task);
        } else {
            console.log('💡 To fix these tests using the AI Healer, run:');
            console.log(`   npm run heal "Fix failing tests"`);
            console.log('   OR set AUTO_HEAL=true in your .env to automate this.');
        }
        console.log('==================================================\n');
    }

    private runHealer(task: string) {
        const healerScript = path.join(__dirname, 'healer.ts');
        // Use ts-node to run the healer script
        const command = `npx ts-node "${healerScript}" "${task}"`;

        console.log(`Executing: ${command}`);
        const child = exec(command);

        child.stdout?.on('data', (data) => {
            console.log(`[Healer] ${data}`);
        });

        child.stderr?.on('data', (data) => {
            console.error(`[Healer Error] ${data}`);
        });
    }
}

export default HealReporter;
