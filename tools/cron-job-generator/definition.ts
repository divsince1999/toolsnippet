import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "cron-job-generator",
  name: "Cron Expression Generator & Visual Scheduler",
  category: "Dev",
  shortDescription: "Build and schedule 5-field crontab expressions with frequency presets, step values, and human-readable descriptions.",
  heroTitle: "Cron Expression Generator & Visual Scheduler",
  heroDescription: "Build and schedule 5-field crontab expressions with frequency presets, step values, and human-readable descriptions.",
  about: "The Cron Expression Generator helps developers construct 5-field standard cron expressions (`minute hour day-of-month month day-of-week`) using quick presets and visual controls, providing human-readable explanations.",
  features: [
    "Visual 5-field crontab builder (Minute, Hour, Day, Month, Day of Week)",
    "Common presets (Every 5 mins, Hourly, Daily at Midnight, Weekly on Sunday, Monthly)",
    "Instant plain English translation of the generated cron expression",
    "Crontab syntax copy support"
],
  howToUse: [
    "Select a preset or customize Minute, Hour, Day, and Weekday values.",
    "Review the human-readable explanation and cron string.",
    "Copy the 5-field cron syntax into your crontab or cloud task scheduler."
],
  whyUse: [
    "Eliminate syntax errors when configuring crontabs, GitHub Actions schedules, or AWS EventBridge rules.",
    "Confirm schedule timing with instant human-readable verification."
],
  tips: [
    "`*/15 * * * *` means 'every 15 minutes', whereas `0 */2 * * *` means 'every 2 hours at minute 0'."
],
  faqs: [
    {
        "question": "What do the 5 fields in standard Cron represent?",
        "answer": "From left to right: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12 or JAN-DEC), and Day of Week (0-6, where 0 is Sunday)."
    },
    {
        "question": "What is the difference between * and */5?",
        "answer": "`*` runs on every unit (e.g. every minute), while `*/5` is a step value that runs every 5th unit (e.g. at minutes 0, 5, 10, 15...)."
    }
]
};
