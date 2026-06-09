# MCP Client Request Examples

Use these exact request payloads in your tool UI.

## 1. Launch browser

If your UI expects `tool` and `arguments`:

```json
{
  "tool": "launch_browser",
  "arguments": {
    "browser_type": "chromium",
    "headless": true
  }
}
```

If your UI expects `name` and `arguments`:

```json
{
  "name": "launch_browser",
  "arguments": {
    "browser_type": "chromium",
    "headless": true
  }
}
```

## 2. Navigate to the app

```json
{
  "name": "navigate",
  "arguments": {
    "url": "http://localhost:3000"
  }
}
```

## 3. Click the login button

```json
{
  "name": "click",
  "arguments": {
    "selector": "#login-form button"
  }
}
```

## 4. Fill the login form

```json
{
  "name": "fill",
  "arguments": {
    "selector": "#login-form input[name='email']",
    "text": "admin@example.com"
  }
}
```

```json
{
  "name": "fill",
  "arguments": {
    "selector": "#login-form input[name='password']",
    "text": "Password123"
  }
}
```

## 5. Get error text

```json
{
  "name": "get_text",
  "arguments": {
    "selector": "#login-error"
  }
}
```

## 6. Wait for selector

```json
{
  "name": "wait_for_selector",
  "arguments": {
    "selector": "#dashboard-panel",
    "timeout": 30000
  }
}
```

## 7. Close browser

```json
{
  "name": "close_browser",
  "arguments": {}
}
```

## Recommended flow

1. `launch_browser`
2. `navigate` to `http://localhost:3000`
3. `wait_for_selector` for the login form
4. `fill` email and password
5. `click` the submit button
6. `wait_for_selector` for the dashboard
7. `close_browser`
