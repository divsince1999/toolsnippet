import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "screen-ppi-calculator",
  name: "Screen PPI & Pixel Density Calculator",
  category: "Number",
  shortDescription: "Calculate screen Pixels Per Inch (PPI), dot pitch, pixel density, and total megapixels from display resolution and size.",
  heroTitle: "Screen PPI & Pixel Density Calculator",
  heroDescription: "Calculate screen Pixels Per Inch (PPI), dot pitch, pixel density, and total megapixels from display resolution and size.",
  about: "The Screen PPI & Pixel Density Calculator determines display sharpness metrics including Pixels Per Inch (PPI), Pixels Per Centimeter (PPCM), dot pitch (pixel pitch in millimeters), aspect ratio, and total megapixels based on horizontal resolution, vertical resolution, and diagonal screen size in inches.",
  features: [
    "Calculates Pixels Per Inch (PPI) and Pixels Per Centimeter (PPCM)",
    "Calculates Dot Pitch (pixel pitch in millimeters)",
    "Calculates total display Megapixels (MP)",
    "Built-in presets for iPhone, MacBook Retina, 4K UHD, 1440p QHD, and 1080p FHD"
],
  howToUse: [
    "Enter horizontal and vertical pixel resolution (e.g. 1920 × 1080, 2560 × 1440, 3840 × 2160).",
    "Enter diagonal screen size in inches (e.g. 13.3\", 24\", 27\", 32\").",
    "Instantly view PPI, dot pitch, and sharpness rating."
],
  whyUse: [
    "Compare monitor and laptop display sharpness before purchasing.",
    "Calculate optimal UI scaling factors and device pixel ratios (DPR) for responsive design."
],
  tips: [
    "Displays with 220+ PPI (like Apple Retina screens) generally eliminate visible pixelation at typical viewing distances."
],
  faqs: [
  {
    "question": "What is PPI and why does it matter?",
    "answer": "PPI (Pixels Per Inch) measures pixel density. Higher PPI means sharper text and images where individual pixels are indistinguishable to the human eye."
  },
  {
    "question": "What is dot pitch?",
    "answer": "Dot pitch is the physical distance (in millimeters) between the centers of adjacent pixels on a display panel."
  }
]
};
