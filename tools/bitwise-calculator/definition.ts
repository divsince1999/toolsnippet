import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "bitwise-calculator",
  name: "Bitwise Operations & Shift Calculator",
  category: "Number",
  shortDescription: "Interactive 32-bit and 64-bit calculator for bitwise AND, OR, XOR, NOT, NAND, NOR, Shift Left (<<), and Shift Right (>>).",
  heroTitle: "Bitwise Operations & Shift Calculator",
  heroDescription: "Interactive 32-bit and 64-bit calculator for bitwise AND, OR, XOR, NOT, NAND, NOR, Shift Left (<<), and Shift Right (>>).",
  about: "The Bitwise Operations & Shift Calculator evaluates bitwise logic operations on binary, hex, and decimal numbers with interactive 32-bit visual representations and two's complement decoding.",
  features: [
    "Supports AND (&), OR (|), XOR (^), NOT (~), NAND, NOR, Left Shift (<<), and Right Shift (>>)",
    "Displays interactive 32-bit binary bit grids",
    "Instant Decimal, Hexadecimal, and Binary cross-conversion",
    "Two's complement negative integer representation"
],
  howToUse: [
    "Enter Operand A and Operand B (in Decimal, Hex 0x..., or Binary 0b...).",
    "Select the bitwise operation (AND, OR, XOR, NOT, Left Shift, Right Shift).",
    "View the resulting value in Decimal, Hex, and color-coded 32-bit binary format."
],
  whyUse: [
    "Debug low-level bitmasks, permissions flags, and hardware packet protocols.",
    "Understand computer arithmetic and logic operations in programming languages (C, Rust, Go, JS).",
    "Verify bitwise cryptography algorithms and hashing rounds."
],
  tips: [
    "XOR (^) with 1 toggles a bit, while XOR with itself yields 0 (useful for fast register clearing).",
    "Left Shift (`a << n`) is equivalent to multiplying by 2^n."
],
  faqs: [
  {
    "question": "What is bitwise XOR used for?",
    "answer": "Bitwise XOR (^) outputs 1 when bits differ. It is widely used for toggling bit flags, cryptographic stream ciphers, and fast checksums."
  },
  {
    "question": "What is the difference between >> and >>> shift?",
    "answer": "Sign-propagating right shift (>>) preserves the sign bit (negative numbers stay negative), while zero-fill right shift (>>>) always shifts in zeros from the left."
  }
]
};
