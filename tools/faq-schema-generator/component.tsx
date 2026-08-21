"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export default function FaqSchemaGenerator() {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: "1",
      q: "What is ToolSnippet?",
      a: "ToolSnippet is a free online suite of private developer and text utilities that execute directly in your browser."
    },
    {
      id: "2",
      q: "Are my inputs uploaded to any server?",
      a: "No, all transformations and computations run 100% client-side in your browser for maximum privacy."
    }
  ]);
  const [copied, setCopied] = useState(false);

  const jsonLd = useMemo(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };
    return JSON.stringify(schema, null, 2);
  }, [faqs]);

  const addFaq = () => {
    setFaqs([...faqs, { id: Math.random().toString(), q: "", a: "" }]);
  };

  const removeFaq = (id: string) => {
    if (faqs.length > 1) {
      setFaqs(faqs.filter((f) => f.id !== id));
    }
  };

  const updateFaq = (id: string, field: "q" | "a", value: string) => {
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const handleCopy = () => {
    const snippet = `<script type="application/ld+json">\n${jsonLd}\n</script>`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer title="FAQ Page JSON-LD Schema Generator" description="Build interactive FAQPage JSON-LD structured data for Google Search rich snippets.">
      <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
        <Button variant="secondary" size="sm" onClick={addFaq}>
          + Add FAQ Question
        </Button>
        <Button variant="secondary" size="sm" onClick={handleCopy}>
          {copied ? "✓ Copied JSON-LD" : "Copy <script> Snippet"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Interactive Editor */}
        <div className="space-y-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            FAQ Items ({faqs.length}):
          </label>
          {faqs.map((item, idx) => (
            <div
              key={item.id}
              className="space-y-2 rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary-solid">Question #{idx + 1}</span>
                {faqs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFaq(item.id)}
                    className="text-xs text-rose-500 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                type="text"
                value={item.q}
                onChange={(e) => updateFaq(item.id, "q", e.target.value)}
                placeholder="Question text..."
                className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-1.5 text-xs font-medium outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
              />
              <textarea
                value={item.a}
                onChange={(e) => updateFaq(item.id, "a", e.target.value)}
                placeholder="Answer text (HTML supported)..."
                rows={2}
                className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
              />
            </div>
          ))}
        </div>

        {/* JSON-LD Output */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Generated JSON-LD Schema:
          </label>
          <textarea
            readOnly
            value={jsonLd}
            rows={14}
            className="w-full rounded-xl border border-black/10 bg-black/[0.02] p-4 font-mono text-xs outline-none dark:border-white/10 dark:bg-white/[0.02]"
          />
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
