export interface CheatsheetRow {
  syntax: string;
  name: string;
  description: string;
  example?: string;
  tags?: string[];
}

export interface CheatsheetSection {
  id: string;
  title: string;
  description?: string;
  rows: CheatsheetRow[];
}

export interface CheatsheetFaq {
  question: string;
  answer: string;
}

export interface CheatsheetConfig {
  slug: string;
  title: string;
  headline: string;
  description: string;
  icon: string;
  category: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  color: string;
  targetKeywords: string[];
  toolCta: {
    title: string;
    description: string;
    toolSlug: string;
    toolName: string;
  };
  sections: CheatsheetSection[];
  faqs: CheatsheetFaq[];
}

export const CHEATSHEETS: CheatsheetConfig[] = [
  {
    slug: "regex-syntax-and-tokens",
    title: "Regular Expression (RegEx) Syntax & Tokens",
    headline: "Regular Expression (RegEx) Syntax, Token & Lookahead Reference",
    description: "A complete developer cheat sheet for RegEx tokens, character classes, anchors, lookaheads, lookbehinds, flags, and common production patterns with 1-click copy.",
    icon: "🔣",
    category: "Validation",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    badgeBorder: "border-emerald-500/30",
    color: "from-emerald-500/20 to-teal-500/20",
    targetKeywords: [
      "regex cheat sheet",
      "regular expression reference",
      "regex lookahead syntax",
      "regex character classes",
      "regex tokens list",
      "common regex patterns"
    ],
    toolCta: {
      title: "Need to test or build regular expressions visually?",
      description: "Use our interactive RegEx Token Builder with real-time match group highlighting.",
      toolSlug: "regex-cheatsheet-tester",
      toolName: "RegEx Token Builder & Tester"
    },
    sections: [
      {
        id: "character-classes",
        title: "Character Classes & Shorthands",
        description: "Predefined character classes for matching digits, word characters, and whitespace.",
        rows: [
          { syntax: "\\d", name: "Digit", description: "Matches any digit from 0 to 9", example: "3 in abc3" },
          { syntax: "\\D", name: "Non-Digit", description: "Matches any character that is not a digit", example: "a in 3a" },
          { syntax: "\\w", name: "Word Character", description: "Matches alphanumeric characters and underscore [a-zA-Z0-9_]", example: "user_1" },
          { syntax: "\\W", name: "Non-Word Character", description: "Matches any non-alphanumeric character", example: "! in hi!" },
          { syntax: "\\s", name: "Whitespace", description: "Matches space, tab, newline, form feed", example: "\\n, \\t, ' '" },
          { syntax: "\\S", name: "Non-Whitespace", description: "Matches any non-whitespace character", example: "x in ' x '" },
          { syntax: ".", name: "Any Character", description: "Matches any character except newline (unless dotAll flag 's' is active)", example: "a, 1, @" },
          { syntax: "[abc]", name: "Character Set", description: "Matches any single character within brackets", example: "a, b, or c" },
          { syntax: "[^abc]", name: "Negated Set", description: "Matches any character NOT listed within brackets", example: "x in [^abc]" },
          { syntax: "[a-z]", name: "Range", description: "Matches any lowercase letter between a and z", example: "f in [a-z]" },
          { syntax: "[a-zA-Z0-9]", name: "Alphanumeric Range", description: "Matches standard alphanumeric characters", example: "Token42" }
        ]
      },
      {
        id: "quantifiers",
        title: "Quantifiers & Multipliers",
        description: "Specify how many times a character or group should be repeated.",
        rows: [
          { syntax: "*", name: "Zero or More", description: "Matches 0 or more occurrences (greedy)", example: "ab* matches a, ab, abbb" },
          { syntax: "+", name: "One or More", description: "Matches 1 or more occurrences (greedy)", example: "ab+ matches ab, abbb" },
          { syntax: "?", name: "Zero or One", description: "Matches 0 or 1 occurrence (optional)", example: "colou?r matches color, colour" },
          { syntax: "{n}", name: "Exactly N Times", description: "Matches exactly n consecutive occurrences", example: "\\d{4} matches 2026" },
          { syntax: "{n,}", name: "N or More Times", description: "Matches at least n occurrences", example: "\\d{2,} matches 12, 12345" },
          { syntax: "{n,m}", name: "Between N and M Times", description: "Matches between n and m occurrences", example: "\\w{3,8} matches user" },
          { syntax: "*?", name: "Lazy Zero or More", description: "Matches the smallest possible number of occurrences", example: "<.*?> for HTML tags" },
          { syntax: "+?", name: "Lazy One or More", description: "Matches the minimum necessary occurrences", example: "\".+?\" for quoted strings" }
        ]
      },
      {
        id: "anchors-boundaries",
        title: "Anchors & Word Boundaries",
        description: "Assert positions in the string without consuming characters.",
        rows: [
          { syntax: "^", name: "Start of String / Line", description: "Asserts position at start of input (or line with multiline flag 'm')", example: "^Hello" },
          { syntax: "$", name: "End of String / Line", description: "Asserts position at end of input (or line with multiline flag 'm')", example: "World$" },
          { syntax: "\\b", name: "Word Boundary", description: "Asserts position between a word character (\\w) and non-word character", example: "\\bcat\\b matches 'cat' not 'scatter'" },
          { syntax: "\\B", name: "Non-Word Boundary", description: "Asserts position where \\b does not match", example: "\\Bcat matches 'scatter'" }
        ]
      },
      {
        id: "lookaheads-lookbehinds",
        title: "Lookaheads & Lookbehinds (Zero-Width Assertions)",
        description: "Match a pattern only if it is followed or preceded by another pattern.",
        rows: [
          { syntax: "(?=...)", name: "Positive Lookahead", description: "Matches if followed by pattern without including it in match", example: "\\d+(?=px) matches 100 in 100px" },
          { syntax: "(?!...)", name: "Negative Lookahead", description: "Matches if NOT followed by pattern", example: "\\d+(?!px) matches 100 in 100em" },
          { syntax: "(?<=...)", name: "Positive Lookbehind", description: "Matches if preceded by pattern without including it in match", example: "(?<=\\$)\\d+ matches 50 in $50" },
          { syntax: "(?<!...)", name: "Negative Lookbehind", description: "Matches if NOT preceded by pattern", example: "(?<!\\$)\\d+ matches 50 in €50" }
        ]
      },
      {
        id: "common-patterns",
        title: "Common Production RegEx Patterns",
        description: "Tested regular expressions ready for copy-pasting into backend and frontend code.",
        rows: [
          { syntax: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", name: "Email Address", description: "Standard RFC 5322 compatible email validation", example: "user@example.com" },
          { syntax: "^https?:\\/\\/[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!$&'()*+,;=.]+$", name: "HTTP / HTTPS URL", description: "Validates web URLs with query strings and paths", example: "https://toolsnippet.com" },
          { syntax: "^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", name: "IPv4 Address", description: "Validates 0-255 dotted decimal IP addresses", example: "192.168.1.1" },
          { syntax: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", name: "Strong Password", description: "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char", example: "P@ssw0rd2026" },
          { syntax: "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$", name: "UUID v4", description: "Validates standard 36-character UUID string", example: "123e4567-e89b-12d3-a456-426614174000" }
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between greedy and lazy matching in RegEx?",
        answer: "Greedy quantifiers (like `.*`) match as much text as possible. Lazy quantifiers (like `.*?`) stop at the first matching opportunity. For HTML tag parsing, lazy matching is essential."
      },
      {
        question: "How do lookaheads work without consuming characters?",
        answer: "Lookaheads (e.g. `(?=px)`) check if the characters ahead match the pattern, but the match pointer does not consume those characters, leaving them available for subsequent tokens."
      }
    ]
  },
  {
    slug: "crontab-syntax-schedule",
    title: "Crontab Syntax & Schedule Reference",
    headline: "Crontab Syntax, Schedule Expressions & Special Strings",
    description: "Quick reference guide for Unix/Linux crontab schedule syntax, 5-field time breakdown, step values, special characters, and common cron presets.",
    icon: "⏰",
    category: "Dev",
    badgeBg: "bg-teal-500/10 dark:bg-teal-500/20",
    badgeText: "text-teal-600 dark:text-teal-400",
    badgeBorder: "border-teal-500/30",
    color: "from-teal-500/20 to-cyan-500/20",
    targetKeywords: [
      "crontab cheat sheet",
      "cron syntax reference",
      "cron schedule expressions",
      "cron special strings",
      "crontab every 5 minutes",
      "crontab reboot"
    ],
    toolCta: {
      title: "Want to generate or test cron schedules visually?",
      description: "Build custom 5-field cron jobs with plain-English schedule translations.",
      toolSlug: "cron-job-generator",
      toolName: "Cron Job Generator & Translator"
    },
    sections: [
      {
        id: "field-structure",
        title: "Crontab 5-Field Structure",
        description: "Standard Linux/Unix crontab position breakdown.",
        rows: [
          { syntax: "┌───────────── minute (0 - 59)\n│ ┌───────────── hour (0 - 23)\n│ │ ┌───────────── day of month (1 - 31)\n│ │ │ ┌───────────── month (1 - 12 or JAN-DEC)\n│ │ │ │ ┌───────────── day of week (0 - 6 or SUN-SAT, 0=Sun)\n│ │ │ │ │\n* * * * *", name: "5-Field Syntax", description: "Standard cron specification order: Minute, Hour, Day of Month, Month, Day of Week" }
        ]
      },
      {
        id: "special-operators",
        title: "Special Characters & Operators",
        description: "Allowed operators across crontab time fields.",
        rows: [
          { syntax: "*", name: "Asterisk (Wildcard)", description: "Matches every possible value in that field", example: "* in minute = every minute" },
          { syntax: ",", name: "Comma (Value List)", description: "Specifies a list of discrete values", example: "1,15,30 in minute field" },
          { syntax: "-", name: "Hyphen (Range)", description: "Specifies an inclusive range of values", example: "1-5 in day-of-week = Mon to Fri" },
          { syntax: "/", name: "Slash (Step Values)", description: "Specifies incremental steps over a range or wildcard", example: "*/15 in minute = every 15 minutes" },
          { syntax: "L", name: "Last (Non-Standard)", description: "Represents the last day of month or last specific weekday", example: "5L = last Friday of month" },
          { syntax: "W", name: "Weekday (Non-Standard)", description: "Nearest weekday (Mon-Fri) to given day of month", example: "15W = closest weekday to 15th" }
        ]
      },
      {
        id: "common-presets",
        title: "Common Schedule Presets",
        description: "Frequently used crontab schedules ready for production servers.",
        rows: [
          { syntax: "* * * * *", name: "Every Minute", description: "Executes command every 60 seconds", example: "Health checks, queue polling" },
          { syntax: "*/5 * * * *", name: "Every 5 Minutes", description: "Runs at minute 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55", example: "Telemetry batching" },
          { syntax: "*/15 * * * *", name: "Every 15 Minutes", description: "Runs at minute 0, 15, 30, 45 of every hour", example: "Cache refreshes" },
          { syntax: "0 * * * *", name: "Every Hour (Top of Hour)", description: "Runs at minute 0 of every hour (00:00, 01:00, 02:00...)", example: "Hourly syncs" },
          { syntax: "0 0 * * *", name: "Every Day at Midnight", description: "Runs at 00:00 (12:00 AM) every day", example: "Daily log rotations" },
          { syntax: "0 2 * * *", name: "Daily at 2:00 AM", description: "Runs at low-traffic time 02:00 daily", example: "Database backups" },
          { syntax: "0 0 * * 1", name: "Every Monday at Midnight", description: "Runs at 00:00 every Monday", example: "Weekly summary emails" },
          { syntax: "0 0 1 * *", name: "1st of Every Month", description: "Runs at 00:00 on day 1 of every month", example: "Monthly billing runs" },
          { syntax: "0 9-17 * * 1-5", name: "Business Hours (Mon-Fri)", description: "Runs every hour from 9 AM to 5 PM on weekdays", example: "Office notification jobs" }
        ]
      },
      {
        id: "special-strings",
        title: "Crontab Special Strings (@shortcuts)",
        description: "Human-readable shortcut aliases supported by modern cron daemons (Vixie Cron, systemd).",
        rows: [
          { syntax: "@reboot", name: "Run at Startup", description: "Executes once when the system boots up", example: "@reboot /opt/app/start.sh" },
          { syntax: "@yearly / @annually", name: "Once a Year (0 0 1 1 *)", description: "Executes at midnight on January 1st", example: "Annual archival" },
          { syntax: "@monthly", name: "Once a Month (0 0 1 * *)", description: "Executes at midnight on first day of month", example: "Monthly reports" },
          { syntax: "@weekly", name: "Once a Week (0 0 * * 0)", description: "Executes at midnight on Sunday", example: "Weekly vacuum" },
          { syntax: "@daily / @midnight", name: "Once a Day (0 0 * * *)", description: "Executes at midnight daily", example: "Nightly builds" },
          { syntax: "@hourly", name: "Once an Hour (0 * * * *)", description: "Executes at the start of every hour", example: "Hourly feed sync" }
        ]
      }
    ],
    faqs: [
      {
        question: "How do I redirect cron job output to avoid receiving local emails?",
        answer: "Append `>/dev/null 2>&1` to discard standard output and errors, or `>> /var/log/myjob.log 2>&1` to append to a log file."
      },
      {
        question: "Which timezone does crontab execute in?",
        answer: "Cron uses the system's local timezone unless explicitly overridden by `CRON_TZ=UTC` at the top of the crontab file."
      }
    ]
  },
  {
    slug: "http-status-codes",
    title: "HTTP Status Codes (1xx–5xx) Quick Reference",
    headline: "HTTP Status Codes (1xx–5xx) Complete Reference Guide",
    description: "Comprehensive quick reference for all standard RFC HTTP status codes, REST API conventions, caching behaviors, and client/server error definitions.",
    icon: "🌐",
    category: "Web",
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/20",
    badgeText: "text-sky-600 dark:text-sky-400",
    badgeBorder: "border-sky-500/30",
    color: "from-sky-500/20 to-blue-500/20",
    targetKeywords: [
      "http status codes list",
      "404 vs 410",
      "http error codes",
      "502 bad gateway meaning",
      "rest api status codes",
      "http 301 vs 302"
    ],
    toolCta: {
      title: "Need to parse URLs or test query parameters?",
      description: "Inspect URL components, origins, parameters, and protocol schemes.",
      toolSlug: "url-parser",
      toolName: "URL Component & Parameter Parser"
    },
    sections: [
      {
        id: "2xx-success",
        title: "2xx Success Codes",
        description: "The action was successfully received, understood, and accepted.",
        rows: [
          { syntax: "200 OK", name: "Standard Success", description: "Request succeeded. Response body contains requested resource payload." },
          { syntax: "201 Created", name: "Resource Created", description: "Request succeeded and resulted in creation of a new resource (common in POST/PUT)." },
          { syntax: "202 Accepted", name: "Accepted (Async)", description: "Request accepted for async processing, but processing has not completed." },
          { syntax: "204 No Content", name: "No Content", description: "Request succeeded but returns no response body (common in DELETE or PUT operations)." },
          { syntax: "206 Partial Content", name: "Partial Content", description: "Server is delivering only part of resource due to Range header (used in video streaming)." }
        ]
      },
      {
        id: "3xx-redirection",
        title: "3xx Redirection Codes",
        description: "Further action must be taken by the user agent to fulfill request.",
        rows: [
          { syntax: "301 Moved Permanently", name: "Permanent Redirect", description: "Resource has permanently moved to new URI. Search engines transfer link equity." },
          { syntax: "302 Found", name: "Temporary Redirect", description: "Resource temporarily resides under different URI. Search engines retain original URL." },
          { syntax: "304 Not Modified", name: "Cached Copy Valid", description: "Resource has not changed since conditional request header (If-Modified-Since / ETag)." },
          { syntax: "307 Temporary Redirect", name: "Strict Temporary Redirect", description: "Temporary redirect that guarantees HTTP method (POST stays POST) is preserved." },
          { syntax: "308 Permanent Redirect", name: "Strict Permanent Redirect", description: "Permanent redirect that guarantees HTTP method is preserved." }
        ]
      },
      {
        id: "4xx-client-errors",
        title: "4xx Client Error Codes",
        description: "The request contains bad syntax or cannot be fulfilled by client.",
        rows: [
          { syntax: "400 Bad Request", name: "Malformed Request", description: "Server cannot process request due to client error (invalid JSON, malformed syntax)." },
          { syntax: "401 Unauthorized", name: "Authentication Required", description: "Client lacks valid authentication credentials (missing or expired token)." },
          { syntax: "403 Forbidden", name: "Permission Denied", description: "Client identity is known, but access rights to the resource are denied." },
          { syntax: "404 Not Found", name: "Resource Not Found", description: "Origin server did not find a current representation for target resource." },
          { syntax: "405 Method Not Allowed", name: "Method Not Supported", description: "Request HTTP method (e.g. POST) is not supported for this endpoint." },
          { syntax: "409 Conflict", name: "State Conflict", description: "Request conflicts with current state of server (e.g. duplicate email in registration)." },
          { syntax: "410 Gone", name: "Permanently Deleted", description: "Resource was intentionally deleted and will not be available again (better than 404 for SEO)." },
          { syntax: "422 Unprocessable Entity", name: "Validation Error", description: "Syntax is correct, but payload failed semantic validation rules (WebDAV / REST standard)." },
          { syntax: "429 Too Many Requests", name: "Rate Limited", description: "User has sent too many requests in a given time window (Rate Limiting)." }
        ]
      },
      {
        id: "5xx-server-errors",
        title: "5xx Server Error Codes",
        description: "Server failed to fulfill an apparently valid request.",
        rows: [
          { syntax: "500 Internal Server Error", name: "Server Crash", description: "Generic catch-all error when an unexpected condition occurred on the server." },
          { syntax: "502 Bad Gateway", name: "Upstream Error", description: "Server received an invalid response from upstream server (e.g. Nginx proxying to Node)." },
          { syntax: "503 Service Unavailable", name: "Overloaded / Maintenance", description: "Server is currently unable to handle request due to temporary overloading or maintenance." },
          { syntax: "504 Gateway Timeout", name: "Upstream Timeout", description: "Server did not receive timely response from upstream server (e.g. database query hang)." }
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between 401 Unauthorized and 403 Forbidden?",
        answer: "401 means 'You are not logged in / credentials invalid'. 403 means 'You are logged in, but you do not have permission to access this resource'."
      },
      {
        question: "Should I return 404 or 410 for deleted content?",
        answer: "Use 410 (Gone) when a page was permanently deleted and you want search engines to remove it immediately. Use 404 if it might be a broken link."
      }
    ]
  },
  {
    slug: "dockerfile-instructions",
    title: "Dockerfile Instructions & Directives Reference",
    headline: "Dockerfile Instructions, Directives & Multi-Stage Reference",
    description: "Complete syntax guide for Dockerfile instructions (FROM, RUN, CMD, ENTRYPOINT, COPY, ENV, ARG, HEALTHCHECK) with multi-stage build best practices.",
    icon: "🐳",
    category: "Dev",
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
    badgeText: "text-blue-600 dark:text-blue-400",
    badgeBorder: "border-blue-500/30",
    color: "from-blue-500/20 to-indigo-500/20",
    targetKeywords: [
      "dockerfile instructions",
      "cmd vs entrypoint",
      "dockerfile cheat sheet",
      "copy vs add docker",
      "dockerfile multi stage",
      "dockerfile best practices"
    ],
    toolCta: {
      title: "Need to generate production-ready Dockerfiles?",
      description: "Build hardened multi-stage Dockerfiles for Node.js, Python, Go, Rust, and Nginx with non-root security.",
      toolSlug: "dockerfile-generator",
      toolName: "Dockerfile & Multi-Stage Builder"
    },
    sections: [
      {
        id: "core-instructions",
        title: "Core Dockerfile Instructions",
        description: "Essential build directives used across all container images.",
        rows: [
          { syntax: "FROM <image>[:tag] [AS <name>]", name: "Base Image", description: "Initializes a new build stage and sets base image", example: "FROM node:20-alpine AS builder" },
          { syntax: "WORKDIR /path/to/dir", name: "Working Directory", description: "Sets working directory for subsequent RUN, CMD, ENTRYPOINT, COPY", example: "WORKDIR /app" },
          { syntax: "COPY [--from=<name>] <src> <dest>", name: "Copy Files", description: "Copies new files or directories from host into container filesystem", example: "COPY --from=builder /app/dist ./dist" },
          { syntax: "ADD <src> <dest>", name: "Add (with Tar extraction/URLs)", description: "Like COPY, but automatically unpacks local tar archives and fetches URLs", example: "ADD package.tar.gz /app/" },
          { syntax: "RUN <command>", name: "Execute Build Command", description: "Executes commands in a new layer on top of current image and commits result", example: "RUN npm ci --only=production" },
          { syntax: "ENV <key>=<value>", name: "Environment Variable", description: "Sets persistent environment variables available at build and runtime", example: "ENV NODE_ENV=production" },
          { syntax: "ARG <name>[=<default>]", name: "Build-Time Argument", description: "Defines variables that users can pass at build-time with --build-arg", example: "ARG VERSION=1.0.0" },
          { syntax: "EXPOSE <port>[/<protocol>]", name: "Expose Port", description: "Documents network ports that container listens on at runtime", example: "EXPOSE 3000" },
          { syntax: "USER <user>[:<group>]", name: "Run as Non-Root User", description: "Sets user name or UID to use when running image and for RUN/CMD instructions", example: "USER node" }
        ]
      },
      {
        id: "execution-commands",
        title: "Execution: CMD vs ENTRYPOINT",
        description: "Configuring how containers start and handle CLI arguments.",
        rows: [
          { syntax: "CMD [\"executable\", \"param1\", \"param2\"]", name: "Default Command (Exec form)", description: "Provides default command or arguments that can be easily overridden by docker run", example: "CMD [\"node\", \"server.js\"]" },
          { syntax: "ENTRYPOINT [\"executable\", \"param1\"]", name: "Fixed Entrypoint (Exec form)", description: "Configures container to run as an executable; parameters from CMD or CLI append to it", example: "ENTRYPOINT [\"npm\", \"start\"]" },
          { syntax: "HEALTHCHECK [options] CMD <command>", name: "Healthcheck", description: "Tells Docker how to test container to check that it is still working", example: "HEALTHCHECK CMD curl -f http://localhost:3000/api/health || exit 1" },
          { syntax: "VOLUME [\"/path/to/dir\"]", name: "Mount Volume", description: "Creates a mount point with specified path and marks it as holding externally mounted volume", example: "VOLUME [\"/data\"]" }
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between CMD and ENTRYPOINT?",
        answer: "ENTRYPOINT defines the fixed executable that will run, while CMD defines default arguments that can be replaced when executing `docker run`."
      },
      {
        question: "Why should I use multi-stage Docker builds?",
        answer: "Multi-stage builds allow you to use heavy build tools (compilers, SDKs, devDependencies) in a temporary build stage and copy only the final compiled artifacts into a tiny runtime image (e.g. Alpine), reducing image size from 1GB+ down to 50MB."
      }
    ]
  },
  {
    slug: "git-commands-and-workflows",
    title: "Essential Git Commands & Workflows Reference",
    headline: "Essential Git Commands, Branching & Advanced Workflows",
    description: "Developer reference for daily Git commands, branch management, cherry-picking, interactive rebasing, undoing commits, and stash tricks.",
    icon: "🌿",
    category: "Dev",
    badgeBg: "bg-orange-500/10 dark:bg-orange-500/20",
    badgeText: "text-orange-600 dark:text-orange-400",
    badgeBorder: "border-orange-500/30",
    color: "from-orange-500/20 to-amber-500/20",
    targetKeywords: [
      "git commands cheat sheet",
      "git undo last commit",
      "git rebase vs merge",
      "git stash commands",
      "git cherry pick syntax",
      "git reflog recovery"
    ],
    toolCta: {
      title: "Need to generate a .gitignore for your tech stack?",
      description: "Create tailored .gitignore files for Node, Python, Rust, Go, macOS, Windows, and IDE configs.",
      toolSlug: "gitignore-generator",
      toolName: ".gitignore Multi-Ecosystem Generator"
    },
    sections: [
      {
        id: "staging-commits",
        title: "Staging, Commits & Status",
        description: "Everyday commands for tracking and committing changes.",
        rows: [
          { syntax: "git status", name: "Status Overview", description: "Shows modified, staged, and untracked files in working tree" },
          { syntax: "git add .", name: "Stage All Changes", description: "Stages all modifications and new files for next commit" },
          { syntax: "git add -p", name: "Interactive Patch Staging", description: "Interactively review and stage individual chunks/lines of code" },
          { syntax: "git commit -m \"feat: description\"", name: "Commit Staged", description: "Records staged snapshot to repository history with message" },
          { syntax: "git commit --amend --no-edit", name: "Amend Previous Commit", description: "Adds staged changes into the most recent commit without modifying commit message" }
        ]
      },
      {
        id: "branching-merging",
        title: "Branching & Merging",
        description: "Creating, switching, and merging branches.",
        rows: [
          { syntax: "git checkout -b <branch-name>", name: "Create & Switch Branch", description: "Creates a new branch from current HEAD and checks it out" },
          { syntax: "git switch <branch-name>", name: "Switch Branch (Modern)", description: "Switches working directory to existing branch" },
          { syntax: "git merge <branch-name>", name: "Merge Branch", description: "Merges specified branch into current active branch" },
          { syntax: "git rebase main", name: "Rebase onto Main", description: "Replays current branch commits on top of latest main branch" },
          { syntax: "git cherry-pick <commit-hash>", name: "Cherry-Pick Commit", description: "Applies the changes from a specific commit into current branch" }
        ]
      },
      {
        id: "undoing-recovering",
        title: "Undoing Changes & Recovery",
        description: "Safely undoing mistakes and recovering lost commits.",
        rows: [
          { syntax: "git reset --soft HEAD~1", name: "Undo Commit (Keep Staged)", description: "Undoes the last commit but leaves changes staged ready to re-commit" },
          { syntax: "git reset --hard HEAD~1", name: "Discard Last Commit", description: "Permanently discards last commit and all associated working changes" },
          { syntax: "git restore <file>", name: "Discard Working File Changes", description: "Discards uncommitted changes in a specific file" },
          { syntax: "git revert <commit-hash>", name: "Revert Commit (Safe)", description: "Creates a new inverse commit that safely undoes an older public commit" },
          { syntax: "git reflog", name: "Reference Log", description: "Shows log of all HEAD movements to recover accidentally deleted commits or branches" }
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between git merge and git rebase?",
        answer: "`git merge` creates a new merge commit combining two histories. `git rebase` rewrites your branch commits on top of the target branch for a clean, linear history."
      },
      {
        question: "How do I temporarily save uncommitted work?",
        answer: "Use `git stash` to save working changes, and `git stash pop` to restore them later."
      }
    ]
  },
  {
    slug: "nginx-location-directives",
    title: "Nginx Location Directives & Reverse Proxy Guide",
    headline: "Nginx Server Block Directives, Location Matching & Proxy Reference",
    description: "Developer cheat sheet for Nginx location block matching order, reverse proxy headers, WebSocket upgrades, SSL hardening, and gzip compression.",
    icon: "⚙️",
    category: "Dev",
    badgeBg: "bg-green-500/10 dark:bg-green-500/20",
    badgeText: "text-green-600 dark:text-green-400",
    badgeBorder: "border-green-500/30",
    color: "from-green-500/20 to-emerald-500/20",
    targetKeywords: [
      "nginx location regex priority",
      "nginx proxy_pass headers",
      "nginx cheat sheet",
      "nginx websocket proxy",
      "nginx try_files spa",
      "nginx server block syntax"
    ],
    toolCta: {
      title: "Need to generate an Nginx virtual host configuration?",
      description: "Build complete reverse proxy configs with SSL, gzip, security headers, and WebSocket support.",
      toolSlug: "nginx-config-generator",
      toolName: "Nginx Virtual Host Config Builder"
    },
    sections: [
      {
        id: "location-modifiers",
        title: "Location Block Modifiers & Match Priority",
        description: "Order of evaluation Nginx uses to select matching location blocks.",
        rows: [
          { syntax: "location = /exact/path", name: "1. Exact Match (=)", description: "Highest priority. Matches only exact URI string. Processing stops immediately upon match." },
          { syntax: "location ^~ /images/", name: "2. Preferential Prefix (^~)", description: "Matches prefix URI. If matched, Nginx skips regular expression checking." },
          { syntax: "location ~ \\.php$", name: "3. Case-Sensitive RegEx (~)", description: "Evaluated in order of appearance in configuration file." },
          { syntax: "location ~* \\.(jpg|png)$", name: "4. Case-Insensitive RegEx (~*)", description: "Evaluates regex without case sensitivity." },
          { syntax: "location /prefix/", name: "5. Standard Prefix (None)", description: "Longest matching prefix is used if no regex matches." }
        ]
      },
      {
        id: "proxy-pass-headers",
        title: "Standard Reverse Proxy Directives",
        description: "Essential proxy headers for Node.js, Python, and Go backends.",
        rows: [
          { syntax: "proxy_pass http://127.0.0.1:3000;", name: "Upstream Target", description: "Passes request to specified backend application server" },
          { syntax: "proxy_set_header Host $host;", name: "Host Header", description: "Forwards the original request Host header to backend" },
          { syntax: "proxy_set_header X-Real-IP $remote_addr;", name: "Client IP Header", description: "Forwards the actual visitor IP address" },
          { syntax: "proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;", name: "Forwarded For", description: "Appends client IP to proxy chain list" },
          { syntax: "proxy_set_header X-Forwarded-Proto $scheme;", name: "Protocol Header", description: "Informs backend whether client connected over http or https" }
        ]
      },
      {
        id: "spa-fallback",
        title: "SPA & Static Asset Fallbacks",
        description: "Clean URL routing for React, Vue, Next.js, and static sites.",
        rows: [
          { syntax: "try_files $uri $uri/ /index.html;", name: "SPA History Fallback", description: "Serves file, directory, or falls back to index.html for client-side routing" },
          { syntax: "expires 1y;\nadd_header Cache-Control \"public, immutable\";", name: "Static Asset Caching", description: "Long-term caching for hashed JS/CSS/image assets" }
        ]
      }
    ],
    faqs: [
      {
        question: "How do I enable WebSocket proxying in Nginx?",
        answer: "Add `proxy_http_version 1.1;`, `proxy_set_header Upgrade $http_upgrade;`, and `proxy_set_header Connection \"upgrade\";` inside the location block."
      }
    ]
  },
  {
    slug: "css-flexbox-and-grid",
    title: "CSS Flexbox & Grid Property Reference",
    headline: "CSS Flexbox, Grid & Modern Layout Properties Reference",
    description: "Visual quick reference for CSS Flexbox container/child alignment properties, CSS Grid layout patterns, and modern responsive functions (clamp, min, max).",
    icon: "📐",
    category: "Design",
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/20",
    badgeText: "text-purple-600 dark:text-purple-400",
    badgeBorder: "border-purple-500/30",
    color: "from-purple-500/20 to-pink-500/20",
    targetKeywords: [
      "css flexbox cheat sheet",
      "css grid syntax",
      "justify content vs align items",
      "css clamp syntax",
      "auto-fit vs auto-fill",
      "css layout reference"
    ],
    toolCta: {
      title: "Need to generate CSS effects visually?",
      description: "Build modern glassmorphism blurs, multi-layered box shadows, and gradients.",
      toolSlug: "css-glassmorphism-generator",
      toolName: "CSS Glassmorphism Generator"
    },
    sections: [
      {
        id: "flexbox-container",
        title: "Flexbox Container Properties",
        description: "Properties applied to the parent flex container.",
        rows: [
          { syntax: "display: flex;", name: "Flex Container", description: "Defines a flex container and activates flex context for direct children" },
          { syntax: "flex-direction: row | column | row-reverse | column-reverse;", name: "Direction", description: "Sets the main axis direction" },
          { syntax: "justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly;", name: "Main Axis Alignment", description: "Aligns flex items along the main axis" },
          { syntax: "align-items: stretch | flex-start | center | flex-end | baseline;", name: "Cross Axis Alignment", description: "Aligns flex items along the cross axis" },
          { syntax: "flex-wrap: nowrap | wrap | wrap-reverse;", name: "Multi-line Wrapping", description: "Controls whether flex items wrap into multiple lines" },
          { syntax: "gap: 1rem 1.5rem;", name: "Row / Column Gap", description: "Sets gutter spacing between flex and grid items" }
        ]
      },
      {
        id: "css-grid-container",
        title: "CSS Grid Layout Properties",
        description: "Properties for 2-dimensional grid layouts.",
        rows: [
          { syntax: "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));", name: "Responsive Auto Grid", description: "Creates auto-wrapping responsive columns without media queries" },
          { syntax: "grid-template-columns: 1fr 2fr 1fr;", name: "Fractional Columns (fr)", description: "Splits available grid space by proportional fractional units" },
          { syntax: "grid-column: span 2;", name: "Column Span", description: "Item spans across 2 column tracks" }
        ]
      },
      {
        id: "modern-math-functions",
        title: "Modern CSS Math Functions",
        description: "Fluid typography and responsive size calculations.",
        rows: [
          { syntax: "font-size: clamp(1rem, 2.5vw, 2.5rem);", name: "Fluid Clamp", description: "clamp(min, preferred, max) — keeps value bounded between min and max" },
          { syntax: "width: min(100%, 1200px);", name: "Minimum Bound", description: "Sets width to 100% on small screens, capping at 1200px on large viewports" },
          { syntax: "aspect-ratio: 16 / 9;", name: "Aspect Ratio", description: "Enforces video or card aspect ratio without padding hacks" }
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between justify-content and align-items?",
        answer: "`justify-content` controls alignment along the main axis (horizontal by default), while `align-items` controls alignment along the cross axis (vertical by default)."
      }
    ]
  },
  {
    slug: "html-character-entities",
    title: "HTML Character Entities & Special Symbols Reference",
    headline: "HTML Named, Decimal & Hex Character Entities Reference",
    description: "Lookup guide for HTML named entities, currency symbols, mathematical operators, arrows, and punctuation codes with 1-click copy.",
    icon: "🔤",
    category: "Text",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    badgeBorder: "border-emerald-500/30",
    color: "from-emerald-500/20 to-teal-500/20",
    targetKeywords: [
      "html entities list",
      "copyright html entity",
      "html special characters",
      "html arrow codes",
      "html currency symbols",
      "html entity lookup"
    ],
    toolCta: {
      title: "Need to encode or decode HTML strings automatically?",
      description: "Convert special characters to HTML entities and decode raw entity text.",
      toolSlug: "html-entity-encoder",
      toolName: "HTML Entity Encoder & Decoder"
    },
    sections: [
      {
        id: "essential-reserved",
        title: "Essential HTML Reserved Characters",
        description: "Must be escaped in HTML documents to avoid syntax errors.",
        rows: [
          { syntax: "&lt;", name: "Less Than (<)", description: "&#60; or &#x3C;", example: "<" },
          { syntax: "&gt;", name: "Greater Than (>)", description: "&#62; or &#x3E;", example: ">" },
          { syntax: "&amp;", name: "Ampersand (&)", description: "&#38; or &#x26;", example: "&" },
          { syntax: "&quot;", name: "Double Quote (\")", description: "&#34; or &#x22;", example: "\"" },
          { syntax: "&apos;", name: "Apostrophe / Single Quote (')", description: "&#39; or &#x27;", example: "'" }
        ]
      },
      {
        id: "symbols-typography",
        title: "Symbols, Copyright & Punctuation",
        description: "Everyday legal, brand, and typographical symbols.",
        rows: [
          { syntax: "&copy;", name: "Copyright Symbol (©)", description: "&#169; or &#xA9;", example: "©" },
          { syntax: "&reg;", name: "Registered Trademark (®)", description: "&#174; or &#xAE;", example: "®" },
          { syntax: "&trade;", name: "Trademark (™)", description: "&#8482; or &#x2122;", example: "™" },
          { syntax: "&nbsp;", name: "Non-Breaking Space", description: "&#160; or &#xA0; — prevents line break between words" },
          { syntax: "&mdash;", name: "Em Dash (—)", description: "&#8212; or &#x2014;", example: "—" },
          { syntax: "&ndash;", name: "En Dash (–)", description: "&#8211; or &#x2013;", example: "–" },
          { syntax: "&bull;", name: "Bullet Point (•)", description: "&#8226; or &#x2022;", example: "•" },
          { syntax: "&hellip;", name: "Horizontal Ellipsis (…)", description: "&#8230; or &#x2026;", example: "…" }
        ]
      },
      {
        id: "currencies-math",
        title: "Currencies & Math Symbols",
        description: "Financial currency signs and mathematical symbols.",
        rows: [
          { syntax: "&euro;", name: "Euro (€)", description: "&#8364; or &#x20AC;", example: "€" },
          { syntax: "&pound;", name: "Pound Sterling (£)", description: "&#163; or &#xA3;", example: "£" },
          { syntax: "&yen;", name: "Yen / Yuan (¥)", description: "&#165; or &#xA5;", example: "¥" },
          { syntax: "&times;", name: "Multiplication Sign (×)", description: "&#215; or &#xD7;", example: "×" },
          { syntax: "&divide;", name: "Division Sign (÷)", description: "&#247; or &#xF7;", example: "÷" },
          { syntax: "&plusmn;", name: "Plus-Minus Sign (±)", description: "&#177; or &#xB1;", example: "±" },
          { syntax: "&infin;", name: "Infinity (∞)", description: "&#8734; or &#x221E;", example: "∞" },
          { syntax: "&rarr;", name: "Right Arrow (→)", description: "&#8594; or &#x2192;", example: "→" },
          { syntax: "&larr;", name: "Left Arrow (←)", description: "&#8592; or &#x2190;", example: "←" }
        ]
      }
    ],
    faqs: [
      {
        question: "Why should I use HTML character entities instead of pasting raw unicode symbols?",
        answer: "Named and hexadecimal entities guarantee character encoding safety across all web servers, legacy browsers, and email clients regardless of page charset encoding."
      }
    ]
  }
];

export function getAllCheatsheets(): CheatsheetConfig[] {
  return CHEATSHEETS;
}

export function getCheatsheetBySlug(slug: string): CheatsheetConfig | undefined {
  return CHEATSHEETS.find((c) => c.slug === slug);
}
