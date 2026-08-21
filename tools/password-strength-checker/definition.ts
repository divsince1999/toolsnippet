import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "password-strength-checker",
  "name": "Password Strength & Entropy Analyzer",
  "category": "Auth",
  "shortDescription": "Calculate Shannon entropy bits, estimated GPU crack time, and audit password security.",
  "heroTitle": "Audit Password Strength & Shannon Entropy",
  "heroDescription": "Analyze password security with exact Shannon entropy bits, GPU cluster crack time estimates, and character diversity audits.",
  "about": "Password Strength & Entropy Analyzer evaluates passwords using mathematical Shannon entropy formulas, auditing character pool diversity (uppercase, lowercase, numbers, symbols) and estimating brute-force resistance against 100-Billion-hash/sec GPU clusters.",
  "howToUse": [
    "Type a password in the input field.",
    "Toggle password visibility using 'Show Password' if needed.",
    "Review the entropy score, strength meter, estimated crack time, and diversity checklist."
  ],
  "whyUse": [
    "Evaluates real mathematical entropy rather than arbitrary complexity rules.",
    "100% private and offline: passwords are never sent across any network."
  ],
  "faqs": [
    {
      "question": "What is Shannon entropy in passwords?",
      "answer": "Shannon entropy measures the information density and randomness of a password in bits. Passwords with 60+ bits of entropy are considered strong."
    }
  ],
  "features": [
    "Shannon entropy calculation in bits",
    "GPU cluster crack time estimation",
    "5-level visual strength indicator",
    "Character diversity audit checklist"
  ],
  "tips": [
    "Aim for at least 60 bits of entropy and 14+ characters for sensitive master passwords"
  ]
};
