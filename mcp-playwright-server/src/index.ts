import {
  Server,
} from "@modelcontextprotocol/sdk/server/index.js";
import {
  StdioServerTransport,
} from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  Tool,
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { chromium, firefox, webkit, Browser, Page } from "playwright";

// Global browser and page instances
let browser: Browser | null = null;
let page: Page | null = null;

const server = new Server(
  {
    name: "playwright-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definitions
const tools: Tool[] = [
  {
    name: "launch_browser",
    description:
      "Launch a browser (chromium, firefox, or webkit). Creates a new browser context.",
    inputSchema: {
      type: "object",
      properties: {
        browser_type: {
          type: "string",
          enum: ["chromium", "firefox", "webkit"],
          description: "Type of browser to launch",
        },
        headless: {
          type: "boolean",
          description: "Whether to run browser in headless mode (default: true)",
        },
      },
      required: ["browser_type"],
    },
  },
  {
    name: "navigate",
    description: "Navigate to a URL",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "URL to navigate to",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "click",
    description: "Click on an element matching the selector",
    inputSchema: {
      type: "object",
      properties: {
        selector: {
          type: "string",
          description: "CSS selector of the element to click",
        },
      },
      required: ["selector"],
    },
  },
  {
    name: "type_text",
    description: "Type text into a focused element or element matching selector",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Text to type",
        },
        selector: {
          type: "string",
          description: "Optional CSS selector of element to focus first",
        },
      },
      required: ["text"],
    },
  },
  {
    name: "fill",
    description: "Fill an input field with text (clears existing text first)",
    inputSchema: {
      type: "object",
      properties: {
        selector: {
          type: "string",
          description: "CSS selector of the input field",
        },
        text: {
          type: "string",
          description: "Text to fill",
        },
      },
      required: ["selector", "text"],
    },
  },
  {
    name: "get_text",
    description: "Get text content of an element",
    inputSchema: {
      type: "object",
      properties: {
        selector: {
          type: "string",
          description: "CSS selector of the element",
        },
      },
      required: ["selector"],
    },
  },
  {
    name: "get_page_content",
    description: "Get the full HTML content of the current page",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "wait_for_selector",
    description: "Wait for an element matching the selector to appear",
    inputSchema: {
      type: "object",
      properties: {
        selector: {
          type: "string",
          description: "CSS selector to wait for",
        },
        timeout: {
          type: "number",
          description: "Timeout in milliseconds (default: 30000)",
        },
      },
      required: ["selector"],
    },
  },
  {
    name: "close_browser",
    description: "Close the browser",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

// Tool handlers
async function launchBrowser(
  browserType: string,
  headless: boolean = true
): Promise<string> {
  try {
    if (browser) {
      await browser.close();
    }

    let launchFn;
    switch (browserType) {
      case "firefox":
        launchFn = firefox.launch;
        break;
      case "webkit":
        launchFn = webkit.launch;
        break;
      default:
        launchFn = chromium.launch;
    }

    browser = await launchFn({ headless });
    const context = await browser.newContext();
    page = await context.newPage();

    return `Browser (${browserType}) launched successfully`;
  } catch (error) {
    return `Error launching browser: ${error}`;
  }
}

async function navigate(url: string): Promise<string> {
  try {
    if (!page) {
      return "Browser not launched. Call launch_browser first.";
    }
    await page.goto(url, { waitUntil: "networkidle" });
    return `Navigated to ${url}`;
  } catch (error) {
    return `Error navigating: ${error}`;
  }
}

async function click(selector: string): Promise<string> {
  try {
    if (!page) {
      return "Browser not launched. Call launch_browser first.";
    }
    await page.click(selector);
    return `Clicked element: ${selector}`;
  } catch (error) {
    return `Error clicking: ${error}`;
  }
}

async function typeText(text: string, selector?: string): Promise<string> {
  try {
    if (!page) {
      return "Browser not launched. Call launch_browser first.";
    }
    if (selector) {
      await page.focus(selector);
    }
    await page.keyboard.type(text);
    return `Typed: ${text}`;
  } catch (error) {
    return `Error typing: ${error}`;
  }
}

async function fill(selector: string, text: string): Promise<string> {
  try {
    if (!page) {
      return "Browser not launched. Call launch_browser first.";
    }
    await page.fill(selector, text);
    return `Filled ${selector} with: ${text}`;
  } catch (error) {
    return `Error filling: ${error}`;
  }
}

async function getText(selector: string): Promise<string> {
  try {
    if (!page) {
      return "Browser not launched. Call launch_browser first.";
    }
    const text = await page.textContent(selector);
    return text || "No text content found";
  } catch (error) {
    return `Error getting text: ${error}`;
  }
}

async function getPageContent(): Promise<string> {
  try {
    if (!page) {
      return "Browser not launched. Call launch_browser first.";
    }
    const content = await page.content();
    return content;
  } catch (error) {
    return `Error getting page content: ${error}`;
  }
}

async function waitForSelector(
  selector: string,
  timeout: number = 30000
): Promise<string> {
  try {
    if (!page) {
      return "Browser not launched. Call launch_browser first.";
    }
    await page.waitForSelector(selector, { timeout });
    return `Element found: ${selector}`;
  } catch (error) {
    return `Error waiting for selector: ${error}`;
  }
}

async function closeBrowser(): Promise<string> {
  try {
    if (browser) {
      await browser.close();
      browser = null;
      page = null;
      return "Browser closed successfully";
    }
    return "No browser to close";
  } catch (error) {
    return `Error closing browser: ${error}`;
  }
}

// Tool request handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  let result: string;

  switch (name) {
    case "launch_browser":
      result = await launchBrowser(
        (args as Record<string, unknown>).browser_type as string,
        ((args as Record<string, unknown>).headless as boolean) ?? true
      );
      break;
    case "navigate":
      result = await navigate((args as Record<string, unknown>).url as string);
      break;
    case "click":
      result = await click((args as Record<string, unknown>).selector as string);
      break;
    case "type_text":
      result = await typeText(
        (args as Record<string, unknown>).text as string,
        (args as Record<string, unknown>).selector as string | undefined
      );
      break;
    case "fill":
      result = await fill(
        (args as Record<string, unknown>).selector as string,
        (args as Record<string, unknown>).text as string
      );
      break;
    case "get_text":
      result = await getText((args as Record<string, unknown>).selector as string);
      break;
    case "get_page_content":
      result = await getPageContent();
      break;
    case "wait_for_selector":
      result = await waitForSelector(
        (args as Record<string, unknown>).selector as string,
        (args as Record<string, unknown>).timeout as number | undefined
      );
      break;
    case "close_browser":
      result = await closeBrowser();
      break;
    default:
      result = `Unknown tool: ${name}`;
  }

  return {
    content: [
      {
        type: "text",
        text: result,
      },
    ],
  };
});

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Playwright MCP server running on stdio");
}

main().catch(console.error);
