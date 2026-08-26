import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "html-color-picker",
  name: "HTML Color Picker & EyeDropper",
  category: "Design",
  shortDescription: "Pick, convert, and extract colors from screen or canvas with live HEX, RGB, HSL, CMYK, OKLCH conversions and WCAG contrast check.",
  heroTitle: "HTML Color Picker, EyeDropper & Palette Generator",
  heroDescription: "Interactive 2D color picker with native browser EyeDropper screen sampler, multi-format color conversions (HEX, RGB, HSL, CMYK, OKLCH), color harmony generators, and real-time WCAG contrast accessibility validation.",
  about: "ToolSnippet's HTML Color Picker & EyeDropper is a comprehensive color workstation for frontend engineers, UI/UX designers, and digital artists. It allows you to sample colors from anywhere on your display, explore harmonic palettes (complementary, analogous, triadic, tetradic, tints/shades), inspect WCAG accessibility compliance scores, and copy production-ready CSS color definitions with one click.",
  howToUse: [
    "Use the visual 2D color box or hue/alpha sliders to select a base color.",
    "Click the EyeDropper button (on supported browsers) to sample any pixel from your screen.",
    "Inspect the converted values in HEX, RGB, HSL, HSV, CMYK, and CSS OKLCH formats.",
    "Explore the auto-generated Color Harmonies (Complementary, Analogous, Triadic, Tints & Shades).",
    "Check the real-time WCAG 2.1 Contrast Ratio against white and black backgrounds.",
    "Click any format chip or color swatch to copy its value directly to your clipboard.",
  ],
  whyUse: [
    "Native EyeDropper API: Sample colors directly from any webpage, image, or application window.",
    "Complete Multi-Format Conversions: Instant calculations for HEX, RGB, RGBA, HSL, HSLA, HSV, CMYK, and modern CSS OKLCH.",
    "Built-in WCAG Accessibility Checker: Ensure text readability with AA and AAA contrast ratings.",
    "Dynamic Color Harmonies: Generate complementary, analogous, triadic, split-complementary, and monochromatic palettes instantly.",
    "100% Client-Side & Private: Zero network latency and zero tracking of your design assets.",
  ],
  faqs: [
    {
      question: "How does the EyeDropper tool work?",
      answer: "The EyeDropper tool uses the native Web EyeDropper API supported in modern Chromium browsers (Chrome, Edge, Opera). When clicked, your cursor transforms into a magnifying loupe allowing you to sample the exact color of any pixel on your screen.",
    },
    {
      question: "What is OKLCH and why is it useful?",
      answer: "OKLCH is a modern CSS color space that provides perceptually uniform color adjustments. Unlike traditional sRGB or HSL, changing lightness in OKLCH preserves the perceived chroma/saturation, making it ideal for accessible design systems and CSS color palettes.",
    },
    {
      question: "What WCAG contrast ratio is required for accessible text?",
      answer: "WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal body text and 3:1 for large text (18pt or 14pt bold). Level AAA requires a minimum ratio of 7:1 for normal text and 4.5:1 for large text.",
    },
    {
      question: "Can I copy colors with alpha transparency?",
      answer: "Yes. Use the Alpha opacity slider to adjust transparency. The tool outputs 8-digit HEX (#RRGGBBAA), RGBA, HSLA, and CSS OKLCH values with alpha channels.",
    },
  ],
  features: [
    "Native browser EyeDropper screen color sampling tool",
    "Interactive 2D saturation/brightness spectrum and hue/alpha sliders",
    "Instant conversions across HEX, RGB, HSL, HSV, CMYK, and OKLCH",
    "Color harmony generator (Complementary, Analogous, Triadic, Tetradic, Monochromatic)",
    "Lightness tints and darkness shades ladder (10-step scale)",
    "WCAG 2.1 contrast accessibility score (AA and AAA rating badges)",
    "Recent color history swatches saved locally",
    "1-click copy for all CSS color strings and variables",
  ],
  tips: [
    "Press the EyeDropper icon to grab brand colors from browser tabs or desktop assets.",
    "Use the Tints & Shades scale to build coherent UI design tokens for primary, hover, and active states.",
    "Check the WCAG score before finalizing text/button combinations for accessibility compliance.",
  ],
};
