import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "binary-arithmetic-calculator",
  name: "Binary & Hex Arithmetic Calculator",
  category: "Number",
  shortDescription: "Perform addition, subtraction, multiplication, and division directly on Binary, Hexadecimal, and Octal numbers.",
  heroTitle: "Binary & Hex Arithmetic Calculator",
  heroDescription: "Perform addition, subtraction, multiplication, and division directly on Binary, Hexadecimal, and Octal numbers.",
  about: "The Binary & Hex Arithmetic Calculator executes integer arithmetic (+, −, ×, ÷) directly on Binary (0b), Hexadecimal (0x), Octal (0o), and Decimal numbers with multi-base results.",
  features: [
    "Arithmetic operations: Add (+), Subtract (−), Multiply (×), Divide (÷), and Modulo (%)",
    "Supports Binary, Hex, Octal, and Decimal input bases",
    "Simultaneous results in Binary, Hexadecimal, Octal, and Decimal",
    "Two's complement bit length selection (8-bit, 16-bit, 32-bit, 64-bit)"
],
  howToUse: [
    "Select your input numeral base (Binary, Hex, Octal, or Decimal).",
    "Enter Value 1 and Value 2.",
    "Select the arithmetic operation.",
    "View the calculated result in all 4 numeral bases."
],
  whyUse: [
    "Calculate memory offsets, buffer addresses, and register math.",
    "Perform low-level firmware binary calculations."
],
  tips: [
    "Hex values can be prefixed with `0x` and binary values with `0b`."
],
  faqs: [
  {
    "question": "How does binary addition work with carries?",
    "answer": "0+0=0, 0+1=1, 1+0=1, and 1+1=10 (0 with a carry of 1 to the next left column)."
  },
  {
    "question": "What is two's complement representation?",
    "answer": "Two's complement represents signed negative integers by inverting all bits and adding 1 to the least significant bit."
  }
]
};
