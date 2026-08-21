import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "bytes-unit-converter",
  name: "Data Storage & Byte Unit Converter",
  category: "Number",
  shortDescription: "Convert between Bytes, KiB, MiB, GiB, TiB (binary base-2) and KB, MB, GB, TB, PB (decimal base-10) with exact precision.",
  heroTitle: "Data Storage & Byte Unit Converter",
  heroDescription: "Convert between Bytes, KiB, MiB, GiB, TiB (binary base-2) and KB, MB, GB, TB, PB (decimal base-10) with exact precision.",
  about: "The Data Storage & Byte Unit Converter instantly converts digital file sizes and storage units between binary IEC standards (KiB, MiB, GiB, TiB) and decimal SI standards (KB, MB, GB, TB, PB).",
  features: [
    "Simultaneous conversion across 12 digital storage units",
    "Accurate binary (1024) and decimal (1000) prefix calculations",
    "Displays byte counts in scientific and exact integer formats",
    "Explains the difference between advertised drive size vs usable OS space"
],
  howToUse: [
    "Enter a numerical value in the input field.",
    "Select your source storage unit (e.g. Gigabytes, Mebibytes).",
    "Instantly view the converted values across all standard digital units."
],
  whyUse: [
    "Diagnose why a 1 TB hard drive only shows 931 GB in Windows Explorer (1000^4 vs 1024^4).",
    "Calculate memory allocation limits for cloud servers and Kubernetes containers.",
    "Convert database byte metrics into readable units."
],
  tips: [
    "IEC units (KiB, MiB, GiB) use powers of 1024 (2^10, 2^20, 2^30).",
    "SI units (KB, MB, GB) use powers of 1000 (10^3, 10^6, 10^9)."
],
  faqs: [
  {
    "question": "What is the difference between GB and GiB?",
    "answer": "A Gigabyte (GB) is decimal base-10 (10^9 = 1,000,000,000 bytes), whereas a Gibibyte (GiB) is binary base-2 (2^30 = 1,073,741,824 bytes)."
  },
  {
    "question": "Why does my 1 TB drive only show 931 GB in Windows?",
    "answer": "Drive manufacturers advertise capacity in decimal TB (1,000,000,000,000 bytes), but Windows measures storage in binary TiB (1024^4), resulting in ~931.3 GiB of usable capacity."
  }
]
};
