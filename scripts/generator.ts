
import { createAgent } from './utils';
import path from 'path';

async function main() {
    const args = process.argv.slice(2);
    let task = args.join(' ');

    if (!task) {
        // potential default: read specs/coverage.plan.md
        task = "Implement the tests described in specs/coverage.plan.md";
        console.log(`No task provided. Using default: "${task}"`);
    }

    const agentPath = path.join(process.cwd(), '.github/agents/playwright-test-generator.agent.md');

    console.log(`Initializing Generator Agent...`);
    let agent;
    try {
        agent = await createAgent('generator', agentPath);

        console.log(`Executing Task: ${task}`);
        const result = await agent.run(task);
        console.log("Generator Completed.");
        console.log("Result:", result);
    } catch (error) {
        console.error("Generator failed:", error);
        process.exit(1);
    } finally {
        if (agent) {
            console.log("Closing Generator Agent...");
            await agent.close();
        }
    }
}

main();
