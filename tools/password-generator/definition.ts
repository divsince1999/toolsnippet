import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "password-generator",
  "name": "Password Generator",
  "category": "Auth",
  "shortDescription": "Generate secure and random passwords.",
  "heroTitle": "Generate strong passwords",
  "heroDescription": "Create highly secure passwords with custom length and character sets.",
  "about": "Password Generator helps you stay secure by creating unpredictable passwords locally.",
  "howToUse": [
    "Choose password length.",
    "Select character types (numbers, symbols).",
    "Click Generate and copy."
  ],
  "whyUse": [
    "Improves security.",
    "Customizable complexity.",
    "Runs entirely in browser."
  ],
  "faqs": [
    {
      "question": "Are my passwords stored?",
      "answer": "No, they are generated locally and never leave your browser."
    }
  ],
  "features": [
    "Generate secure passwords instantly",
    "Customizable length",
    "Include numbers and symbols",
    "Cryptographically random",
    "No data storage"
  ],
  "tips": [
    "Use at least 12 characters",
    "Include special characters",
    "Never reuse passwords",
    "Use a password manager"
  ]
};
