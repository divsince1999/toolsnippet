import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "cron-descriptor",
  "name": "Cron Expression Descriptor",
  "category": "Data",
  "shortDescription": "Convert cron expressions into human-readable text.",
  "heroTitle": "Understand Cron Jobs",
  "heroDescription": "Turn confusing cron schedules like '0 0 * * *' into clear English.",
  "about": "Cron Descriptor helps sysadmins and devs verify their scheduled tasks.",
  "howToUse": [
    "Enter a cron expression.",
    "Read the human-friendly schedule description.",
    "Copy for documentation."
  ],
  "whyUse": [
    "Avoid scheduling mistakes.",
    "Better documentation.",
    "Quick verification."
  ],
  "faqs": [
    {
      "question": "Does it support 6-part cron?",
      "answer": "Yes, it supports both 5 and 6 part expressions."
    }
  ],
  "features": [
    "Convert cron to readable text",
    "Support 5 and 6 part expressions",
    "Instant description",
    "Handle complex schedules",
    "One-click copy"
  ],
  "tips": [
    "Verify scheduled tasks",
    "Better documentation",
    "Avoid scheduling mistakes",
    "Great for sysadmins"
  ]
};
