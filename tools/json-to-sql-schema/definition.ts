import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-sql-schema",
  name: "JSON to SQL DDL Table Creator",
  category: "Data",
  shortDescription: "Infer SQL column types from JSON objects to generate CREATE TABLE statements for PostgreSQL, MySQL, and SQLite.",
  heroTitle: "Generate SQL CREATE TABLE Statements from JSON",
  heroDescription: "Infer database column types from JSON to create DDL statements for PostgreSQL, MySQL, and SQLite.",
  about: "JSON to SQL DDL Table Creator inspects JSON objects and infers suitable database column types (BIGINT, VARCHAR, TIMESTAMPTZ, JSONB, BOOLEAN) to produce CREATE TABLE statements across popular SQL dialects.",
  howToUse: [
  "Paste a JSON object or array of sample records.",
  "Enter your desired table name and select SQL dialect (PostgreSQL, MySQL, SQLite).",
  "Copy the generated SQL CREATE TABLE DDL query."
],
  whyUse: [
  "Quickly scaffold relational database schemas when migrating from NoSQL or prototyping APIs.",
  "Automatically recognizes primary keys (id) and timestamp strings."
],
  faqs: [
  {
    "question": "How does the tool handle nested JSON objects in SQL?",
    "answer": "For PostgreSQL it generates JSONB columns, for MySQL JSON columns, and for SQLite TEXT columns."
  }
],
  features: [
  "Supports PostgreSQL, MySQL/MariaDB, and SQLite dialects",
  "Automatic primary key and datetime inference",
  "Handles nested objects and JSON data types"
],
  tips: [
  "Review inferred VARCHAR lengths and add custom indexes as needed for high-scale production tables"
],
};
