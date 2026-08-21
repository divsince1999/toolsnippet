import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "js-obfuscation-detector",
  name: "JavaScript Obfuscation & Entropy Analyzer",
  category: "Validation",
  shortDescription: "Detect code obfuscation, packed scripts, high Shannon entropy, eval() execution, and suspicious variable patterns in JavaScript.",
  heroTitle: "JavaScript Obfuscation & Entropy Analyzer",
  heroDescription: "Detect code obfuscation, packed scripts, high Shannon entropy, eval() execution, and suspicious variable patterns in JavaScript.",
  about: "The JavaScript Obfuscation & Entropy Analyzer scans JavaScript payloads for common malware and packer signatures, including hexadecimal variable arrays (`_0x4f2a`), `eval()` string unpacking, character code manipulation, and high Shannon information entropy.",
  features: [
    "Calculates Shannon Information Entropy (high entropy indicates compression/encryption)",
    "Detects `eval()`, `Function()`, and `document.write` dynamic execution sinks",
    "Identifies hex-mangled variable patterns (`_0x`, `\\x61`, `\\u0041`)",
    "Assigns a 0–100 Obfuscation Risk Score with remediation advice"
],
  howToUse: [
    "Paste your suspicious or bundled JavaScript code snippet.",
    "View the Obfuscation Risk Score and detected heuristic signatures.",
    "Inspect matched malicious or packed code blocks."
],
  whyUse: [
    "Audit third-party npm scripts and browser extensions for concealed malicious payloads.",
    "Check whether your production client bundles are effectively minified vs obfuscated."
],
  tips: [
    "Normal minified code typically has an entropy of 4.5–5.2, whereas encrypted/obfuscated code often exceeds 5.8."
],
  faqs: [
    {
        "question": "What is Shannon Entropy in source code analysis?",
        "answer": "Shannon Entropy measures the randomness of character distribution in a string. Plain code has predictable patterns (lower entropy), while encrypted, packed, or base64-encoded code has high character randomness (high entropy)."
    },
    {
        "question": "Is minified code the same as obfuscated code?",
        "answer": "No. Minification only strips whitespace and renames variables to reduce file size. Obfuscation deliberately mangles code logic and string literals to prevent human comprehension and reverse-engineering."
    }
]
};
