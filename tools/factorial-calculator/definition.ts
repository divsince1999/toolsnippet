import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "factorial-calculator",
  "name": "Factorial Calculator",
  "category": "Number",
  "shortDescription": "Compute factorials, combinations (nCr), and permutations (nPr).",
  "heroTitle": "Calculate factorials and combinations",
  "heroDescription": "Instantly compute n! (factorial), nCr (combinations), and nPr (permutations) for any valid integers.",
  "about": "Factorial Calculator is useful for statistics, probability problems, and combinatorics exercises in math courses and competitive programming.",
  "howToUse": [
    "Enter n for a factorial.",
    "Enter n and r for combinations (nCr) or permutations (nPr).",
    "Results appear instantly."
  ],
  "whyUse": [
    "Covers factorial, nCr, and nPr in a single tool.",
    "No calculator app needed for combinatorics problems.",
    "Handles n up to 20 (maximum safe factorial in JavaScript)."
  ],
  "faqs": [
    {
      "question": "What is n! (factorial)?",
      "answer": "n! is the product of all positive integers from 1 to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120."
    },
    {
      "question": "What is the difference between nCr and nPr?",
      "answer": "nCr counts combinations where order does NOT matter. nPr counts permutations where order DOES matter."
    },
    {
      "question": "Why is there a limit on n?",
      "answer": "JavaScript numbers lose precision past 2^53. Factorials above 20! exceed that range."
    }
  ],
  "features": [
    "Factorial (n!) calculation",
    "Combinations (nCr) calculation",
    "Permutations (nPr) calculation",
    "Supports n up to 20",
    "Instant client-side results"
  ],
  "tips": [
    "Use nCr to calculate lottery odds",
    "Use nPr when order matters (e.g. race standings)",
    "0! = 1 by mathematical convention"
  ]
};
