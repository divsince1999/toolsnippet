import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "ip-range-to-cidr",
  "name": "IP Range to CIDR Converter",
  "category": "Data",
  "shortDescription": "Convert starting and ending IPv4 address ranges into the minimal set of CIDR subnet blocks.",
  "heroTitle": "Convert IP Address Ranges to Minimal CIDR Subnets",
  "heroDescription": "Transform start and end IPv4 ranges into optimal, minimal CIDR notation blocks for firewalls and routing.",
  "about": "IP Range to CIDR Converter calculates the minimal set of CIDR subnets required to cover an arbitrary IP range, essential for configuring cloud firewalls, AWS Security Groups, and Nginx access lists.",
  "howToUse": [
    "Enter the Start IP Address (e.g. 192.168.1.1).",
    "Enter the End IP Address (e.g. 192.168.1.50).",
    "Click 'Calculate CIDR Blocks' to view the minimal CIDR subnets list."
  ],
  "whyUse": [
    "Cloud security groups and firewalls require CIDR notation rather than raw start-end ranges.",
    "Calculates the exact minimal number of prefixes without overlapping."
  ],
  "faqs": [
    {
      "question": "Why does an IP range convert into multiple CIDR blocks?",
      "answer": "Because CIDR blocks must align with powers of 2 (e.g., /32, /31, /30). Arbitrary ranges like 1-50 cannot be represented by a single power-of-2 subnet."
    }
  ],
  "features": [
    "Optimal bitwise range-to-CIDR partition algorithm",
    "Generates copyable list of CIDR subnets",
    "Validation against invalid or reversed IP ranges"
  ],
  "tips": [
    "Paste the resulting CIDR list directly into Cloudflare WAF or AWS Security Group inbound rules"
  ]
};
