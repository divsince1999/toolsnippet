import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "read-time-calculator",
  "name": "Reading & Speaking Time Calculator",
  "category": "Text",
  "shortDescription": "Estimate reading time, speech duration, and text readability metrics.",
  "heroTitle": "Calculate reading time and speaking duration for articles",
  "heroDescription": "Estimate silent reading time, speech duration, word counts, and sentence metrics.",
  "about": "Reading & Speaking Time Calculator calculates accurate reading duration and speech time based on words per minute (WPM), helping bloggers, speakers, and copywriters pace their content.",
  "howToUse": [
    "Paste your article, speech draft, or script into the editor.",
    "Adjust Reading Speed (default 225 WPM) or Speaking Speed (default 130 WPM) if needed.",
    "View instant metrics on duration, word counts, and sentence complexity."
  ],
  "whyUse": [
    "Add accurate '5 min read' badges to your blog posts and articles.",
    "Time speeches and presentations accurately before rehearsing.",
    "Provides character, word, sentence, and paragraph statistics."
  ],
  "faqs": [
    {
      "question": "What is the average reading speed for adults?",
      "answer": "The average adult reads silently at approximately 200 to 250 words per minute (WPM)."
    },
    {
      "question": "What is the standard speaking rate for presentations?",
      "answer": "A comfortable, engaging presentation speech rate is between 120 and 150 words per minute."
    }
  ],
  "features": [
    "Customizable reading WPM and speaking WPM",
    "Minutes and seconds precision",
    "Character counters with and without whitespace",
    "Average word length and sentence structure stats"
  ],
  "tips": [
    "Aim for 3 to 7 minute reading times for optimal blog engagement",
    "For keynotes and presentations, budget 1 minute per 130 words of script"
  ]
};
