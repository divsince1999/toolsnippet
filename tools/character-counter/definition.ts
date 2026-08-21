import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "character-counter",
  "name": "Character Counter",
  "category": "Text",
  "shortDescription": "Count characters with and without spaces, and calculate byte size.",
  "heroTitle": "Detailed character counting tool",
  "heroDescription": "Instantly count characters with spaces, without spaces, and calculate the estimated byte size of your text.",
  "about": "Character Counter is perfect for ensuring text meets strict length requirements for SMS, social media, meta descriptions, and database limits.",
  "howToUse": [
    "Paste your text into the input field.",
    "View the character counts with and without spaces.",
    "Check the estimated UTF-8 byte size of the text."
  ],
  "whyUse": [
    "Helps you stay within strict character limits.",
    "Byte size estimation is useful for database field limits.",
    "Calculations happen instantly in your browser."
  ],
  "faqs": [
    {
      "question": "How is byte size calculated?",
      "answer": "Byte size is estimated using UTF-8 encoding, where regular characters are 1 byte, but emojis and special symbols can be up to 4 bytes."
    },
    {
      "question": "Does it count spaces as characters?",
      "answer": "Yes, standard character count includes spaces, but it also provides a 'without spaces' count."
    }
  ],
  "features": [
    "Count characters with spaces",
    "Count characters without spaces",
    "Estimate UTF-8 byte size",
    "Real-time calculation",
    "No server requests"
  ],
  "tips": [
    "Use for SMS character limits (typically 160 characters)",
    "Check meta description lengths (typically 150-160 characters)",
    "Use byte size for database column length constraints"
  ]
};
