import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-filter-generator",
  "name": "CSS Filter Effects Playground",
  "category": "Design",
  "shortDescription": "Apply and adjust visual CSS image filters including blur, grayscale, contrast, hue-rotate, and sepia.",
  "heroTitle": "CSS Filter Effects Generator & Playground",
  "heroDescription": "Adjust visual CSS image filters in real time with sliders for blur, contrast, brightness, grayscale, and hue rotation.",
  "about": "CSS Filter Effects Playground lets you graphically tweak and combine multiple CSS filter functions to create vintage, duotone, blurred, or high-contrast image effects.",
  "howToUse": [
    "Adjust sliders for blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, and sepia.",
    "Observe the live visual effect on the preview card.",
    "Click Reset to restore default values or Copy Filter CSS to export."
  ],
  "whyUse": [
    "Eliminates the need for Photoshop or photo editing software for web image styling.",
    "Non-destructive image styling directly in the browser.",
    "Combines multiple filter functions into a single clean CSS property."
  ],
  "faqs": [
    {
      "question": "Can multiple CSS filters be combined?",
      "answer": "Yes, CSS allows chaining multiple filter functions like 'filter: contrast(120%) brightness(110%) blur(2px)'."
    },
    {
      "question": "Are CSS filters performant on mobile devices?",
      "answer": "Yes, modern mobile browsers hardware-accelerate CSS filters via the GPU."
    }
  ],
  "features": [
    "9 independent filter sliders",
    "Real-time visual preview image",
    "One-click filter reset",
    "Copyable CSS with vendor prefix"
  ],
  "tips": [
    "Combine 'grayscale(100%)' with a hover 'grayscale(0%)' transition for client logo showcases",
    "Use 'blur(10px)' on low-res placeholder images to create progressive image loading effects"
  ]
};
