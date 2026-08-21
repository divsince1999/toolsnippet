import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "angle-converter",
  name: "Angle & Trigonometry Unit Converter",
  category: "Number",
  shortDescription: "Convert between Degrees, Radians, Gradians, Arcminutes, Arcseconds, and Turns with live trigonometric values.",
  heroTitle: "Angle & Trigonometry Unit Converter",
  heroDescription: "Convert between Degrees, Radians, Gradians, Arcminutes, Arcseconds, and Turns with live trigonometric values.",
  about: "The Angle & Trigonometry Unit Converter converts angles across 6 geometric units (Degrees, Radians, Gradians, Arcminutes, Arcseconds, and Revolutions/Turns) while simultaneously calculating primary trigonometric ratios (sin, cos, tan).",
  features: [
    "Converts between Degrees (°), Radians (rad), Gradians (grad), Arcminutes (′), Arcseconds (″), and Turns (rev)",
    "Computes exact π-multiples for Radians (e.g. π/2, π/4, 2π)",
    "Live trigonometric sine, cosine, and tangent evaluation",
    "Unit circle quadrant position detection"
],
  howToUse: [
    "Enter an angle value in the input field.",
    "Select your source angle unit (Degrees, Radians, etc.).",
    "View the converted angles and trigonometric functions."
],
  whyUse: [
    "Convert CSS `rotate(45deg)` to JavaScript Canvas `ctx.rotate(radians)`.",
    "Work with 3D game engines (WebGL, Three.js, Unity) which require radian inputs."
],
  tips: [
    "To convert Degrees to Radians, multiply by π / 180.",
    "To convert Radians to Degrees, multiply by 180 / π."
],
  faqs: [
  {
    "question": "How many radians are in a full circle?",
    "answer": "A full 360-degree circle equals exactly 2π radians (~6.283185 rad)."
  },
  {
    "question": "What is a Gradian?",
    "answer": "A Gradian (gon) is a metric unit of angle where a right angle is defined as exactly 100 gradians, making a full circle 400 gradians."
  }
]
};
