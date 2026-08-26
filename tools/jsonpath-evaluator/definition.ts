import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "jsonpath-evaluator",
  name: "JSONPath Evaluator & Query Tester",
  category: "Data",
  shortDescription: "Test, evaluate, and extract data from JSON documents using JSONPath syntax expressions in real-time.",
  heroTitle: "Online JSONPath Evaluator & Query Tester",
  heroDescription: "Evaluate JSONPath expressions against complex JSON documents in real-time with instant syntax validation, match highlighting, and multi-result extraction.",
  about: "ToolSnippet's JSONPath Evaluator is a client-side testing environment for querying, filtering, and extracting elements from JSON trees. Built on RFC-compliant JSONPath query logic, it allows API engineers, QA testers, and developers to test JSONPath selectors against payloads without sending sensitive data over the network.",
  howToUse: [
    "Paste your JSON document into the left-hand input editor or load an example payload.",
    "Enter your JSONPath expression in the query bar (e.g. $.store.book[*].author or $..price).",
    "View the instant matching results in formatted JSON format on the right.",
    "Click quick JSONPath syntax presets to learn common filter operators and wildcard selectors.",
    "Copy the extracted result array or individual matched values with 1-click.",
  ],
  whyUse: [
    "100% Client-Side Privacy: Your proprietary API payloads, customer records, and JSON configs are never transmitted over the network.",
    "Instant Zero-Latency Execution: Evaluates queries locally as you type.",
    "Rich Syntax Examples: Pre-loaded presets for array slicing, recursive descent ($..), filter expressions, and wildcard queries.",
    "Syntax Error Diagnostics: Clear feedback when JSON documents are malformed or queries are invalid.",
  ],
  faqs: [
    {
      question: "What is JSONPath?",
      answer: "JSONPath is a query expression language for JSON documents, similar to XPath for XML. It allows you to select, slice, and filter nodes and values from nested JSON structures using simple dot and bracket notations.",
    },
    {
      question: "What is the difference between $.. and $. notation?",
      answer: "The single dot '$.' denotes direct child property access, whereas the double dot '$..' denotes recursive descent (searching for matching properties at any nested depth in the JSON tree).",
    },
    {
      question: "Can I filter array elements based on conditions?",
      answer: "Yes. Use filter expressions like '$[?(@.price < 10)]' or '$[?(@.status == \"active\")]' to filter objects matching specific conditions.",
    },
    {
      question: "Is my JSON payload secure?",
      answer: "Yes. All JSON parsing and JSONPath evaluations run 100% locally in your browser's V8 engine without any server roundtrips.",
    },
  ],
  features: [
    "Live real-time JSONPath query execution",
    "Support for root ($), recursive descent (..), wildcards (*), and array slices",
    "Filter expressions with comparisons (==, !=, <, >, <=, >=)",
    "Preset sample datasets (Store/Books, Users, E-commerce, Weather API)",
    "Matched items count counter and execution status badge",
    "1-click formatted JSON output copy",
    "Zero server uploads & offline ready",
  ],
  tips: [
    "Use $..name to find all 'name' fields regardless of how deeply nested they are.",
    "Use array slices like $[0:3] to pick the first three items in a collection.",
    "Click the quick preset buttons to quickly populate working expressions.",
  ],
};
