import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "scientific-notation-converter",
  name: "Scientific & Engineering Notation Converter",
  category: "Number",
  shortDescription: "Convert between standard decimals, scientific notation (1.23e+8), and engineering metric prefixes (nano to tera).",
  heroTitle: "Scientific & Engineering Notation Converter",
  heroDescription: "Convert between standard decimals, scientific notation (1.23e+8), and engineering metric prefixes (nano to tera).",
  about: "The Scientific & Engineering Notation Converter converts numbers between standard decimal format, normalized scientific notation (a × 10^b where 1 ≤ |a| < 10), engineering notation (where exponents are multiples of 3), and SI metric prefixes.",
  features: [
    "Converts decimals to Scientific Notation (e.g. 4.5 × 10⁶ or 4.5e6)",
    "Converts to Engineering Notation (exponents multiples of 3)",
    "Maps values to SI metric prefixes (pico, nano, micro, milli, kilo, mega, giga, tera)",
    "Supports custom decimal precision"
],
  howToUse: [
    "Enter any decimal or scientific number (e.g. 0.000045, 125000000, 3.4e-5).",
    "Instantly view the standard, scientific, engineering, and metric prefix representations."
],
  whyUse: [
    "Format scientific formulas and physics constants.",
    "Work with electronic component values (capacitors in pF/nF/uF, resistors in kΩ/MΩ)."
],
  tips: [
    "Engineering notation restricts exponent powers to multiples of 3 (10³, 10⁶, 10⁻³, 10⁻⁶), corresponding directly to SI metric prefixes."
],
  faqs: [
  {
    "question": "What is the difference between Scientific and Engineering notation?",
    "answer": "Scientific notation has exactly one non-zero digit before the decimal point (e.g. 4.5 × 10^7). Engineering notation requires the exponent to be a multiple of 3 (e.g. 45 × 10^6), aligning with metric prefixes like mega (M) and micro (µ)."
  },
  {
    "question": "What does 'e' mean in numbers like 1.25e+8?",
    "answer": "The 'e' stands for 'exponent of 10'. 1.25e+8 means 1.25 × 10^8 (125,000,000)."
  }
]
};
