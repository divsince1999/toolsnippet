"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PackageJsonValidator() {
  const [pkgText, setPkgText] = useState(`{\n  "name": "my-awesome-app",\n  "version": "1.0.0",\n  "description": "Production web application",\n  "main": "index.js",\n  "license": "MIT",\n  "scripts": {\n    "build": "next build",\n    "dev": "next dev"\n  },\n  "dependencies": {\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0",\n    "lodash": "*"\n  },\n  "devDependencies": {\n    "typescript": "^5.0.0"\n  }\n}`);

  const diagnostics = useMemo(() => {
    if (!pkgText.trim()) return null;

    try {
      const parsed = JSON.parse(pkgText);
      const warnings: string[] = [];
      const info: string[] = [];

      if (!parsed.name) warnings.push("Missing required field: 'name'");
      if (!parsed.version) warnings.push("Missing required field: 'version'");
      if (!parsed.license) warnings.push("Missing recommended field: 'license'");

      const prodDeps = Object.keys(parsed.dependencies || {}).length;
      const devDeps = Object.keys(parsed.devDependencies || {}).length;
      const peerDeps = Object.keys(parsed.peerDependencies || {}).length;

      // Check for wildcards
      for (const [dep, ver] of Object.entries({ ...(parsed.dependencies || {}), ...(parsed.devDependencies || {}) })) {
        if (ver === "*" || ver === "latest") {
          warnings.push(`Unpinned wildcard version detected in '${dep}': '${ver}'`);
        }
      }

      info.push(`Total Dependencies: ${prodDeps}`);
      info.push(`Total DevDependencies: ${devDeps}`);
      if (peerDeps > 0) info.push(`Total PeerDependencies: ${peerDeps}`);

      return {
        valid: true,
        warnings,
        info,
        error: ""
      };
    } catch (err: unknown) {
      return {
        valid: false,
        warnings: [],
        info: [],
        error: err instanceof Error ? err.message : "Invalid JSON syntax"
      };
    }
  }, [pkgText]);

  return (
    <ToolContainer
      title="package.json Validator & Dependency Analyzer"
      description="Validate package.json syntax, check npm semver version ranges, and detect missing required fields."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Paste package.json Content:
          </label>
          <textarea
            value={pkgText}
            onChange={(e) => setPkgText(e.target.value)}
            rows={10}
            className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        {diagnostics && (
          <div className="space-y-4">
            {diagnostics.valid ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 dark:border-emerald-500/30">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  <span>✓ Valid JSON & Package Manifest</span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-300">
                  {diagnostics.info.map((inf, i) => (
                    <span key={i} className="rounded-md bg-emerald-500/10 px-2 py-1 font-mono">
                      {inf}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400 font-mono">
                Syntax Error: {diagnostics.error}
              </div>
            )}

            {diagnostics.warnings.length > 0 && (
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Manifest Audit Warnings ({diagnostics.warnings.length}):
                </span>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-700 dark:text-gray-300">
                  {diagnostics.warnings.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
