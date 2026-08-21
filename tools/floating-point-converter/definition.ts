import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "floating-point-converter",
  name: "IEEE 754 Floating-Point Visualizer & Converter",
  category: "Number",
  shortDescription: "Convert 32-bit single and 64-bit double precision floats into Sign bit, Exponent, Mantissa, and Hexadecimal representations.",
  heroTitle: "IEEE 754 Floating-Point Visualizer & Converter",
  heroDescription: "Convert 32-bit single and 64-bit double precision floats into Sign bit, Exponent, Mantissa, and Hexadecimal representations.",
  about: "The IEEE 754 Floating-Point Visualizer converts decimal numbers into their exact 32-bit Single Precision (float) and 64-bit Double Precision (double) binary bit fields (Sign, Exponent, Mantissa/Fraction).",
  features: [
    "32-bit Single Precision and 64-bit Double Precision support",
    "Interactive color-coded bit field visualization (Sign, Biased Exponent, Mantissa)",
    "Handles special values: Infinity, -Infinity, NaN, and Subnormal numbers",
    "Hexadecimal memory word inspection"
],
  howToUse: [
    "Enter any decimal float value (e.g. 0.1, -15.625, 3.14159).",
    "Select precision mode: 32-bit Single or 64-bit Double.",
    "Inspect the color-coded Sign bit, Exponent, Fraction bits, and actual stored value."
],
  whyUse: [
    "Understand why `0.1 + 0.2 !== 0.3` in JavaScript and Python due to IEEE 754 binary rounding.",
    "Debug graphics shader precision and embedded microcontroller float math.",
    "Verify floating-point serialization protocols."
],
  tips: [
    "The exponent uses a bias (127 for 32-bit, 1023 for 64-bit) to represent both positive and negative powers of 2 without a separate sign bit."
],
  faqs: [
  {
    "question": "How does IEEE 754 represent floating-point numbers?",
    "answer": "IEEE 754 divides binary numbers into three parts: 1 sign bit, an exponent field with a fixed bias (127 for 32-bit, 1023 for 64-bit), and a fractional mantissa."
  },
  {
    "question": "Why does 0.1 + 0.2 not equal 0.3 in JavaScript?",
    "answer": "In base-2 binary floating point, 0.1 and 0.2 are infinite repeating fractions, leading to minor rounding errors at the 53rd bit of precision (0.30000000000000004)."
  }
]
};
