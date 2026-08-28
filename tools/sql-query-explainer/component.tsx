"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

interface SqlExplanation {
  summary: string;
  queryType: string;
  steps: { step: number; title: string; desc: string; icon: string }[];
  tables: string[];
  columns: string[];
  conditions: string[];
  warnings: string[];
}

function analyzeSqlQuery(sql: string): SqlExplanation {
  const clean = sql.trim().replace(/--.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").trim();
  if (!clean) {
    return {
      summary: "Enter a SQL query to see its plain-English explanation.",
      queryType: "UNKNOWN",
      steps: [],
      tables: [],
      columns: [],
      conditions: [],
      warnings: [],
    };
  }

  const upper = clean.toUpperCase();
  const warnings: string[] = [];

  // Determine query type
  let queryType = "SELECT";
  if (upper.startsWith("INSERT")) queryType = "INSERT";
  else if (upper.startsWith("UPDATE")) queryType = "UPDATE";
  else if (upper.startsWith("DELETE")) queryType = "DELETE";
  else if (upper.startsWith("CREATE")) queryType = "CREATE";
  else if (upper.startsWith("ALTER")) queryType = "ALTER";

  const steps: { step: number; title: string; desc: string; icon: string }[] = [];
  const tables: string[] = [];
  const columns: string[] = [];
  const conditions: string[] = [];

  if (queryType === "SELECT") {
    // 1. FROM / JOIN
    const fromMatch = clean.match(/FROM\s+([a-zA-Z0-9_\.]+)(?:\s+(?:AS\s+)?([a-zA-Z0-9_]+))?/i);
    if (fromMatch) {
      tables.push(fromMatch[1]);
      steps.push({
        step: 1,
        title: "Load Source Table (FROM)",
        desc: `Reads initial dataset from table \`${fromMatch[1]}\`${fromMatch[2] ? ` (aliased as \`${fromMatch[2]}\`)` : ""}.`,
        icon: "📂",
      });
    }

    // JOINs
    const joinMatches = clean.matchAll(/(INNER|LEFT|RIGHT|FULL|CROSS)?\s*JOIN\s+([a-zA-Z0-9_\.]+)(?:\s+(?:AS\s+)?([a-zA-Z0-9_]+))?\s+ON\s+([^;\n]+?)(?=\s+(?:LEFT|RIGHT|INNER|FULL|CROSS|WHERE|GROUP|ORDER|LIMIT|$))/gi);
    for (const jm of joinMatches) {
      const joinType = jm[1] ? jm[1].toUpperCase() : "INNER";
      const table = jm[2];
      tables.push(table);
      steps.push({
        step: 2,
        title: `Join Related Table (${joinType} JOIN)`,
        desc: `Combines rows from \`${table}\` matching condition \`${jm[4].trim()}\`.`,
        icon: "🔗",
      });
    }

    // 2. WHERE
    const whereMatch = clean.match(/WHERE\s+([^;\n]+?)(?=\s+(?:GROUP\s+BY|ORDER\s+BY|LIMIT|HAVING|$))/i);
    if (whereMatch) {
      const cond = whereMatch[1].trim();
      conditions.push(cond);
      steps.push({
        step: 3,
        title: "Filter Rows (WHERE)",
        desc: `Filters dataset to keep only rows where \`${cond}\`.`,
        icon: "🔍",
      });

      if (cond.includes("LIKE '%") || cond.includes('LIKE "%')) {
        warnings.push("Leading wildcard in LIKE clause (e.g. '%term') prevents B-Tree index seeks and forces full table scans.");
      }
    }

    // 3. GROUP BY
    const groupMatch = clean.match(/GROUP\s+BY\s+([^;\n]+?)(?=\s+(?:HAVING|ORDER\s+BY|LIMIT|$))/i);
    if (groupMatch) {
      steps.push({
        step: 4,
        title: "Group Data (GROUP BY)",
        desc: `Aggregates rows into buckets grouped by \`${groupMatch[1].trim()}\`.`,
        icon: "📊",
      });
    }

    // 4. HAVING
    const havingMatch = clean.match(/HAVING\s+([^;\n]+?)(?=\s+(?:ORDER\s+BY|LIMIT|$))/i);
    if (havingMatch) {
      steps.push({
        step: 5,
        title: "Filter Aggregate Groups (HAVING)",
        desc: `Filters grouped records where \`${havingMatch[1].trim()}\`.`,
        icon: "⚖️",
      });
    }

    // 5. SELECT
    const selectMatch = clean.match(/SELECT\s+(DISTINCT\s+)?([^;\n]+?)\s+FROM/i);
    if (selectMatch) {
      const cols = selectMatch[2].split(",").map((c) => c.trim());
      columns.push(...cols);
      const isDistinct = !!selectMatch[1];
      steps.push({
        step: 6,
        title: `Select & Project Columns (SELECT${isDistinct ? " DISTINCT" : ""})`,
        desc: `Projects ${cols.length} column(s): ${cols.slice(0, 4).join(", ")}${cols.length > 4 ? ` (and ${cols.length - 4} more)` : ""}.`,
        icon: "🎯",
      });

      if (cols.includes("*")) {
        warnings.push("Using 'SELECT *' retrieves all columns including unneeded payloads. Specifying exact columns improves I/O efficiency.");
      }
    }

    // 6. ORDER BY
    const orderMatch = clean.match(/ORDER\s+BY\s+([^;\n]+?)(?=\s+(?:LIMIT|$))/i);
    if (orderMatch) {
      steps.push({
        step: 7,
        title: "Sort Result Set (ORDER BY)",
        desc: `Sorts final result set by \`${orderMatch[1].trim()}\`.`,
        icon: "📶",
      });
    }

    // 7. LIMIT
    const limitMatch = clean.match(/LIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+))?/i);
    if (limitMatch) {
      steps.push({
        step: 8,
        title: "Paginate & Limit Results (LIMIT)",
        desc: `Restricts result output to ${limitMatch[1]} row(s)${limitMatch[2] ? `, skipping the first ${limitMatch[2]} records` : ""}.`,
        icon: "📄",
      });
    }
  } else if (queryType === "UPDATE" || queryType === "DELETE") {
    const whereMatch = clean.match(/WHERE\s+([^;\n]+)/i);
    if (!whereMatch) {
      warnings.push(`⚠️ DANGER: This ${queryType} statement does NOT contain a WHERE clause and will affect EVERY row in the entire table!`);
    }
    steps.push({
      step: 1,
      title: `Execute ${queryType} Mutation`,
      desc: `Modifies records in table. ${whereMatch ? `Only applies to rows matching: ${whereMatch[1].trim()}` : "Applies globally to all rows!"}`,
      icon: "✏️",
    });
  }

  const summary =
    steps.length > 0
      ? `This ${queryType} statement operates on ${tables.length > 0 ? `table(s) ${tables.join(", ")}` : "the database"} through ${steps.length} logical execution phase(s).`
      : `SQL query parsed as ${queryType} statement.`;

  return {
    summary,
    queryType,
    steps,
    tables,
    columns,
    conditions,
    warnings,
  };
}

