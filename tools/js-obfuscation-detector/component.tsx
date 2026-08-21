"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsObfuscationDetector() {
  const [code, setCode] = useState(`var _0x5a2d = ['\x68\x65\x6c\x6c\x6f', '\x77\x6f\x72\x6c\x64'];\n(function(_0x12ab, _0x34cd) {\n    var _0x56ef = function(_0x7890) {\n        while (--_0x7890) {\n            _0x12ab['push'](_0x12ab['shift']());\n        }\n    };\n    _0x56ef(++_0x34cd);\n}(_0x5a2d, 0x1a4));\neval(function(p,a,c,k,e,d){e=function(c){return c};return p}('console.log("active")',0,0,''.split('|'),0,{}));`);

  const analysis = useMemo(() => {
    if (!code.trim()) return null;

    let score = 0;
    const flags: string[] = [];

    // 1. Check for eval / Function constructor
    if (/eval\s*\(/.test(code)) {
      score += 30;
      flags.push("Detected dynamic code execution: eval(...)");
    }
    if (/new\s+Function\s*\(/.test(code)) {
      score += 25;
      flags.push("Detected dynamic Function(...) constructor");
    }

    // 2. Check for hex/unicode variable mangling (_0x...)
    const hexVars = code.match(/_0x[a-f0-9]{4,8}/gi);
    if (hexVars && hexVars.length > 3) {
      score += 25;
      flags.push(`Detected ${hexVars.length} obfuscated hexadecimal identifiers (_0x...)`);
    }

    // 3. Hex escape sequences (\x61)
    const hexEscapes = code.match(/\\x[0-9a-f]{2}/gi);
    if (hexEscapes && hexEscapes.length > 2) {
      score += 20;
      flags.push(`Detected ${hexEscapes.length} raw hexadecimal string escapes (\\x..)`);
    }

    // 4. Dean Edwards Packer signature
    if (/function\s*\(p,a,c,k,e,d\)/.test(code)) {
      score += 35;
      flags.push("Detected Dean Edwards JS Packer signature");
    }

    // 5. Calculate Shannon Entropy
    const len = code.length;
    const frequencies: Record<string, number> = {};
    for (let i = 0; i < len; i++) {
      frequencies[code[i]] = (frequencies[code[i]] || 0) + 1;
    }

    let entropy = 0;
    for (const count of Object.values(frequencies)) {
      const p = count / len;
      entropy -= p * Math.log2(p);
    }

    if (entropy > 5.5) {
      score += 15;
      flags.push(`High Shannon Information Entropy: ${entropy.toFixed(2)} / 8.0 (Indicates encryption/packing)`);
    }

    const finalScore = Math.min(score, 100);

    return {
      score: finalScore,
      entropy: entropy.toFixed(2),
      flags,
      level: finalScore >= 60 ? "High Obfuscation Risk" : finalScore >= 30 ? "Medium / Suspicious" : "Clean / Standard Code"
    };
  }, [code]);

  return (
    <ToolContainer
      title="JavaScript Obfuscation & Entropy Analyzer"
      description="Detect code obfuscation, packed scripts, high Shannon entropy, eval() execution, and suspicious variable patterns in JavaScript."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Paste JavaScript Code to Inspect:
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        {analysis && (
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Obfuscation Risk Score:</span>
                <div className={`text-3xl font-extrabold font-mono ${
                  analysis.score >= 60 ? "text-rose-600 dark:text-rose-400" : analysis.score >= 30 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
                }`}>
                  {analysis.score} / 100
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-500 dark:text-gray-400">Classification:</span>
                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {analysis.level}
                </div>
                <div className="text-xs text-gray-500">Entropy: {analysis.entropy} bits/char</div>
              </div>
            </div>

            {analysis.flags.length > 0 ? (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Detected Heuristic Indicators ({analysis.flags.length}):
                </span>
                <ul className="space-y-1 text-xs">
                  {analysis.flags.map((flag, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono">
                      <span>⚠️</span> {flag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ No obvious obfuscator or packer signatures detected.
              </div>
            )}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
