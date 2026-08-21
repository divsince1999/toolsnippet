import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "gitignore-generator",
  name: ".gitignore Generator & Rule Builder",
  category: "Dev",
  shortDescription: "Generate comprehensive, custom .gitignore files combining operating systems, IDEs, programming languages, and frameworks.",
  heroTitle: ".gitignore Generator & Rule Builder",
  heroDescription: "Generate comprehensive, custom .gitignore files combining operating systems, IDEs, programming languages, and frameworks.",
  about: "The .gitignore Generator bundles industry-standard ignore rules for Node.js, Python, Java, Go, Rust, macOS, Windows, VS Code, JetBrains, and environment secrets to prevent accidental commits of binary and sensitive files.",
  features: [
    "Combines multi-select presets (Node, Python, macOS, VSCode, Env, JetBrains, Rust)",
    "Protects against committing `.env`, API keys, and build artifacts",
    "Instant 1-click preset toggles",
    "Custom rule append support"
],
  howToUse: [
    "Select your operating systems, editors, and language environments.",
    "Add any custom folder or file patterns.",
    "Copy the combined `.gitignore` file directly into your repository."
],
  whyUse: [
    "Prevent bloated git histories filled with `node_modules/`, `__pycache__/`, or `.DS_Store`.",
    "Safeguard local `.env.local` API credentials from public repositories."
],
  tips: [
    "If a file was already committed before adding to `.gitignore`, run `git rm --cached <file>` to un-track it."
],
  faqs: [
    {
        "question": "Why is git still tracking a file in my .gitignore?",
        "answer": ".gitignore only ignores untracked files. If a file was previously committed to git history, you must remove it from the index using `git rm --cached <file>`."
    },
    {
        "question": "Should I commit .env.example to git?",
        "answer": "Yes, `.env.example` provides team members with a template of required configuration variables without revealing real production secrets."
    }
]
};
