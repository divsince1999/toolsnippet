export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface SubcategoryChip {
  id: string;
  label: string;
  keywords: string[];
}

export interface CategoryConfig {
  slug: string;
  toolCategory: string; // matches tool.category in ToolDefinition (e.g., "Data", "Auth", etc.)
  name: string;
  headline: string;
  description: string;
  icon: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  targetKeywords: string[];
  editorialTitle: string;
  editorialParagraphs: string[];
  subcategories: SubcategoryChip[];
  faqs: CategoryFaq[];
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: "data-converters",
    toolCategory: "Data",
    name: "Data & Schema Converters",
    headline: "Free Online Data Format, JSON, XML & Schema Converters",
    description: "Convert, format, transform, and structure data between JSON, CSV, XML, YAML, SQL, TSV, TOML, and database schemas instantly in your browser.",
    icon: "🔄",
    color: "from-blue-500/20 to-cyan-500/20",
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
    badgeBorder: "border-blue-500/30",
    badgeText: "text-blue-600 dark:text-blue-400",
    targetKeywords: [
      "json converter",
      "csv to json",
      "sql to json",
      "xml formatter",
      "yaml converter",
      "data transformation tools",
      "schema generator"
    ],
    editorialTitle: "Why Use Client-Side Data Converters?",
    editorialParagraphs: [
      "Data transformation is a cornerstone of modern software engineering, API development, and data analysis. Whether you are parsing server logs, importing database dumps, or mocking API payloads, moving data between formats like JSON, XML, YAML, and CSV is a daily task.",
      "ToolSnippet data tools run 100% inside your browser's JavaScript V8 engine. Unlike traditional cloud converters, your proprietary business data, API tokens, and customer records never get sent across the network or logged on remote servers.",
      "With instant syntax validation, custom delimiter configuration, and lossless format transformations, our converters streamline your workflow while preserving complete data privacy."
    ],
    subcategories: [
      { id: "all", label: "All Data Tools", keywords: [] },
      { id: "json", label: "JSON", keywords: ["json"] },
      { id: "csv", label: "CSV & TSV", keywords: ["csv", "tsv"] },
      { id: "sql", label: "SQL & Databases", keywords: ["sql", "db", "database"] },
      { id: "yaml-toml", label: "YAML & TOML", keywords: ["yaml", "toml"] },
      { id: "xml", label: "XML & XSD", keywords: ["xml", "xsd"] },
      { id: "schema", label: "Types & Schemas", keywords: ["schema", "interface", "typescript", "type", "graphql"] }
    ],
    faqs: [
      {
        question: "Is my converted data kept private and secure?",
        answer: "Yes, 100%. All data conversion algorithms execute entirely on your device inside your browser using client-side JavaScript. No payloads, files, or strings are ever uploaded to an external server."
      },
      {
        question: "Can these tools handle large JSON or CSV files?",
        answer: "Yes. Our optimized parsers can handle multi-megabyte payloads in fractions of a second without lag or memory leaks."
      },
      {
        question: "Do you support nested JSON to tabular CSV conversion?",
        answer: "Yes, our JSON to CSV and table formatters automatically unnest deep object hierarchies with custom dot-notation headers."
      },
      {
        question: "Can I convert between SQL queries and mock JSON data?",
        answer: "Absolutely. We provide two-way converters that generate SQL INSERT statements from JSON arrays and parse raw SQL queries into structured JSON."
      }
    ]
  },
  {
    slug: "text-tools",
    toolCategory: "Text",
    name: "Text & String Utilities",
    headline: "Free Online Text Cleaners, Case Converters & Word Counters",
    description: "Format, count, sanitize, sort, filter, deduplicate, and analyze text strings with zero latency and complete privacy.",
    icon: "✍️",
    color: "from-emerald-500/20 to-teal-500/20",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    badgeBorder: "border-emerald-500/30",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    targetKeywords: [
      "text tools",
      "case converter",
      "word counter",
      "remove duplicate lines",
      "string manipulator",
      "text cleaner",
      "online text editor"
    ],
    editorialTitle: "Mastering Text Transformation & Content Optimization",
    editorialParagraphs: [
      "Clean, well-formatted text is essential for developers, copywriters, marketers, and SEO specialists. From adjusting casing conventions (camelCase, snake_case, Title Case) to stripping non-ASCII characters and calculating exact reading time metrics, quick text utilities save hours of repetitive manual edits.",
      "Every string tool in this collection provides real-time character, word, sentence, and paragraph counts along with instant copy buttons and memory-efficient algorithms designed for large body text.",
      "Because our string engines process text locally, you can safely sanitize confidential drafts, legal agreements, and raw logs without privacy concerns."
    ],
    subcategories: [
      { id: "all", label: "All Text Tools", keywords: [] },
      { id: "case", label: "Case Converters", keywords: ["case", "uppercase", "lowercase", "camelcase"] },
      { id: "cleaning", label: "Sanitize & Clean", keywords: ["clean", "trim", "strip", "whitespace", "remove", "deduplicate", "duplicate"] },
      { id: "count", label: "Counters & Metrics", keywords: ["count", "counter", "words", "characters", "density"] },
      { id: "format", label: "Formatting & Diff", keywords: ["format", "indent", "wrap", "diff", "compare", "reverse", "sort"] }
    ],
    faqs: [
      {
        question: "Which case styles are supported by the Case Converters?",
        answer: "We support camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, Sentence case, and dot.case."
      },
      {
        question: "How does the duplicate line remover handle case sensitivity?",
        answer: "You can toggle case-sensitive and case-insensitive matching, as well as trim leading/trailing whitespace before comparison."
      },
      {
        question: "Can I inspect real-time character limits for social platforms?",
        answer: "Yes, our social media post formatter and ad copy counters track character and byte limits for Twitter/X, LinkedIn, Google Ads, and Meta platforms."
      }
    ]
  },
  {
    slug: "number-calculators",
    toolCategory: "Number",
    name: "Calculators & Math Tools",
    headline: "Free Online Unit Converters, Financial & Scientific Calculators",
    description: "Compute percentages, conversions, bandwidth transfer times, statistical distributions, loan payments, and binary math instantly.",
    icon: "🧮",
    color: "from-amber-500/20 to-orange-500/20",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    badgeBorder: "border-amber-500/30",
    badgeText: "text-amber-600 dark:text-amber-400",
    targetKeywords: [
      "online calculator",
      "unit converter",
      "percentage calculator",
      "bandwidth calculator",
      "binary calculator",
      "statistics calculator",
      "scientific math tools"
    ],
    editorialTitle: "High-Precision Browser-Based Computation",
    editorialParagraphs: [
      "From networking engineers calculating bandwidth download times to finance professionals modeling compound interest, fast and reliable calculation utilities streamline everyday technical workflows.",
      "ToolSnippet calculators feature high-precision numerical algorithms, visual sliders, multi-unit dropdowns, and responsive step-by-step mathematical breakdowns.",
      "All math formulas run client-side with zero network delay, giving you instantaneous results as you type or adjust inputs."
    ],
    subcategories: [
      { id: "all", label: "All Math Tools", keywords: [] },
      { id: "finance", label: "Finance & Percentages", keywords: ["percentage", "loan", "interest", "finance", "mortgage", "discount", "margin"] },
      { id: "units", label: "Unit Conversion", keywords: ["unit", "temperature", "length", "weight", "storage", "speed", "distance", "converter"] },
      { id: "tech-math", label: "Networking & Tech", keywords: ["bandwidth", "binary", "hex", "cidr", "aspect", "time"] },
      { id: "science", label: "Statistics & Science", keywords: ["statistics", "matrix", "gcd", "lcm", "prime", "fraction"] }
    ],
    faqs: [
      {
        question: "Are numerical calculations accurate?",
        answer: "Yes, our calculators implement high-precision arithmetic algorithms to prevent floating-point rounding errors across large numbers and fractional values."
      },
      {
        question: "How does the bandwidth calculator calculate download duration?",
        answer: "It computes theoretical and realistic download times across network connection speeds (Mbps, Gbps) accounting for standard protocol overhead."
      },
      {
        question: "Can I convert between multiple measurement systems simultaneously?",
        answer: "Yes, our unit converters display metric, imperial, and astronomical units concurrently in one synchronized view."
      }
    ]
  },
  {
    slug: "design-generators",
    toolCategory: "Design",
    name: "Design & CSS Generators",
    headline: "Free Online CSS UI, Gradient, Shadow & SVG Generators",
    description: "Create modern CSS animations, glassmorphism effects, box shadows, gradients, color palettes, and SVG code with instant visual previews.",
    icon: "🎨",
    color: "from-purple-500/20 to-pink-500/20",
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/20",
    badgeBorder: "border-purple-500/30",
    badgeText: "text-purple-600 dark:text-purple-400",
    targetKeywords: [
      "css generator",
      "box shadow generator",
      "glassmorphism generator",
      "css gradient generator",
      "svg to jsx",
      "color palette generator",
      "ui styling tools"
    ],
    editorialTitle: "Modern UI Styling & Visual CSS Prototyping",
    editorialParagraphs: [
      "Crafting state-of-the-art web interfaces requires fine-tuning visual styles like soft multi-layered box shadows, translucent glassmorphism blurs, smooth multi-stop gradients, and crisp SVG assets.",
      "Our interactive design tools feature live interactive canvases where you can tweak sliders, test light and dark backdrops, and immediately copy production-ready CSS3 and Tailwind code.",
      "Save hours of CSS trial-and-error by generating pixel-perfect styles with full cross-browser vendor prefixing."
    ],
    subcategories: [
      { id: "all", label: "All Design Tools", keywords: [] },
      { id: "css-effects", label: "CSS Effects & Glass", keywords: ["shadow", "glass", "glassmorphism", "blur", "border", "neumorphism"] },
      { id: "colors", label: "Colors & Gradients", keywords: ["color", "gradient", "palette", "contrast", "hex", "hsl"] },
      { id: "svg-icons", label: "SVG & Visuals", keywords: ["svg", "jsx", "icon", "data-uri", "path", "optimizer", "image", "compress"] },
      { id: "layout", label: "Grid & Typography", keywords: ["grid", "flexbox", "typography", "clamp", "aspect-ratio"] }
    ],
    faqs: [
      {
        question: "Is the generated CSS code compatible with Tailwind CSS and modern browsers?",
        answer: "Yes, our generators output clean vanilla CSS3 properties with optional Tailwind CSS utility classes and full vendor prefix compatibility."
      },
      {
        question: "How does the SVG to JSX converter work?",
        answer: "It parses raw SVG XML, converts HTML attributes (e.g. `stroke-width`, `class`) to React JSX camelCase equivalents (`strokeWidth`, `className`), and wraps them in reusable React functional components."
      },
      {
        question: "Can I preview glassmorphism and box shadows in both light and dark mode?",
        answer: "Yes, every design tool includes live background toggles so you can verify contrast and visual depth across dark and light surfaces."
      }
    ]
  },
  {
    slug: "security-crypto",
    toolCategory: "Auth",
    name: "Security, Hashing & Crypto",
    headline: "Free Online Hash Generators, JWT Decoders & Cryptography Tools",
    description: "Generate SHA-256/512, MD5, and Bcrypt hashes, decode JWT tokens, generate HMAC signatures, test password entropy, and run AES encryption.",
    icon: "🔐",
    color: "from-rose-500/20 to-red-500/20",
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/20",
    badgeBorder: "border-rose-500/30",
    badgeText: "text-rose-600 dark:text-rose-400",
    targetKeywords: [
      "hash generator",
      "sha256 online",
      "jwt decoder",
      "bcrypt generator",
      "aes encryption online",
      "hmac generator",
      "cryptography tools"
    ],
    editorialTitle: "Zero-Knowledge Cryptography & Authentication Tools",
    editorialParagraphs: [
      "Testing authentication tokens, verifying file checksums, inspecting JSON Web Tokens, and generating cryptographic keys are critical security workflows.",
      "Most online crypto tools are unsafe because they submit your private tokens or keys to a third-party server. ToolSnippet is built on Web Crypto API standards where 100% of cryptographic operations happen directly inside your browser sandbox.",
      "No secrets, passwords, private keys, or API tokens ever leave your device."
    ],
    subcategories: [
      { id: "all", label: "All Security Tools", keywords: [] },
      { id: "hashing", label: "Cryptographic Hashes", keywords: ["sha", "md5", "bcrypt", "hash", "checksum", "crc32"] },
      { id: "auth-jwt", label: "Tokens & Auth", keywords: ["jwt", "token", "hmac", "totp", "otp", "auth"] },
      { id: "keys-crypto", label: "Encryption & Keys", keywords: ["aes", "rsa", "key", "encrypt", "decrypt", "password", "entropy"] }
    ],
    faqs: [
      {
        question: "Is it safe to decode production JWTs or test passwords here?",
        answer: "Yes, absolutely. All decoding, hashing, and encryption algorithms use native browser Web Crypto and local JavaScript without sending any network requests."
      },
      {
        question: "Does the JWT decoder verify cryptographic signatures?",
        answer: "Yes, our JWT tools allow you to paste secret keys or public RSA certificates to verify signature integrity locally."
      },
      {
        question: "Which hashing algorithms are available?",
        answer: "We support SHA-1, SHA-224, SHA-256, SHA-384, SHA-512, SHA-3, MD5, Bcrypt, CRC-32, and HMAC."
      }
    ]
  },
  {
    slug: "encoding-decoding",
    toolCategory: "Encoding",
    name: "Encoding & Decoding Utilities",
    headline: "Free Online Base64, URL, Hex, Unicode & Morse Encoders",
    description: "Encode and decode Base64, URL components, Hexadecimal strings, HTML entities, Unicode escape sequences, and Morse code in seconds.",
    icon: "📦",
    color: "from-indigo-500/20 to-blue-500/20",
    badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    badgeBorder: "border-indigo-500/30",
    badgeText: "text-indigo-600 dark:text-indigo-400",
    targetKeywords: [
      "base64 encoder decoder",
      "url encode online",
      "hex to ascii",
      "html entity encoder",
      "unicode escape converter",
      "morse code translator",
      "binary string converter"
    ],
    editorialTitle: "Lossless Character & Binary Encoding Standards",
    editorialParagraphs: [
      "Data serialization across web protocols requires accurate encoding standards. From escaping query parameters for URL safety (`encodeURIComponent`) to converting binary images into Base64 data URIs and mapping Unicode escape points (`\\uXXXX`), encoding utilities keep data intact.",
      "ToolSnippet encoding utilities support bi-directional translation with real-time payload size calculations, surrogate pair handling, and multi-encoding formats.",
      "All encoding processes occur instantaneously on your local machine with full UTF-8 character support."
    ],
    subcategories: [
      { id: "all", label: "All Encoding Tools", keywords: [] },
      { id: "base64", label: "Base64 & Data URI", keywords: ["base64", "data-uri", "image"] },
      { id: "url-web", label: "URL & HTML", keywords: ["url", "html", "entity", "escape", "unescape"] },
      { id: "hex-binary", label: "Hex, Binary & Ascii", keywords: ["hex", "binary", "ascii", "morse"] },
      { id: "unicode", label: "Unicode & UTF", keywords: ["unicode", "utf", "escape"] }
    ],
    faqs: [
      {
        question: "Can I convert images to Base64 data URIs directly in the browser?",
        answer: "Yes, our Base64 Image Converter lets you drag-and-drop PNG, JPEG, SVG, and WebP files to instantly copy CSS/HTML data URIs."
      },
      {
        question: "How does the Unicode converter handle emojis and surrogate pairs?",
        answer: "Our Unicode escape converter accurately handles 4-digit \\uXXXX sequences as well as ES6 \\u{1F600} 5-digit code points and UTF-16 surrogate pairs."
      },
      {
        question: "What is the difference between URL Encode and Component Encode?",
        answer: "URL Component Encode encodes all reserved characters including `/`, `?`, and `&` for query parameters, while standard URL Encode preserves protocol and domain slashes."
      }
    ]
  },
  {
    slug: "validation-checkers",
    toolCategory: "Validation",
    name: "Validation & Syntax Checkers",
    headline: "Free Online JSON Validators, RegEx Testers & Code Linters",
    description: "Validate JSON syntax, test regular expressions with live match groups, lint package.json dependencies, and detect code obfuscation.",
    icon: "✅",
    color: "from-green-500/20 to-emerald-500/20",
    badgeBg: "bg-green-500/10 dark:bg-green-500/20",
    badgeBorder: "border-green-500/30",
    badgeText: "text-green-600 dark:text-green-400",
    targetKeywords: [
      "json validator",
      "regex tester online",
      "package json validator",
      "cron expression validator",
      "obfuscation detector",
      "syntax checker",
      "code validation tools"
    ],
    editorialTitle: "Deep Syntax Validation & Structural Code Integrity",
    editorialParagraphs: [
      "Catching syntax errors, unbalanced brackets, invalid schema structures, and dangerous wildcard dependencies before deploying code prevents costly downtime.",
      "Our validation suite provides granular line-by-line error pointers, human-readable explanations, and one-click automated syntax fixes.",
      "Interactive RegEx token builders and cheatsheets help developers construct, test, and debug complex regular expressions with live visual capture groups."
    ],
    subcategories: [
      { id: "all", label: "All Validation Tools", keywords: [] },
      { id: "json-data", label: "JSON & Schemas", keywords: ["json", "schema", "package"] },
      { id: "regex", label: "RegEx & Tokens", keywords: ["regex", "regexp", "pattern", "token"] },
      { id: "code-analysis", label: "Code & Security", keywords: ["obfuscation", "entropy", "semver", "validator", "cron"] }
    ],
    faqs: [
      {
        question: "Does the JSON validator pinpoint exact line and column errors?",
        answer: "Yes, our validator identifies the exact line number, column offset, and token where syntax errors or trailing commas occur."
      },
      {
        question: "Which regular expression flags are supported in the RegEx tester?",
        answer: "The RegEx tester supports global (`g`), case-insensitive (`i`), multiline (`m`), dotAll (`s`), and unicode (`u`) flags with instant capture group inspection."
      },
      {
        question: "How does the JS Obfuscation Detector calculate code risk?",
        answer: "It analyzes Shannon information entropy, excessive hex-encoded strings, eval/Function constructors, and identifier compression ratios to estimate obfuscation likelihood."
      }
    ]
  },
  {
    slug: "dev-utilities",
    toolCategory: "Dev",
    name: "Developer & DevOps Utilities",
    headline: "Free Online Dockerfile, Nginx, Git & Shell Config Generators",
    description: "Generate multi-stage Dockerfiles, Nginx server blocks, .gitignore files, crontab schedules, and convert cURL commands to Go and PHP.",
    icon: "⚡",
    color: "from-teal-500/20 to-cyan-500/20",
    badgeBg: "bg-teal-500/10 dark:bg-teal-500/20",
    badgeBorder: "border-teal-500/30",
    badgeText: "text-teal-600 dark:text-teal-400",
    targetKeywords: [
      "dockerfile generator",
      "nginx config generator",
      "gitignore generator",
      "crontab generator",
      "curl to go",
      "curl to php",
      "devops tools online"
    ],
    editorialTitle: "Accelerating DevOps, Infrastructure & Developer Workflows",
    editorialParagraphs: [
      "Configuring server virtual hosts, multi-stage Docker builds, `.gitignore` rules, and converting terminal cURL requests into backend code can be repetitive and error-prone.",
      "ToolSnippet developer tools provide visual configurators with hardened security best practices (such as non-root Docker users, SSL reverse proxy headers, and rate-limiting blocks) pre-built.",
      "Generate clean, production-ready configuration snippets in seconds without reading through hundreds of documentation pages."
    ],
    subcategories: [
      { id: "all", label: "All Dev Tools", keywords: [] },
      { id: "containers-server", label: "Docker & Server", keywords: ["docker", "nginx", "server"] },
      { id: "git-ci", label: "Git & Configs", keywords: ["gitignore", "cron", "env", "snippet", "license", "badge"] },
      { id: "curl-code", label: "cURL & Code", keywords: ["curl", "sql", "markdown", "schema"] }
    ],
    faqs: [
      {
        question: "Do generated Dockerfiles follow multi-stage build best practices?",
        answer: "Yes, all Dockerfile templates for Node.js, Python, Go, and Rust include lightweight Alpine/distroless runner stages and non-root execution."
      },
      {
        question: "Can I generate Nginx configurations with SSL and WebSocket proxying?",
        answer: "Yes, our Nginx builder supports Let's Encrypt SSL blocks, gzip compression, HTTP/2, WebSocket upgrade headers, and SPA HTML5 history fallbacks."
      },
      {
        question: "How does the Cron Job generator translate schedules?",
        answer: "It breaks down standard 5-field crontabs into plain-English sentences (e.g., 'At minute 15 past every 2nd hour') with instant next execution times."
      }
    ]
  },
  {
    slug: "web-tools",
    toolCategory: "Web",
    name: "Web & URL Utilities",
    headline: "Free Online Base HREF URL Resolvers & Web Resource Tools",
    description: "Resolve relative HTML paths against base URLs, inspect URL structures according to RFC 3986, and manage web assets seamlessly.",
    icon: "🌐",
    color: "from-sky-500/20 to-blue-500/20",
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/20",
    badgeBorder: "border-sky-500/30",
    badgeText: "text-sky-600 dark:text-sky-400",
    targetKeywords: [
      "base href resolver",
      "url resolver online",
      "relative url parser",
      "rfc 3986 url tools",
      "web asset resolver"
    ],
    editorialTitle: "RFC-Compliant URL Resolution & Web Asset Management",
    editorialParagraphs: [
      "Modern web crawlers, static site generators, and frontend bundlers frequently need to resolve relative paths (e.g. `../../assets/img.png`) against root or nested base URLs.",
      "Our web resolution tools adhere strictly to RFC 3986 URI standard specifications, resolving path traversals, query strings, and fragments with 100% deterministic accuracy.",
      "Inspect protocol breakdowns, origin components, and normalized target endpoints instantly in your browser."
    ],
    subcategories: [
      { id: "all", label: "All Web Tools", keywords: [] },
      { id: "url-resolution", label: "URL & Paths", keywords: ["url", "href", "path", "resolver"] }
    ],
    faqs: [
      {
        question: "What standards does the Base HREF URL Resolver follow?",
        answer: "It follows the official IETF RFC 3986 URI specification for reference resolution, path normalization, and relative segment traversal."
      },
      {
        question: "Can it handle protocol-relative and hash fragment URLs?",
        answer: "Yes, protocol-relative URLs (`//cdn.example.com`), root-relative (`/app`), and dot-relative (`../`) links are all supported."
      }
    ]
  }
];

export function getAllCategories(): CategoryConfig[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryByToolCategory(toolCat: string): CategoryConfig | undefined {
  return CATEGORIES.find(
    (c) => c.toolCategory.toLowerCase() === toolCat.toLowerCase()
  );
}
