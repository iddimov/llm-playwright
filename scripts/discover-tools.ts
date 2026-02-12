
import { MCPClient } from 'mcp-use';
import 'dotenv/config';

async function main() {
    const config = {
        mcpServers: {
            playwright: {
                command: 'npx',
                args: ['playwright', 'run-test-mcp-server']
            }
        }
    };

    const client = MCPClient.fromDict(config);
    const session = await client.createSession('playwright');
    // Initialize explicitely although createSession does it by default
    await session.initialize();

    const tools = await session.listTools();
    console.log(JSON.stringify(tools, null, 2));

    await client.close();
}

main().catch(console.error);
