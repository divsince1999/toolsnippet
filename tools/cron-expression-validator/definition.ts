import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "cron-expression-validator",
  name: "Cron Expression Validator & Schedule Inspector",
  category: "Dev",
  shortDescription: "Validate, inspect, and calculate upcoming execution schedules for 5-field and 6-field crontab expressions.",
  heroTitle: "Online Cron Expression Validator & Schedule Calculator",
  heroDescription: "Validate cron syntax expressions in real-time, inspect field breakdowns, read natural language human descriptions, and calculate the next 5 execution timestamps.",
  about: "ToolSnippet's Cron Expression Validator is a developer utility for inspecting, validating, and debugging crontab schedules used in Linux cron jobs, Kubernetes CronJobs, AWS CloudWatch Events, and GitHub Actions workflows.",
  howToUse: [
    "Type or paste a 5-field or 6-field cron expression into the input bar.",
    "Inspect the field breakdown cards (Minute, Hour, Day of Month, Month, Day of Week).",
    "Read the real-time natural language schedule description.",
    "View the upcoming execution schedule dates calculated in your local timezone.",
    "Click quick presets (Every 5 minutes, Hourly, Daily at midnight, Weekdays 9 AM) to test common patterns.",
  ],
  whyUse: [
    "Field-by-Field Syntax Diagnostics: Pinpoints invalid ranges, unsupported characters, and out-of-bound values.",
    "Next Execution Timestamp Calculator: Confirms exactly when your automated job will trigger.",
    "100% Client-Side: Zero server latency and instant real-time feedback.",
  ],
  faqs: [
    {
      question: "What are the 5 fields in a standard Cron expression?",
      answer: "Standard Unix cron format consists of 5 fields: 1. Minute (0-59), 2. Hour (0-23), 3. Day of Month (1-31), 4. Month (1-12 or JAN-DEC), 5. Day of Week (0-7 or SUN-SAT, where 0 and 7 are Sunday).",
    },
    {
      question: "What does */15 mean in cron?",
      answer: "The slash '/' operator represents step values. '*/15' in the minute field means 'every 15 minutes' starting at minute 0.",
    },
  ],
  features: [
    "Support for 5-field Unix and 6-field Quartz/AWS expressions",
    "Field-by-field breakdown with range bounds checking",
    "Next 5 upcoming execution dates calculation",
    "Natural language English schedule translation",
    "Quick preset library for common recurring jobs",
    "1-click copy for cron syntax and human description",
  ],
  tips: [
    "Use 1-5 in the Day of Week field for Monday through Friday jobs.",
    "Remember that Day of Month (field 3) and Day of Week (field 5) have an OR relationship in Unix cron.",
  ],
};
