import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "bandwidth-transfer-calculator",
  name: "Bandwidth & Data Transfer Calculator",
  category: "Number",
  shortDescription: "Calculate file download/upload times, data transfer rates, and bandwidth consumption across various network speeds.",
  heroTitle: "Bandwidth & Data Transfer Calculator",
  heroDescription: "Calculate file download/upload times, data transfer rates, and bandwidth consumption across various network speeds.",
  about: "The Bandwidth & Data Transfer Calculator estimates how long it will take to download or upload files of any size over different internet connection speeds (from standard DSL and 4G to 10Gbps fiber connections). It also calculates total data transferred over specified time intervals.",
  features: [
    "Calculates exact transfer time in seconds, minutes, hours, and days",
    "Supports file sizes in KB, MB, GB, and TB",
    "Network speeds in Kbps, Mbps, Gbps, and MB/s",
    "Calculates total data transferred over custom time intervals",
    "Accounts for network overhead efficiency (optional 10% TCP/IP overhead)"
],
  howToUse: [
    "Select your calculation mode: File Transfer Time or Total Data Volume.",
    "Enter the file size or time duration.",
    "Select your connection speed or pick a common preset (e.g., 100 Mbps, 1 Gbps Fiber, 5G).",
    "Instantly view the calculated duration and detailed transfer breakdown."
],
  whyUse: [
    "Plan large file backups, cloud migrations, and server data synchronization.",
    "Accurately estimate video and game download times for users.",
    "Determine required bandwidth capacity for hosting and live streaming."
],
  tips: [
    "Remember that 1 Byte (B) equals 8 bits (b). Internet service provider speeds are typically advertised in bits (Mbps/Gbps), while file sizes are in bytes (MB/GB).",
    "Real-world transfer speeds are usually 10–15% slower due to TCP/IP packet headers and network congestion."
],
  faqs: [
  {
    "question": "How is file transfer time calculated?",
    "answer": "Transfer time is calculated by converting the file size to bits (1 Byte = 8 bits) and dividing by the network bandwidth in bits per second (bps)."
  },
  {
    "question": "Why is my real download speed slower than calculated?",
    "answer": "Real-world file downloads include network protocol overhead (TCP/IP headers, packet retransmissions) and server bandwidth limitations, typically adding 10-15% to transfer times."
  }
]
};
