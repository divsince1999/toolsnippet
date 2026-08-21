import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "regex-cheatsheet-tester",
  name: "RegEx Token Builder & Cheatsheet Tester",
  category: "Validation",
  shortDescription: "Interactive regular expression tester with quick-click token inserts for lookaheads, capture groups, and anchors.",
  heroTitle: "RegEx Token Builder & Cheatsheet Tester",
  heroDescription: "Interactive regular expression tester with quick-click token inserts for lookaheads, capture groups, and anchors.",
  about: "The RegEx Token Builder & Cheatsheet Tester combines real-time regular expression testing with an interactive cheat sheet of regex tokens (lookaheads, non-capturing groups, boundary assertions, and character classes).",
  features: [
    "Click-to-insert RegEx tokens (Lookahead `(?=...)`, Negative Lookahead `(?!...)`, Word Boundary `\\b`)",
    "Real-time match highlighting and capture group extraction",
    "Regex flags toggles (`g`, `i`, `m`, `s`, `u`)",
    "Error detection for unbalanced groups and invalid quantifiers"
],
  howToUse: [
    "Click tokens from the cheatsheet or type your regular expression.",
    "Enter test string to evaluate.",
    "Instantly view matched highlights and extracted capture groups."
],
  whyUse: [
    "Quickly learn and construct complex lookaheads and assertions without memorizing esoteric syntax.",
    "Test pattern matches securely client-side in your browser."
],
  tips: [
    "`(?<=foo)bar` is a positive lookbehind matching 'bar' only if preceded by 'foo'."
],
  faqs: [
    {
        "question": "What is a positive lookahead in Regular Expressions?",
        "answer": "A positive lookahead `(?=abc)` asserts that the given subpattern immediately follows the current match position, without including it in the match."
    },
    {
        "question": "What is the difference between capturing and non-capturing groups?",
        "answer": "`(...)` captures the matched text into backreferences `$1, $2`, while `(?:...)` groups tokens for quantifiers without saving memory references."
    }
]
};
