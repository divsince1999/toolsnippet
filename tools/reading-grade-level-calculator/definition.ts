import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "reading-grade-level-calculator",
  "name": "Readability & Grade Level Calculator",
  "category": "Text",
  "shortDescription": "Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, Coleman-Liau, and SMOG scores.",
  "heroTitle": "Free Readability & Flesch-Kincaid Calculator",
  "heroDescription": "Evaluate reading difficulty, school grade level, polysyllabic word density, and comprehension metrics in your browser.",
  "about": "The Readability & Grade Level Calculator runs five industry-standard readability algorithms (Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, Coleman-Liau, and SMOG Index). It analyzes sentence length and syllable counts to help content writers optimize clarity for general audiences.",
  "howToUse": [
    "Paste your article, essay, documentation, or marketing copy.",
    "Inspect the primary Flesch Reading Ease score and equivalent school grade level.",
    "Review the multi-formula breakdown (Gunning Fog, Coleman-Liau, SMOG).",
    "Shorten long sentences or simplify multi-syllable words to improve readability."
  ],
  "whyUse": [
    "Ensure web content meets standard 7th–8th grade reading levels for optimal comprehension.",
    "Check technical documentation for clarity and accessibility.",
    "Optimize SEO readability rankings for Google search algorithms.",
    "Instant client-side calculation with zero server latency."
  ],
  "faqs": [
    {
      "question": "What is a good Flesch Reading Ease score?",
      "answer": "Scores between 60 and 70 are considered standard/plain English (easily understood by 13- to 15-year-olds). Scores above 80 are easy/conversational, while scores below 50 indicate difficult or academic reading."
    },
    {
      "question": "How is Flesch-Kincaid Grade Level interpreted?",
      "answer": "A score of 8.0 indicates that an 8th-grade student (approx. 13–14 years old) can easily comprehend the text. Most top-ranking web content targets a grade level of 7.0–9.0."
    }
  ]
};
