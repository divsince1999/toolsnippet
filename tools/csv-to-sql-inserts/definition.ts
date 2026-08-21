import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "csv-to-sql-inserts",
  name: "CSV to SQL INSERT Statements Generator",
  category: "Data",
  shortDescription: "Convert CSV spreadsheets into batched or single SQL INSERT INTO queries.",
  heroTitle: "Convert CSV Spreadsheets to SQL INSERT Statements",
  heroDescription: "Transform tabular CSV data into batched or individual SQL INSERT INTO queries with quote escaping.",
  about: "CSV to SQL INSERT Statements Generator parses CSV records with header rows and converts them into production-ready SQL INSERT statements, escaping single quotes and formatting numbers, booleans, and NULLs accurately.",
  howToUse: [
  "Paste your CSV data (including header row) into the input box.",
  "Specify your target SQL table name.",
  "Choose between Multi-Row Batch INSERT or Individual INSERT statements.",
  "Copy the generated SQL insert statements."
],
  whyUse: [
  "Quickly seed databases, perform manual data migrations, and import CSV records without database client GUI tools.",
  "Handles single quote escaping (O'Connor -> O''Connor) to prevent SQL syntax errors."
],
  faqs: [
  {
    "question": "Why use batch INSERT over individual statements?",
    "answer": "Multi-row batch inserts execute significantly faster on database engines because they reduce network round-trips and transaction commit overhead."
  }
],
  features: [
  "Multi-row batch and individual statement formatting options",
  "Automatic numeric, boolean, and NULL type detection",
  "SQL string escaping for quotes and special characters"
],
  tips: [
  "For massive datasets (>10,000 rows), split your CSV into smaller batches of 1,000 rows each for optimal database performance"
],
};
