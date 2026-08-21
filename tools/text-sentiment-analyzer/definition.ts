import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "text-sentiment-analyzer",
  "name": "Text Sentiment & Tone Analyzer",
  "category": "Text",
  "shortDescription": "Analyze sentiment polarity, emotional tone, and positive/negative word distributions in real time.",
  "heroTitle": "Free Text Sentiment & Emotional Tone Analyzer",
  "heroDescription": "Evaluate customer feedback, product reviews, social posts, and copy for positive, neutral, and negative sentiment.",
  "about": "The Text Sentiment & Tone Analyzer scores the emotional polarity of any written text using AFINN sentiment lexicons and contextual word heuristics. It provides a numeric score from -5 (Extremely Negative) to +5 (Extremely Positive) alongside lists of sentiment-carrying words.",
  "howToUse": [
    "Paste or type customer reviews, email drafts, or social media posts.",
    "Inspect the overall Sentiment Polarity and numeric score.",
    "Review the highlighted positive and negative keywords.",
    "Refine text tone to ensure the desired reader reaction."
  ],
  "whyUse": [
    "Quickly evaluate customer support tickets and user feedback.",
    "Analyze tone of marketing copy and email newsletters.",
    "Detect aggressive or negative phrasing before publishing.",
    "Runs 100% in your browser with complete privacy."
  ],
  "faqs": [
    {
      "question": "How is the sentiment score calculated?",
      "answer": "The analyzer tokenizes text, matches words against calibrated sentiment dictionaries, and normalizes the score based on total emotional words and text length."
    },
    {
      "question": "What do the polarity categories mean?",
      "answer": "Scores > +1.5 indicate Positive tone, between -1.5 and +1.5 represent Neutral/Balanced tone, and < -1.5 indicate Negative sentiment."
    }
  ]
};
