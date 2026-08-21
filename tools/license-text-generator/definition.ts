import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "license-text-generator",
  name: "Open Source License Text Generator",
  category: "Dev",
  shortDescription: "Generate standard Open Source licenses (MIT, Apache 2.0, GPL-3.0, BSD-3-Clause, ISC) with custom author and year.",
  heroTitle: "Open Source License Text Generator",
  heroDescription: "Generate standard Open Source licenses (MIT, Apache 2.0, GPL-3.0, BSD-3-Clause, ISC) with custom author and year.",
  about: "The Open Source License Text Generator produces legally compliant, formatted license text files (LICENSE / LICENSE.md) for GitHub repositories, npm packages, and open source projects.",
  features: [
    "Presets for MIT, Apache 2.0, GNU General Public License (GPL-3.0), BSD-3-Clause, ISC, and The Unlicense",
    "Dynamic Year and Copyright Holder replacement",
    "Displays permission permissions, conditions, and limitations summary",
    "Instant copy for `LICENSE` files"
],
  howToUse: [
    "Select your desired Open Source license type.",
    "Enter the copyright year and author / organization name.",
    "Copy the formatted LICENSE text into your project repository."
],
  whyUse: [
    "Clearly protect your intellectual property while granting unambiguous usage rights.",
    "Ensure package registries (npm, PyPI, crates.io) recognize your repository's SPDX identifier."
],
  tips: [
    "The MIT License is the most popular permissive license, allowing commercial use, distribution, and modification without forcing open-sourcing."
],
  faqs: [
    {
        "question": "What is the difference between MIT and GPL-3.0?",
        "answer": "MIT is a permissive license allowing proprietary closed-source reuse. GPL-3.0 is a copyleft license requiring derivative works to also remain open source under GPL-3.0."
    },
    {
        "question": "Where should I place the generated license in my repository?",
        "answer": "Save the text as a file named `LICENSE` or `LICENSE.md` in the root directory of your project."
    }
]
};
