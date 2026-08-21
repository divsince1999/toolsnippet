import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "word-counter",
  "name": "Word Counter",
  "category": "Text",
  "shortDescription": "Count words, characters, sentences, paragraphs, and estimated reading time.",
  "heroTitle": "Count words and characters instantly",
  "heroDescription": "Real-time word count, character count, sentence count, paragraph count, and reading time estimation.",
  "about": "Word Counter helps writers, students, bloggers, and developers analyze text length, character limits, and readability metrics instantly.",
  "howToUse": [
    "Paste or type your text into the input box.",
    "View real-time statistics for words, characters, sentences, and paragraphs.",
    "Check estimated reading and speaking times.",
    "Copy the summary metrics or clear input as needed."
  ],
  "whyUse": [
    "Instant real-time calculation as you type.",
    "Helpful for social media posts, blog articles, and essays.",
    "100% private client-side text processing."
  ],
  "faqs": [
    {
      "question": "How are words counted?",
      "answer": "Words are counted by splitting non-empty character sequences separated by whitespace."
    },
    {
      "question": "How is reading time calculated?",
      "answer": "Reading time is estimated using an average reading speed of 200 words per minute."
    },
    {
      "question": "Is my text uploaded to a server?",
      "answer": "No. All calculations are performed entirely in your browser."
    }
  ],
  "features": [
    "Real-time word and character counting",
    "Character count with and without spaces",
    "Sentence and paragraph detection",
    "Estimated reading and speaking time",
    "One-click metrics copy",
    "100% private and client-side"
  ],
  "tips": [
    "Use character counts to optimize social media posts for platform limits",
    "Check reading time to gauge blog post engagement length",
    "Inspect paragraph count to improve content readability and layout"
  ]
};
