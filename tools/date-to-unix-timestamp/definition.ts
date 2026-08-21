import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "date-to-unix-timestamp",
  "name": "Date to Unix Timestamp",
  "category": "Data",
  "shortDescription": "Convert human dates to Unix timestamps.",
  "heroTitle": "Date to Timestamp",
  "heroDescription": "Convert any date and time into a Unix epoch integer.",
  "about": "Date to Unix Timestamp is useful for generating timestamps for API requests and DB queries.",
  "howToUse": [
    "Select or type a date/time.",
    "The Unix timestamp is generated instantly.",
    "Copy the result."
  ],
  "whyUse": [
    "API development.",
    "Database seeding.",
    "Time-based logic testing."
  ],
  "faqs": [
    {
      "question": "Is the timestamp in UTC?",
      "answer": "Yes, Unix timestamps are inherently UTC-based."
    }
  ],
  "features": [
    "Convert date to Unix timestamp",
    "Support various date formats",
    "Instant generation",
    "UTC-based output",
    "One-click copy"
  ],
  "tips": [
    "Use for API request parameters",
    "Database seeding with timestamps",
    "Understand UTC timezone",
    "Great for time-based logic"
  ]
};
