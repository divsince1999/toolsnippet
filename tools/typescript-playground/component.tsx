"use client";

import { useState, useMemo, useCallback } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

// Clean client-side TypeScript to JavaScript transpile function
function transpileTypeScriptToJs(ts: string): string {
  if (!ts.trim()) return "";
  let js = ts;

  // 1. Remove interfaces: interface Foo { ... }
  js = js.replace(/interface\s+[A-Za-z0-9_]+(?:\s*<[^>]+>)?(?:\s+extends\s+[^{]+)?\s*\{[\s\S]*?\}/g, "");

  // 2. Remove type aliases: type Foo = ...;
  js = js.replace(/type\s+[A-Za-z0-9_]+(?:\s*<[^>]+>)?\s*=[\s\S]*?;/g, "");

  // 3. Remove enum definitions: enum Color { Red = "RED", Green = "GREEN" } -> const Color = { Red: "RED", Green: "GREEN" };
  js = js.replace(/enum\s+([A-Za-z0-9_]+)\s*\{([\s\S]*?)\}/g, (_match, name, body) => {
    const lines = body.split(",").map((l: string) => l.trim()).filter(Boolean);
    const converted = lines.map((line: string, idx: number) => {
      if (line.includes("=")) {
        const [k, v] = line.split("=");
        return `  ${k.trim()}: ${v.trim()}`;
      }
      return `  ${line.trim()}: ${idx}`;
    });
    return `const ${name} = {\n${converted.join(",\n")}\n};`;
  });

  // 4. Remove access modifiers & readonly: public, private, protected, readonly
  js = js.replace(/\b(public|private|protected|readonly)\s+/g, "");

  // 5. Remove 'as Type' assertions and '<Type>' angle-bracket assertions
  js = js.replace(/\s+as\s+[A-Za-z0-9_<>\[\]|&\s]+/g, "");

  // 6. Remove generic signatures on function declarations and calls: function foo<T>(x: T): T -> function foo(x)
  js = js.replace(/<[^>]+>(?=\s*\()/g, "");

  // 7. Remove function return type annotations: ): ReturnType { -> ) {
  js = js.replace(/\)\s*:\s*[A-Za-z0-9_<>\[\]|&\s]+(?=\s*(=>|\{))/g, ")");

  // 8. Remove variable / parameter type annotations: (x: number, y: string = "hi") -> (x, y = "hi")
  js = js.replace(/(\b[A-Za-z0-9_$]+)\s*:\s*(?:[A-Za-z0-9_<>\[\]|&\s]+|\{[^}]*\})(?=\s*[,=\)])/g, "$1");

  // 9. Remove const/let/var type annotations: const x: number = 5 -> const x = 5
  js = js.replace(/\b(const|let|var)\s+([A-Za-z0-9_$]+)\s*:\s*[A-Za-z0-9_<>\[\]|&\s]+(?=\s*=)/g, "$1 $2");

  // Clean empty lines
  return js.replace(/^\s*[\r\n]/gm, "").trim();
}

const SAMPLE_TS = `// TypeScript Generic Function & Interface
interface User {
  id: number;
  name: string;
  role: "admin" | "editor" | "viewer";
}

function formatUserGreeting<T extends User>(user: T): string {
  return \`Welcome, \${user.name} (Role: \${user.role.toUpperCase()})!\`;
}

const activeUser: User = {
  id: 101,
  name: "Alex Rivera",
  role: "admin"
};

console.log(formatUserGreeting(activeUser));

// Array manipulation with typed callbacks
const numbers: number[] = [10, 25, 40, 55, 70];
const doubled = numbers.map((n: number) => n * 2);

console.log("Doubled numbers:", doubled);
console.log("Sum:", numbers.reduce((acc, curr) => acc + curr, 0));`;

