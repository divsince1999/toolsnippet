import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "ipv4-subnet-calculator",
  "name": "IPv4 Subnet Calculator & CIDR Analyzer",
  "category": "Number",
  "shortDescription": "Calculate network address, broadcast, netmask, wildcard mask, and usable IP host ranges from CIDR.",
  "heroTitle": "IPv4 Subnet Calculator & CIDR Range Analyzer",
  "heroDescription": "Calculate network address, broadcast, netmask, wildcard mask, and usable host count from any IPv4 CIDR.",
  "about": "IPv4 Subnet Calculator helps network engineers and cloud architects plan and partition IP networks, computing network IDs, broadcast addresses, wildcard masks, usable host ranges, and binary representations.",
  "howToUse": [
    "Enter an IPv4 address (e.g. 192.168.1.150).",
    "Select the CIDR prefix (e.g. /24, /16, /28).",
    "Review network address, broadcast, usable host range, and wildcard mask."
  ],
  "whyUse": [
    "Indispensable for AWS VPC subnetting, Kubernetes cluster network design, and local network configuration.",
    "Zero-latency calculation with complete subnet classification diagnostics."
  ],
  "faqs": [
    {
      "question": "Why is the usable host count 2 less than total addresses in a subnet?",
      "answer": "In standard IPv4 subnets, the first address is reserved as the Network Address and the last address is reserved as the Broadcast Address."
    }
  ],
  "features": [
    "Supports all CIDR prefixes from /1 to /32",
    "Calculates Network, Broadcast, First Usable, and Last Usable host IPs",
    "Displays Wildcard Mask, Netmask Hex, and Binary representations",
    "Identifies RFC 1918 Private vs Public IP addresses"
  ],
  "tips": [
    "For AWS VPC subnets, AWS reserves 5 IP addresses per subnet (/28 gives 11 usable IPs instead of 14)"
  ]
};
