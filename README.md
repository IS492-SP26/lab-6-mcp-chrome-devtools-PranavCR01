[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/sSaiQ0qR)
# Lab: Connecting AI Agents to Developer Tools via Model Context Protocol (MCP)

## Chrome DevTools MCP Integration

This lab introduced the Model Context Protocol (MCP) as a bridge between AI language models and live developer environments. Through hands-on exercises with Chrome DevTools MCP server, we demonstrated how AI agents can move beyond "blindfolded coding" to actively inspect, debug, and analyze running web applications in real-time.

---

## What We Are Doing

### Lab Objective
Students learned to connect AI agents (Claude CLI) to real developer tools using the Model Context Protocol (MCP), specifically the Chrome DevTools MCP server. This integration enables LLM-based assistants to not just generate or reason about code statically, but to see, analyze, and interact with live web applications.

### The Bridge We Built
We bridged the gap between AI reasoning and software execution environments — a key challenge in building next-generation autonomous coding systems. Rather than proposing fixes based solely on static code text, our AI agent could:

- **See** what actually happens when code runs
- **Inspect** live browser state and behavior
- **Analyze** real performance metrics
- **Verify** fixes dynamically in real-time

---

## Why It Matters: Removing the Blindfold

### The Problem: "Blindfolded Coding"
Typical AI coding assistants (Gemini, Claude, Copilot) can only propose fixes based on the text of the code — they don't see what actually happens when that code runs. This leads to what we call **"blindfolded coding"** where the AI:
- Guesses at runtime behavior
- Cannot verify if fixes actually work
- Misses issues only visible in execution
- Cannot understand user-facing impacts

### The Solution: MCP Integration
By integrating Chrome DevTools via MCP, AI agents gain real-time visibility into:

**Runtime Diagnostics:**
- Console errors and warnings
- Network traffic and failed requests
- DOM state and structure

**Visual & Performance Analysis:**
- Real rendering and layout issues in the browser
- Performance traces and metrics (LCP, CLS, TTFB)
- Layout shifts and visual regressions

**Interactive Capabilities:**
- User interactions (button clicks, form submissions)
- Dynamic state changes
- Real-time debugging

This allows the AI to **debug, test, and verify changes dynamically**, rather than relying on guesswork. It's a foundational step toward AI systems that can autonomously test, verify, and improve web applications in real time.

---

## Understanding MCP (Model Context Protocol)

### What is MCP?
The Model Context Protocol (MCP) is an **open-source standard** that defines how language models connect to external tools, data sources, and runtime systems. It provides a structured way to "extend" a model's abilities — essentially letting it call tools through controlled interfaces.

### How MCP Works
```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│   AI Model  │ ◄─MCP──►│ MCP Server  │ ◄──────►│ Chrome       │
│  (Claude)   │         │  (Bridge)   │         │  DevTools    │
└─────────────┘         └─────────────┘         └──────────────┘
```

**MCP Server** acts as a bridge that:
- Exposes tool-like commands (e.g., start trace, inspect console logs)
- Translates AI requests into browser actions
- Returns structured data back to the AI model
- Ensures safe, modular, and interoperable interactions

### Advantages Over Direct Plugin Architectures
- **Safer:** Controlled interfaces with defined permissions
- **Modular:** Plug-and-play different tools
- **Interoperable:** Standard protocol works across different AI models
- **Extensible:** Easy to create custom MCP servers for specific needs

---

## Lab Exercises: Hands-On MCP Integration

## Setup Instructions for You

### 1. Configure Claude Code with Chrome DevTools MCP

Create or edit `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    }
  }
}
```
Restart Claude Desktop after saving.

## OR

### 2. Configure Gemini CLI with MCP

You need to add MCP config to Gemini CLI. Exact steps depend on their Gemini CLI setup.

### Use the setup command:

```gemini mcp add chrome-devtools npx chrome-devtools-mcp@latest```

### Or manually insert JSON config to .gemini/settings.json:

```json
"mcpServers": {
  "chrome-devtools": {
    "command": "npx",
    "args": ["chrome-devtools-mcp@latest"]
  }
}
```
Save and restart Gemini CLI.

## OR

### 3. Install Chrome DevTools MCP with VScode Co-pilot

You need to add MCP config to VScode Co-pilot settings. 

### Follow the instruction to open mcp settings in VScode Co-pilot:
```Ctrl+Shift+P -> enter "chat.mcp.access" -> MCP: add server -> enter "npx chrome-devtools-mcp@latest" -> workspace```

**You also need to enable this MCP in the chat panel tool list.**


## Exercise 1: Performance Analysis with MCP

* **Prompt to enter:** ```Please check the LCP of web.dev using the chrome devtools MCP.```
* **Target:** web.dev (production website)

#### If it launches Chrome and returns performance data, you're ready!

#### Common issues:
- If you see errors like: "2025-10-22 13:10:04.291 [warning] [server stderr] ERROR: `chrome-devtools-mcp` does not support Node v20.9.0. Please upgrade to Node 20.19.0 LTS or a newer LTS." You need to update your node version. To do that follow: https://stackoverflow.com/questions/8191459/how-do-i-update-node-js




**AI Agent Actions:**
- Automatically initiated performance trace
- Analyzed LCP breakdown phases
- Identified optimization opportunities
- Provided actionable insights

