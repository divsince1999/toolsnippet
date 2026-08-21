import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "color-contrast-checker",
  "name": "WCAG Color Contrast Checker",
  "category": "Design",
  "shortDescription": "Check color contrast compliance for text and UI elements against WCAG 2.1 AA and AAA accessibility standards.",
  "heroTitle": "WCAG 2.1 Color Contrast Ratio Checker (AA & AAA)",
  "heroDescription": "Calculate exact color contrast ratios and verify accessibility compliance for normal text, large text, and UI components.",
  "about": "WCAG Color Contrast Checker computes the exact mathematical contrast ratio between foreground and background colors using relative luminance, providing instant pass/fail ratings for WCAG 2.1 Level AA and AAA standards.",
  "howToUse": [
    "Pick or enter text/foreground color and background color.",
    "View the calculated contrast ratio (e.g. 7.42 : 1).",
    "Check compliance badges for WCAG AA and AAA ratings.",
    "Use Swap Colors to test reversed contrast."
  ],
  "whyUse": [
    "Essential for building accessible, ADA-compliant, and SEO-friendly websites.",
    "Instant compliance grading for both normal body text and large headings.",
    "Includes quick one-click contrast presets."
  ],
  "faqs": [
    {
      "question": "What is the minimum WCAG contrast ratio for regular text?",
      "answer": "WCAG Level AA requires a minimum contrast ratio of 4.5:1 for normal text (under 18pt / 24px) and 3:1 for large text."
    },
    {
      "question": "What is the requirement for WCAG AAA?",
      "answer": "WCAG Level AAA requires an enhanced contrast ratio of 7:1 for normal text and 4.5:1 for large text."
    }
  ],
  "features": [
    "Relative luminance mathematical ratio calculation",
    "WCAG 2.1 AA and AAA pass/fail compliance ratings",
    "Live sample text preview card",
    "Color swapping button and curated presets"
  ],
  "tips": [
    "Aim for at least 4.5:1 for all essential text to pass Google Lighthouse accessibility audits",
    "Large text is defined as 18pt (24px) regular or 14pt (18.66px) bold"
  ]
};
