import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "websocket-frame-analyzer",
  "name": "WebSocket & JSON-RPC Frame Inspector",
  "category": "Validation",
  "shortDescription": "Construct, validate, and simulate JSON-RPC 2.0 WebSocket messages and client connection scripts.",
  "heroTitle": "WebSocket & JSON-RPC Frame Inspector",
  "heroDescription": "Build and inspect WebSocket JSON-RPC 2.0 frames, payloads, and client connection snippets.",
  "about": "WebSocket Frame Analyzer assists in formatting and validating WebSocket JSON-RPC 2.0 communication, providing payload builders and ready-to-run JavaScript browser client scripts.",
  "howToUse": [
    "Specify your WebSocket endpoint URL (wss:// or ws://).",
    "Enter the JSON-RPC method and params, or supply a custom JSON payload.",
    "Copy the formatted WebSocket message or browser client connection script."
  ],
  "whyUse": [
    "Streamlines real-time WebSocket debugging for Ethereum nodes, crypto feeds, and chat protocols.",
    "Includes RFC 6455 opcode reference guide."
  ],
  "faqs": [
    {
      "question": "What is JSON-RPC 2.0 over WebSocket?",
      "answer": "JSON-RPC 2.0 is a stateless, lightweight remote procedure call specification that uses WebSocket channels for bidirectional message exchange."
    }
  ],
  "features": [
    "JSON-RPC 2.0 message builder with automatic ID generation",
    "Browser WebSocket connection script generator",
    "RFC 6455 opcode reference table"
  ],
  "tips": [
    "Always use wss:// (WebSocket Secure) in production to ensure end-to-end TLS encryption"
  ]
};
