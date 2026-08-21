"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

interface Step {
  id: string;
  name: string;
  text: string;
}

export default function HowToSchemaGenerator() {
  const [name, setName] = useState("How to Format JSON in Your Browser");
  const [description, setDescription] = useState("A step-by-step guide to validating, beautifying, and minifying JSON data online.");
  const [totalTime, setTotalTime] = useState("PT5M");
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "1",
      name: "Paste Raw JSON",
      text: "Copy your unformatted JSON payload and paste it into the online JSON Formatter input box."
    },
    {
      id: "2",
      name: "Select Indentation",
      text: "Choose 2-space or 4-space tab indentation based on your team's code style."
    },
    {
      id: "3",
      name: "Copy Formatted Output",
      text: "Click the Copy button to immediately paste clean, validated JSON into your code editor."
    }
  ]);
  const [copied, setCopied] = useState(false);

  const jsonLd = useMemo(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name,
      description,
      totalTime,
      step: steps.map((s, idx) => ({
        "@type": "HowToStep",
        position: idx + 1,
        name: s.name,
        text: s.text
      }))
    };
    return JSON.stringify(schema, null, 2);
  }, [name, description, totalTime, steps]);

  const addStep = () => {
    setSteps([...steps, { id: Math.random().toString(), name: "", text: "" }]);
  };

  const removeStep = (id: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter((s) => s.id !== id));
    }
  };

  const updateStep = (id: string, field: "name" | "text", value: string) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleCopy = () => {
    const snippet = `<script type="application/ld+json">\n${jsonLd}\n</script>`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer title="HowTo Step-by-Step Schema Generator" description="Build structured @type: 'HowTo' JSON-LD schema markup with step titles, descriptions, and supplies for Google.">
      <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
        <Button variant="secondary" size="sm" onClick={addStep}>
          + Add Instructional Step
        </Button>
        <Button variant="secondary" size="sm" onClick={handleCopy}>
          {copied ? "✓ Copied JSON-LD" : "Copy <script> Snippet"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">HowTo Guide Title:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-xl border border-black/15 bg-transparent p-3 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Total Duration (ISO 8601 e.g. PT10M):</label>
            <input
              type="text"
              value={totalTime}
              onChange={(e) => setTotalTime(e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3 py-1.5 text-xs font-mono outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Steps ({steps.length}):
            </label>
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="space-y-2 rounded-xl border border-black/10 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary-solid">Step #{idx + 1}</span>
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(step.id)}
                      className="text-xs text-rose-500 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={step.name}
                  onChange={(e) => updateStep(step.id, "name", e.target.value)}
                  placeholder="Step title..."
                  className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-1 text-xs font-medium outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
                />
                <textarea
                  value={step.text}
                  onChange={(e) => updateStep(step.id, "text", e.target.value)}
                  placeholder="Detailed directions..."
                  rows={2}
                  className="w-full rounded-lg border border-black/15 bg-transparent p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Generated JSON-LD Schema:
          </label>
          <textarea
            readOnly
            value={jsonLd}
            rows={16}
            className="w-full rounded-xl border border-black/10 bg-black/[0.02] p-4 font-mono text-xs outline-none dark:border-white/10 dark:bg-white/[0.02]"
          />
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
