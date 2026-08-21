import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "mac-address-formatter",
  "name": "MAC Address Formatter & Generator",
  "category": "Data",
  "shortDescription": "Format MAC addresses into Colon, Dash, Cisco dot, and space notations, or generate random valid MACs.",
  "heroTitle": "Format & Normalize Hardware MAC Addresses",
  "heroDescription": "Clean and format MAC addresses into standard IEEE, Windows, Cisco, and hexadecimal notations.",
  "about": "MAC Address Formatter strips delimiters and normalizes MAC hardware addresses into IEEE colon, Windows hyphen, Cisco tri-dot, space, or raw hex representations with random MAC generation.",
  "howToUse": [
    "Paste or type a 12-digit MAC address (with or without colons/dashes).",
    "Toggle Uppercase HEX if desired.",
    "Copy your preferred notation or click 'Generate Random MAC' for testing."
  ],
  "whyUse": [
    "Standardizes disparate MAC address formats across network switches, DHCP servers, and documentation.",
    "Generates valid locally administered unicast MAC addresses."
  ],
  "faqs": [
    {
      "question": "What is Cisco tri-dot MAC notation?",
      "answer": "Cisco switches and routers format 48-bit MAC addresses as three groups of four hexadecimal digits separated by dots (e.g. 001a.2b3c.4d5e)."
    }
  ],
  "features": [
    "Standard Colon format (00:1A:2B:3C:4D:5E)",
    "Hyphen format (00-1A-2B-3C-4D-5E)",
    "Cisco tri-dot format (001a.2b3c.4d5e)",
    "Random locally administered MAC generator"
  ],
  "tips": [
    "Locally administered MAC addresses always have the second least-significant bit of the first byte set to 1"
  ]
};
