import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "sql-formatter",
  "name": "SQL Formatter",
  "category": "Data",
  "shortDescription": "Beautify and format your SQL queries.",
  "heroTitle": "Beautify your SQL queries",
  "heroDescription": "Make your complex SQL queries readable and well-formatted instantly.",
  "about": "SQL Formatter helps developers and data analysts clean up messy SQL code for better readability and debugging.",
  "howToUse": [
    "Paste your SQL query into the input area.",
    "Click Format SQL to beautify the code.",
    "Copy the formatted query."
  ],
  "whyUse": [
    "Improves code readability.",
    "Helps in debugging complex queries.",
    "Supports various SQL dialects."
  ],
  "faqs": [
    {
      "question": "Does it support MySQL or PostgreSQL?",
      "answer": "Yes, it supports standard SQL which is compatible with most major databases."
    }
  ],
  "features": [
    "Beautify SQL queries instantly",
    "Support for multiple SQL dialects",
    "Proper indentation and spacing",
    "Keyword highlighting",
    "Works with complex queries"
  ],
  "tips": [
    "Use for code reviews and debugging",
    "Standardize your team's SQL formatting",
    "Check for syntax errors while formatting",
    "Great for documentation"
  ]
};
