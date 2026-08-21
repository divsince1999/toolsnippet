import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-formatter",
  "name": "CSS Formatter",
  "category": "Data",
  "shortDescription": "Beautify and indent your CSS code.",
  "heroTitle": "Clean up your CSS",
  "heroDescription": "Format messy CSS files with consistent indentation and spacing.",
  "about": "CSS Formatter helps maintain clean and readable stylesheets for web development.",
  "howToUse": [
    "Paste your CSS code.",
    "Click Format CSS.",
    "Copy the beautified result."
  ],
  "whyUse": [
    "Improves maintainability.",
    "Easier to debug.",
    "Consistent coding style."
  ],
  "faqs": [
    {
      "question": "Does it support SCSS?",
      "answer": "It works best with standard CSS syntax."
    }
  ],
  "features": [
    "Beautify CSS instantly",
    "Proper indentation",
    "Consistent spacing",
    "Handle nested selectors",
    "Improve readability"
  ],
  "tips": [
    "Use for code reviews",
    "Standardize team CSS formatting",
    "Great for debugging styles",
    "Improves maintainability"
  ]
};
