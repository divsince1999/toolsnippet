import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "fraction-calculator",
  name: "Fraction Calculator & Simplifier",
  category: "Number",
  shortDescription: "Add, subtract, multiply, and divide fractions and mixed numbers, simplify to lowest terms, and convert to decimals.",
  heroTitle: "Fraction Calculator & Simplifier",
  heroDescription: "Add, subtract, multiply, and divide fractions and mixed numbers, simplify to lowest terms, and convert to decimals.",
  about: "The Fraction Calculator performs exact rational number arithmetic on proper, improper, and mixed fractions. It shows step-by-step solutions, reduces results to their lowest irreducible form using GCD, and provides decimal approximations.",
  features: [
    "Performs addition, subtraction, multiplication, and division on fractions",
    "Supports mixed numbers (e.g., 2 3/4) and improper fractions",
    "Automatic reduction to lowest terms using the Greatest Common Divisor (GCD)",
    "Instant decimal value conversion"
],
  howToUse: [
    "Enter Fraction 1 (Numerator and Denominator, or Mixed Whole Number).",
    "Select an arithmetic operation (+, −, ×, ÷).",
    "Enter Fraction 2.",
    "View the exact reduced fraction, mixed number, and decimal equivalent."
],
  whyUse: [
    "Perform precision measurements for CAD designs, construction, and recipes.",
    "Check algebraic fraction math homework and unit ratio problems."
],
  tips: [
    "To multiply fractions, multiply the numerators together and denominators together.",
    "To divide fractions, multiply the first fraction by the reciprocal (flipped) second fraction."
],
  faqs: [
  {
    "question": "How do you multiply fractions?",
    "answer": "Multiply the numerators together to get the new numerator, and multiply the denominators together to get the new denominator, then simplify using GCD."
  },
  {
    "question": "How do you convert an improper fraction to a mixed number?",
    "answer": "Divide the numerator by the denominator. The quotient becomes the whole number, and the remainder becomes the new numerator over the original denominator."
  }
]
};
