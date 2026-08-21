import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "gcd-lcm-calculator",
  "name": "GCD & LCM Calculator",
  "category": "Number",
  "shortDescription": "Calculate the Greatest Common Divisor and Least Common Multiple.",
  "heroTitle": "Find GCD and LCM instantly",
  "heroDescription": "Compute the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two or more numbers.",
  "about": "GCD & LCM Calculator is essential for simplifying fractions, scheduling problems, and solving number theory exercises in math, engineering, and computer science.",
  "howToUse": [
    "Enter two or more numbers separated by commas.",
    "The tool computes GCD and LCM instantly.",
    "Use the results for fraction simplification or scheduling problems."
  ],
  "whyUse": [
    "Handles more than two numbers simultaneously.",
    "Shows the step-by-step Euclidean algorithm for GCD.",
    "Instant results, no server required."
  ],
  "faqs": [
    {
      "question": "What is GCD used for?",
      "answer": "GCD is used to simplify fractions — divide numerator and denominator by their GCD."
    },
    {
      "question": "What is LCM used for?",
      "answer": "LCM is used to find a common denominator when adding fractions with different denominators."
    },
    {
      "question": "Can I input more than two numbers?",
      "answer": "Yes, enter any count of numbers separated by commas."
    }
  ],
  "features": [
    "GCD of two or more numbers",
    "LCM of two or more numbers",
    "Supports comma-separated input",
    "Uses efficient Euclidean algorithm",
    "Instant real-time calculation"
  ],
  "tips": [
    "Use GCD to simplify fractions before adding or subtracting them",
    "LCM helps find the ideal meeting interval for two recurring events",
    "GCD of 1 means two numbers are coprime (no common factors)"
  ]
};
