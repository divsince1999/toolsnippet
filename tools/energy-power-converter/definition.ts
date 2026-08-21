import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "energy-power-converter",
  name: "Energy & Power Unit Converter",
  category: "Number",
  shortDescription: "Convert energy and power units between Joules, Kilocalories, Kilowatt-Hours (kWh), BTUs, Watts, and Horsepower (hp).",
  heroTitle: "Energy & Power Unit Converter",
  heroDescription: "Convert energy and power units between Joules, Kilocalories, Kilowatt-Hours (kWh), BTUs, Watts, and Horsepower (hp).",
  about: "The Energy & Power Unit Converter converts physical energy and electrical power units across 9 standard metrics (Joules, Kilojoules, Calories, Food Kilocalories, Watt-hours, kWh, BTUs, Watts, and Mechanical Horsepower).",
  features: [
    "Converts Energy: Joules (J), Kilojoules (kJ), Calories (cal), Kilocalories (kcal), Watt-hours (Wh), Kilowatt-hours (kWh), and BTUs",
    "Converts Power: Watts (W), Kilowatts (kW), and Horsepower (hp)",
    "Instant simultaneous multi-unit output",
    "High-precision scientific notation formatting"
],
  howToUse: [
    "Enter numerical value and select source unit.",
    "View converted measurements across all standard units."
],
  whyUse: [
    "Estimate electrical power consumption and home energy bills from appliance wattage.",
    "Convert mechanical engine horsepower to kilowatts."
],
  tips: [
    "1 Horsepower (hp) is defined as exactly 745.69987 Watts.",
    "1 Kilowatt-Hour (kWh) equals 3.6 Million Joules (3.6 MJ)."
],
  faqs: [
  {
    "question": "What is the difference between Energy and Power?",
    "answer": "Power (measured in Watts) is the rate at which work is done per second. Energy (measured in Joules or kWh) is the total work done over time."
  },
  {
    "question": "How many Joules are in 1 Kilowatt-Hour (kWh)?",
    "answer": "1 kWh equals 1,000 Watts × 3,600 seconds = exactly 3,600,000 Joules (3.6 Megajoules)."
  }
]
};
