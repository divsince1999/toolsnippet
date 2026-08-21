import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "pressure-unit-converter",
  name: "Pressure Unit Converter",
  category: "Number",
  shortDescription: "Convert pressure units between Pascal (Pa), Bar, PSI, Torr / mmHg, Atmosphere (atm), and Kilopascals (kPa).",
  heroTitle: "Pressure Unit Converter",
  heroDescription: "Convert pressure units between Pascal (Pa), Bar, PSI, Torr / mmHg, Atmosphere (atm), and Kilopascals (kPa).",
  about: "The Pressure Unit Converter instantly converts pressure measurements between SI metric units (Pascal, kPa, MPa, Bar), imperial units (PSI), and barometric mercury units (Torr, mmHg, inHg, atm).",
  features: [
    "Converts between Pascal (Pa), Kilopascal (kPa), Megapascal (MPa), Bar, PSI, Torr, and atm",
    "Simultaneous results across all 7 pressure standards",
    "Calculates standard atmospheric pressure references",
    "Scientific notation for extreme vacuum and high-pressure ranges"
],
  howToUse: [
    "Enter a pressure numerical value.",
    "Select your source pressure unit (e.g. PSI, Bar, kPa).",
    "Instantly view the converted pressures."
],
  whyUse: [
    "Convert tire pressure, HVAC refrigeration specs, and hydraulic systems between PSI and Bar.",
    "Calibrate weather barometer readings (hPa, inHg, mmHg)."
],
  tips: [
    "1 standard atmosphere (atm) is defined as exactly 101,325 Pa (14.6959 PSI or 760 mmHg)."
],
  faqs: [
  {
    "question": "How many PSI are in 1 Bar?",
    "answer": "1 Bar equals approximately 14.5038 Pounds per Square Inch (PSI) or 100,000 Pascals (100 kPa)."
  },
  {
    "question": "What is standard atmospheric pressure?",
    "answer": "Standard atmosphere (1 atm) is 101,325 Pascals (101.325 kPa), 14.696 PSI, or 760 mmHg/Torr."
  }
]
};
