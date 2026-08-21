import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "percentage-calculator",
  "name": "Percentage Calculator",
  "category": "Number",
  "shortDescription": "Calculate percentages, percentage change, and reverse percentages.",
  "heroTitle": "Quick percentage calculations",
  "heroDescription": "Calculate what percent X is of Y, find percentage change between two values, or compute a percentage of a number instantly.",
  "about": "Percentage Calculator covers the three most common percentage problems: finding a percent of a number, finding what percent one number is of another, and calculating percentage change between two values.",
  "howToUse": [
    "Enter values in any of the three calculator modes.",
    "The result updates automatically.",
    "Switch between modes as needed."
  ],
  "whyUse": [
    "Handles the three most common percentage problems in one tool.",
    "No need to remember formulas — just plug in numbers.",
    "Instant calculations entirely in your browser."
  ],
  "faqs": [
    {
      "question": "How is percentage change calculated?",
      "answer": "Percentage change = ((New − Old) / |Old|) × 100. A positive result means an increase, negative means a decrease."
    },
    {
      "question": "Can it handle decimal percentages?",
      "answer": "Yes, both input values and results support decimals."
    },
    {
      "question": "What is a reverse percentage?",
      "answer": "A reverse percentage finds what percent one number is of another, e.g. what percent is 25 of 200?"
    }
  ],
  "features": [
    "Calculate X% of a number",
    "Find what percent X is of Y",
    "Calculate percentage increase or decrease",
    "Decimal precision support",
    "Three calculator modes in one tool"
  ],
  "tips": [
    "Use percentage change to compare sales figures month over month",
    "Use 'X% of Y' to calculate tips, discounts, and tax amounts",
    "Negative percentage change means a decrease"
  ]
};
