"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

// Standard spacing scale mapper (px to tailwind unit)
const SPACING_MAP: Record<string, string> = {
  "0px": "0", "0": "0",
  "1px": "px",
  "2px": "0.5",
  "4px": "1",
  "6px": "1.5",
  "8px": "2",
  "10px": "2.5",
  "12px": "3",
  "14px": "3.5",
  "16px": "4",
  "20px": "5",
  "24px": "6",
  "28px": "7",
  "32px": "8",
  "36px": "9",
  "40px": "10",
  "44px": "11",
  "48px": "12",
  "56px": "14",
  "64px": "16",
  "80px": "20",
  "96px": "24",
};

function formatSpacing(val: string): string {
  const clean = val.trim().toLowerCase();
  if (SPACING_MAP[clean]) return SPACING_MAP[clean];
  if (clean.endsWith("rem")) {
    const num = parseFloat(clean) * 4;
    if (num % 1 === 0 || num % 0.5 === 0) return `${num}`;
  }
  return `[${val.replace(/\s+/g, "_")}]`;
}

function convertCssDeclarationToTailwind(prop: string, val: string): string[] {
  const p = prop.trim().toLowerCase();
  const v = val.trim().replace(/;$/, "").trim();
  const vLower = v.toLowerCase();

  // 1. Display
  if (p === "display") {
    if (vLower === "flex") return ["flex"];
    if (vLower === "inline-flex") return ["inline-flex"];
    if (vLower === "grid") return ["grid"];
    if (vLower === "inline-grid") return ["inline-grid"];
    if (vLower === "block") return ["block"];
    if (vLower === "inline-block") return ["inline-block"];
    if (vLower === "none") return ["hidden"];
  }

  // 2. Flexbox & Grid Layout
  if (p === "flex-direction") {
    if (vLower === "row") return ["flex-row"];
    if (vLower === "column") return ["flex-col"];
    if (vLower === "row-reverse") return ["flex-row-reverse"];
    if (vLower === "column-reverse") return ["flex-col-reverse"];
  }
  if (p === "flex-wrap") {
    if (vLower === "wrap") return ["flex-wrap"];
    if (vLower === "nowrap") return ["flex-nowrap"];
    if (vLower === "wrap-reverse") return ["flex-wrap-reverse"];
  }
  if (p === "justify-content") {
    if (vLower === "flex-start" || vLower === "start") return ["justify-start"];
    if (vLower === "flex-end" || vLower === "end") return ["justify-end"];
    if (vLower === "center") return ["justify-center"];
    if (vLower === "space-between") return ["justify-between"];
    if (vLower === "space-around") return ["justify-around"];
    if (vLower === "space-evenly") return ["justify-evenly"];
  }
  if (p === "align-items") {
    if (vLower === "flex-start" || vLower === "start") return ["items-start"];
    if (vLower === "flex-end" || vLower === "end") return ["items-end"];
    if (vLower === "center") return ["items-center"];
    if (vLower === "baseline") return ["items-baseline"];
    if (vLower === "stretch") return ["items-stretch"];
  }
  if (p === "gap") return [`gap-${formatSpacing(v)}`];
  if (p === "row-gap") return [`gap-y-${formatSpacing(v)}`];
  if (p === "column-gap") return [`gap-x-${formatSpacing(v)}`];

  // 3. Spacing (Padding & Margin)
  if (p === "padding") {
    const parts = v.split(/\s+/);
    if (parts.length === 1) return [`p-${formatSpacing(parts[0])}`];
    if (parts.length === 2) return [`py-${formatSpacing(parts[0])}`, `px-${formatSpacing(parts[1])}`];
    if (parts.length === 4) return [`pt-${formatSpacing(parts[0])}`, `pr-${formatSpacing(parts[1])}`, `pb-${formatSpacing(parts[2])}`, `pl-${formatSpacing(parts[3])}`];
    return [`p-[${v.replace(/\s+/g, "_")}]`];
  }
  if (p === "padding-top") return [`pt-${formatSpacing(v)}`];
  if (p === "padding-bottom") return [`pb-${formatSpacing(v)}`];
  if (p === "padding-left") return [`pl-${formatSpacing(v)}`];
  if (p === "padding-right") return [`pr-${formatSpacing(v)}`];
  if (p === "padding-inline") return [`px-${formatSpacing(v)}`];
  if (p === "padding-block") return [`py-${formatSpacing(v)}`];

  if (p === "margin") {
    if (vLower === "0 auto" || vLower === "auto") return ["mx-auto"];
    const parts = v.split(/\s+/);
    if (parts.length === 1) return [`m-${formatSpacing(parts[0])}`];
    if (parts.length === 2) return [`my-${formatSpacing(parts[0])}`, `mx-${formatSpacing(parts[1])}`];
    if (parts.length === 4) return [`mt-${formatSpacing(parts[0])}`, `mr-${formatSpacing(parts[1])}`, `mb-${formatSpacing(parts[2])}`, `ml-${formatSpacing(parts[3])}`];
    return [`m-[${v.replace(/\s+/g, "_")}]`];
  }
  if (p === "margin-top") return [`mt-${formatSpacing(v)}`];
  if (p === "margin-bottom") return [`mb-${formatSpacing(v)}`];
  if (p === "margin-left") return [`ml-${formatSpacing(v)}`];
  if (p === "margin-right") return [`mr-${formatSpacing(v)}`];
  if (p === "margin-inline") return [`mx-${formatSpacing(v)}`];
  if (p === "margin-block") return [`my-${formatSpacing(v)}`];

  // 4. Sizing
  if (p === "width") {
    if (vLower === "100%") return ["w-full"];
    if (vLower === "100vw") return ["w-screen"];
    if (vLower === "max-content") return ["w-max"];
    if (vLower === "min-content") return ["w-min"];
    if (vLower === "fit-content") return ["w-fit"];
    if (vLower === "auto") return ["w-auto"];
    return [`w-${formatSpacing(v)}`];
  }
  if (p === "height") {
    if (vLower === "100%") return ["h-full"];
    if (vLower === "100vh") return ["h-screen"];
    if (vLower === "auto") return ["h-auto"];
    return [`h-${formatSpacing(v)}`];
  }
  if (p === "max-width") return [`max-w-[${v.replace(/\s+/g, "_")}]`];
  if (p === "min-width") return [`min-w-[${v.replace(/\s+/g, "_")}]`];

  // 5. Typography
  if (p === "font-size") {
    if (vLower === "12px" || vLower === "0.75rem") return ["text-xs"];
    if (vLower === "14px" || vLower === "0.875rem") return ["text-sm"];
    if (vLower === "16px" || vLower === "1rem") return ["text-base"];
    if (vLower === "18px" || vLower === "1.125rem") return ["text-lg"];
    if (vLower === "20px" || vLower === "1.25rem") return ["text-xl"];
    if (vLower === "24px" || vLower === "1.5rem") return ["text-2xl"];
    if (vLower === "30px" || vLower === "1.875rem") return ["text-3xl"];
    if (vLower === "36px" || vLower === "2.25rem") return ["text-4xl"];
    return [`text-[${v}]`];
  }
  if (p === "font-weight") {
    if (vLower === "400" || vLower === "normal") return ["font-normal"];
    if (vLower === "500") return ["font-medium"];
    if (vLower === "600") return ["font-semibold"];
    if (vLower === "700" || vLower === "bold") return ["font-bold"];
    if (vLower === "800") return ["font-extrabold"];
    if (vLower === "900") return ["font-black"];
    return [`font-[${v}]`];
  }
  if (p === "text-align") return [`text-${vLower}`];
  if (p === "text-transform") {
    if (vLower === "uppercase") return ["uppercase"];
    if (vLower === "lowercase") return ["lowercase"];
    if (vLower === "capitalize") return ["capitalize"];
  }

  // 6. Colors & Backgrounds
  if (p === "background-color" || p === "background") {
    if (vLower === "transparent") return ["bg-transparent"];
    if (vLower === "#ffffff" || vLower === "#fff" || vLower === "white") return ["bg-white"];
    if (vLower === "#000000" || vLower === "#000" || vLower === "black") return ["bg-black"];
    return [`bg-[${v.replace(/\s+/g, "_")}]`];
  }
  if (p === "color") {
    if (vLower === "#ffffff" || vLower === "#fff" || vLower === "white") return ["text-white"];
    if (vLower === "#000000" || vLower === "#000" || vLower === "black") return ["text-black"];
    return [`text-[${v.replace(/\s+/g, "_")}]`];
  }

  // 7. Borders & Shadows
  if (p === "border-radius") {
    if (vLower === "9999px" || vLower === "50%") return ["rounded-full"];
    if (vLower === "2px") return ["rounded-xs"];
    if (vLower === "4px") return ["rounded-sm"];
    if (vLower === "6px") return ["rounded-md"];
    if (vLower === "8px" || vLower === "0.5rem") return ["rounded-lg"];
    if (vLower === "12px" || vLower === "0.75rem") return ["rounded-xl"];
    if (vLower === "16px" || vLower === "1rem") return ["rounded-2xl"];
    if (vLower === "24px" || vLower === "1.5rem") return ["rounded-3xl"];
    return [`rounded-[${v}]`];
  }
  if (p === "box-shadow") {
    if (vLower === "none") return ["shadow-none"];
    return [`shadow-[${v.replace(/\s+/g, "_")}]`];
  }
  if (p === "border") {
    if (vLower === "none" || vLower === "0") return ["border-0"];
    return ["border", `border-[${v.replace(/\s+/g, "_")}]`];
  }
  if (p === "cursor") return [`cursor-${vLower}`];
  if (p === "position") return [vLower];
  if (p === "opacity") return [`opacity-[${v}]`];
  if (p === "z-index") return [`z-[${v}]`];

  // Default arbitrary fallback
  return [`[${p}:${v.replace(/\s+/g, "_")}]`];
}

