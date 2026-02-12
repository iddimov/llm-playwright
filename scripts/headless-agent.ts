import { ChatOpenAI } from '@langchain/openai';
import { MCPAgent, MCPClient } from 'mcp-use';
import 'dotenv/config';

async function runHeadlessAgent() {
    console.log("Initializing Headless Agent...");

    // 1. Configure the MCP Server connection
    // We tell the client to spawn the Playwright MCP server using npx
    const config = {
        mcpServers: {
            playwright: {
                command: 'npx',
                args: ['-y', '@playwright/mcp@latest']
            }
        }
    };

    // 2. Create the Client and LLM instance
    const client = MCPClient.fromDict(config);
    const llm = new ChatOpenAI({
        modelName: 'gpt-4-turbo',
        temperature: 0, // Deterministic behavior
        openAIApiKey: process.env.OPENAI_API_KEY
    });

    // 3. Initialize the Agent
    // maxSteps limits the loop to prevent infinite recursion costs
    const agent = new MCPAgent({ llm, client, maxSteps: 20 });

    // 4. Define the Mission
    const task = `
    You are a QA Engineer.
    1. Navigate to 'https://www.saucedemo.com'.
    2. Log in with 'standard_user' and 'secret_sauce'.
    3. Find the most expensive item on the page.
    4. Add it to the cart.
    5. Return the name of the item added and its price.
  `;

    console.log(`Executing Task: ${task}`);

    try {
        const result = await agent.run(task);
        console.log("Agent Report:", result);
    } catch (error) {
        console.error("Agent failed:", error);
    }
}

runHeadlessAgent();
