import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "whois-domain-parser",
  "name": "WHOIS Record & RDAP Parser",
  "category": "Data",
  "shortDescription": "Parse raw WHOIS query text into structured registration details, expiry dates, and nameservers.",
  "heroTitle": "Parse WHOIS Domain Records & RDAP Data",
  "heroDescription": "Convert raw WHOIS output into structured registrar details, creation dates, expiration dates, and nameservers.",
  "about": "WHOIS Domain Parser takes raw terminal WHOIS query outputs and parses key domain metadata into clean cards and structured JSON, extracting registrars, creation dates, registry expiry dates, and nameservers.",
  "howToUse": [
    "Paste raw WHOIS terminal output into the input box.",
    "Click 'Parse WHOIS Record'.",
    "Inspect organized cards displaying Registrar, Expiration Date, Name Servers, and DNSSEC status."
  ],
  "whyUse": [
    "Quickly extract critical domain expiration and nameserver details without searching through hundreds of lines of WHOIS text.",
    "100% client-side text parsing."
  ],
  "faqs": [
    {
      "question": "What is clientTransferProhibited status on a domain?",
      "answer": "clientTransferProhibited is an EPP status code indicating the domain registrar has locked the domain, preventing unauthorized domain transfers."
    }
  ],
  "features": [
    "Extracts Registrar name, IANA ID, and WHOIS servers",
    "Identifies Creation, Updated, and Registry Expiry dates",
    "Lists all active Name Servers",
    "Parses Domain Status and DNSSEC configuration"
  ],
  "tips": [
    "Check the Registry Expiry Date when conducting domain audits or monitoring renewal deadlines"
  ]
};
