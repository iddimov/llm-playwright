
import fs from 'fs';
import path from 'path';
import { ChatOpenAI } from '@langchain/openai';
import { MCPAgent, MCPClient } from 'mcp-use';
import 'dotenv/config';

export async function createAgent(agentName: string, configPath: string) {
    if (!fs.existsSync(configPath)) {
        throw new Error(`Agent config not found at ${configPath}`);
    }

    const agentContent = fs.readFileSync(configPath, 'utf8');
    // Simple frontmatter parsing: splits by '---'
    // 0: empty (before first ---)
    // 1: frontmatter
    // 2: content
    const parts = agentContent.split('---');
    let systemPrompt = agentContent;
    if (parts.length >= 3) {
        systemPrompt = parts.slice(2).join('---').trim();
    }

    const config = {
        mcpServers: {
            playwright: {
                command: 'npx',
                args: ['playwright', 'run-test-mcp-server']
            },
            filesystem: {
                command: 'npx',
                args: ['-y', '@modelcontextprotocol/server-filesystem', process.cwd()]
            }
        }
    };

    const client = MCPClient.fromDict(config);

    // Initialize LLM based on provider
    const provider = process.env.LLM_PROVIDER || 'deepseek';
    let llm;

    if (provider === 'ollama') {
        llm = new ChatOpenAI({
            modelName: process.env.OLLAMA_MODEL || 'llama3',
            temperature: 0,
            configuration: {
                baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/v1',
                apiKey: 'ollama', // Ollama doesn't need a real key but ChatOpenAI might require one
            }
        });
    } else {
        // Default to DeepSeek
        if (process.env.DEEPSEEK_API_KEY) {
            process.env.OPENAI_API_KEY = process.env.DEEPSEEK_API_KEY;
        }

        llm = new ChatOpenAI({
            modelName: 'deepseek-chat',
            temperature: 0,
            configuration: {
                baseURL: 'https://api.deepseek.com',
            }
        });
    }

    const agent = new MCPAgent({
        llm,
        client,
        maxSteps: 50,
        systemPrompt: systemPrompt
        // agentId: agentName // Optional if needed
    });

    return agent;
}
