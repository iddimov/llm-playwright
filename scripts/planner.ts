
import { createAgent } from './utils';
import path from 'path';

async function main() {
    const args = process.argv.slice(2);
    // If command line args are present, use them.
    // Otherwise check for environment variables or default prompts?
    // For now, require args or print usage.

    let task = args.join(' ');

    if (!task) {
        console.log("Usage: npm run planner '<task description>'");
        console.log("Example: npm run planner 'Create test plan for user login'");
        process.exit(1);
    }

    // Append default output location if not specified
    if (!task.includes("Test plan:")) {
        task += `\n\nOutput the test plan to spec file: specs/coverage.plan.md`;
    }

    const agentPath = path.join(process.cwd(), '.github/agents/playwright-test-planner.agent.md');

    console.log(`Initializing Planner Agent...`);
    let agent;
    try {
        agent = await createAgent('planner', agentPath);

        console.log(`Executing Task: ${task}`);
        const result = await agent.run(task);
        console.log("Planner Completed.");
        console.log("Result:", result);
    } catch (error) {
        console.error("Planner failed:", error);
        process.exit(1);
    } finally {
        if (agent) {
            console.log("Closing Planner Agent...");
            await agent.close();
        }
    }
}

main();
