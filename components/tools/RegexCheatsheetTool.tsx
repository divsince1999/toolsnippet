"use client";

import ToolContainer from "@/components/ui/ToolContainer";

const CHEATSHEET = [
  {
    category: "Character Classes",
    items: [
      { char: ".", desc: "Any character except newline" },
      { char: "\\d", desc: "Digit [0-9]" },
      { char: "\\D", desc: "Non-digit" },
      { char: "\\w", desc: "Word character [a-zA-Z0-9_]" },
      { char: "\\W", desc: "Non-word character" },
      { char: "\\s", desc: "Whitespace character" },
      { char: "\\S", desc: "Non-whitespace" },
    ]
  },
  {
    category: "Anchors",
    items: [
      { char: "^", desc: "Start of string" },
      { char: "$", desc: "End of string" },
      { char: "\\b", desc: "Word boundary" },
      { char: "\\B", desc: "Non-word boundary" },
    ]
  },
  {
    category: "Quantifiers",
    items: [
      { char: "*", desc: "0 or more" },
      { char: "+", desc: "1 or more" },
      { char: "?", desc: "0 or 1" },
      { char: "{n}", desc: "Exactly n times" },
      { char: "{n,}", desc: "n or more times" },
      { char: "{n,m}", desc: "Between n and m times" },
    ]
  },
  {
    category: "Groups & Alternation",
    items: [
      { char: "(abc)", desc: "Capturing group" },
      { char: "(?:abc)", desc: "Non-capturing group" },
      { char: "a|b", desc: "Alternation (a or b)" },
      { char: "[abc]", desc: "Character set" },
      { char: "[^abc]", desc: "Negated character set" },
    ]
  }
];

export default function RegexCheatsheetTool() {
  return (
    <ToolContainer title="Regex Cheatsheet" description="Quick reference for regular expression syntax and patterns.">
      <div className="grid gap-6 sm:grid-cols-2">
        {CHEATSHEET.map(cat => (
          <div key={cat.category} className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-gray-50 dark:bg-white/5">
            <div className="bg-black/5 dark:bg-white/5 p-3 font-bold text-sm border-b border-black/10 dark:border-white/10 uppercase tracking-wider text-primary">
              {cat.category}
            </div>
            <div className="p-4 space-y-3">
              {cat.items.map(item => (
                <div key={item.char} className="flex items-start gap-4 text-sm group">
                  <code className="px-2 py-0.5 rounded bg-white dark:bg-gray-800 border border-black/5 dark:border-white/5 font-bold text-primary shrink-0 group-hover:scale-105 transition-transform">
                    {item.char}
                  </code>
                  <span className="text-gray-600 dark:text-gray-400">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ToolContainer>
  );
}