function parseCssToTailwind(css: string): { classes: string[]; htmlSnippet: string } {
  if (!css.trim()) return { classes: [], htmlSnippet: "" };

  const collectedClasses: string[] = [];
  const lines = css
    .replace(/\{([^}]+)\}/g, "$1") // strip class wrapper
    .split(/;|\n/)
    .map((l) => l.trim())
    .filter((l) => l.includes(":"));

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const prop = line.slice(0, colonIndex);
    const val = line.slice(colonIndex + 1);
    const tw = convertCssDeclarationToTailwind(prop, val);
    collectedClasses.push(...tw);
  }

  // Deduplicate classes
  const unique = Array.from(new Set(collectedClasses));
  const classStr = unique.join(" ");
  const htmlSnippet = `<div className="${classStr}">\n  {/* Component content */}\n</div>`;

  return { classes: unique, htmlSnippet };
}

const SAMPLE_CARD_CSS = `.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  margin: 16px auto;
  max-width: 420px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #111827;
}`;

export default function CssToTailwindTool() {
  const [cssInput, setCssInput] = useState(SAMPLE_CARD_CSS);
  const [copiedClass, setCopiedClass] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const { classes, htmlSnippet } = useMemo(() => parseCssToTailwind(cssInput), [cssInput]);
  const classString = classes.join(" ");

  const handleCopyClasses = () => {
    if (classString) {
      navigator.clipboard.writeText(classString);
      setCopiedClass(true);
      setTimeout(() => setCopiedClass(false), 2000);
    }
  };

  const handleCopyHtml = () => {
    if (htmlSnippet) {
      navigator.clipboard.writeText(htmlSnippet);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    }
  };

  return (
    <ToolContainer
      title="CSS to Tailwind Converter"
      description="Convert standard CSS properties, selectors, and stylesheets into Tailwind CSS utility classes in real-time."
    >
      <div className="space-y-6">
        {/* Presets Bar */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Sample CSS Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              {
                name: "Card Container",
                css: SAMPLE_CARD_CSS,
              },
              {
                name: "Modern Button",
                css: `display: inline-flex;\nalign-items: center;\njustify-content: center;\npadding: 10px 20px;\nbackground-color: #4f46e5;\ncolor: #ffffff;\nfont-size: 14px;\nfont-weight: 600;\nborder-radius: 12px;\ncursor: pointer;`,
              },
              {
                name: "Flex Navbar",
                css: `display: flex;\njustify-content: space-between;\nalign-items: center;\npadding: 16px 32px;\nwidth: 100%;\nbackground-color: #ffffff;\nborder-bottom: 1px solid #e5e7eb;`,
              },
            ].map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setCssInput(p.css)}
                className="rounded-lg border border-black/10 bg-black/[0.02] px-3 py-1.5 text-xs font-medium hover:border-primary-solid dark:border-white/10 dark:bg-white/[0.02]"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Workstation */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: CSS Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Input CSS Rules:
              </label>
              <button
                type="button"
                onClick={() => setCssInput("")}
                className="text-xs text-gray-500 hover:text-rose-500"
              >
                Clear
              </button>
            </div>
            <TextArea
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              placeholder="Paste CSS declarations or class rules here..."
              rows={14}
              className="font-mono text-xs"
            />
          </div>

          {/* Right Column: Generated Tailwind Classes */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Tailwind Utility Classes ({classes.length}):
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyClasses}
                  disabled={!classString}
                  className="h-7 text-xs"
                >
                  {copiedClass ? "✓ Copied" : "Copy Classes"}
                </Button>
              </div>
              <div className="min-h-[100px] rounded-xl border border-black/15 bg-black/[0.02] p-3 font-mono text-xs font-semibold text-primary-solid break-all dark:border-white/15 dark:bg-white/[0.02]">
                {classString || "Tailwind classes will appear here..."}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  JSX / HTML Snippet:
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyHtml}
                  disabled={!htmlSnippet}
                  className="h-7 text-xs"
                >
                  {copiedHtml ? "✓ Copied" : "Copy JSX"}
                </Button>
              </div>
              <TextArea
                value={htmlSnippet}
                readOnly
                placeholder="JSX code will appear here..."
                rows={6}
                className="bg-black/[0.02] font-mono text-xs dark:bg-white/[0.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
