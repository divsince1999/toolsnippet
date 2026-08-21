import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "readme-badge-generator",
  name: "README & GitHub Shields Badge Generator",
  category: "Dev",
  shortDescription: "Generate shields.io status badges for GitHub README files including npm version, build status, license, and stars.",
  heroTitle: "README & GitHub Shields Badge Generator",
  heroDescription: "Generate shields.io status badges for GitHub README files including npm version, build status, license, and stars.",
  about: "The README & GitHub Shields Badge Generator produces custom status badges in Markdown and HTML for open source project documentation, linking directly to shields.io endpoints.",
  features: [
    "Presets for npm version, GitHub Stars, License, Build Status, Code Coverage, and Discord",
    "Custom badge builder (Label, Message, Color, and Link)",
    "Supports Flat, Flat-Square, Plastic, and For-The-Badge styles",
    "Instant Markdown and HTML snippet export"
],
  howToUse: [
    "Select a badge template or customize label, message, and color.",
    "Choose badge visual style (Flat, Flat-Square, For-the-Badge).",
    "Copy the Markdown badge code into your `README.md`."
],
  whyUse: [
    "Give your open-source GitHub repositories a polished, professional presentation.",
    "Display real-time package download statistics and build status."
],
  tips: [
    "Use `style=for-the-badge` for bold uppercase landing page README headers."
],
  faqs: [
    {
        "question": "How do shields.io dynamic badges work?",
        "answer": "Shields.io queries public APIs (npm, GitHub, PyPI) and renders lightweight SVG images that automatically update when new releases are published."
    },
    {
        "question": "Can I use custom hex colors on shields.io badges?",
        "answer": "Yes, you can pass any 6-digit hex color (without the `#`) in the `color=` URL parameter."
    }
]
};
