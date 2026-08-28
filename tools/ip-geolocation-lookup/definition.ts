import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "ip-geolocation-lookup",
  name: "IP Address & Subnet Inspector",
  category: "Web",
  shortDescription: "Inspect IPv4/IPv6 addresses, subnet masks, network CIDR ranges, and network classification locally.",
  heroTitle: "Online IP Address & Subnet Inspector",
  heroDescription: "Analyze IPv4 and IPv6 addresses, inspect network class and scope (Public, Private RFC1918, Loopback), calculate subnet CIDRs, and convert between binary, hex, and integer representations.",
  about: "ToolSnippet's IP Address & Subnet Inspector is a network diagnostic utility for network administrators, cloud engineers, and software developers. It decomposes IP addresses, determines routing scopes, calculates subnet ranges, and displays multi-base representations.",
  howToUse: [
    "Type or paste an IPv4 address (e.g. 192.168.1.1 or 8.8.8.8) or IPv6 address into the input box.",
    "Or click 'Detect My Public IP' to inspect your active connection.",
    "Adjust the CIDR prefix slider (/1 to /32) to calculate subnet boundaries.",
    "Inspect the network breakdown: Network Address, Broadcast Address, Usable Host Range, and Total Hosts.",
    "View the binary, hexadecimal, and 32-bit integer representations of the IP.",
  ],
  whyUse: [
    "Network CIDR Planning: Calculate precise IP host counts and broadcast boundaries for AWS VPCs and Kubernetes clusters.",
    "Private vs Public Scope Detection: Instantly flags RFC 1918 private subnets, loopback addresses, and CGNAT ranges.",
    "100% Privacy & Zero Logging: All IP math and conversions execute locally on your machine.",
  ],
  faqs: [
    {
      question: "What are RFC 1918 private IP address ranges?",
      answer: "RFC 1918 designates three non-routable private IP blocks for local networks: 10.0.0.0/8 (10.0.0.0 – 10.255.255.255), 172.16.0.0/12 (172.16.0.0 – 172.31.255.255), and 192.168.0.0/16 (192.168.0.0 – 192.168.255.255).",
    },
    {
      question: "How do I calculate usable hosts in a /24 subnet?",
      answer: "A /24 subnet has 8 host bits (2^8 = 256 total IP addresses). Subtracting 2 for the Network Address and Broadcast Address leaves 254 usable host addresses.",
    },
  ],
  features: [
    "IPv4 and IPv6 address inspection",
    "Network scope identification (Public, Private RFC1918, Loopback, Link-Local)",
    "Subnet calculator (Network, Broadcast, Usable Range, Total Hosts)",
    "Multi-base conversions (Binary, Hexadecimal, 32-bit Integer)",
    "1-click 'Detect My IP' integration",
    "Sample IP presets (Google DNS, Cloudflare, Private VPC, Localhost)",
  ],
  tips: [
    "Use /28 subnets for small database subnets (14 usable hosts) and /24 for standard application tiers (254 usable hosts).",
    "Remember that in AWS VPCs, 5 IP addresses per subnet are reserved by AWS.",
  ],
};
