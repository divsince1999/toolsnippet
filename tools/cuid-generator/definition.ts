import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "cuid-generator",
  "name": "CUID2 & KSUID Generator",
  "category": "Data",
  "shortDescription": "Generate collision-resistant, horizontal-scaling database primary key identifiers (CUID2 & KSUID).",
  "heroTitle": "Generate CUID2 & KSUID Database Identifiers",
  "heroDescription": "Create collision-resistant horizontal database keys using CUID2 and Segment K-Sortable KSUIDs.",
  "about": "CUID2 and KSUID are modern identification standards designed for distributed databases, horizontal scalability, and high-concurrency systems where sequential auto-increment IDs cause security leaks or bottlenecks.",
  "howToUse": [
    "Choose your identifier type: CUID2 (24-char) or KSUID (27-char).",
    "Select batch quantity and length controls.",
    "Click 'Generate' to export clean primary keys for your database models."
  ],
  "whyUse": [
    "Designed specifically for modern ORMs like Prisma, Drizzle, and TypeORM.",
    "Prevents enumeration attacks while maintaining high insertion performance."
  ],
  "faqs": [
    {
      "question": "What is KSUID?",
      "answer": "KSUID (K-Sortable Unique Identifier) is a 27-character identifier developed by Segment that combines a 32-bit timestamp with 128 bits of randomness."
    }
  ],
  "features": [
    "CUID2 and KSUID generation",
    "Collision-resistant horizontal design",
    "Batch generation support",
    "Ideal for Prisma and PostgreSQL"
  ],
  "tips": [
    "CUID2 is the recommended default ID format for Prisma ORM"
  ]
};
