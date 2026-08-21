import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "prime-number-checker",
  "name": "Prime Number Checker",
  "category": "Number",
  "shortDescription": "Check if a number is prime and list its prime factors.",
  "heroTitle": "Check prime numbers instantly",
  "heroDescription": "Determine if any integer is prime and find its complete list of prime factors.",
  "about": "Prime Number Checker is useful for math students, competitive programmers, and developers working with cryptography or hashing algorithms that rely on prime numbers.",
  "howToUse": [
    "Enter any positive integer.",
    "The tool instantly tells you if it is prime.",
    "View the full prime factorization for composite numbers."
  ],
  "whyUse": [
    "Instant primality test without manual trial division.",
    "Full prime factorization shown for composite numbers.",
    "Helpful for math coursework and algorithm problems."
  ],
  "faqs": [
    {
      "question": "Is 1 a prime number?",
      "answer": "No. By mathematical definition, prime numbers must have exactly two distinct divisors: 1 and themselves. 1 has only one divisor."
    },
    {
      "question": "What is prime factorization?",
      "answer": "Prime factorization breaks a number into a product of prime numbers, e.g. 12 = 2 × 2 × 3."
    },
    {
      "question": "What is the largest number I can check?",
      "answer": "The tool works well up to numbers in the billions range directly in the browser."
    }
  ],
  "features": [
    "Instant prime or composite result",
    "Prime factorization display",
    "List all factors",
    "Handles large numbers efficiently",
    "100% client-side"
  ],
  "tips": [
    "Use for competitive programming problems involving primes",
    "Check if RSA key components are prime",
    "Factor numbers to find GCD manually"
  ]
};
