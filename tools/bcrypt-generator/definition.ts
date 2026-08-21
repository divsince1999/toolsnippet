import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "bcrypt-generator",
  "name": "Bcrypt Hash Generator & Verifier",
  "category": "Auth",
  "shortDescription": "Generate salted Bcrypt password hashes ($2a$ / $2b$) with custom cost factors (rounds 4–14) and verify passwords.",
  "heroTitle": "Generate & Verify Bcrypt Password Hashes",
  "heroDescription": "Create industry-standard salted Bcrypt hashes with adjustable cost factors (4-14) and verify plain passwords against hashes.",
  "about": "Bcrypt is an adaptive password-hashing function based on the Blowfish cipher. It incorporates a random salt to protect against rainbow table attacks and an adjustable work factor to stay secure against hardware scaling.",
  "howToUse": [
    "To generate: Enter a password, choose your cost factor (rounds 4–14), and click 'Generate Bcrypt Hash'.",
    "To verify: Switch to the 'Verify' tab, paste the plain password and the $2a$ or $2b$ hash, and check the match status."
  ],
  "whyUse": [
    "Standard password hashing format for Node.js (bcryptjs), Rails, Django, and Laravel.",
    "Allows testing and validating hash format compatibility ($2a$, $2b$, $2y$)."
  ],
  "faqs": [
    {
      "question": "What cost factor should I use for Bcrypt?",
      "answer": "Cost 10 or 12 is currently recommended for standard web applications, providing a healthy balance between security and server response time."
    }
  ],
  "features": [
    "Standard $2a$ / $2b$ Bcrypt hash format",
    "Adjustable cost factor (4 to 14 rounds)",
    "Built-in password vs hash verifier",
    "Client-side security and privacy"
  ],
  "tips": [
    "Bcrypt hashes are always exactly 60 characters long and begin with $2a$, $2b$, or $2y$"
  ]
};