**Key Learning:** The AI agent could autonomously measure and interpret performance metrics without human intervention — demonstrating real-time analysis capabilities.

---

## Exercise 2: Debugging Task Tracker Pro (localhost:8080)



### Start the App
```bash
# Navigate to the buggy-app folder
cd buggy-app

# Start a simple HTTP server (choose one):
python3 -m http.server 8080
# OR
npx serve -p 8080
```



* **Prompt to enter:** ```Please open localhost:8080 in Chrome and check what issues exist. Look for console errors, network failures, and visual problems.```
* **Target:** Simple web application with intentional bugs

---

## Expected Bugs
### Bug 1: Broken Image (404)
- **Location:** `index.html`

### Bug 2: Undefined Variable
- **Location:** `script.js`

### Bug 3: Slow Resource
- **Location:** `index.html`

### Bug 4: CSS Overflow
- **Location:** `styles.css` 

**Key Learning:** The AI could see the difference between broken and fixed states, providing feedback loop for verification — a crucial capability for autonomous debugging.

---
## Example prompt taht can be tested

**Find Network Issues:**
```
Some images on localhost:8080 are not loading.
Use DevTools to find which requests are failing and why.
```

**Find Console Errors:**
```
Check the console on localhost:8080 for JavaScript errors.
What's causing them and how can I fix it?
```

**Check Performance:**
```
Localhost:8080 seems slow to load.
Run a performance trace and identify what's taking so long.
```

**Inspect Layout:**
```
The task list on localhost:8080 looks broken.
Inspect the DOM and CSS to find the layout problem.
```


## MCP Capabilities Demonstrated

### What the AI Agent Could Do With MCP:

**1. Autonomous Navigation**
- Open multiple browser tabs
- Navigate to specific URLs
- Handle page redirects and loading states

**2. Runtime Inspection**
- Read console messages (errors, warnings, logs)
- Inspect DOM structure via snapshots
- Analyze network traffic and responses
- Capture visual state with screenshots

**3. Performance Analysis**
- Initiate performance traces
- Measure Core Web Vitals automatically
- Break down LCP into constituent phases
- Identify performance bottlenecks

**4. Verification & Testing**
- Retest after fixes applied
- Compare before/after states
- Validate that errors are resolved
- Confirm visual improvements

**5. Contextual Reasoning**
- Correlate console errors with network failures
- Understand framework-specific patterns (React hydration)
- Prioritize issues by severity
- Suggest targeted fixes based on runtime data


### What We Learned

**1. MCP Removes AI Blindness**
AI agents with MCP access can see runtime behavior, not just static code. This fundamentally changes their debugging and analysis capabilities.

**2. Real-Time Verification is Critical**
The ability to test fixes immediately and see actual results creates a feedback loop essential for autonomous systems.

**3. Structured Tool Access is Safer**
MCP's controlled interface prevents dangerous operations while enabling powerful capabilities — better than unrestricted browser control.

**4. Context Matters**
The AI could make better recommendations because it saw the full context: errors, network state, visual output, and performance data together.


---

## Comparison: MCP vs. Traditional Approaches

### Traditional AI Coding Assistant
```
User: "Fix the bug in this code"
AI: [analyzes text only]
AI: "Try changing line 42 to..."
User: [makes change, tests manually]
User: "That didn't work"
AI: "Try this instead..."
[repeat cycle]
```

**Limitations:**
- No visibility into runtime behavior
- Cannot verify fixes
- Relies on user feedback
- Slow iteration cycle
- Guesswork-based debugging

### MCP-Enabled AI Agent
```
User: "Check localhost:8080 for issues"
AI: [opens page, inspects console, checks network]
AI: "Found 3 issues: [detailed analysis]"
User: [fixes code]
AI: [automatically re-tests]
AI: "All issues resolved. Screenshot shows logo now displays."
```

**Advantages:**
- Direct runtime visibility
- Autonomous verification
- Immediate feedback
- Evidence-based recommendations
- Complete debugging cycle

---

## Technical Implementation Notes

### Key MCP Functions Used

**Navigation & Setup:**
- `new_page(url)` - Open new browser tab
- `navigate_page(url)` - Navigate to URL
- `select_page(index)` - Switch between tabs

**Inspection:**
- `take_snapshot()` - Get DOM structure with UIDs
- `list_console_messages()` - Read all console output
- `list_network_requests()` - Get all HTTP requests
- `get_network_request(url)` - Detailed request info

**Performance:**
- `performance_start_trace()` - Begin recording
- `performance_stop_trace()` - Get metrics & insights

**Visual:**
- `take_screenshot()` - Capture current viewport

---

## Conclusion

This lab successfully demonstrated the transformative potential of the Model Context Protocol in connecting AI agents to live development environments. By removing the "blindfold" of static code analysis, we enabled autonomous debugging, performance analysis, and verification capabilities.

You can Apply MCP testing to personal projects or team project. Experiment with additional MCP commands. Create custom debugging workflows

---

## Resources

- [Chrome DevTools MCP Documentation](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [MCP Protocol Overview](https://modelcontextprotocol.io/)
- [Gemini CLI Setup Guide](https://github.com/google/generative-ai-docs)



