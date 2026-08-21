import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "dockerfile-generator",
  name: "Dockerfile Generator & Multi-Stage Builder",
  category: "Dev",
  shortDescription: "Generate optimized, production-ready, multi-stage Dockerfiles for Node.js, Python, Go, Rust, PHP, and static web apps.",
  heroTitle: "Dockerfile Generator & Multi-Stage Builder",
  heroDescription: "Generate optimized, production-ready, multi-stage Dockerfiles for Node.js, Python, Go, Rust, PHP, and static web apps.",
  about: "The Dockerfile Generator creates lightweight, security-hardened container configurations using official Alpine/Debian slim base images, multi-stage builds, non-root user execution, and dependency caching layers.",
  features: [
    "Multi-stage build optimization to minimize container image size",
    "Presets for Node.js (Next.js, Express), Python (FastAPI, Django), Go, Rust, PHP, and Nginx HTML",
    "Non-root security hardening user setup",
    "Production-ready caching with package.json / requirements.txt separation"
],
  howToUse: [
    "Select your runtime stack (e.g., Node.js Next.js, Python FastAPI, Go, Rust).",
    "Configure port number and package manager (npm, pnpm, yarn, pip, cargo).",
    "Toggle multi-stage optimization and non-root security mode.",
    "Copy the generated Dockerfile to your project root."
],
  whyUse: [
    "Slash Docker image sizes from 1GB+ down to <100MB with multi-stage artifacts.",
    "Prevent container privilege escalation by creating dedicated non-root users."
],
  tips: [
    "Always copy dependency manifests before source code to maximize Docker layer cache efficiency."
],
  faqs: [
    {
        "question": "Why should I use multi-stage Docker builds?",
        "answer": "Multi-stage builds allow you to compile code using heavy build tools in an intermediate stage, then copy only the finalized binary/bundle into a minimal runtime image, reducing image size by up to 90%."
    },
    {
        "question": "Why should containers run as non-root users?",
        "answer": "Running as non-root mitigates container breakout vulnerabilities, ensuring an attacker cannot gain host-level root privileges even if application code is compromised."
    }
]
};