const SAMPLE_SQL = `SELECT 
  u.id, 
  u.name, 
  u.email, 
  COUNT(o.id) AS total_orders, 
  SUM(o.total_amount) AS total_spent
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.status = 'active' AND u.created_at >= '2026-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 2
ORDER BY total_spent DESC
LIMIT 50;`;

export default function SqlQueryExplainerTool() {
  const [sqlInput, setSqlInput] = useState(SAMPLE_SQL);
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => analyzeSqlQuery(sqlInput), [sqlInput]);

  const handleCopyExplanation = () => {
    const text = `# SQL Query Explanation (${analysis.queryType})\n\n${analysis.summary}\n\n## Logical Execution Steps:\n` +
      analysis.steps.map((s) => `${s.step}. [${s.title}]: ${s.desc}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="SQL Query Explainer & Visualizer"
      description="Deconstruct complex SQL queries into plain-English execution steps, logical clause flows, and database optimization warnings."
    >
      <div className="space-y-6">
        {/* Presets Bar */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Sample SQL Queries:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Join & Aggregates (Analytics)", sql: SAMPLE_SQL },
              {
                label: "Simple Filter & Pagination",
                sql: `SELECT id, title, price, stock\nFROM products\nWHERE category = 'electronics' AND price BETWEEN 50 AND 500\nORDER BY price ASC\nLIMIT 20 OFFSET 40;`,
              },
              {
                label: "Subquery & Grouping",
                sql: `SELECT department_id, AVG(salary) AS avg_salary\nFROM employees\nWHERE hire_date > '2025-01-01'\nGROUP BY department_id\nHAVING AVG(salary) > 80000;`,
              },
              {
                label: "Unsafe UPDATE Query",
                sql: `UPDATE users SET is_active = false;`,
              },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setSqlInput(p.sql)}
                className="rounded-lg border border-black/10 bg-black/[0.02] px-3 py-1.5 text-xs font-medium hover:border-primary-solid dark:border-white/10 dark:bg-white/[0.02]"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Workstation */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: SQL Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                SQL Query Input:
              </label>
              <button
                type="button"
                onClick={() => setSqlInput("")}
                className="text-xs text-gray-500 hover:text-rose-500"
              >
                Clear
              </button>
            </div>
            <TextArea
              value={sqlInput}
              onChange={(e) => setSqlInput(e.target.value)}
              placeholder="Paste SQL query here..."
              rows={16}
              className="font-mono text-xs"
            />
          </div>

          {/* Right Column: Execution Flow & Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Logical Execution Flow ({analysis.steps.length} Steps):
              </span>
              <Button variant="outline" size="sm" onClick={handleCopyExplanation} className="h-7 text-xs">
                {copied ? "✓ Copied" : "Copy Explanation"}
              </Button>
            </div>

            {/* High-level Summary Banner */}
            <div className="rounded-xl border border-primary-solid/20 bg-primary-solid/5 p-3.5">
              <p className="text-xs font-semibold text-primary-solid">
                {analysis.summary}
              </p>
            </div>

            {/* Warnings if any */}
            {analysis.warnings.length > 0 && (
              <div className="space-y-2">
                {analysis.warnings.map((w, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs font-medium text-amber-800 dark:text-amber-300"
                  >
                    ⚠️ {w}
                  </div>
                ))}
              </div>
            )}

            {/* Step-by-Step Flow List */}
            <div className="space-y-2.5">
              {analysis.steps.map((s) => (
                <div
                  key={s.step}
                  className="flex items-start gap-3 rounded-xl border border-black/10 bg-white p-3 shadow-xs dark:border-white/10 dark:bg-zinc-900"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-black/5 text-sm dark:bg-white/5">
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {s.step}. {s.title}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
