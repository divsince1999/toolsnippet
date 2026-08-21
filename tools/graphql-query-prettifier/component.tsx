"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function formatGraphQL(query: string, indentSize = 2): string {
  const clean = query.replace(/#.*$/gm, "").trim();
  let formatted = "";
  let indent = 0;
  const pad = " ".repeat(indentSize);

  // Tokenize braces and newlines
  const tokens = clean
    .replace(/([{}()])/g, " $1 ")
    .replace(/,/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  let inParens = false;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === "(") {
      inParens = true;
      formatted += "(";
    } else if (token === ")") {
      inParens = false;
      formatted += ") ";
    } else if (token === "{") {
      formatted += " {\n" + pad.repeat(++indent);
    } else if (token === "}") {
      indent = Math.max(0, indent - 1);
      formatted = formatted.trimEnd() + "\n" + pad.repeat(indent) + "}\n" + pad.repeat(indent);
    } else {
      if (inParens) {
        formatted += (tokens[i - 1] === "(" ? "" : " ") + token;
      } else {
        const nextToken = tokens[i + 1];
        if (nextToken === "{" || nextToken === "(" || token.startsWith("$") || token.endsWith(":")) {
          formatted += token + " ";
        } else {
          formatted += token + "\n" + pad.repeat(indent);
        }
      }
    }
  }

  return formatted.trim();
}

function minifyGraphQL(query: string): string {
  return query
    .replace(/#.*$/gm, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}():,])\s*/g, "$1")
    .trim();
}

export default function GraphqlQueryPrettifierTool() {
  const [query, setQuery] = useState(
    `query GetUserProfile($userId: ID!, $includePosts: Boolean = true) {\n` +
    `  user(id: $userId) {\n` +
    `    id\n` +
    `    name\n` +
    `    email\n` +
    `    posts(limit: 10) @include(if: $includePosts) {\n` +
    `      id\n` +
    `      title\n` +
    `      publishedAt\n` +
    `    }\n` +
    `  }\n` +
    `}`
  );
  const [variables, setVariables] = useState('{\n  "userId": "usr_998822",\n  "includePosts": true\n}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handlePrettify = () => {
    try {
      if (!query.trim()) return;
      setOutput(formatGraphQL(query));
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to format GraphQL query.");
    }
  };

  const handleMinify = () => {
    try {
      if (!query.trim()) return;
      setOutput(minifyGraphQL(query));
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to minify GraphQL query.");
    }
  };

  return (
    <ToolContainer
      title="GraphQL Query Prettifier & Minifier"
      description="Format, indent, or compact single-line GraphQL queries, mutations, and variables."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="GraphQL Query Input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="query { user { id name } }"
            rows={10}
            error={error}
          />

          <TextArea
            label="Query Variables (JSON)"
            value={variables}
            onChange={(e) => setVariables(e.target.value)}
            placeholder='{"userId": "123"}'
            rows={4}
          />

          <div className="flex gap-2">
            <Button onClick={handlePrettify}>Prettify Query</Button>
            <Button variant="secondary" onClick={handleMinify}>Minify for POST Body</Button>
          </div>
        </div>

        <div className="space-y-4">
          {output ? (
            <TextArea
              label="Formatted GraphQL Output"
              readOnly
              copyable
              value={output}
              rows={16}
            />
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border-2 border-dashed border-black/10 p-6 text-center text-xs text-gray-400 dark:border-white/10">
              Click &quot;Prettify Query&quot; or &quot;Minify for POST Body&quot; to format output.
            </div>
          )}
        </div>
      </div>
    </ToolContainer>
  );
}
