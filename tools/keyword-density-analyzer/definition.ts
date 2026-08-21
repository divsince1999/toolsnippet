import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "keyword-density-analyzer",
  "name": "Keyword Density & N-Gram Analyzer",
  "category": "Text",
  "shortDescription": "Analyze 1-word, 2-word, and 3-word n-gram frequency, density percentage, and keyword stuffing warnings.",
  "heroTitle": "Free Online Keyword Density & N-Gram Analyzer",
  "heroDescription": "Evaluate keyword frequency, single and multi-word phrase density, stop-word filtering, and SEO optimization ratios directly in your browser.",
  "about": "The Keyword Density & N-Gram Analyzer calculates single-word and multi-word phrase occurrences in your text. It filters out common stop words and alerts you if any keyword exceeds recommended SEO density thresholds (typically 1–3%), helping you avoid search engine over-optimization penalties.",
  "howToUse": [
    "Paste or type your article, blog post, or web copy into the input area.",
    "Toggle stop-word removal or adjust minimum word length as needed.",
    "Review the ranked 1-word, 2-word (bi-gram), and 3-word (tri-gram) density tables.",
    "Check the optimization warnings to identify potential keyword stuffing."
  ],
  "whyUse": [
    "Find exact keyword frequency and percentage density for target SEO terms.",
    "Uncover recurring multi-word phrases and n-grams across your copy.",
    "Protect against search engine penalties caused by excessive repetition.",
    "100% private and client-side—no content is sent over the network."
  ],
  "faqs": [
    {
      "question": "What is an ideal keyword density for SEO?",
      "answer": "Most SEO professionals recommend keeping primary keyword density between 1% and 2.5%. Anything above 3.5% may appear unnatural or trigger keyword stuffing filters."
    },
    {
      "question": "What are n-grams in text analysis?",
      "answer": "An n-gram is a contiguous sequence of n items from a text. A 1-gram is a single word, a 2-gram is a two-word phrase (e.g., 'developer tools'), and a 3-gram is a three-word phrase (e.g., 'free online tools')."
    }
  ]
};
