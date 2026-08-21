import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "user-agent-parser",
  "name": "User Agent Parser",
  "category": "Data",
  "shortDescription": "Extract browser and OS info from a User Agent string.",
  "heroTitle": "Decode User Agents",
  "heroDescription": "Identify browser, version, engine, and OS from any UA string.",
  "about": "User Agent Parser helps developers debug client-side issues and analyze traffic.",
  "howToUse": [
    "Paste a User Agent string.",
    "The details are parsed and displayed.",
    "View OS and Browser info."
  ],
  "whyUse": [
    "Debugging.",
    "Traffic analysis.",
    "Browser support testing."
  ],
  "faqs": [
    {
      "question": "Is it always accurate?",
      "answer": "It uses the latest UA patterns to ensure high accuracy."
    }
  ],
  "features": [
    "Parse User Agent strings instantly",
    "Identify browser and version",
    "Detect OS and platform",
    "Extract engine information",
    "One-click copy"
  ],
  "tips": [
    "Use for debugging client issues",
    "Analyze traffic patterns",
    "Test browser compatibility",
    "Understand user demographics"
  ]
};
