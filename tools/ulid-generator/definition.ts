import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "ulid-generator",
  "name": "ULID Generator & Timestamp Decoder",
  "category": "Data",
  "shortDescription": "Generate 128-bit lexicographically sortable Crockford Base32 ULIDs and decode embedded timestamps.",
  "heroTitle": "Generate & Decode Universally Unique ULIDs",
  "heroDescription": "Create 128-bit lexicographically sortable Crockford Base32 ULIDs and decode millisecond timestamps from any ULID.",
  "about": "ULID (Universally Unique Lexicographically Sortable Identifier) is a 26-character, 128-bit identifier compatible with UUIDs. Unlike UUIDv4, ULIDs are time-ordered and sort naturally in databases, indexing significantly faster in B-trees.",
  "howToUse": [
    "Set batch quantity (1 to 50) and toggle lowercase if desired.",
    "Click 'Generate ULIDs' to create a list of sortable identifiers.",
    "Paste any existing ULID into the Inspector to decode its exact creation date and UTC timestamp."
  ],
  "whyUse": [
    "Provides millisecond timestamp precision combined with 80 bits of cryptographic randomness.",
    "Superior database indexing performance compared to random UUIDs."
  ],
  "faqs": [
    {
      "question": "Why choose ULID over UUIDv4?",
      "answer": "ULIDs are 128-bit like UUIDs, but because the first 48 bits encode the timestamp, they sort in chronological order, preventing database index fragmentation."
    }
  ],
  "features": [
    "Standard 26-character Crockford Base32 encoding",
    "Batch generation (up to 50 ULIDs)",
    "Built-in timestamp decoder and inspector",
    "Uppercase and lowercase formatting"
  ],
  "tips": [
    "ULIDs use Crockford's Base32 alphabet which eliminates ambiguous characters like I, L, O, and U"
  ]
};
