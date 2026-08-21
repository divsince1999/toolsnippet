import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "sql-query-minifier",
  name: "SQL Query Minifier & Single-Line Optimizer",
  category: "Data",
  shortDescription: "Minify SQL queries by removing comments, collapsing whitespace, and compressing queries for embedded application strings.",
  heroTitle: "SQL Query Minifier & Single-Line Optimizer",
  heroDescription: "Minify SQL queries by removing comments, collapsing whitespace, and compressing queries for embedded application strings.",
  about: "The SQL Query Minifier strips inline comments (`--`), block comments (`/* ... */`), collapses multi-line formatting into single-line queries, and optimizes database query payload size.",
  features: [
    "Strips single-line (`--`) and multi-line (`/* */`) comments",
    "Collapses whitespace and indentation into a single compact line",
    "Preserves string literals enclosed in quotes",
    "Calculates payload size compression percentage"
],
  howToUse: [
    "Paste your formatted SQL query into the input box.",
    "Instantly view the minified single-line SQL query.",
    "Copy the compressed SQL string for use in code constants."
],
  whyUse: [
    "Embed clean SQL queries into Go, Python, or JavaScript string constants without awkward linebreaks.",
    "Reduce network payload size when submitting queries over HTTP database endpoints."
],
  tips: [
    "The minifier protects strings enclosed in single and double quotes."
],
  faqs: [
    {
        "question": "Does minifying SQL change query execution speed inside the database?",
        "answer": "Query execution speed is identical because database query planners parse SQL into an abstract syntax tree. However, minification reduces file size and network transmission bandwidth."
    },
    {
        "question": "Will comments inside SQL strings be removed?",
        "answer": "No, our parser protects text inside quoted string literals (e.g. `'-- not a comment'`)."
    }
]
};
