import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "temperature-converter",
  name: "Temperature Unit Converter",
  category: "Number",
  shortDescription: "Convert temperatures between Celsius, Fahrenheit, Kelvin, Rankine, and Delisle with step-by-step conversion formulas.",
  heroTitle: "Temperature Unit Converter",
  heroDescription: "Convert temperatures between Celsius, Fahrenheit, Kelvin, Rankine, and Delisle with step-by-step conversion formulas.",
  about: "The Temperature Unit Converter performs exact thermal unit conversions across 5 thermodynamic scales (Celsius, Fahrenheit, Kelvin, Rankine, and Delisle).",
  features: [
    "Simultaneous conversion across 5 temperature scales",
    "Calculates Absolute Zero, Freezing, and Boiling point references",
    "Displays exact step-by-step conversion mathematical equations",
    "High-precision float formatting"
],
  howToUse: [
    "Enter a temperature value.",
    "Select the source temperature scale (e.g. Celsius, Fahrenheit, Kelvin).",
    "Instantly view the converted temperatures across all scales."
],
  whyUse: [
    "Convert weather forecasts between Metric (°C) and Imperial (°F).",
    "Calculate thermodynamic and physics lab values in Kelvin (K)."
],
  tips: [
    "0 Kelvin is Absolute Zero (−273.15 °C or −459.67 °F), where molecular motion stops."
],
  faqs: [
  {
    "question": "What is the formula to convert Celsius to Fahrenheit?",
    "answer": "Fahrenheit = (Celsius × 9/5) + 32."
  },
  {
    "question": "What is Absolute Zero?",
    "answer": "Absolute Zero is 0 Kelvin (−273.15 °C or −459.67 °F), the theoretical point where thermodynamic entropy and molecular motion reach minimum."
  }
]
};
