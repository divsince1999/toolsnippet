import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "ipv4-to-ipv6-converter",
  "name": "IPv4 to IPv6 & IPv6 Expander/Compressor",
  "category": "Encoding",
  "shortDescription": "Convert IPv4 addresses to IPv4-mapped IPv6, 6to4 prefix, and expand/compress 128-bit IPv6 hextets.",
  "heroTitle": "IPv4 to IPv6 Converter & IPv6 Formatter",
  "heroDescription": "Translate IPv4 addresses to IPv4-mapped IPv6 and 6to4 tunnels, and expand or compress IPv6 addresses.",
  "about": "IPv4 to IPv6 Converter bridges legacy IPv4 addresses with modern IPv6 infrastructure, generating IPv4-mapped notation, 6to4 tunnel prefixes, and providing RFC 5952 zero-compression and full 8-hextet expansion.",
  "howToUse": [
    "Enter an IPv4 address to view IPv4-mapped IPv6 and 6to4 prefix formats.",
    "Enter an IPv6 address to expand full 8 hextets or compress consecutive zeros using RFC 5952 notation."
  ],
  "whyUse": [
    "Crucial for dual-stack server configuration, IPv6 migration, and log normalization.",
    "Handles both dotted-decimal and hexadecimal representations."
  ],
  "faqs": [
    {
      "question": "What is an IPv4-mapped IPv6 address?",
      "answer": "An IPv4-mapped IPv6 address (e.g. ::ffff:192.168.1.1) allows IPv6 applications to communicate directly with IPv4 endpoints over dual-stack network sockets."
    }
  ],
  "features": [
    "IPv4-mapped IPv6 generation (dotted and hex)",
    "6to4 tunnel address prefix calculation",
    "Full 8-hextet IPv6 expansion with leading zero padding",
    "RFC 5952 IPv6 zero-compression (:: notation)"
  ],
  "tips": [
    "Use RFC 5952 compressed format for consistent storage and display in databases and configuration files"
  ]
};