export default function TypescriptPlaygroundTool() {
  const [tsCode, setTsCode] = useState(SAMPLE_TS);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const compiledJs = useMemo(() => transpileTypeScriptToJs(tsCode), [tsCode]);

  const handleRunCode = useCallback(() => {
    setExecutionError(null);
    const logs: string[] = [];

    // Custom logger interceptor
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const captureLog = (...args: any[]) => {
      logs.push(
        args
          .map((arg) => {
            if (typeof arg === "object" && arg !== null) {
              try {
                return JSON.stringify(arg, null, 2);
              } catch {
                return String(arg);
              }
            }
            return String(arg);
          })
          .join(" ")
      );
    };

    try {
      // Execute within isolated Function sandbox
      const sandboxed = new Function("console", compiledJs);
      const customConsole = {
        log: captureLog,
        info: captureLog,
        warn: (...args: unknown[]) => captureLog("[WARN]", ...args),
        error: (...args: unknown[]) => captureLog("[ERROR]", ...args),
      };

      sandboxed(customConsole);
      setConsoleOutput(logs.length > 0 ? logs : ["Code executed successfully (no console output)."]);
    } catch (err: unknown) {
      setExecutionError(err instanceof Error ? err.message : "Runtime execution error");
      setConsoleOutput(logs);
    }
  }, [compiledJs]);

  const handleCopyJs = () => {
    if (compiledJs) {
      navigator.clipboard.writeText(compiledJs);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolContainer
      title="TypeScript Playground & Transpiler"
      description="Write TypeScript in real-time, inspect the compiled JavaScript output, and execute code safely in a client-side sandbox."
    >
      <div className="space-y-6">
        {/* Presets & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Interfaces & Generics", code: SAMPLE_TS },
              {
                label: "Enums & Data Mapping",
                code: `enum Status {\n  Pending = "PENDING",\n  Success = "SUCCESS",\n  Failed = "FAILED"\n}\n\nconst order = {\n  id: "ORD-9482",\n  status: Status.Success\n};\n\nconsole.log("Order Status:", order.status);`,
              },
              {
                label: "Async / Await Simulation",
                code: `async function fetchData(delay: number): Promise<string> {\n  return "Data received after " + delay + "ms";\n}\n\nfetchData(100).then((res) => console.log("Result:", res));`,
              },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setTsCode(p.code);
                  setConsoleOutput([]);
                  setExecutionError(null);
                }}
                className="rounded-lg border border-black/10 bg-black/[0.02] px-3 py-1.5 text-xs font-medium hover:border-primary-solid dark:border-white/10 dark:bg-white/[0.02]"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={handleRunCode} className="h-8 gap-1.5">
              <span>▶</span> Run Code
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyJs} className="h-8 text-xs">
              {copied ? "✓ Copied JS" : "Copy JS"}
            </Button>
          </div>
        </div>

        {/* 2-Column Code Workspace */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: TypeScript Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                TypeScript Source:
              </label>
              <button
                type="button"
                onClick={() => setTsCode("")}
                className="text-xs text-gray-500 hover:text-rose-500"
              >
                Clear
              </button>
            </div>
            <TextArea
              value={tsCode}
              onChange={(e) => setTsCode(e.target.value)}
              placeholder="Write TypeScript code here..."
              rows={14}
              className="font-mono text-xs"
            />
          </div>

          {/* Right: Compiled JavaScript */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Compiled JavaScript (ES6+):
            </label>
            <TextArea
              value={compiledJs}
              readOnly
              placeholder="Compiled JavaScript output..."
              rows={14}
              className="bg-black/[0.02] font-mono text-xs dark:bg-white/[0.02]"
            />
          </div>
        </div>

        {/* Output Console Panel */}
        <div className="rounded-2xl border border-black/10 bg-zinc-950 p-4 font-mono text-xs text-zinc-100 shadow-md">
          <div className="mb-2 flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Execution Console
              </span>
            </div>
            {consoleOutput.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setConsoleOutput([]);
                  setExecutionError(null);
                }}
                className="text-[11px] text-zinc-500 hover:text-zinc-300"
              >
                Clear Console
              </button>
            )}
          </div>

          {executionError && (
            <div className="mb-2 rounded-lg bg-rose-950/60 p-2.5 text-rose-300 border border-rose-800">
              ❌ {executionError}
            </div>
          )}

          {consoleOutput.length === 0 && !executionError ? (
            <div className="py-4 text-center text-zinc-500">
              Click &quot;▶ Run Code&quot; to execute your JavaScript and view console outputs.
            </div>
          ) : (
            <div className="space-y-1 overflow-x-auto">
              {consoleOutput.map((line, idx) => (
                <pre key={idx} className="font-mono text-xs text-emerald-400 whitespace-pre-wrap">
                  &gt; {line}
                </pre>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolContainer>
  );
}
