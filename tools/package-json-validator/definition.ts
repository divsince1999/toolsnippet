import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "package-json-validator",
  name: "package.json Validator & Dependency Analyzer",
  category: "Validation",
  shortDescription: "Validate package.json syntax, check npm semver version ranges, and detect missing required fields.",
  heroTitle: "package.json Validator & Dependency Analyzer",
  heroDescription: "Validate package.json syntax, check npm semver version ranges, and detect missing required fields.",
  about: "The package.json Validator inspects npm package manifests for JSON formatting errors, wildcards (`*`) or loose semver ranges in dependencies, missing repository/license fields, and duplicate script names.",
  features: [
    "Validates npm `package.json` schema and JSON syntax",
    "Flags risky wildcard (`*`) and unpinned dependency version ranges",
    "Counts total `dependencies`, `devDependencies`, and `peerDependencies`",
    "Checks required npm fields (name, version, license, description)"
],
  howToUse: [
    "Paste your `package.json` content into the editor.",
    "Instantly view validation diagnostics, dependency metrics, and health warnings.",
    "Fix identified issues before publishing or pushing to git."
],
  whyUse: [
    "Prevent npm publish errors caused by malformed manifest fields.",
    "Audit loose semver ranges that could introduce breaking upstream dependency bugs."
],
  tips: [
    "Pinning dependencies with exact versions (`1.2.3`) or strict carets (`^1.2.3`) protects against supply-chain breakage."
],
  faqs: [
    {
        "question": "What are the essential required fields for an npm package?",
        "answer": "An npm package requires at minimum `name` (lowercase, URL-safe) and `version` (strict SemVer, e.g. `1.0.0`). For public packages, `license` is also strongly recommended."
    },
    {
        "question": "Why should I avoid using '*' as a dependency version?",
        "answer": "Using `*` causes npm to install the newest available release regardless of breaking major updates, easily breaking your application build."
    }
]
};
