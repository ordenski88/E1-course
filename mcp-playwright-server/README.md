# Playwright MCP Server

An MCP (Model Context Protocol) server that integrates Playwright browser automation with Claude. This allows you to control a browser through Claude conversations.

## Installation

```bash
cd mcp-playwright-server
npm install
npm run build
```

## Configuration

### Option 1: VS Code User Settings

Add to your VS Code `settings.json` (`Cmd+Shift+P` → "Preferences: Open Settings (JSON)"):

```json
"modelcontextprotocol.servers": {
  "playwright": {
    "command": "node",
    "args": ["/Users/ordenski/Documents/E1 course/mcp-playwright-server/dist/index.js"],
    "disabled": false
  }
}
```

### Option 2: Cursor/Claude Desktop

Add to `~/.cursor/config.json` or `~/.claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "node",
      "args": ["/Users/ordenski/Documents/E1 course/mcp-playwright-server/dist/index.js"]
    }
  }
}
```

## Available Tools

- **launch_browser** - Start a browser (chromium, firefox, webkit)
- **navigate** - Go to a URL
- **click** - Click an element by CSS selector
- **type_text** - Type text into an element
- **fill** - Fill an input field
- **get_text** - Extract text from an element
- **get_page_content** - Get full HTML of current page
- **wait_for_selector** - Wait for element to appear
- **close_browser** - Close the browser

## Development

```bash
npm run dev  # Build and start the server
```

## Usage Example

Once configured, you can ask Claude:

```
"Navigate to https://example.com and click the login button"
"Fill in the email field with my credentials"
"Get the text from the error message"
```
