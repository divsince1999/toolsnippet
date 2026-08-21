import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "semver-comparator",
  name: "SemVer Semantic Versioning Comparator",
  category: "Dev",
  shortDescription: "Compare semantic versions, validate npm range operators (^, ~, >=, x), and detect breaking major releases.",
  heroTitle: "SemVer Semantic Versioning Comparator",
  heroDescription: "Compare semantic versions, validate npm range operators (^, ~, >=, x), and detect breaking major releases.",
  about: "The SemVer Semantic Versioning Comparator evaluates versions according to the SemVer 2.0.0 specification (Major.Minor.Patch-PreRelease), testing version order, breaking changes, and npm range rules.",
  features: [
    "Compares Version A vs Version B (Greater, Less, Equal)",
    "Tests range operators: Caret (`^1.2.3`), Tilde (`~1.2.3`), Wildcard (`1.x`), and GTE (`>=2.0.0`)",
    "Identifies release change classification: Major (Breaking), Minor (Feature), or Patch (Fix)",
    "Supports pre-release tags (`-alpha.1`, `-beta.2`, `-rc.3`)"
],
  howToUse: [
    "Enter Version A and Version B (e.g. `2.4.1` and `2.5.0`).",
    "Enter an optional npm range pattern (e.g. `^2.4.0`).",
    "Instantly view comparison results and range match status."
],
  whyUse: [
    "Debug npm/yarn package resolution conflicts and peer dependency mismatches.",
    "Understand whether an upcoming upgrade introduces breaking API changes."
],
  tips: [
    "Caret (`^1.2.3`) allows minor and patch updates (`< 2.0.0`), while Tilde (`~1.2.3`) only allows patch updates (`< 1.3.0`)."
],
  faqs: [
    {
        "question": "What is the difference between ^ and ~ in npm versioning?",
        "answer": "`^1.2.3` permits updates that do not modify the leftmost non-zero digit (`1.2.4`, `1.9.0`), whereas `~1.2.3` only permits patch-level updates (`1.2.4`, `1.2.9`)."
    },
    {
        "question": "How are pre-release tags ordered in SemVer?",
        "answer": "Pre-release versions have lower precedence than their normal release (e.g., `1.0.0-alpha < 1.0.0-beta < 1.0.0`)."
    }
]
};
