import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "typescript-playground",
  name: "TypeScript Playground & Transpiler",
  category: "Dev",
  shortDescription: "Live in-browser TypeScript editor, type checker, and JavaScript compiler with instant execution.",
  heroTitle: "Online TypeScript Playground & Transpiler",
  heroDescription: "Write, transpile, and execute TypeScript code directly in your browser with real-time JavaScript compilation, console output capture, and zero server roundtrips.",
  about: "ToolSnippet's TypeScript Playground is a client-side execution sandbox for prototyping TypeScript code, testing generic types, experimenting with interfaces and enums, and transpiling TypeScript to clean JavaScript.",
  howToUse: [
    "Type or paste your TypeScript code into the editor or pick a sample preset.",
    "View the real-time compiled JavaScript output in the center panel.",
    "Click 'Run Code' to execute the JavaScript safely in a sandboxed environment.",
    "Inspect console outputs (log, warn, error) in the built-in interactive console.",
    "Copy the compiled JavaScript or share your snippet with 1-click.",
  ],
  whyUse: [
    "Zero Server Overhead: Compiles and runs 100% client-side inside your browser engine.",
    "Interactive Console: Captures return values, objects, and console.log outputs directly.",
    "TypeScript Learning Sandbox: Perfect for testing utility types (Partial, Pick, Omit, Record) and generics.",
  ],
  faqs: [
    {
      question: "How does TypeScript transpilation work in this tool?",
      answer: "The tool strips TypeScript type annotations, interfaces, enums, and type assertions using a client-side transpiler, producing pure executable ECMAScript / JavaScript.",
    },
    {
      question: "Is it safe to run code in the playground?",
      answer: "Yes. Code is executed inside an isolated browser function execution context with intercepted console logging, ensuring your local environment remains secure.",
    },
  ],
  features: [
    "Real-time TypeScript to JavaScript transpilation",
    "Interactive console output viewer (logs, warnings, errors)",
    "Sample presets (Generics, Interfaces, Async/Await, Enums)",
    "1-click copy for compiled JavaScript",
    "100% offline & client-side",
  ],
  tips: [
    "Use console.log() to print objects and variables directly to the interactive output panel.",
    "Test how TypeScript type erasures translate into vanilla JavaScript runtime code.",
  ],
};
