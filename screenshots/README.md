# Lab 6 Screenshots

## lab6-1.png
Claude Code terminal in Windows PowerShell (with a `chrome-devtools-mcp` tab also open). The user has prompted: *"Please open localhost:8080 in Chrome and check what issues exist. Look for console errors, network failures, and visual problems."* Claude responds that it lacks browser/DevTools access and cannot launch Chrome, read console errors, capture screenshots, or monitor network requests. It offers alternatives (WebFetch, reviewing server-side code, reviewing pasted error logs) and asks whether to fetch the page source instead. The status bar shows `Sonnet 4.6 | crpra | 11% | Found 1 settings issue · /doctor for details`, indicating the Chrome DevTools MCP is not yet connected.

## lab6-2.png
Claude Code terminal continuation from the same session. Claude has read the project source files directly and identified 4 intentional bugs in the "Task Tracker Pro" app:
- **Bug 1 – Broken Image (404):** `index.html:18` references `assets/logo.png`, but the actual file is `assets/logo1.png`.
- **Bug 2 – Undefined Variable (ReferenceError):** `script.js:25` increments `taskCounter++` but `taskCounter` is never declared, causing a ReferenceError when "Add Task" is clicked.
- **Bug 3 – Slow Resource (3-second delay):** `index.html:10` loads a `<link rel="stylesheet">` pointing to `https://httpstat.us/200?sleep=3000`, which deliberately blocks rendering for 3 seconds.

## lab6-3.png
Continuation of lab6-2's output, showing the fourth bug and a note about MCP:
- **Bug 4 – CSS Overflow (task list clipped):** `styles.css:104` sets `.task-list { max-height: 300px }` with no `overflow-y: auto/scroll`, so tasks beyond 300px are silently clipped.
- **MCP Note:** The Chrome DevTools MCP (`chrome-devtools-mcp`) is not active and needs to be configured in `%APPDATA%\Claude\claude_desktop_config.json` with Claude Desktop restarted.

## lab6-4.png
Claude Code terminal in a new session where the Chrome DevTools MCP is now connected. The user gives the same prompt about localhost:8080. Claude uses four MCP tools in sequence: `new_page`, `take_screenshot`, `list_console_messages`, and `list_network_requests`. The output shows a formatted table of 3 network failures found on the Task Tracker Pro app:
1. **404 – Missing logo:** `GET /assets/logo.png → 404`; broken image in header shows alt text.
2. **404 – Missing favicon:** `GET /favicon.ico → 404`.
3. **ERR_CERT_COMMON_NAME_INVALID:** `GET https://httpstat.us/200?sleep=3000` fails with a TLS certificate error and adds a 3-second artificial delay.

The section also lists 3 console errors (two 404 errors, one "Verify stylesheet URLs" issue, one cert failure) and visual problems (broken logo, empty task list).

## lab6-5.png
Continuation of lab6-4's output. Shows the bottom of the console errors list and visual problems summary, followed by a "Summary of bugs to fix" section listing 3 actionable items:
1. Missing `/assets/logo.png` — add the file or fix the path in HTML.
2. Missing `/favicon.ico` — add a favicon.
3. Suspicious `httpstat.us` call — likely a test/placeholder URL to replace or remove.

Ends with: *"Would you like me to look at the source files and fix these issues?"*

## lab6-6.png
Claude Code terminal showing post-fix verification. Claude calls `navigate_page` (reload with `ignoreCache: true`), then `take_screenshot`, `list_console_messages`, and `list_network_requests` to confirm all bugs are resolved. A summary table lists all 5 bugs and their fixes:
| Bug | Fix |
|---|---|
| logo.png 404 | `index.html`: changed `assets/logo.png` → `assets/logo1.png` |
| favicon.ico 404 | `index.html`: added `<link rel="icon" href="assets/logo1.png">` |
| httpstat.us slow/failing request | `index.html`: removed the fake `<link rel="stylesheet" href="https://httpstat.us/...">` |
| `taskCounter` undefined | `script.js`: added `let taskCounter = 0;` at the top |
| CSS overflow | `styles.css`: replaced `max-height: 300px` with `overflow-y: auto` |

Confirms the console now shows zero errors and all network requests return 200. Session churned for 47s.

## lab6-7.png
A browser screenshot (Chrome, controlled by automated test software) of the fully fixed **Task Tracker Pro** app at `localhost:8080`. Visible elements:
- A black square logo with a stylized orange/pink flame icon, now loading correctly.
- "Task Tracker Pro" in bold white text, with "Manage your tasks efficiently" subtitle beneath it.
- A blue-to-purple gradient background behind the header.
- A white card containing an "Add a new task..." text input field and a blue "Add Task" button.
- An empty task list area with the placeholder message "No tasks yet. Add one to get started!" in gray italic text.
- A footer reading "© 2025 Task Tracker Pro. Built with love."
- A yellow info bar at the top: "Chrome is being controlled by automated test software."

## lab6-8.png
Claude Code terminal showing the LCP (Largest Contentful Paint) performance analysis of `web.dev` using the Chrome DevTools MCP. Three MCP tool calls are visible: `list_pages`, `navigate_page` (to `https://web.dev`), and `performance_start_trace` (with `reload: true, autoStop: true`). The results are displayed in two tables:

**LCP Summary:**
| | Lab (this load) | Field (real users, p75) |
|---|---|---|
| LCP | 702 ms | 2,574 ms |

**LCP Breakdown:**
| Phase | Lab | Field |
|---|---|---|
| TTFB | 238 ms | 1,190 ms |
| Load delay | 10 ms | 83 ms |
| Load duration | 5 ms | 415 ms |
| Render delay | 449 ms | 828 ms |

Key observations note that lab LCP (702 ms) is excellent, field LCP (2,574 ms) sits right at the "Needs Improvement" threshold, and render delay is the dominant bottleneck in both environments.
