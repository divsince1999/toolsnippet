import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "sql-query-explainer",
  name: "SQL Query Explainer & Visualizer",
  category: "Data",
  shortDescription: "Break down complex SQL queries into readable plain-English step-by-step logic, clause trees, and table operations.",
  heroTitle: "Online SQL Query Explainer & Visualizer",
  heroDescription: "Explain complex SQL queries in plain English, visualize logical execution order (FROM, WHERE, GROUP BY, SELECT), and get database optimization recommendations.",
  about: "ToolSnippet's SQL Query Explainer analyzes SQL statements (PostgreSQL, MySQL, SQLite, Oracle, SQL Server) and deconstructs them into clear, human-readable explanations. It visualizes the logical execution flow, breaks down joins and aggregations, and provides instant query performance suggestions.",
  howToUse: [
    "Paste your SQL query into the input editor or click a sample preset (Multi-Join, Aggregation, Subquery).",
    "View the plain-English explanation of what the query achieves.",
    "Inspect the step-by-step logical execution flow (FROM -> WHERE -> GROUP BY -> SELECT -> ORDER BY).",
    "Check the Performance & Optimization Insights for potential indexing improvements.",
    "Copy the step-by-step breakdown or formatted SQL with 1-click.",
  ],
  whyUse: [
    "Demystify Complex SQL: Understand intricate nested queries, CTEs, window functions, and multi-table joins.",
    "100% Client-Side Privacy: No confidential database schemas or sensitive table names ever leave your machine.",
    "Built-in Query Best Practices: Detects unindexed pattern matches, cartesian products, and missing WHERE safety checks.",
  ],
  faqs: [
    {
      question: "What is the logical execution order of a SQL query?",
      answer: "While queries are written starting with SELECT, databases logically process them in this order: 1. FROM & JOINs, 2. WHERE filters, 3. GROUP BY, 4. HAVING filters, 5. SELECT expressions, 6. ORDER BY sorting, 7. LIMIT/OFFSET pagination.",
    },
    {
      question: "Does this tool execute queries against a live database?",
      answer: "No. This tool performs static syntax analysis and AST decomposition locally in your browser. It does not require a database connection, ensuring 100% security for your schemas.",
    },
  ],
  features: [
    "Plain English query translation and summary",
    "Logical execution order step-by-step breakdown",
    "Extracted tables, columns, joins, and filter criteria tables",
    "Query optimization and indexing recommendations",
    "Sample SQL presets (Complex Joins, Group By Aggregates, Pagination)",
    "1-click copy for explanations",
  ],
  tips: [
    "Check the Logical Flow tab to understand why aliases created in SELECT cannot be used in WHERE clauses.",
    "Review the Optimization Warnings to spot potential table scans early.",
  ],
};
