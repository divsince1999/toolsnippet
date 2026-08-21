import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "user-snippet-generator",
  name: "VS Code & Sublime User Snippet Generator",
  category: "Dev",
  shortDescription: "Convert raw code into VS Code, Cursor, and Sublime Text JSON code snippets with tabstops, prefix triggers, and placeholders.",
  heroTitle: "VS Code & Sublime User Snippet Generator",
  heroDescription: "Convert raw code into VS Code, Cursor, and Sublime Text JSON code snippets with tabstops, prefix triggers, and placeholders.",
  about: "The VS Code & Sublime User Snippet Generator converts multi-line code into properly escaped JSON snippet definitions with custom trigger prefixes, description metadata, and `$1`, `$2` tabstop variables.",
  features: [
    "Generates VS Code `.code-snippets` format with prefix, body array, and description",
    "Escapes double quotes, backslashes, and special characters",
    "Supports multiple language scopes (TypeScript, JavaScript, Python, Go, HTML, CSS)",
    "Instant copy for `snippets/` editor settings"
],
  howToUse: [
    "Enter Snippet Title (e.g. `React Arrow Component`).",
    "Enter Snippet Prefix Trigger (e.g. `rac`).",
    "Paste your multi-line code template.",
    "Copy the generated JSON snippet directly into your VS Code User Snippets."
],
  whyUse: [
    "Save hours writing boilerplate code with personalized keyboard shortcuts.",
    "Share standardized team snippets across your workspace."
],
  tips: [
    "Use `${1:defaultName}` to add default placeholder text that can be quickly replaced with the Tab key."
],
  faqs: [
    {
        "question": "Where do I paste the generated snippet in VS Code?",
        "answer": "Open VS Code, press `Ctrl+Shift+P` (or `Cmd+Shift+P`), type 'Configure User Snippets', select your target language or 'New Global Snippets file', and paste the JSON object."
    },
    {
        "question": "How do tabstops work in VS Code snippets?",
        "answer": "`$1`, `$2`, etc. represent tab stop positions. Pressing `Tab` cycles through them in order, while `$0` defines the final cursor position."
    }
]
};
