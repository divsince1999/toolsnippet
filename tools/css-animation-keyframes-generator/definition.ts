import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-animation-keyframes-generator",
  "name": "CSS Keyframe Animation Generator",
  "category": "Design",
  "shortDescription": "Create customizable CSS @keyframes animations with duration, easing curves, and live preview.",
  "heroTitle": "CSS Keyframe Animation Generator & Playground",
  "heroDescription": "Build smooth CSS @keyframes animations for pulse, bounce, spin, float, shake, and flip with custom timing curves.",
  "about": "CSS Keyframe Animation Generator lets you create, customize, and preview pure CSS animations with fine-tuned duration, easing curves, iteration counts, and live animated previews.",
  "howToUse": [
    "Select an animation type (Pulse, Bounce, Spin, Shake, Float, Flip).",
    "Set duration in seconds and animation timing function (easing).",
    "Choose iteration count (infinite, 1, or 2 times).",
    "Watch the live animated preview and copy the @keyframes CSS code."
  ],
  "whyUse": [
    "No heavy JavaScript animation libraries required.",
    "Hardware-accelerated 60fps CSS transitions.",
    "Complete @keyframes rules and class selectors ready to copy."
  ],
  "faqs": [
    {
      "question": "Why use CSS animations instead of JavaScript animations?",
      "answer": "CSS animations run on the browser's compositor thread, delivering smoother 60fps performance without blocking the main JavaScript thread."
    },
    {
      "question": "What is cubic-bezier easing?",
      "answer": "Cubic-bezier curves allow custom acceleration and deceleration curves for more natural, springy motion."
    }
  ],
  "features": [
    "6 core animation archetypes (Pulse, Bounce, Spin, Shake, Float, Flip)",
    "Duration and timing curve selectors",
    "Iteration count controls",
    "Live 60fps preview canvas"
  ],
  "tips": [
    "Use 'cubic-bezier(0.4, 0, 0.2, 1)' for smooth Google Material-style transitions",
    "Keep UI notification badge animations subtle (pulse duration ~1.5s) to avoid distracting users"
  ]
};
