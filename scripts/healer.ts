
import { createAgent } from './utils';
import path from 'path';

async function main() {
    const args = process.argv.slice(2);
    let task = args.join(' ');

    if (!task) {
        // Default task for healer: run tests and fix failures
        task = "Run the test suite and fix any failing tests.";
        console.log(`No task provided. Using default: "${task}"`);
    } else {
        console.log(`Task received from command line: "${task}"`);
    }

    const agentPath = path.join(process.cwd(), '.github/agents/playwright-test-healer.agent.md');

    console.log(`Initializing Healer Agent...`);
    try {
        const agent = await createAgent('healer', agentPath);

        console.log(`Executing Task: ${task}`);
        const result = await agent.run(task);
        console.log("Healer Completed.");
        console.log("Result:", result);
    } catch (error) {
        console.error("Healer failed:", error);
        process.exit(1);
    }
}

main();
