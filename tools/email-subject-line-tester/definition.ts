import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "email-subject-line-tester",
  "name": "Email Subject Line & Spam Score Tester",
  "category": "Text",
  "shortDescription": "Test email subject lines for spam trigger words, character length, mobile preview cutoff, and open-rate factors.",
  "heroTitle": "Free Email Subject Line & Spam Score Tester",
  "heroDescription": "Optimize email open rates and avoid spam filters by analyzing subject line character count, spam words, and mobile preview truncation.",
  "about": "The Email Subject Line Tester grades subject line deliverability. It flags high-risk spam words (e.g. '100% FREE', 'ACT NOW', 'URGENT CASH'), tests mobile email client cutoffs (~40 characters on iPhone/Gmail app), and scores urgency and punctuation balance.",
  "howToUse": [
    "Enter your Email Subject Line and optional Preheader/Preview text.",
    "Review the overall Subject Line Score and spam risk indicator.",
    "Inspect the live simulated Mobile Email Inbox preview.",
    "Remove flagged spam words to maximize inbox deliverability."
  ],
  "whyUse": [
    "Prevent newsletters and transactional emails from landing in spam folders.",
    "Optimize subject lines for mobile Gmail and Apple Mail apps.",
    "Identify overused sales hype and excessive punctuation.",
    "100% private in-browser analysis."
  ],
  "faqs": [
    {
      "question": "What is the optimal character length for email subject lines?",
      "answer": "The ideal length is 30 to 50 characters (or 4 to 7 words). Mobile email clients typically truncate subject lines exceeding 40–45 characters."
    },
    {
      "question": "What triggers email spam filters?",
      "answer": "Excessive capitalization (ALL CAPS), multiple exclamation marks (!!!), and trigger words like 'GUARANTEED', 'FREE', 'CASH BONUS', and 'CLICK NOW'."
    }
  ]
};
