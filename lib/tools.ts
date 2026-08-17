import type { Metadata } from "next";

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolInfo = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  heroTitle: string;
  heroDescription: string;
  about: string;
  howToUse: string[];
  whyUse: string[];
  faqs: ToolFaq[];
  features?: string[];
  tips?: string[];
};

export const tools: ToolInfo[] = [
  {
    slug: "text-case",
    name: "Text Case Converter",
    category: "Text",
    shortDescription: "Convert text to uppercase, lowercase, and title case.",
    heroTitle: "Convert text case in seconds",
    heroDescription:
      "Quickly switch between uppercase, lowercase, and title case without leaving your browser.",
    about:
      "Text Case Converter helps clean and standardize text for documentation, code comments, emails, and content drafts.",
    howToUse: [
      "Paste or type text in the input area.",
      "Click UPPERCASE, lowercase, or Title Case.",
      "Copy the transformed output for your workflow.",
    ],
    whyUse: [
      "Saves repetitive editing time.",
      "Keeps naming and writing styles consistent.",
      "Works instantly without external services.",
    ],
    faqs: [
      {
        question: "Does this tool store my text?",
        answer: "No. Processing runs in your browser session.",
      },
      {
        question: "Can I convert long paragraphs?",
        answer: "Yes, it works for both short and long text.",
      },
    ],
    features: [
      "Convert to uppercase, lowercase, and title case",
      "Instant transformation",
      "One-click copy to clipboard",
      "Works with any text length",
      "Client-side processing",
    ],
    tips: [
      "Use title case for headings and titles",
      "Use uppercase for emphasis or acronyms",
      "Use lowercase for normal body text",
      "Check special characters after conversion",
    ],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    category: "Data",
    shortDescription: "Format and validate JSON with instant error feedback.",
    heroTitle: "Format and validate JSON fast",
    heroDescription:
      "Beautify API payloads and instantly catch invalid JSON before shipping code.",
    about:
      "JSON Formatter is useful for debugging API responses, request bodies, and config files during daily development.",
    howToUse: [
      "Paste JSON in the input box.",
      "Click Format JSON to prettify and validate.",
      "If invalid, review the shown error and fix the source.",
    ],
    whyUse: [
      "Readable JSON speeds up debugging.",
      "Validation catches syntax mistakes early.",
      "No need to switch to external formatter sites.",
    ],
    faqs: [
      {
        question: "Will this fix invalid JSON automatically?",
        answer: "It shows parse errors, but you still edit the source manually.",
      },
      {
        question: "Can I minify JSON too?",
        answer: "Yes, use the Minify JSON action on this page.",
      },
    ],
    features: [
      "Beautify JSON instantly",
      "Validate JSON syntax",
      "Minify JSON",
      "Client-side processing",
      "Works on mobile",
    ],
    tips: [
      "Validate before formatting",
      "Remove trailing commas if parsing fails",
      "Large files may take slightly longer",
      "Check for escaped characters",
    ],
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder/Decoder",
    category: "Encoding",
    shortDescription: "Encode and decode Base64 text quickly.",
    heroTitle: "Encode and decode Base64 instantly",
    heroDescription:
      "Useful for auth headers, tokens, and payload experiments while testing integrations.",
    about:
      "This tool converts plain text to Base64 and back, making it practical for API testing and debugging.",
    howToUse: [
      "Enter plain text or Base64 text.",
      "Choose Encode or Decode.",
      "Copy the result into your app, request, or script.",
    ],
    whyUse: [
      "Helpful for quick auth and payload checks.",
      "Avoids writing throwaway scripts for simple conversions.",
      "Runs directly in the browser.",
    ],
    faqs: [
      {
        question: "Is Base64 encryption?",
        answer: "No. Base64 is encoding, not encryption.",
      },
      {
        question: "Why does decode fail sometimes?",
        answer: "The input must be valid Base64 text.",
      },
    ],
    features: [
      "Encode and decode instantly",
      "UTF-8 support",
      "Browser-based",
      "One-click copy",
      "No data upload",
    ],
    tips: [
      "Base64 is encoding, not encryption",
      "Double-check UTF-8 encoding for special characters",
      "Never store secrets as Base64 expecting security",
      "Use for auth headers and tokens",
    ],
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    category: "Encoding",
    shortDescription: "Encode or decode URL components safely.",
    heroTitle: "Handle URL encoding without mistakes",
    heroDescription:
      "Encode query values and decode encoded URLs to avoid malformed requests.",
    about:
      "URL Encoder/Decoder helps when building links, query strings, and API params that contain spaces or special characters.",
    howToUse: [
      "Paste the URL or text component.",
      "Click Encode to make it URL-safe.",
      "Click Decode to restore readable text.",
    ],
    whyUse: [
      "Prevents broken links and query bugs.",
      "Makes debugging encoded params easier.",
      "Saves time during API integration work.",
    ],
    faqs: [
      {
        question: "Should I encode full URLs or components?",
        answer: "Usually encode query/path components, not the entire URL.",
      },
      {
        question: "Is this different from Base64?",
        answer: "Yes. URL encoding and Base64 solve different problems.",
      },
    ],
    features: [
      "Encode URL components safely",
      "Decode encoded URLs",
      "Handle special characters",
      "Instant conversion",
      "No server calls",
    ],
    tips: [
      "Encode query parameters, not full URLs",
      "Double-check encoding for spaces and symbols",
      "Use for API request building",
      "Test encoded URLs before deployment",
    ],
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    category: "Auth",
    shortDescription: "Decode JWT header and payload for inspection.",
    heroTitle: "Inspect JWT tokens quickly",
    heroDescription:
      "View token header and payload in readable JSON while debugging auth flows.",
    about:
      "JWT Decoder helps developers inspect token claims, expiry, and issuer values during local development and testing.",
    howToUse: [
      "Paste a JWT token in the input area.",
      "The tool decodes header and payload automatically.",
      "Review claims like exp, sub, and roles.",
    ],
    whyUse: [
      "Speeds up authentication debugging.",
      "Makes claims visible without writing scripts.",
      "Useful during API and frontend auth integration.",
    ],
    faqs: [
      {
        question: "Does this verify JWT signatures?",
        answer: "No. It decodes only; signature verification is separate.",
      },
      {
        question: "Can I decode expired tokens?",
        answer: "Yes, decoding works even if token is expired.",
      },
    ],
    features: [
      "Decode JWT header and payload",
      "View token claims instantly",
      "Check expiry dates",
      "Identify issuer information",
      "No data sent to server",
    ],
    tips: [
      "Never share tokens with untrusted parties",
      "Check the exp claim for expiry",
      "Verify issuer with your backend",
      "This does not validate signatures",
    ],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    category: "Validation",
    shortDescription: "Test regular expressions with live match results.",
    heroTitle: "Test regex patterns in real time",
    heroDescription:
      "Validate patterns quickly before adding them to application code.",
    about:
      "Regex Tester lets you experiment with patterns and flags against sample text so you can debug matching behavior faster.",
    howToUse: [
      "Enter a regex pattern and test text.",
      "Choose flags like g, i, or m.",
      "Run test and inspect all matches.",
    ],
    whyUse: [
      "Reduces regex trial-and-error in code.",
      "Shows exact matches clearly.",
      "Great for validation and parsing tasks.",
    ],
    faqs: [
      {
        question: "What regex syntax does this use?",
        answer: "It uses JavaScript RegExp syntax.",
      },
      {
        question: "Why do I get no matches?",
        answer: "Check pattern, flags, and escaping in your expression.",
      },
    ],
    features: [
      "Test regex patterns in real-time",
      "Highlight all matches",
      "Support for flags (g, i, m, etc.)",
      "Show match groups",
      "Instant feedback",
    ],
    tips: [
      "Test edge cases with your pattern",
      "Use the i flag for case-insensitive matching",
      "Escape special characters properly",
      "Test with realistic sample data",
    ],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    category: "Data",
    shortDescription: "Generate random UUIDs (v4) for your projects.",
    heroTitle: "Generate UUIDs instantly",
    heroDescription:
      "Generate unique identifiers for your database, testing, or mock data.",
    about:
      "UUID Generator allows you to quickly generate version 4 UUIDs (Universally Unique Identifiers) directly in your browser.",
    howToUse: [
      "Click the Generate button to create a new UUID.",
      "Specify how many UUIDs you want to generate at once.",
      "Copy the result to your clipboard.",
    ],
    whyUse: [
      "Fast and easy to use.",
      "No external dependencies or scripts needed.",
      "Perfect for mock data and testing.",
    ],
    faqs: [
      {
        question: "What version of UUID is generated?",
        answer: "This tool generates UUID version 4 (random).",
      },
      {
        question: "Are these UUIDs truly unique?",
        answer: "UUID v4 has a very low probability of collision, making it suitable for most applications.",
      },
    ],
    features: [
      "Generate UUID v4 instantly",
      "Generate multiple UUIDs at once",
      "Cryptographically random",
      "One-click copy",
      "No external dependencies",
    ],
    tips: [
      "Use UUIDs for database primary keys",
      "Perfect for mock data generation",
      "Suitable for session identifiers",
      "Not for security-critical secrets",
    ],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    category: "Text",
    shortDescription: "Generate placeholder text for your designs.",
    heroTitle: "Generate placeholder text fast",
    heroDescription:
      "Quickly generate Lorem Ipsum paragraphs, sentences, or words for your UI/UX designs.",
    about:
      "Lorem Ipsum Generator is a simple tool for designers and developers to generate dummy text for layouts and prototypes.",
    howToUse: [
      "Select whether you want paragraphs, sentences, or words.",
      "Choose the quantity of text to generate.",
      "Click Generate and copy the text.",
    ],
    whyUse: [
      "Saves time finding placeholder content.",
      "Customizable length and format.",
      "Clean and easy to copy.",
    ],
    faqs: [
      {
        question: "Can I generate words instead of paragraphs?",
        answer: "Yes, you can choose between words, sentences, or paragraphs.",
      },
    ],
    features: [
      "Generate paragraphs, sentences, or words",
      "Customizable text length",
      "Classic Lorem Ipsum text",
      "Instant generation",
      "Easy to copy",
    ],
    tips: [
      "Use for UI mockups and prototypes",
      "Adjust length to match your design",
      "Replace with real content before launch",
      "Great for testing typography",
    ],
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    category: "Data",
    shortDescription: "Beautify and format your SQL queries.",
    heroTitle: "Beautify your SQL queries",
    heroDescription:
      "Make your complex SQL queries readable and well-formatted instantly.",
    about:
      "SQL Formatter helps developers and data analysts clean up messy SQL code for better readability and debugging.",
    howToUse: [
      "Paste your SQL query into the input area.",
      "Click Format SQL to beautify the code.",
      "Copy the formatted query.",
    ],
    whyUse: [
      "Improves code readability.",
      "Helps in debugging complex queries.",
      "Supports various SQL dialects.",
    ],
    faqs: [
      {
        question: "Does it support MySQL or PostgreSQL?",
        answer: "Yes, it supports standard SQL which is compatible with most major databases.",
      },
    ],
    features: [
      "Beautify SQL queries instantly",
      "Support for multiple SQL dialects",
      "Proper indentation and spacing",
      "Keyword highlighting",
      "Works with complex queries",
    ],
    tips: [
      "Use for code reviews and debugging",
      "Standardize your team's SQL formatting",
      "Check for syntax errors while formatting",
      "Great for documentation",
    ],
  },
  {
    slug: "yaml-to-json",
    name: "YAML to JSON Converter",
    category: "Data",
    shortDescription: "Convert YAML data to JSON format.",
    heroTitle: "Convert YAML to JSON instantly",
    heroDescription:
      "Quickly transform YAML configuration files into JSON for easier processing.",
    about:
      "YAML to JSON Converter is essential for developers working with multiple configuration formats or APIs.",
    howToUse: [
      "Paste your YAML content into the input.",
      "Click Convert to JSON.",
      "Copy the resulting JSON output.",
    ],
    whyUse: [
      "Essential for cross-format compatibility.",
      "Fast and accurate conversion.",
      "Handles complex nested structures.",
    ],
    faqs: [
      {
        question: "Can I convert JSON back to YAML?",
        answer: "Yes, we also have a JSON to YAML converter tool.",
      },
    ],
    features: [
      "Convert YAML to JSON instantly",
      "Handle nested structures",
      "Preserve data types",
      "Error detection",
      "One-click copy",
    ],
    tips: [
      "Check YAML indentation before conversion",
      "Use for config file migration",
      "Validate output structure",
      "Works with complex nested data",
    ],
  },
  {
    slug: "json-to-yaml",
    name: "JSON to YAML Converter",
    category: "Data",
    shortDescription: "Convert JSON data to YAML format.",
    heroTitle: "Convert JSON to YAML instantly",
    heroDescription:
      "Transform JSON payloads into human-readable YAML configuration files.",
    about:
      "JSON to YAML Converter helps in creating readable config files from API responses or JSON data.",
    howToUse: [
      "Paste your JSON data into the input.",
      "Click Convert to YAML.",
      "Copy the resulting YAML output.",
    ],
    whyUse: [
      "YAML is more human-readable for configs.",
      "Fast conversion for developers.",
      "Supports large JSON files.",
    ],
    faqs: [
      {
        question: "Does it validate JSON before conversion?",
        answer: "Yes, it will show an error if the input JSON is invalid.",
      },
    ],
    features: [
      "Convert JSON to YAML instantly",
      "Human-readable output",
      "Handle arrays and objects",
      "Preserve data integrity",
      "Instant validation",
    ],
    tips: [
      "Validate JSON before conversion",
      "Use for creating config files",
      "Check output indentation",
      "Great for Kubernetes configs",
    ],
  },
  {
    slug: "html-formatter",
    name: "HTML Formatter",
    category: "Data",
    shortDescription: "Format and beautify your HTML code.",
    heroTitle: "Beautify your HTML code",
    heroDescription:
      "Fix messy HTML structures and make them clean and readable.",
    about:
      "HTML Formatter is a must-have for web developers to ensure their markup is properly indented and structured.",
    howToUse: [
      "Paste your HTML code into the input.",
      "Click Format HTML to beautify it.",
      "Copy the clean HTML code.",
    ],
    whyUse: [
      "Ensures proper indentation.",
      "Helps find missing tags.",
      "Improves developer collaboration.",
    ],
    faqs: [
      {
        question: "Does it minify HTML too?",
        answer: "This version focuses on formatting for readability.",
      },
    ],
    features: [
      "Beautify HTML code instantly",
      "Proper tag indentation",
      "Fix messy markup",
      "Detect unclosed tags",
      "Works with any HTML size",
    ],
    tips: [
      "Use for debugging HTML structure",
      "Improves code readability",
      "Helps find missing closing tags",
      "Great for code reviews",
    ],
  },
  {
    slug: "markdown-previewer",
    name: "Markdown Previewer",
    category: "Text",
    shortDescription: "Live preview your Markdown code.",
    heroTitle: "Preview Markdown in real-time",
    heroDescription:
      "Write Markdown and see the rendered HTML output instantly.",
    about:
      "Markdown Previewer helps you write READMEs, documentation, and blog posts with confidence.",
    howToUse: [
      "Type or paste Markdown into the editor.",
      "View the live preview on the right/below.",
      "Copy the rendered HTML if needed.",
    ],
    whyUse: [
      "Real-time visual feedback.",
      "Supports standard GFM (GitHub Flavored Markdown).",
      "Easy to use for documentation.",
    ],
    faqs: [
      {
        question: "Does it support GitHub Flavored Markdown?",
        answer: "Yes, it supports standard Markdown features used on GitHub.",
      },
    ],
    features: [
      "Live Markdown preview",
      "Support for GFM syntax",
      "Instant rendering",
      "Side-by-side view",
      "Copy rendered HTML",
    ],
    tips: [
      "Write READMEs with confidence",
      "Test links and images before publishing",
      "Use for documentation drafting",
      "Check formatting in real-time",
    ],
  },
  {
    slug: "url-parser",
    name: "URL Parser",
    category: "Encoding",
    shortDescription: "Parse URLs into components and query params.",
    heroTitle: "Deconstruct any URL",
    heroDescription:
      "Break down complex URLs into protocol, host, path, and query parameters.",
    about:
      "URL Parser is useful for developers debugging routing issues or analyzing query string parameters.",
    howToUse: [
      "Paste a full URL into the input.",
      "View the parsed components and query params table.",
      "Copy specific parts as needed.",
    ],
    whyUse: [
      "Easily see all query parameters.",
      "Quickly identify protocol and host.",
      "Great for debugging API URLs.",
    ],
    faqs: [
      {
        question: "Can it handle encoded URLs?",
        answer: "Yes, it will automatically decode components for readability.",
      },
    ],
    features: [
      "Parse URL components instantly",
      "Extract query parameters",
      "Identify protocol and host",
      "Decode encoded parts",
      "Copy individual components",
    ],
    tips: [
      "Use for debugging routing issues",
      "Analyze API request URLs",
      "Check query string structure",
      "Great for security auditing",
    ],
  },
  {
    slug: "xml-formatter",
    name: "XML Formatter",
    category: "Data",
    shortDescription: "Beautify and format XML data.",
    heroTitle: "Format XML for readability",
    heroDescription:
      "Prettify messy XML strings with proper indentation and structure.",
    about:
      "XML Formatter helps developers work with XML-based APIs, config files, and data structures.",
    howToUse: [
      "Paste your XML string into the input.",
      "Click Format XML.",
      "Copy the formatted result.",
    ],
    whyUse: [
      "Improves XML readability.",
      "Helps find structural errors in XML.",
      "Fast and browser-based.",
    ],
    faqs: [
      {
        question: "Does it validate the XML?",
        answer: "Yes, it will alert you if the XML is malformed.",
      },
    ],
    features: [
      "Format XML with proper indentation",
      "Validate XML structure",
      "Handle nested elements",
      "Detect syntax errors",
      "Instant beautification",
    ],
    tips: [
      "Use for debugging XML APIs",
      "Check config file formatting",
      "Validate before processing",
      "Great for data integration",
    ],
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    category: "Auth",
    shortDescription: "Generate MD5, SHA-1, and SHA-256 hashes.",
    heroTitle: "Generate secure hashes",
    heroDescription:
      "Quickly create cryptographic hashes for strings in various algorithms.",
    about:
      "Hash Generator is useful for checking data integrity, generating file checksums, or testing auth flows.",
    howToUse: [
      "Enter the text you want to hash.",
      "Select the algorithm (MD5, SHA-256, etc.).",
      "Copy the generated hash.",
    ],
    whyUse: [
      "Multiple algorithms supported.",
      "Instant generation in the browser.",
      "Useful for security testing.",
    ],
    faqs: [
      {
        question: "Is MD5 secure for passwords?",
        answer: "No, MD5 is considered insecure for password storage. Use SHA-256 or better.",
      },
    ],
    features: [
      "Generate MD5, SHA-1, SHA-256 hashes",
      "Instant hash calculation",
      "Multiple algorithm support",
      "Client-side processing",
      "One-click copy",
    ],
    tips: [
      "Use SHA-256 for security-critical data",
      "MD5 is only for non-security use cases",
      "Great for file checksums",
      "Never use MD5 for passwords",
    ],
  },
  {
    slug: "json-minifier",
    name: "JSON Minifier",
    category: "Data",
    shortDescription: "Compress JSON data by removing whitespace and comments.",
    heroTitle: "Minify JSON for production",
    heroDescription: "Reduce the size of your JSON payloads for faster transmission and storage.",
    about: "JSON Minifier removes all unnecessary whitespace, newlines, and indentation from your JSON data.",
    howToUse: ["Paste your formatted JSON.", "Click Minify JSON.", "Copy the compact result."],
    whyUse: ["Reduces payload size.", "Faster API responses.", "Saves storage space."],
    faqs: [{ question: "Is minified JSON still valid?", answer: "Yes, minification only affects formatting, not the data structure." }],
    features: [
      "Minify JSON instantly",
      "Remove all whitespace",
      "Reduce payload size",
      "Faster data transfer",
      "Maintain data integrity",
    ],
    tips: [
      "Use for production API responses",
      "Reduces bandwidth usage",
      "Keep a formatted copy for debugging",
      "Test minified output before deployment",
    ],
  },
  {
    slug: "css-formatter",
    name: "CSS Formatter",
    category: "Data",
    shortDescription: "Beautify and indent your CSS code.",
    heroTitle: "Clean up your CSS",
    heroDescription: "Format messy CSS files with consistent indentation and spacing.",
    about: "CSS Formatter helps maintain clean and readable stylesheets for web development.",
    howToUse: ["Paste your CSS code.", "Click Format CSS.", "Copy the beautified result."],
    whyUse: ["Improves maintainability.", "Easier to debug.", "Consistent coding style."],
    faqs: [{ question: "Does it support SCSS?", answer: "It works best with standard CSS syntax." }],
    features: [
      "Beautify CSS instantly",
      "Proper indentation",
      "Consistent spacing",
      "Handle nested selectors",
      "Improve readability",
    ],
    tips: [
      "Use for code reviews",
      "Standardize team CSS formatting",
      "Great for debugging styles",
      "Improves maintainability",
    ],
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier",
    category: "Data",
    shortDescription: "Compress CSS files for faster website loading.",
    heroTitle: "Optimize CSS performance",
    heroDescription: "Remove whitespace and comments from CSS to reduce file size.",
    about: "CSS Minifier is a tool to optimize your stylesheets for production environments.",
    howToUse: ["Paste your CSS.", "Click Minify CSS.", "Copy the optimized code."],
    whyUse: ["Improves page load speed.", "Reduces bandwidth usage.", "Production-ready code."],
    faqs: [{ question: "Will it break my styles?", answer: "No, it only removes non-functional characters like spaces and comments." }],
    features: [
      "Minify CSS for production",
      "Remove whitespace and comments",
      "Reduce file size",
      "Faster page load",
      "Maintain functionality",
    ],
    tips: [
      "Use for production builds",
      "Keep source CSS for development",
      "Test minified output thoroughly",
      "Improves website performance",
    ],
  },
  {
    slug: "js-formatter",
    name: "JS Formatter",
    category: "Data",
    shortDescription: "Format and beautify JavaScript code.",
    heroTitle: "Readable JavaScript code",
    heroDescription: "Instantly beautify minified or messy JavaScript code.",
    about: "JS Formatter applies standard indentation and spacing to JavaScript files.",
    howToUse: ["Paste your JS code.", "Click Format JS.", "Copy the result."],
    whyUse: ["Easier code reviews.", "Better debugging experience.", "Standardizes formatting."],
    faqs: [{ question: "Does it support ES6+?", answer: "Yes, it supports modern JavaScript syntax." }],
    features: [
      "Format JavaScript instantly",
      "Support ES6+ syntax",
      "Proper indentation",
      "Consistent code style",
      "Handle arrow functions",
    ],
    tips: [
      "Use for code reviews",
      "Standardize team JS formatting",
      "Great for debugging minified code",
      "Improves code readability",
    ],
  },
  {
    slug: "js-minifier",
    name: "JS Minifier",
    category: "Data",
    shortDescription: "Minify JavaScript to reduce file size.",
    heroTitle: "Compress JS for production",
    heroDescription: "Optimize your JavaScript files by removing unnecessary characters.",
    about: "JS Minifier helps in reducing the footprint of your script files for better performance.",
    howToUse: ["Paste your JS code.", "Click Minify JS.", "Copy the result."],
    whyUse: ["Faster script loading.", "Saves bandwidth.", "Protects source code slightly."],
    faqs: [{ question: "Is the code still executable?", answer: "Yes, it remains functionally identical to the source." }],
    features: [
      "Minify JavaScript for production",
      "Remove unnecessary characters",
      "Reduce file size",
      "Faster script loading",
      "Maintain functionality",
    ],
    tips: [
      "Use for production bundles",
      "Keep source for debugging",
      "Test minified code thoroughly",
      "Improves website performance",
    ],
  },
  {
    slug: "html-minifier",
    name: "HTML Minifier",
    category: "Data",
    shortDescription: "Compress HTML markup for better performance.",
    heroTitle: "Optimize HTML delivery",
    heroDescription: "Remove whitespace and comments from HTML documents.",
    about: "HTML Minifier helps in delivering lean HTML to the client browser.",
    howToUse: ["Paste your HTML.", "Click Minify HTML.", "Copy the result."],
    whyUse: ["Faster TTI (Time to Interactive).", "Lower page weight.", "Cleaner production source."],
    faqs: [{ question: "Does it remove script tags?", answer: "No, it only minifies the markup itself." }],
    features: [
      "Minify HTML for production",
      "Remove whitespace and comments",
      "Reduce page weight",
      "Faster TTI",
      "Maintain functionality",
    ],
    tips: [
      "Use for production builds",
      "Keep source for development",
      "Test minified HTML thoroughly",
      "Improves page load speed",
    ],
  },
  {
    slug: "xml-minifier",
    name: "XML Minifier",
    category: "Data",
    shortDescription: "Compress XML data by removing whitespace.",
    heroTitle: "Compact XML payloads",
    heroDescription: "Reduce the size of XML files for data transfer.",
    about: "XML Minifier removes all unnecessary formatting from XML strings.",
    howToUse: ["Paste your XML.", "Click Minify XML.", "Copy the result."],
    whyUse: ["Efficient data transfer.", "Saves bandwidth.", "Smaller file sizes."],
    faqs: [{ question: "Is the XML still valid?", answer: "Yes, valid XML remains valid after minification." }],
    features: [
      "Minify XML instantly",
      "Remove whitespace",
      "Reduce file size",
      "Faster data transfer",
      "Maintain validity",
    ],
    tips: [
      "Use for production APIs",
      "Keep formatted copy for debugging",
      "Test minified output",
      "Saves bandwidth",
    ],
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON Converter",
    category: "Data",
    shortDescription: "Convert CSV data to JSON format.",
    heroTitle: "Transform CSV to JSON",
    heroDescription: "Easily convert spreadsheet data (CSV) into JSON arrays.",
    about: "CSV to JSON Converter is perfect for importing data from Excel or Google Sheets into apps.",
    howToUse: ["Paste your CSV data.", "Click Convert to JSON.", "Copy the JSON output."],
    whyUse: ["Easy data migration.", "Developer-friendly format.", "Fast conversion."],
    faqs: [{ question: "Does it support headers?", answer: "Yes, it uses the first row as keys for the JSON objects." }],
    features: [
      "Convert CSV to JSON instantly",
      "Handle headers automatically",
      "Support large files",
      "Preserve data structure",
      "One-click copy",
    ],
    tips: [
      "Ensure first row has headers",
      "Check for special characters",
      "Use for Excel data import",
      "Validate output structure",
    ],
  },
  {
    slug: "json-to-csv",
    name: "JSON to CSV Converter",
    category: "Data",
    shortDescription: "Convert JSON arrays to CSV format.",
    heroTitle: "Transform JSON to CSV",
    heroDescription: "Turn JSON data into spreadsheet-ready CSV files.",
    about: "JSON to CSV Converter helps in exporting app data for use in Excel or other tools.",
    howToUse: ["Paste your JSON array.", "Click Convert to CSV.", "Copy the result."],
    whyUse: ["Export data for analysis.", "Spreadsheet compatibility.", "Fast and reliable."],
    faqs: [{ question: "What JSON structure is required?", answer: "It works best with arrays of objects." }],
    features: [
      "Convert JSON to CSV instantly",
      "Handle nested objects",
      "Export to spreadsheet format",
      "Support large datasets",
      "One-click copy",
    ],
    tips: [
      "Use arrays of objects for best results",
      "Check for special characters",
      "Great for data analysis",
      "Works with Excel and Google Sheets",
    ],
  },
  {
    slug: "unix-timestamp-converter",
    name: "Unix Timestamp Converter",
    category: "Data",
    shortDescription: "Convert Unix timestamps to readable dates.",
    heroTitle: "Timestamp to Date",
    heroDescription: "Instantly convert Unix epochs to human-readable date and time.",
    about: "Unix Timestamp Converter helps developers understand epoch times in logs and databases.",
    howToUse: ["Enter a Unix timestamp.", "The readable date appears instantly.", "Toggle between seconds and milliseconds."],
    whyUse: ["Essential for debugging.", "Quick time conversion.", "Supports various formats."],
    faqs: [{ question: "What is a Unix timestamp?", answer: "It's the number of seconds since Jan 01 1970 (UTC)." }],
    features: [
      "Convert Unix timestamp to date",
      "Support seconds and milliseconds",
      "Instant conversion",
      "Multiple date formats",
      "Timezone aware",
    ],
    tips: [
      "Check if timestamp is in seconds or milliseconds",
      "Useful for debugging logs",
      "Understand UTC vs local time",
      "Great for API development",
    ],
  },
  {
    slug: "date-to-unix-timestamp",
    name: "Date to Unix Timestamp",
    category: "Data",
    shortDescription: "Convert human dates to Unix timestamps.",
    heroTitle: "Date to Timestamp",
    heroDescription: "Convert any date and time into a Unix epoch integer.",
    about: "Date to Unix Timestamp is useful for generating timestamps for API requests and DB queries.",
    howToUse: ["Select or type a date/time.", "The Unix timestamp is generated instantly.", "Copy the result."],
    whyUse: ["API development.", "Database seeding.", "Time-based logic testing."],
    faqs: [{ question: "Is the timestamp in UTC?", answer: "Yes, Unix timestamps are inherently UTC-based." }],
    features: [
      "Convert date to Unix timestamp",
      "Support various date formats",
      "Instant generation",
      "UTC-based output",
      "One-click copy",
    ],
    tips: [
      "Use for API request parameters",
      "Database seeding with timestamps",
      "Understand UTC timezone",
      "Great for time-based logic",
    ],
  },
  {
    slug: "rgb-to-hex",
    name: "RGB to HEX Converter",
    category: "Design",
    shortDescription: "Convert RGB colors to HEX codes.",
    heroTitle: "RGB to HEX",
    heroDescription: "Transform RGB color values into web-ready HEX color codes.",
    about: "RGB to HEX Converter is a handy tool for web designers and developers.",
    howToUse: ["Enter R, G, and B values (0-255).", "The HEX code is updated live.", "Copy the HEX value."],
    whyUse: ["Web design workflow.", "CSS development.", "Quick color conversion."],
    faqs: [{ question: "Does it support transparency?", answer: "This version focuses on standard RGB to HEX." }],
    features: [
      "Convert RGB to HEX instantly",
      "Support 0-255 range",
      "Live color preview",
      "One-click copy",
      "Web-ready format",
    ],
    tips: [
      "Use for CSS color values",
      "Check RGB values before conversion",
      "Great for web design",
      "Works with design tools",
    ],
  },
  {
    slug: "hex-to-rgb",
    name: "HEX to RGB Converter",
    category: "Design",
    shortDescription: "Convert HEX codes to RGB color values.",
    heroTitle: "HEX to RGB",
    heroDescription: "Transform HEX color codes into RGB values for design and code.",
    about: "HEX to RGB Converter helps in converting web colors for use in various design tools.",
    howToUse: ["Enter a 3 or 6 digit HEX code.", "The RGB values are updated live.", "Copy the result."],
    whyUse: ["Design consistency.", "UI development.", "Fast conversion."],
    faqs: [{ question: "Can I enter the # symbol?", answer: "Yes, both with and without the # are supported." }],
    features: [
      "Convert HEX to RGB instantly",
      "Support 3 and 6 digit HEX",
      "Live color preview",
      "One-click copy",
      "Design tool compatible",
    ],
    tips: [
      "Use for CSS color manipulation",
      "Works with design software",
      "Check HEX format before conversion",
      "Great for color matching",
    ],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "Auth",
    shortDescription: "Generate secure and random passwords.",
    heroTitle: "Generate strong passwords",
    heroDescription: "Create highly secure passwords with custom length and character sets.",
    about: "Password Generator helps you stay secure by creating unpredictable passwords locally.",
    howToUse: ["Choose password length.", "Select character types (numbers, symbols).", "Click Generate and copy."],
    whyUse: ["Improves security.", "Customizable complexity.", "Runs entirely in browser."],
    faqs: [{ question: "Are my passwords stored?", answer: "No, they are generated locally and never leave your browser." }],
    features: [
      "Generate secure passwords instantly",
      "Customizable length",
      "Include numbers and symbols",
      "Cryptographically random",
      "No data storage",
    ],
    tips: [
      "Use at least 12 characters",
      "Include special characters",
      "Never reuse passwords",
      "Use a password manager",
    ],
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    category: "Data",
    shortDescription: "Convert numbers between Binary, Octal, Decimal, and Hex.",
    heroTitle: "Convert Number Bases",
    heroDescription: "Instantly switch numbers between different mathematical bases.",
    about: "Number Base Converter is essential for low-level programming and CS students.",
    howToUse: ["Enter a number in any base.", "See it converted to all other bases live.", "Copy the result you need."],
    whyUse: ["CS education.", "Embedded programming.", "Quick math checks."],
    faqs: [{ question: "What is the limit?", answer: "It supports standard 64-bit integer ranges." }],
    features: [
      "Convert between number bases",
      "Support Binary, Octal, Decimal, Hex",
      "Instant conversion",
      "Live updates",
      "One-click copy",
    ],
    tips: [
      "Use for CS education",
      "Great for embedded programming",
      "Check base before conversion",
      "Understand binary representation",
    ],
  },
  {
    slug: "binary-to-text",
    name: "Binary to Text Converter",
    category: "Encoding",
    shortDescription: "Convert binary code into readable text.",
    heroTitle: "Binary to Text",
    heroDescription: "Decode binary strings (0s and 1s) into human-readable ASCII text.",
    about: "Binary to Text Converter is useful for decoding data or solving puzzles.",
    howToUse: ["Paste your binary string.", "Click Convert.", "Read the decoded text."],
    whyUse: ["Data decoding.", "Educational purposes.", "Fun and puzzles."],
    faqs: [{ question: "What encoding is used?", answer: "It uses standard ASCII/UTF-8 character encoding." }],
    features: [
      "Convert binary to text instantly",
      "Support ASCII and UTF-8",
      "Handle 8-bit binary",
      "One-click copy",
      "No server calls",
    ],
    tips: [
      "Ensure binary is 8-bit aligned",
      "Check for Unicode characters",
      "Use for data decoding",
      "Educational purposes",
    ],
  },
  {
    slug: "text-to-binary",
    name: "Text to Binary Converter",
    category: "Encoding",
    shortDescription: "Convert readable text into binary code.",
    heroTitle: "Text to Binary",
    heroDescription: "Encode any text into its binary representation (0s and 1s).",
    about: "Text to Binary Converter shows you how text is represented at the lowest level.",
    howToUse: ["Type your text.", "The binary code updates live.", "Copy the result."],
    whyUse: ["Learning binary.", "Secret messages.", "Data representation."],
    faqs: [{ question: "Does it support emojis?", answer: "Yes, it handles Unicode characters including emojis." }],
    features: [
      "Convert text to binary instantly",
      "Support Unicode and emojis",
      "Live binary generation",
      "One-click copy",
      "No server calls",
    ],
    tips: [
      "Understand binary representation",
      "Check for Unicode characters",
      "Use for educational purposes",
      "Great for learning encoding",
    ],
  },
  {
    slug: "html-entity-encoder",
    name: "HTML Entity Encoder",
    category: "Encoding",
    shortDescription: "Encode special characters into HTML entities.",
    heroTitle: "Secure your HTML",
    heroDescription: "Prevent XSS by encoding special characters like <, >, and &.",
    about: "HTML Entity Encoder makes your content safe for display in HTML documents.",
    howToUse: ["Paste your text.", "Click Encode.", "Copy the entity-encoded result."],
    whyUse: ["Prevents security issues.", "Ensures correct rendering.", "Handles special symbols."],
    faqs: [{ question: "What characters are encoded?", answer: "All characters that have special meaning in HTML." }],
    features: [
      "Encode special characters instantly",
      "Prevent XSS attacks",
      "Handle all HTML entities",
      "One-click copy",
      "Security-focused",
    ],
    tips: [
      "Use for user-generated content",
      "Prevent XSS vulnerabilities",
      "Encode before displaying in HTML",
      "Great for security hardening",
    ],
  },
  {
    slug: "html-entity-decoder",
    name: "HTML Entity Decoder",
    category: "Encoding",
    shortDescription: "Decode HTML entities back to characters.",
    heroTitle: "Restore HTML entities",
    heroDescription: "Convert entities like &amp; back into their original characters.",
    about: "HTML Entity Decoder helps in reading encoded HTML content or data from APIs.",
    howToUse: ["Paste encoded text.", "Click Decode.", "Read the original characters."],
    whyUse: ["Data cleanup.", "Debugging encoded text.", "API integration."],
    faqs: [{ question: "Does it support numeric entities?", answer: "Yes, both named and numeric entities are supported." }],
    features: [
      "Decode HTML entities instantly",
      "Support named and numeric entities",
      "Restore original characters",
      "One-click copy",
      "Handle all entity types",
    ],
    tips: [
      "Use for reading encoded content",
      "Debug API responses",
      "Clean up encoded text",
      "Great for data processing",
    ],
  },
  {
    slug: "string-escape",
    name: "String Escape",
    category: "Encoding",
    shortDescription: "Escape strings for use in programming languages.",
    heroTitle: "Escape special characters",
    heroDescription: "Add backslashes to quotes, newlines, and other special characters.",
    about: "String Escape helps developers paste text into code strings without syntax errors.",
    howToUse: ["Paste your text.", "Select language style (JS, C#, etc.).", "Copy the escaped string."],
    whyUse: ["Code generation.", "Avoids syntax errors.", "Saves time manual escaping."],
    faqs: [{ question: "Does it handle newlines?", answer: "Yes, it converts them to \\n sequences." }],
    features: [
      "Escape strings for code instantly",
      "Handle quotes and newlines",
      "Support multiple language styles",
      "One-click copy",
      "Prevent syntax errors",
    ],
    tips: [
      "Use for code generation",
      "Select appropriate language style",
      "Check escaped output",
      "Saves manual escaping time",
    ],
  },
  {
    slug: "string-unescape",
    name: "String Unescape",
    category: "Encoding",
    shortDescription: "Remove escapes from programming strings.",
    heroTitle: "Restore escaped strings",
    heroDescription: "Convert sequences like \\n and \\\" back to their actual characters.",
    about: "String Unescape helps in reading raw string data from code or logs.",
    howToUse: ["Paste escaped string.", "Click Unescape.", "See the original text."],
    whyUse: ["Log analysis.", "Debugging code.", "Data extraction."],
    faqs: [{ question: "Which styles are supported?", answer: "Common C-style escapes used in JS, Java, and Python." }],
    features: [
      "Unescape strings instantly",
      "Restore escaped characters",
      "Handle C-style escapes",
      "One-click copy",
      "Read raw string data",
    ],
    tips: [
      "Use for log analysis",
      "Debug escaped code",
      "Extract data from logs",
      "Great for data processing",
    ],
  },
  {
    slug: "advanced-case-converter",
    name: "Advanced Case Converter",
    category: "Text",
    shortDescription: "Convert between snake_case, camelCase, PascalCase, etc.",
    heroTitle: "Developer Case Converter",
    heroDescription: "Switch between variable naming conventions instantly.",
    about: "Advanced Case Converter is a must-have for developers refactoring code.",
    howToUse: ["Enter your variable name.", "Select target case (snake, camel, etc.).", "Copy the result."],
    whyUse: ["Code refactoring.", "Naming consistency.", "API development."],
    faqs: [{ question: "Does it support kebab-case?", answer: "Yes, it supports all common dev cases." }],
    features: [
      "Convert between naming conventions",
      "Support snake_case, camelCase, PascalCase",
      "Handle kebab-case and more",
      "Instant conversion",
      "One-click copy",
    ],
    tips: [
      "Use for code refactoring",
      "Standardize variable naming",
      "Great for API development",
      "Maintain naming consistency",
    ],
  },
  {
    slug: "duplicate-line-remover",
    name: "Duplicate Line Remover",
    category: "Text",
    shortDescription: "Remove duplicate lines from a list or text.",
    heroTitle: "Clean up duplicate lines",
    heroDescription: "Instantly remove redundant rows from your text data.",
    about: "Duplicate Line Remover is great for cleaning up lists, logs, and data exports.",
    howToUse: ["Paste your multi-line text.", "Click Remove Duplicates.", "Copy the unique list."],
    whyUse: ["Data deduplication.", "Log cleanup.", "List management."],
    faqs: [{ question: "Is it case-sensitive?", answer: "You can toggle case sensitivity as needed." }],
    features: [
      "Remove duplicate lines instantly",
      "Toggle case sensitivity",
      "Handle large lists",
      "One-click copy",
      "Clean data quickly",
    ],
    tips: [
      "Use for data deduplication",
      "Clean up log files",
      "Manage email lists",
      "Toggle case for precision",
    ],
  },
  {
    slug: "text-reverser",
    name: "Text Reverser",
    category: "Text",
    shortDescription: "Reverse characters or words in a string.",
    heroTitle: "Flip your text",
    heroDescription: "Reverse the order of characters or words in your text.",
    about: "Text Reverser is a simple utility for fun or specific data processing needs.",
    howToUse: ["Type your text.", "Choose reverse characters or words.", "Copy the flipped result."],
    whyUse: ["Data obfuscation.", "Educational fun.", "Testing edge cases."],
    faqs: [{ question: "Does it support RTL languages?", answer: "It works with all character sets including Unicode." }],
    features: [
      "Reverse characters or words",
      "Support Unicode text",
      "Instant reversal",
      "One-click copy",
      "Handle any text length",
    ],
    tips: [
      "Use for data obfuscation",
      "Educational purposes",
      "Test edge cases",
      "Works with all languages",
    ],
  },
  {
    slug: "list-randomizer",
    name: "List Randomizer",
    category: "Text",
    shortDescription: "Shuffle the order of lines in a list.",
    heroTitle: "Shuffle your list",
    heroDescription: "Randomly reorder the lines in your input text.",
    about: "List Randomizer is perfect for choosing winners or randomizing task orders.",
    howToUse: ["Paste your list.", "Click Shuffle.", "Get a randomized version."],
    whyUse: ["Fair selection.", "Randomizing test data.", "Task assignment."],
    faqs: [{ question: "Is it truly random?", answer: "It uses a cryptographically strong random number generator." }],
    features: [
      "Shuffle lists instantly",
      "Cryptographically random",
      "Handle any list size",
      "One-click copy",
      "Fair randomization",
    ],
    tips: [
      "Use for fair selection",
      "Randomize test data",
      "Assign tasks randomly",
      "Choose winners fairly",
    ],
  },
  {
    slug: "user-agent-parser",
    name: "User Agent Parser",
    category: "Data",
    shortDescription: "Extract browser and OS info from a User Agent string.",
    heroTitle: "Decode User Agents",
    heroDescription: "Identify browser, version, engine, and OS from any UA string.",
    about: "User Agent Parser helps developers debug client-side issues and analyze traffic.",
    howToUse: ["Paste a User Agent string.", "The details are parsed and displayed.", "View OS and Browser info."],
    whyUse: ["Debugging.", "Traffic analysis.", "Browser support testing."],
    faqs: [{ question: "Is it always accurate?", answer: "It uses the latest UA patterns to ensure high accuracy." }],
    features: [
      "Parse User Agent strings instantly",
      "Identify browser and version",
      "Detect OS and platform",
      "Extract engine information",
      "One-click copy",
    ],
    tips: [
      "Use for debugging client issues",
      "Analyze traffic patterns",
      "Test browser compatibility",
      "Understand user demographics",
    ],
  },
  {
    slug: "morse-code-converter",
    name: "Morse Code Converter",
    category: "Encoding",
    shortDescription: "Convert text to Morse code and vice versa.",
    heroTitle: "Morse Code Translator",
    heroDescription: "Translate any text into dots and dashes or decode Morse code.",
    about: "Morse Code Converter is a fun and educational tool for encoding messages.",
    howToUse: ["Type text or Morse code.", "The translation appears instantly.", "Copy the result."],
    whyUse: ["Education.", "Fun projects.", "Historical interest."],
    faqs: [{ question: "What separator is used?", answer: "It uses standard spaces between characters." }],
    features: [
      "Convert text to Morse code",
      "Decode Morse to text",
      "Standard Morse alphabet",
      "Instant translation",
      "One-click copy",
    ],
    tips: [
      "Use for educational purposes",
      "Learn Morse code",
      "Fun projects",
      "Historical interest",
    ],
  },
  {
    slug: "rot13-converter",
    name: "ROT13 Converter",
    category: "Encoding",
    shortDescription: "Encode or decode text using the ROT13 cipher.",
    heroTitle: "ROT13 Cipher",
    heroDescription: "A simple letter substitution cipher that replaces a letter with the 13th letter after it.",
    about: "ROT13 is a common way to hide spoilers or obfuscate text in online forums.",
    howToUse: ["Enter your text.", "The ROT13 version is generated live.", "Copy the result."],
    whyUse: ["Obfuscating spoilers.", "Basic encryption puzzles.", "CS history."],
    faqs: [{ question: "Is ROT13 secure?", answer: "No, it's easily reversible and not for security." }],
    features: [
      "Encode and decode ROT13 instantly",
      "Simple letter substitution",
      "Reversible cipher",
      "One-click copy",
      "No server calls",
    ],
    tips: [
      "Use for obfuscating spoilers",
      "Basic encryption puzzles",
      "CS history education",
      "Not for security purposes",
    ],
  },
  {
    slug: "url-slug-generator",
    name: "URL Slug Generator",
    category: "Text",
    shortDescription: "Convert titles into SEO-friendly URL slugs.",
    heroTitle: "Generate Clean Slugs",
    heroDescription: "Transform any string into a lowercase, hyphenated URL path.",
    about: "URL Slug Generator is essential for bloggers and web developers.",
    howToUse: ["Type your title.", "The slug is generated instantly.", "Copy for your URL."],
    whyUse: ["SEO optimization.", "Clean URL structures.", "Consistent naming."],
    faqs: [{ question: "Does it remove special characters?", answer: "Yes, it removes all non-alphanumeric characters." }],
    features: [
      "Generate clean URL slugs instantly",
      "Lowercase conversion",
      "Remove special characters",
      "Hyphen-separated words",
      "SEO-friendly format",
    ],
    tips: [
      "Use for blog post URLs",
      "Create clean URL structures",
      "Improve SEO",
      "Consistent naming convention",
    ],
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    category: "Validation",
    shortDescription: "Check if your JSON data is valid and well-formed.",
    heroTitle: "Validate your JSON",
    heroDescription: "Find syntax errors in your JSON data instantly.",
    about: "JSON Validator ensures your data follows the strict JSON specification.",
    howToUse: ["Paste your JSON.", "See if it's valid or get error details.", "Fix errors live."],
    whyUse: ["Debugging APIs.", "Config file validation.", "Catching syntax errors."],
    faqs: [{ question: "Will it fix my JSON?", answer: "It points out errors so you can fix them easily." }],
    features: [
      "Validate JSON syntax instantly",
      "Show detailed error messages",
      "Highlight syntax errors",
      "Check structure integrity",
      "Real-time validation",
    ],
    tips: [
      "Use before API integration",
      "Debug config files",
      "Catch syntax errors early",
      "Ensure data integrity",
    ],
  },
  {
    slug: "cron-descriptor",
    name: "Cron Expression Descriptor",
    category: "Data",
    shortDescription: "Convert cron expressions into human-readable text.",
    heroTitle: "Understand Cron Jobs",
    heroDescription: "Turn confusing cron schedules like '0 0 * * *' into clear English.",
    about: "Cron Descriptor helps sysadmins and devs verify their scheduled tasks.",
    howToUse: ["Enter a cron expression.", "Read the human-friendly schedule description.", "Copy for documentation."],
    whyUse: ["Avoid scheduling mistakes.", "Better documentation.", "Quick verification."],
    faqs: [{ question: "Does it support 6-part cron?", answer: "Yes, it supports both 5 and 6 part expressions." }],
    features: [
      "Convert cron to readable text",
      "Support 5 and 6 part expressions",
      "Instant description",
      "Handle complex schedules",
      "One-click copy",
    ],
    tips: [
      "Verify scheduled tasks",
      "Better documentation",
      "Avoid scheduling mistakes",
      "Great for sysadmins",
    ],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "Data",
    shortDescription: "Generate QR codes for URLs or text.",
    heroTitle: "Create QR Codes",
    heroDescription: "Instantly generate QR codes that can be scanned by any device.",
    about: "QR Code Generator is a simple way to bridge physical and digital worlds.",
    howToUse: ["Enter URL or text.", "The QR code is generated as an SVG.", "Download or copy the SVG."],
    whyUse: ["Marketing materials.", "Quick link sharing.", "Contact info sharing."],
    faqs: [{ question: "Is the QR code permanent?", answer: "Yes, the code itself is static and never expires." }],
    features: [
      "Generate QR codes instantly",
      "Support URLs and text",
      "SVG format output",
      "High quality",
      "One-click download",
    ],
    tips: [
      "Use for marketing materials",
      "Quick link sharing",
      "Contact info sharing",
      "Test before printing",
    ],
  },
  {
    slug: "image-to-base64",
    name: "Image to Base64",
    category: "Encoding",
    shortDescription: "Convert images to Base64 data strings.",
    heroTitle: "Embed Images in Code",
    heroDescription: "Turn any image file into a Base64 string for CSS or HTML embedding.",
    about: "Image to Base64 is useful for small icons or preventing extra HTTP requests.",
    howToUse: ["Upload an image file.", "Copy the generated Base64 data URI.", "Paste into your code."],
    whyUse: ["Reducing HTTP requests.", "CSS background images.", "Email template embedding."],
    faqs: [{ question: "What is the file limit?", answer: "It supports files up to 5MB for browser stability." }],
    features: [
      "Convert images to Base64 instantly",
      "Support multiple formats",
      "Generate data URI strings",
      "Client-side processing",
      "No server upload",
    ],
    tips: [
      "Use for small icons only",
      "Reduces HTTP requests",
      "CSS background images",
      "Email template embedding",
    ],
  },
  {
    slug: "json-to-typescript",
    name: "JSON to TypeScript",
    category: "Data",
    shortDescription: "Convert JSON objects to TypeScript interfaces.",
    heroTitle: "JSON to Type Definitions",
    heroDescription: "Generate clean TypeScript interfaces from your JSON data automatically.",
    about: "JSON to TypeScript Converter helps frontend developers define types for API responses quickly.",
    howToUse: ["Paste your JSON object.", "Click Convert to TypeScript.", "Copy the generated interfaces."],
    whyUse: ["Saves manual typing time.", "Ensures type safety.", "Handles nested objects."],
    faqs: [{ question: "Does it support nested arrays?", answer: "Yes, it recursively generates types for nested structures." }],
    features: [
      "Convert JSON to TypeScript instantly",
      "Generate interface definitions",
      "Handle nested objects",
      "Support arrays and unions",
      "One-click copy",
    ],
    tips: [
      "Use for API response types",
      "Saves manual typing time",
      "Ensure type safety",
      "Great for frontend development",
    ],
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    category: "Text",
    shortDescription: "Count words, characters, sentences, paragraphs, and estimated reading time.",
    heroTitle: "Count words and characters instantly",
    heroDescription:
      "Real-time word count, character count, sentence count, paragraph count, and reading time estimation.",
    about:
      "Word Counter helps writers, students, bloggers, and developers analyze text length, character limits, and readability metrics instantly.",
    howToUse: [
      "Paste or type your text into the input box.",
      "View real-time statistics for words, characters, sentences, and paragraphs.",
      "Check estimated reading and speaking times.",
      "Copy the summary metrics or clear input as needed.",
    ],
    whyUse: [
      "Instant real-time calculation as you type.",
      "Helpful for social media posts, blog articles, and essays.",
      "100% private client-side text processing.",
    ],
    faqs: [
      {
        question: "How are words counted?",
        answer: "Words are counted by splitting non-empty character sequences separated by whitespace.",
      },
      {
        question: "How is reading time calculated?",
        answer: "Reading time is estimated using an average reading speed of 200 words per minute.",
      },
      {
        question: "Is my text uploaded to a server?",
        answer: "No. All calculations are performed entirely in your browser.",
      },
    ],
    features: [
      "Real-time word and character counting",
      "Character count with and without spaces",
      "Sentence and paragraph detection",
      "Estimated reading and speaking time",
      "One-click metrics copy",
      "100% private and client-side",
    ],
    tips: [
      "Use character counts to optimize social media posts for platform limits",
      "Check reading time to gauge blog post engagement length",
      "Inspect paragraph count to improve content readability and layout",
    ],
  },
  {
    slug: "line-counter",
    name: "Line Counter",
    category: "Text",
    shortDescription: "Count total lines, empty lines, and non-empty lines in text.",
    heroTitle: "Count text lines instantly",
    heroDescription:
      "Quickly analyze text to find total lines, empty lines, and non-empty lines without leaving your browser.",
    about:
      "Line Counter is a simple utility for developers, writers, and data analysts to instantly count the number of lines in logs, code, or large text documents.",
    howToUse: [
      "Paste or type text in the input area.",
      "The tool instantly counts total lines, empty lines, and non-empty lines.",
      "View the summary metrics or copy them for your records.",
    ],
    whyUse: [
      "Useful for analyzing log files or code files.",
      "Helps verify dataset sizes before processing.",
      "Works instantly on the client side with no data uploads.",
    ],
    faqs: [
      {
        question: "What is considered an empty line?",
        answer: "An empty line is a line containing no characters or only whitespace characters (spaces, tabs).",
      },
      {
        question: "Can I count lines in very large text?",
        answer: "Yes, it can handle large text chunks efficiently within your browser's memory limits.",
      },
    ],
    features: [
      "Count total lines",
      "Count empty lines",
      "Count non-empty lines",
      "Real-time processing",
      "100% private and secure",
    ],
    tips: [
      "Use this to estimate the size of a text dataset",
      "Quickly check if a file has trailing empty lines",
      "Compare total lines vs non-empty lines to gauge text density",
    ],
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    category: "Text",
    shortDescription: "Count characters with and without spaces, and calculate byte size.",
    heroTitle: "Detailed character counting tool",
    heroDescription:
      "Instantly count characters with spaces, without spaces, and calculate the estimated byte size of your text.",
    about:
      "Character Counter is perfect for ensuring text meets strict length requirements for SMS, social media, meta descriptions, and database limits.",
    howToUse: [
      "Paste your text into the input field.",
      "View the character counts with and without spaces.",
      "Check the estimated UTF-8 byte size of the text.",
    ],
    whyUse: [
      "Helps you stay within strict character limits.",
      "Byte size estimation is useful for database field limits.",
      "Calculations happen instantly in your browser.",
    ],
    faqs: [
      {
        question: "How is byte size calculated?",
        answer: "Byte size is estimated using UTF-8 encoding, where regular characters are 1 byte, but emojis and special symbols can be up to 4 bytes.",
      },
      {
        question: "Does it count spaces as characters?",
        answer: "Yes, standard character count includes spaces, but it also provides a 'without spaces' count.",
      },
    ],
    features: [
      "Count characters with spaces",
      "Count characters without spaces",
      "Estimate UTF-8 byte size",
      "Real-time calculation",
      "No server requests",
    ],
    tips: [
      "Use for SMS character limits (typically 160 characters)",
      "Check meta description lengths (typically 150-160 characters)",
      "Use byte size for database column length constraints",
    ],
  },
  {
    slug: "text-trimmer",
    name: "Text Trimmer",
    category: "Text",
    shortDescription: "Remove leading, trailing, and extra whitespace from text.",
    heroTitle: "Clean up messy whitespace in text",
    heroDescription:
      "Instantly remove leading spaces, trailing spaces, and collapse multiple spaces into single spaces.",
    about:
      "Text Trimmer helps you clean up messy text copied from PDFs, websites, or poorly formatted documents by normalizing whitespace.",
    howToUse: [
      "Paste messy text into the input area.",
      "Select trimming options (Leading/Trailing, Extra Spaces, Empty Lines).",
      "Copy the cleaned text to your clipboard.",
    ],
    whyUse: [
      "Saves time manually deleting spaces.",
      "Ensures clean data for database entry or configuration files.",
      "Runs completely in the browser for privacy.",
    ],
    faqs: [
      {
        question: "What does 'Trim Leading & Trailing' do?",
        answer: "It removes spaces and tabs from the very beginning and very end of every line.",
      },
      {
        question: "What does 'Collapse Extra Spaces' do?",
        answer: "It replaces multiple consecutive spaces within a line with a single space.",
      },
    ],
    features: [
      "Trim leading and trailing whitespace",
      "Collapse multiple spaces into one",
      "Remove empty lines",
      "Real-time preview",
      "One-click copy to clipboard",
    ],
    tips: [
      "Use before comparing two text strings to avoid false negatives",
      "Clean up text copied from badly formatted PDFs",
      "Normalize user input before saving to a database",
    ],
  },
  {
    slug: "text-sorter",
    name: "Text Sorter",
    category: "Text",
    shortDescription: "Sort text lines alphabetically (A-Z, Z-A), numerically, or by length.",
    heroTitle: "Sort lists and lines instantly",
    heroDescription:
      "Sort lines of text alphabetically, in reverse, numerically, or by line length with options to ignore case.",
    about:
      "Text Sorter helps you quickly organize unsorted lists, tags, or code lines in the exact order you need.",
    howToUse: [
      "Paste your unsorted list into the input box.",
      "Select a sorting method: A-Z, Z-A, Length, or Numeric.",
      "Copy the sorted result back to your clipboard.",
    ],
    whyUse: [
      "No need to use a heavy spreadsheet app just to sort a list.",
      "Works perfectly for organizing tags, names, or code imports.",
      "Client-side processing means zero latency and high privacy.",
    ],
    faqs: [
      {
        question: "Does it support numeric sorting?",
        answer: "Yes, you can choose numeric sorting to properly order lines that start with numbers (e.g., 2 before 10).",
      },
      {
        question: "Can it ignore case while sorting?",
        answer: "Yes, there is a toggle to enable or disable case-sensitive sorting.",
      },
    ],
    features: [
      "Sort alphabetically (A-Z and Z-A)",
      "Sort by line length",
      "Sort numerically",
      "Case-sensitive or insensitive sorting",
      "Remove duplicates option",
    ],
    tips: [
      "Use 'Remove duplicates' to clean your list before sorting",
      "Sort CSS properties alphabetically for better code organization",
      "Sort tags by length to create visual 'tag clouds'",
    ],
  },
  {
    slug: "prefix-suffix-adder",
    name: "Prefix & Suffix Adder",
    category: "Text",
    shortDescription: "Add a custom prefix or suffix to each line of text.",
    heroTitle: "Batch add prefixes and suffixes",
    heroDescription:
      "Quickly prepend or append custom text to every single line in a list.",
    about:
      "Prefix & Suffix Adder is a huge time-saver for generating arrays, formatting SQL lists, or building HTML tags around bulk text.",
    howToUse: [
      "Paste a list of text into the input area.",
      "Type the desired prefix (e.g., <li>) and suffix (e.g., </li>).",
      "The tool updates all lines instantly in the output area.",
    ],
    whyUse: [
      "Eliminates repetitive manual typing or cursor manipulation.",
      "Perfect for wrapping lists in quotes, brackets, or HTML tags.",
      "All processing happens privately in your browser.",
    ],
    faqs: [
      {
        question: "Can I use spaces in the prefix/suffix?",
        answer: "Yes, any spaces you type will be exactly prepended or appended to the lines.",
      },
      {
        question: "Does it skip empty lines?",
        answer: "There is an option you can toggle to skip adding prefixes/suffixes to empty lines.",
      },
    ],
    features: [
      "Add custom text to the beginning of lines",
      "Add custom text to the end of lines",
      "Option to ignore empty lines",
      "Real-time preview",
      "Instant copy to clipboard",
    ],
    tips: [
      "Use prefix \" and suffix \", to format text into a JSON or SQL array",
      "Wrap lines in <li> and </li> for quick HTML lists",
      "Add a comma suffix to convert vertical lists to CSV format",
    ],
  },
  {
    slug: "line-numberer",
    name: "Line Numberer",
    category: "Text",
    shortDescription: "Add line numbers to text lines with customizable format and padding.",
    heroTitle: "Add line numbers to any text",
    heroDescription:
      "Prepend sequential line numbers to text, code snippets, or lists with custom separators and padding.",
    about:
      "Line Numberer makes it easy to reference specific lines in documentation, code reviews, or raw text files.",
    howToUse: [
      "Paste text into the input box.",
      "Customize the starting number, padding style, and separator (e.g., dot, colon).",
      "Copy the numbered text.",
    ],
    whyUse: [
      "Great for sharing code snippets that need line referencing.",
      "Useful for numbering long lists of names or items.",
      "Fully customizable and works locally in the browser.",
    ],
    faqs: [
      {
        question: "What is zero-padding?",
        answer: "Zero-padding adds leading zeros to numbers so they all align perfectly (e.g., 01, 02... 10).",
      },
      {
        question: "Can I skip empty lines?",
        answer: "Yes, you can choose whether empty lines increment the counter or are skipped.",
      },
    ],
    features: [
      "Custom starting number",
      "Zero-padding for visual alignment",
      "Custom separator choices (. , : |)",
      "Option to skip empty lines",
      "Real-time preview",
    ],
    tips: [
      "Use zero-padding to keep the text aligned vertically",
      "Use a pipe (|) separator when numbering code snippets",
      "Skip empty lines when numbering a list of disjointed paragraphs",
    ],
  },
  {
    slug: "whitespace-remover",
    name: "Whitespace Remover",
    category: "Text",
    shortDescription: "Remove all spaces, tabs, or newlines from text.",
    heroTitle: "Remove whitespace instantly",
    heroDescription:
      "Strip out spaces, tabs, empty lines, or all whitespace characters from your text completely.",
    about:
      "Whitespace Remover is an essential utility for cleaning up copy-pasted text, preparing code for minification manually, or cleaning data imports.",
    howToUse: [
      "Paste your text into the input area.",
      "Select what to remove: Spaces, Tabs, Newlines, or All Whitespace.",
      "The cleaned text appears instantly for copying.",
    ],
    whyUse: [
      "Quickly compress text blocks.",
      "Fix formatting errors from copying out of PDFs or Word documents.",
      "Runs instantly in the browser without server processing.",
    ],
    faqs: [
      {
        question: "Can I remove just newlines?",
        answer: "Yes, you can toggle specific whitespace characters like just newlines or just tabs.",
      },
      {
        question: "Is this different from the Text Trimmer tool?",
        answer: "Yes, Text Trimmer only cleans the edges and extra spaces, whereas this tool can remove ALL spaces entirely.",
      },
    ],
    features: [
      "Remove all spaces",
      "Remove all tabs",
      "Remove all line breaks (newlines)",
      "Remove all whitespace (spaces + tabs + newlines)",
      "Instant copy to clipboard",
    ],
    tips: [
      "Use 'Remove Newlines' to turn a vertical list into a single paragraph",
      "Use 'Remove All' to quickly strip spaces out of phone numbers or credit cards",
      "Remove tabs to clean up poorly aligned code snippets before pasting into a terminal",
    ],
  },
  {
    slug: "find-and-replace",
    name: "Find and Replace",
    category: "Text",
    shortDescription: "Find and replace text with case sensitivity and whole word options.",
    heroTitle: "Find and replace text in bulk",
    heroDescription:
      "Quickly find occurrences of a word or phrase and replace them all instantly.",
    about:
      "Find and Replace helps writers and coders bulk-edit text directly in the browser without needing to open a full IDE or word processor.",
    howToUse: [
      "Paste your text into the input area.",
      "Enter the text you want to find.",
      "Enter the replacement text.",
      "Toggle options like Match Case or Whole Word if needed.",
    ],
    whyUse: [
      "Faster than opening a desktop app for a quick edit.",
      "Great for renaming variables, names, or fixing common typos in bulk.",
      "100% private and runs securely on your device.",
    ],
    faqs: [
      {
        question: "What does 'Whole Word' mean?",
        answer: "It ensures that searching for 'cat' doesn't accidentally replace the 'cat' inside 'category'.",
      },
      {
        question: "Does it support regular expressions?",
        answer: "No, this tool performs literal text replacement. Use the Regex Tester tool for regex-based workflows.",
      },
    ],
    features: [
      "Find all occurrences instantly",
      "Replace all matches",
      "Match Case (case-sensitive) option",
      "Match Whole Word option",
      "Live preview of modified text",
    ],
    tips: [
      "Use 'Whole Word' when replacing variable names to avoid breaking other words",
      "Check the 'Match Case' option when renaming proper nouns",
      "You can leave the replace field empty to simply delete the matched text",
    ],
  },
  {
    slug: "text-word-wrap",
    name: "Text Word Wrap",
    category: "Text",
    shortDescription: "Wrap text lines at a specified column width.",
    heroTitle: "Wrap text to specific column widths",
    heroDescription:
      "Automatically wrap long paragraphs and lines of text to a specific character column width.",
    about:
      "Text Word Wrap is a formatting tool useful for writing email plain-text fallbacks, writing git commit messages, or formatting code comments to a standard width like 80 characters.",
    howToUse: [
      "Paste your long text into the input area.",
      "Enter the desired character width (e.g., 80).",
      "The tool wraps the text at the nearest space before the column limit.",
    ],
    whyUse: [
      "Ensures plain text emails read well on all devices.",
      "Fixes horizontal scrolling issues in code editors.",
      "No data is sent to the server.",
    ],
    faqs: [
      {
        question: "Will it cut words in half?",
        answer: "No, the tool intelligently wraps at the last space before the column width limit to preserve words.",
      },
      {
        question: "What happens to existing line breaks?",
        answer: "Existing line breaks and paragraphs are preserved during the wrapping process.",
      },
    ],
    features: [
      "Custom character width limit",
      "Word-safe wrapping (does not split words)",
      "Preserves existing paragraphs",
      "Live preview",
      "Instant copy to clipboard",
    ],
    tips: [
      "Use 80 characters for standard code comments and git commit messages",
      "Use 60-70 characters for plain-text email newsletters",
      "Long URLs cannot be split, so they may exceed the column limit",
    ],
  },
  {
    slug: "text-diff-checker",
    name: "Text Diff Checker",
    category: "Text",
    shortDescription: "Compare two texts to highlight line differences.",
    heroTitle: "Compare text and find differences",
    heroDescription:
      "Quickly compare two text documents, code files, or configurations to see exactly what changed.",
    about:
      "Text Diff Checker helps developers and writers spot insertions, deletions, and modifications between two versions of text without needing git or an IDE.",
    howToUse: [
      "Paste the original text into the 'Original' box.",
      "Paste the new text into the 'Modified' box.",
      "The tool instantly highlights the line-by-line differences.",
    ],
    whyUse: [
      "Spot tiny typos or missing punctuation instantly.",
      "Compare configuration files (JSON, YAML) before deploying.",
      "All comparisons happen in the browser, keeping your data secure.",
    ],
    faqs: [
      {
        question: "Does it compare word-by-word or line-by-line?",
        answer: "This tool performs a line-by-line comparison, highlighting lines that were added or removed.",
      },
      {
        question: "Is there a limit on how much text I can compare?",
        answer: "It handles large files efficiently, up to a few megabytes in size, directly in your browser.",
      },
    ],
    features: [
      "Line-by-line diff comparison",
      "Highlight added (green) and removed (red) lines",
      "Real-time comparison",
      "Handles long text and code",
      "No data sent to server",
    ],
    tips: [
      "Use this to review changes in a legal document or contract draft",
      "Compare two API JSON responses to see what data changed",
      "Format your code before comparing to get a cleaner diff",
    ],
  },
  {
    slug: "text-indent-formatter",
    name: "Text Indent Formatter",
    category: "Text",
    shortDescription: "Indent or un-indent lines of text by tabs or spaces.",
    heroTitle: "Indent text and code easily",
    heroDescription:
      "Bulk add or remove indentation from lists, code blocks, and plain text using spaces or tabs.",
    about:
      "Text Indent Formatter is a simple utility to fix indentation issues when pasting code or text from different editors that mix tabs and spaces.",
    howToUse: [
      "Paste text into the input area.",
      "Select your indent type (Tabs or Spaces).",
      "Click 'Indent' to add indentation, or 'Un-Indent' to remove it.",
    ],
    whyUse: [
      "Quickly fix messy Python or YAML code indentation.",
      "Align lists and paragraphs uniformly.",
      "Works fully offline and instantly.",
    ],
    faqs: [
      {
        question: "Will un-indenting delete my text?",
        answer: "No, un-indenting only removes leading whitespace (spaces or tabs) up to the specified amount.",
      },
      {
        question: "Can I convert tabs to spaces?",
        answer: "You can un-indent completely and then re-indent with spaces.",
      },
    ],
    features: [
      "Add indentation (Tabs or Spaces)",
      "Remove indentation (Un-indent)",
      "Customizable space count (2, 4, 8)",
      "Instant preview",
      "One-click copy",
    ],
    tips: [
      "Use 2 spaces for JSON/YAML and 4 spaces for Python/Java",
      "Un-indent completely to flush all text to the left margin",
      "Use this to prepare code snippets for markdown files",
    ],
  },
  {
    slug: "csv-column-extractor",
    name: "CSV Column Extractor",
    category: "Text",
    shortDescription: "Extract or reorder specific columns from CSV data.",
    heroTitle: "Extract CSV columns without Excel",
    heroDescription:
      "Quickly pull out specific columns, names, or emails from raw CSV text using column indexes.",
    about:
      "CSV Column Extractor is perfect for quickly grabbing a list of emails, IDs, or specific data points from a large CSV dump without needing to open a heavy spreadsheet app.",
    howToUse: [
      "Paste raw CSV text into the input.",
      "Enter the column numbers you want to extract (e.g., 1, 3).",
      "Choose a separator (Comma or Tab).",
      "Copy the extracted output.",
    ],
    whyUse: [
      "Faster than opening Excel or writing a Python script.",
      "Great for extracting email lists for marketing tools.",
      "100% private processing in the browser.",
    ],
    faqs: [
      {
        question: "How do I specify columns?",
        answer: "Columns are 1-indexed. Entering '1' extracts the first column. Enter multiple columns separated by commas (e.g., 1, 3).",
      },
      {
        question: "Does it handle quotes in CSV?",
        answer: "This is a simple text splitter tool. It splits blindly by the delimiter. For advanced CSV parsing with escaped quotes, use the CSV to JSON tool.",
      },
    ],
    features: [
      "Extract single or multiple columns",
      "1-based column indexing",
      "Supports comma and tab delimiters",
      "Real-time extraction preview",
      "Copy extracted list instantly",
    ],
    tips: [
      "Extract just the email column (e.g. Column 2) for mailing lists",
      "Extract multiple columns (e.g. 1, 3) to drop unnecessary data",
      "Switch delimiter to Tab to parse TSV data pasted from Excel",
    ],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "Number",
    shortDescription: "Calculate percentages, percentage change, and reverse percentages.",
    heroTitle: "Quick percentage calculations",
    heroDescription:
      "Calculate what percent X is of Y, find percentage change between two values, or compute a percentage of a number instantly.",
    about:
      "Percentage Calculator covers the three most common percentage problems: finding a percent of a number, finding what percent one number is of another, and calculating percentage change between two values.",
    howToUse: [
      "Enter values in any of the three calculator modes.",
      "The result updates automatically.",
      "Switch between modes as needed.",
    ],
    whyUse: [
      "Handles the three most common percentage problems in one tool.",
      "No need to remember formulas — just plug in numbers.",
      "Instant calculations entirely in your browser.",
    ],
    faqs: [
      {
        question: "How is percentage change calculated?",
        answer: "Percentage change = ((New − Old) / |Old|) × 100. A positive result means an increase, negative means a decrease.",
      },
      {
        question: "Can it handle decimal percentages?",
        answer: "Yes, both input values and results support decimals.",
      },
      {
        question: "What is a reverse percentage?",
        answer: "A reverse percentage finds what percent one number is of another, e.g. what percent is 25 of 200?",
      },
    ],
    features: [
      "Calculate X% of a number",
      "Find what percent X is of Y",
      "Calculate percentage increase or decrease",
      "Decimal precision support",
      "Three calculator modes in one tool",
    ],
    tips: [
      "Use percentage change to compare sales figures month over month",
      "Use 'X% of Y' to calculate tips, discounts, and tax amounts",
      "Negative percentage change means a decrease",
    ],
  },
  {
    slug: "prime-number-checker",
    name: "Prime Number Checker",
    category: "Number",
    shortDescription: "Check if a number is prime and list its prime factors.",
    heroTitle: "Check prime numbers instantly",
    heroDescription:
      "Determine if any integer is prime and find its complete list of prime factors.",
    about:
      "Prime Number Checker is useful for math students, competitive programmers, and developers working with cryptography or hashing algorithms that rely on prime numbers.",
    howToUse: [
      "Enter any positive integer.",
      "The tool instantly tells you if it is prime.",
      "View the full prime factorization for composite numbers.",
    ],
    whyUse: [
      "Instant primality test without manual trial division.",
      "Full prime factorization shown for composite numbers.",
      "Helpful for math coursework and algorithm problems.",
    ],
    faqs: [
      {
        question: "Is 1 a prime number?",
        answer: "No. By mathematical definition, prime numbers must have exactly two distinct divisors: 1 and themselves. 1 has only one divisor.",
      },
      {
        question: "What is prime factorization?",
        answer: "Prime factorization breaks a number into a product of prime numbers, e.g. 12 = 2 × 2 × 3.",
      },
      {
        question: "What is the largest number I can check?",
        answer: "The tool works well up to numbers in the billions range directly in the browser.",
      },
    ],
    features: [
      "Instant prime or composite result",
      "Prime factorization display",
      "List all factors",
      "Handles large numbers efficiently",
      "100% client-side",
    ],
    tips: [
      "Use for competitive programming problems involving primes",
      "Check if RSA key components are prime",
      "Factor numbers to find GCD manually",
    ],
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    category: "Number",
    shortDescription: "Generate random numbers with custom min, max, and quantity settings.",
    heroTitle: "Generate random numbers fast",
    heroDescription:
      "Create one or many random integers or decimals within any range, suitable for testing, sampling, and games.",
    about:
      "Random Number Generator produces cryptographically-seeded random numbers using the browser's built-in crypto API for better randomness than standard Math.random().",
    howToUse: [
      "Set your minimum and maximum range.",
      "Choose how many numbers to generate.",
      "Toggle between integers and decimals.",
      "Click Generate and copy the results.",
    ],
    whyUse: [
      "Better randomness using the browser crypto API.",
      "Generate batches of random values for testing data.",
      "Supports both integer and decimal modes.",
    ],
    faqs: [
      {
        question: "Are these numbers truly random?",
        answer: "They use the browser's crypto.getRandomValues(), which provides cryptographically strong random values.",
      },
      {
        question: "Can I generate floating-point decimals?",
        answer: "Yes, toggle on 'Decimal Mode' to get random numbers with decimal precision.",
      },
      {
        question: "Is there a limit to how many numbers I can generate?",
        answer: "You can generate up to 10,000 numbers at once.",
      },
    ],
    features: [
      "Configurable min and max range",
      "Batch generation (1 to 10,000 numbers)",
      "Integer and decimal modes",
      "Cryptographically strong randomness",
      "Copy all results at once",
    ],
    tips: [
      "Use for generating test data and mock IDs",
      "Generate dice rolls by setting range 1-6",
      "Use decimal mode for random probability weights",
    ],
  },
  {
    slug: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    category: "Number",
    shortDescription: "Convert numbers (1–3999) to Roman numerals and back.",
    heroTitle: "Convert Roman numerals instantly",
    heroDescription:
      "Quickly convert between standard integers and Roman numeral notation in both directions.",
    about:
      "Roman Numeral Converter is a handy utility for historians, students, designers working with clock faces or chapter numbering, and developers building internationalization features.",
    howToUse: [
      "Enter a number (1–3999) to convert to Roman numerals.",
      "Or enter Roman numerals (e.g. XIV) to convert back to a number.",
      "The conversion is automatic and instant.",
    ],
    whyUse: [
      "Supports both conversion directions in a single tool.",
      "Handles full standard Roman numeral notation up to 3999.",
      "Useful for design, publishing, and academic work.",
    ],
    faqs: [
      {
        question: "What is the largest Roman numeral?",
        answer: "Standard Roman numerals go up to 3999 (MMMCMXCIX). Beyond that, a bar notation is required.",
      },
      {
        question: "Is 0 representable in Roman numerals?",
        answer: "No. Roman numerals do not have a symbol for zero.",
      },
      {
        question: "Are Roman numerals case-sensitive?",
        answer: "No, the tool accepts both uppercase (XIV) and lowercase (xiv) input.",
      },
    ],
    features: [
      "Number to Roman numeral conversion",
      "Roman numeral to number conversion",
      "Supports full range (1–3999)",
      "Case-insensitive Roman input",
      "Instant bidirectional conversion",
    ],
    tips: [
      "Use for book chapter numbering in documents",
      "Great for clock face design and decorative typography",
      "Test edge cases: 4 = IV, 9 = IX, 40 = XL, 90 = XC",
    ],
  },
  {
    slug: "time-duration-calculator",
    name: "Time Duration Calculator",
    category: "Number",
    shortDescription: "Add, subtract, and convert time durations in hours, minutes, and seconds.",
    heroTitle: "Calculate time durations easily",
    heroDescription:
      "Add or subtract multiple time durations and convert between hours, minutes, and seconds.",
    about:
      "Time Duration Calculator helps project managers, video editors, developers, and students sum up work logs, track elapsed time, or convert durations into different units.",
    howToUse: [
      "Enter one or more time durations in HH:MM:SS format.",
      "Choose to add or subtract them.",
      "View the total in multiple time unit formats.",
    ],
    whyUse: [
      "Accurately sum up work logs or video clip durations.",
      "No spreadsheet needed for simple time math.",
      "Converts result into total seconds, minutes, and hours.",
    ],
    faqs: [
      {
        question: "What format should I use for durations?",
        answer: "Enter durations as HH:MM:SS, MM:SS, or just seconds. The tool is flexible.",
      },
      {
        question: "Can I subtract durations?",
        answer: "Yes, you can mix addition and subtraction in a list of durations.",
      },
    ],
    features: [
      "Add multiple time durations",
      "Subtract durations",
      "Result shown in HH:MM:SS",
      "Result also in total seconds and minutes",
      "Simple HH:MM:SS or MM:SS input",
    ],
    tips: [
      "Sum up daily work hour logs at the end of the week",
      "Add video clip durations to calculate total video length",
      "Convert a result in seconds to hours by dividing by 3600",
    ],
  },
  {
    slug: "gcd-lcm-calculator",
    name: "GCD & LCM Calculator",
    category: "Number",
    shortDescription: "Calculate the Greatest Common Divisor and Least Common Multiple.",
    heroTitle: "Find GCD and LCM instantly",
    heroDescription:
      "Compute the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two or more numbers.",
    about:
      "GCD & LCM Calculator is essential for simplifying fractions, scheduling problems, and solving number theory exercises in math, engineering, and computer science.",
    howToUse: [
      "Enter two or more numbers separated by commas.",
      "The tool computes GCD and LCM instantly.",
      "Use the results for fraction simplification or scheduling problems.",
    ],
    whyUse: [
      "Handles more than two numbers simultaneously.",
      "Shows the step-by-step Euclidean algorithm for GCD.",
      "Instant results, no server required.",
    ],
    faqs: [
      {
        question: "What is GCD used for?",
        answer: "GCD is used to simplify fractions — divide numerator and denominator by their GCD.",
      },
      {
        question: "What is LCM used for?",
        answer: "LCM is used to find a common denominator when adding fractions with different denominators.",
      },
      {
        question: "Can I input more than two numbers?",
        answer: "Yes, enter any count of numbers separated by commas.",
      },
    ],
    features: [
      "GCD of two or more numbers",
      "LCM of two or more numbers",
      "Supports comma-separated input",
      "Uses efficient Euclidean algorithm",
      "Instant real-time calculation",
    ],
    tips: [
      "Use GCD to simplify fractions before adding or subtracting them",
      "LCM helps find the ideal meeting interval for two recurring events",
      "GCD of 1 means two numbers are coprime (no common factors)",
    ],
  },
  {
    slug: "factorial-calculator",
    name: "Factorial Calculator",
    category: "Number",
    shortDescription: "Compute factorials, combinations (nCr), and permutations (nPr).",
    heroTitle: "Calculate factorials and combinations",
    heroDescription:
      "Instantly compute n! (factorial), nCr (combinations), and nPr (permutations) for any valid integers.",
    about:
      "Factorial Calculator is useful for statistics, probability problems, and combinatorics exercises in math courses and competitive programming.",
    howToUse: [
      "Enter n for a factorial.",
      "Enter n and r for combinations (nCr) or permutations (nPr).",
      "Results appear instantly.",
    ],
    whyUse: [
      "Covers factorial, nCr, and nPr in a single tool.",
      "No calculator app needed for combinatorics problems.",
      "Handles n up to 20 (maximum safe factorial in JavaScript).",
    ],
    faqs: [
      {
        question: "What is n! (factorial)?",
        answer: "n! is the product of all positive integers from 1 to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.",
      },
      {
        question: "What is the difference between nCr and nPr?",
        answer: "nCr counts combinations where order does NOT matter. nPr counts permutations where order DOES matter.",
      },
      {
        question: "Why is there a limit on n?",
        answer: "JavaScript numbers lose precision past 2^53. Factorials above 20! exceed that range.",
      },
    ],
    features: [
      "Factorial (n!) calculation",
      "Combinations (nCr) calculation",
      "Permutations (nPr) calculation",
      "Supports n up to 20",
      "Instant client-side results",
    ],
    tips: [
      "Use nCr to calculate lottery odds",
      "Use nPr when order matters (e.g. race standings)",
      "0! = 1 by mathematical convention",
    ],
  },
  {
    slug: "number-to-words",
    name: "Number to Words",
    category: "Number",
    shortDescription: "Convert numeric figures into written English words.",
    heroTitle: "Convert numbers to English words",
    heroDescription:
      "Instantly spell out any number in English — useful for writing checks, legal documents, and formal writing.",
    about:
      "Number to Words converts any integer up to one trillion into its English word form, helping writers and developers avoid errors when transcribing numbers in formal contexts.",
    howToUse: [
      "Type or paste a number into the input field.",
      "The English word form appears instantly.",
      "Copy it for use in documents or code.",
    ],
    whyUse: [
      "Essential for check-writing and legal document drafting.",
      "Useful for generating test data with number labels.",
      "Handles numbers up to one trillion.",
    ],
    faqs: [
      {
        question: "Does it support negative numbers?",
        answer: "Yes, negative numbers are prefixed with 'negative' in the output.",
      },
      {
        question: "What is the maximum supported number?",
        answer: "The tool supports integers up to 999 trillion (999,999,999,999,999).",
      },
      {
        question: "Does it handle decimals?",
        answer: "No, this tool converts integers only. Decimal support may be added in a future update.",
      },
    ],
    features: [
      "Converts integers to English words",
      "Supports negative numbers",
      "Handles up to hundreds of trillions",
      "Handles special cases: 0, 11-19",
      "One-click copy to clipboard",
    ],
    tips: [
      "Use for filling out cheque amount fields",
      "Great for legal contracts that require numeric amounts spelled out",
      "Zero is spelled 'zero', not 'nil' or 'nought'",
    ],
  },
  {
    slug: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    category: "Number",
    shortDescription: "Calculate missing width or height from an aspect ratio.",
    heroTitle: "Calculate aspect ratios for any size",
    heroDescription:
      "Find missing dimensions for images, videos, and UI elements based on standard or custom aspect ratios.",
    about:
      "Aspect Ratio Calculator is essential for designers and developers who need to maintain correct proportions when resizing images, videos, or responsive UI containers.",
    howToUse: [
      "Select a preset ratio (e.g. 16:9) or enter a custom ratio.",
      "Enter either the width or height.",
      "The missing dimension is calculated instantly.",
    ],
    whyUse: [
      "Prevents distorted images when resizing for different screens.",
      "Covers common video, photo, and social media aspect ratios.",
      "Works completely offline in the browser.",
    ],
    faqs: [
      {
        question: "What is aspect ratio?",
        answer: "Aspect ratio is the proportional relationship between width and height, e.g. 16:9 means for every 16 units of width, there are 9 units of height.",
      },
      {
        question: "Can I enter a custom ratio?",
        answer: "Yes, you can enter any W:H ratio in the custom ratio fields.",
      },
      {
        question: "What units are used?",
        answer: "The tool is unit-agnostic. You can use pixels, centimetres, inches — just be consistent.",
      },
    ],
    features: [
      "Common presets: 16:9, 4:3, 1:1, 3:2, 9:16",
      "Custom ratio input",
      "Solve for width or height",
      "Pixel-perfect results",
      "Instant real-time calculation",
    ],
    tips: [
      "Use 16:9 for YouTube thumbnails and video embeds",
      "Use 1:1 for Instagram post images",
      "Use 9:16 for mobile stories and TikTok-style vertical video",
    ],
  },
  {
    slug: "curl-to-fetch",
    name: "cURL to Fetch & Axios Converter",
    category: "Data",
    shortDescription: "Convert cURL commands to modern JavaScript fetch() and axios code.",
    heroTitle: "Convert cURL to JavaScript Fetch and Axios code",
    heroDescription: "Instantly turn raw cURL terminal commands into ready-to-run fetch or axios API calls.",
    about: "cURL to Fetch converter allows developers to seamlessly migrate API examples from terminal commands and Postman directly into modern JavaScript and TypeScript frontends.",
    howToUse: [
      "Paste any valid cURL command into the input area.",
      "Select Fetch API or Axios as your target syntax.",
      "Click Convert to Code and copy the generated JavaScript.",
    ],
    whyUse: [
      "Saves time manually translating headers, methods, and request bodies.",
      "Supports modern async/await syntax with JSON parsing.",
      "Runs 100% locally in your browser with zero network requests.",
    ],
    faqs: [
      {
        question: "Does it support custom headers and POST bodies?",
        answer: "Yes, it parses -H headers, -d/--data JSON and raw bodies, and -X HTTP methods.",
      },
      {
        question: "Is multi-line cURL syntax supported?",
        answer: "Yes, backslash line continuations are automatically normalized and parsed.",
      },
    ],
    features: [
      "Supports Fetch and Axios syntax",
      "Auto-formats request bodies and headers",
      "Async/await ready code generation",
      "One-click copy to clipboard",
    ],
    tips: [
      "Ensure double quotes in JSON bodies are properly escaped in your cURL command",
      "Use Axios mode if you are working with older Node.js versions without native fetch",
    ],
  },
  {
    slug: "html-table-to-json",
    name: "HTML Table to JSON Converter",
    category: "Data",
    shortDescription: "Extract and convert HTML table data into clean structured JSON.",
    heroTitle: "Convert HTML tables to JSON arrays instantly",
    heroDescription: "Paste any HTML table code and extract structured JSON objects with custom column keys.",
    about: "HTML Table to JSON Converter parses HTML <table> structures and extracts all table headers and table rows into clean, structured JSON arrays.",
    howToUse: [
      "Paste your raw HTML <table> markup in the input editor.",
      "Click Convert Table to JSON.",
      "Copy or export the structured JSON array for your app or database.",
    ],
    whyUse: [
      "Quickly scrape or extract data from web pages into API payloads.",
      "Accurately maps thead th headers to JSON object keys.",
      "Browser-based parsing with zero server transmission.",
    ],
    faqs: [
      {
        question: "What happens if a table has no <th> headers?",
        answer: "The tool automatically generates column keys like column_1, column_2 for every cell.",
      },
      {
        question: "Can I convert large tables?",
        answer: "Yes, modern browser DOM parsing handles tables with thousands of rows smoothly.",
      },
    ],
    features: [
      "Automatic thead header detection",
      "Formatted 2-space indented JSON output",
      "Handles nested cell text and whitespace cleaning",
      "Instant copy to clipboard",
    ],
    tips: [
      "Clean up empty rows in the HTML before converting for the cleanest output",
      "Inspect the generated JSON keys to ensure column headers were parsed accurately",
    ],
  },
  {
    slug: "markdown-to-html",
    name: "Markdown to HTML Converter",
    category: "Text",
    shortDescription: "Convert GitHub Flavored Markdown into clean, exportable HTML code.",
    heroTitle: "Convert Markdown to clean HTML markup",
    heroDescription: "Transform Markdown headers, lists, code blocks, and links into semantic HTML tags.",
    about: "Markdown to HTML Converter transforms standard Markdown into valid, semantic HTML tags suitable for embedding in blog posts, email templates, and websites.",
    howToUse: [
      "Type or paste your Markdown content in the editor.",
      "Click Convert to HTML.",
      "Copy the generated HTML code directly to your clipboard.",
    ],
    whyUse: [
      "Fast conversion without installing CLI dependencies.",
      "Outputs clean semantic HTML without unnecessary wrapper bloat.",
      "Runs completely in the browser for maximum privacy.",
    ],
    faqs: [
      {
        question: "Does this tool support fenced code blocks?",
        answer: "Yes, it converts ```language blocks into pre and code elements with syntax classes.",
      },
      {
        question: "Are images and hyperlinks converted?",
        answer: "Yes, standard Markdown image and link syntax are converted to img and a tags.",
      },
    ],
    features: [
      "Supports headers H1 through H6",
      "Ordered and unordered list conversion",
      "Fenced code blocks with language detection",
      "Blockquote and table conversion",
    ],
    tips: [
      "Use double line breaks for paragraph separation",
      "Check that your URLs are complete with https:// for link tags",
    ],
  },
  {
    slug: "html-to-markdown",
    name: "HTML to Markdown Converter",
    category: "Text",
    shortDescription: "Convert HTML source code and articles into clean Markdown syntax.",
    heroTitle: "Convert HTML code to clean Markdown",
    heroDescription: "Strip complex HTML tags and turn web pages and articles into clean Markdown documents.",
    about: "HTML to Markdown Converter transforms HTML markup into lightweight, clean Markdown syntax ideal for documentation, GitHub READMEs, and static site generators.",
    howToUse: [
      "Paste your HTML source code in the input area.",
      "Click Convert to Markdown.",
      "Copy the formatted Markdown for documentation or content publishing.",
    ],
    whyUse: [
      "Quickly convert HTML documentation into Markdown for GitHub or Notion.",
      "Strips unnecessary style tags and scripts while preserving text structure.",
      "Zero latency and 100% private.",
    ],
    faqs: [
      {
        question: "Will inline formatting like bold and italic be preserved?",
        answer: "Yes, strong, b, em, and i tags are properly mapped to **bold** and *italic* syntax.",
      },
      {
        question: "How are headings handled?",
        answer: "H1 through H6 elements are converted into corresponding # through ###### Markdown headings.",
      },
    ],
    features: [
      "Preserves link and image targets",
      "Converts code blocks and pre elements",
      "Cleans up excessive whitespace",
      "Handles HTML entity decoding",
    ],
    tips: [
      "Remove wrapper navigation or footer HTML before converting for best results",
      "Use the preview to verify list nesting and heading levels",
    ],
  },
  {
    slug: "case-converter-camel-snake-kebab",
    name: "Code Variable Case Converter",
    category: "Text",
    shortDescription: "Convert identifiers between camelCase, snake_case, kebab-case, and PascalCase.",
    heroTitle: "Convert variable names across code case conventions",
    heroDescription: "Simultaneously generate camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, and dot.case.",
    about: "Code Variable Case Converter helps software engineers convert variable names, function identifiers, database column names, and API keys across all major programming case styles.",
    howToUse: [
      "Enter one or more variable names (one per line).",
      "View all case transformations rendered in real-time.",
      "Click Copy next to your desired naming style.",
    ],
    whyUse: [
      "Standardize naming conventions when switching between frontend (camelCase) and backend/database (snake_case).",
      "Batch convert multi-line variable lists in seconds.",
      "Instant copy with zero page reload.",
    ],
    faqs: [
      {
        question: "Can I convert multiple lines at once?",
        answer: "Yes, you can paste dozens of variable names and every case style will transform all lines simultaneously.",
      },
      {
        question: "How does it handle existing delimiters like dashes or underscores?",
        answer: "The parser intelligently splits words on dashes, underscores, dots, and camelCase boundaries.",
      },
    ],
    features: [
      "camelCase, snake_case, kebab-case",
      "PascalCase, CONSTANT_CASE, dot.case, path/case",
      "Multi-line batch support",
      "Individual one-click copy buttons",
    ],
    tips: [
      "Use CONSTANT_CASE for environment variables and constants",
      "Use kebab-case for URL slugs, CSS class names, and filenames",
    ],
  },
  {
    slug: "utm-builder",
    name: "UTM Campaign URL Builder",
    category: "Data",
    shortDescription: "Create trackable marketing URLs for Google Analytics with UTM parameters.",
    heroTitle: "Build trackable UTM campaign URLs for Google Analytics",
    heroDescription: "Generate clean, validated Google Analytics campaign URLs with utm_source, utm_medium, and utm_campaign.",
    about: "UTM Campaign URL Builder helps marketers, developers, and creators build standardized trackable URLs to accurately measure campaign performance in Google Analytics (GA4).",
    howToUse: [
      "Enter your destination Website URL.",
      "Fill in Campaign Source (e.g. newsletter), Medium (e.g. email), and Name (e.g. launch).",
      "Optionally specify Campaign Term and Campaign Content.",
      "Copy your generated trackable campaign URL.",
    ],
    whyUse: [
      "Ensures zero typos and valid URL encoding in marketing campaigns.",
      "Helps keep tracking naming conventions consistent across marketing channels.",
      "Runs locally in your browser with zero data collection.",
    ],
    faqs: [
      {
        question: "Which UTM parameters are required?",
        answer: "Website URL, utm_source, utm_medium, and utm_campaign are standard requirements for GA4 attribution.",
      },
      {
        question: "Does it work with URLs that already have query parameters?",
        answer: "Yes, parameters are properly appended with & if query parameters already exist.",
      },
    ],
    features: [
      "Live real-time URL preview",
      "Standard GA4 UTM parameter validation",
      "One-click copy to clipboard",
      "Automatic URL encoding",
    ],
    tips: [
      "Use lowercase letters and underscores for consistent analytics aggregation",
      "Avoid spaces in UTM parameters to keep links clean and reliable",
    ],
  },
  {
    slug: "meta-tag-generator",
    name: "Open Graph & Meta Tag Generator",
    category: "Validation",
    shortDescription: "Generate HTML meta tags, OpenGraph (Facebook/LinkedIn), and Twitter Cards.",
    heroTitle: "Generate complete HTML Meta Tags and Social Cards",
    heroDescription: "Create SEO-friendly meta tags, Open Graph properties, and Twitter summary cards for your website.",
    about: "Open Graph & Meta Tag Generator creates standard HTML head tags, Open Graph meta tags for Facebook and LinkedIn, and Twitter Card specifications to optimize social sharing and search indexing.",
    howToUse: [
      "Enter your page title, description, and canonical URL.",
      "Provide an image URL for social media share previews.",
      "Optionally enter author name and Twitter handle.",
      "Copy the generated HTML snippet into your website <head> tag.",
    ],
    whyUse: [
      "Maximizes click-through rates on social media with rich preview cards.",
      "Includes character count guides to avoid search engine snippet truncation.",
      "Generates modern, standard-compliant metadata.",
    ],
    faqs: [
      {
        question: "What is the recommended Open Graph image size?",
        answer: "The recommended resolution for og:image is 1200x630 pixels with a 1.91:1 aspect ratio.",
      },
      {
        question: "What is the ideal title and description length for SEO?",
        answer: "Titles should be 50–60 characters, and descriptions should be 150–160 characters for optimal search display.",
      },
    ],
    features: [
      "Live character counter for title and description",
      "Open Graph (og:) and Twitter Card markup",
      "Canonical URL and author tagging",
      "Clean, copyable HTML code block",
    ],
    tips: [
      "Always use absolute URLs (https://...) for og:image and canonical links",
      "Ensure your image is publicly accessible so social crawlers can scrape it",
    ],
  },
  {
    slug: "robots-txt-generator",
    name: "Robots.txt Generator",
    category: "Validation",
    shortDescription: "Visual builder for search engine crawler directives and sitemap declarations.",
    heroTitle: "Create optimized robots.txt files in seconds",
    heroDescription: "Configure search engine crawler rules, disallow private directories, and add sitemap links.",
    about: "Robots.txt Generator gives webmasters and developers an interactive interface to build robots.txt files that guide Googlebot, Bingbot, and AI crawlers on what pages to index.",
    howToUse: [
      "Select your default crawler policy (Allow or Disallow).",
      "Enter paths you wish to disallow or allow specifically.",
      "Add your sitemap URL and optional crawl delay.",
      "Toggle AI bot blocking if desired and copy the generated robots.txt.",
    ],
    whyUse: [
      "Prevents indexing of private staging directories, admin pages, and APIs.",
      "Includes one-click blocking of common AI scraping bots.",
      "Valid syntax guaranteed according to standard Robots Exclusion Protocol.",
    ],
    faqs: [
      {
        question: "Where should the robots.txt file be placed?",
        answer: "Upload the generated file to the root directory of your domain (e.g. https://example.com/robots.txt).",
      },
      {
        question: "Can robots.txt hide sensitive pages from users?",
        answer: "No. Robots.txt is publicly readable. Sensitive pages should always be protected by authentication.",
      },
    ],
    features: [
      "AI bot blocking toggle (GPTBot, CCBot, ClaudeBot)",
      "Multi-path allow/disallow configuration",
      "Sitemap and crawl-delay directives",
      "Instant copy to clipboard",
    ],
    tips: [
      "Always test your robots.txt file in Google Search Console after uploading",
      "Remember that robots.txt paths are case-sensitive",
    ],
  },
  {
    slug: "color-shades-generator",
    name: "Color Shades & Tint Generator",
    category: "Design",
    shortDescription: "Generate a full 50-950 Tailwind/CSS palette of tints and shades from any base color.",
    heroTitle: "Generate 50–950 color shades and Tailwind palettes",
    heroDescription: "Create harmonious lighter tints and darker shades from any HEX or RGB color code.",
    about: "Color Shades & Tint Generator allows UI/UX designers and frontend developers to create a full 50-950 color scale compatible with Tailwind CSS and modern design systems.",
    howToUse: [
      "Pick a color with the color picker or enter a HEX code.",
      "Explore the generated 50 through 950 color swatches.",
      "Click any swatch to copy its HEX code or copy the full Tailwind config.",
    ],
    whyUse: [
      "Quickly generate accessible color palettes for buttons, borders, and backgrounds.",
      "Generates ready-to-paste Tailwind CSS theme configuration JSON.",
      "Smooth mathematical tint and shade blending algorithms.",
    ],
    faqs: [
      {
        question: "How are the 50 to 950 shades calculated?",
        answer: "Lighter tints (50-400) blend toward pure white, while darker shades (600-950) blend mathematically toward black.",
      },
      {
        question: "Can I use this with Tailwind CSS v3 and v4?",
        answer: "Yes, the exported JSON format works seamlessly with Tailwind theme color extensions.",
      },
    ],
    features: [
      "Interactive visual color picker and hex input",
      "Full 11-step 50 to 950 palette",
      "Exportable Tailwind CSS configuration",
      "One-click copy for individual hex codes",
    ],
    tips: [
      "Use 500 for primary buttons and 50/100 for subtle card backgrounds",
      "Use 700 to 900 for dark mode accents and accessible text on light backgrounds",
    ],
  },
  {
    slug: "json-size-analyzer",
    name: "JSON Size & Depth Analyzer",
    category: "Data",
    shortDescription: "Inspect byte size, minified size, gzip estimate, key counts, and nesting depth.",
    heroTitle: "Analyze JSON payload size, gzip estimate, and depth",
    heroDescription: "Measure byte weight, estimated gzip size, total key counts, and object nesting levels.",
    about: "JSON Size & Depth Analyzer helps backend and frontend engineers analyze the payload weight, compression savings, and structural complexity of API responses.",
    howToUse: [
      "Paste any JSON string or payload into the input box.",
      "View instant metrics on raw size, minified size, and estimated gzip transfer weight.",
      "Review nesting depth and total object/array counts to optimize API performance.",
    ],
    whyUse: [
      "Catch bloated API responses before shipping code to production.",
      "Calculate realistic over-the-wire data transfer metrics for mobile users.",
      "100% private analysis with zero data leaving your browser.",
    ],
    faqs: [
      {
        question: "How is the gzip size estimated?",
        answer: "Gzip size is calculated based on standard DEFLATE compression ratios for JSON structures (~65% reduction).",
      },
      {
        question: "What is nesting depth?",
        answer: "Nesting depth measures how many layers of nested objects and arrays exist inside the JSON payload.",
      },
    ],
    features: [
      "Raw bytes and human-readable KB/MB sizes",
      "Minification savings percentage",
      "Total key, object, and array counters",
      "Maximum nesting depth measurement",
    ],
    tips: [
      "Keep API response depth under 6-8 levels to ensure high frontend parsing performance",
      "Minifying JSON before transmission saves noticeable bandwidth on high-throughput endpoints",
    ],
  },
  {
    slug: "timestamp-to-iso",
    name: "Timestamp to ISO 8601 Converter",
    category: "Number",
    shortDescription: "Convert Unix timestamps (seconds/ms) to ISO 8601 UTC and local date formats.",
    heroTitle: "Convert Unix timestamps to ISO 8601 UTC dates",
    heroDescription: "Convert epoch seconds and milliseconds into standard ISO 8601, RFC 2822, and local timestamps.",
    about: "Timestamp to ISO 8601 Converter translates Unix epoch timestamps into standardized UTC ISO 8601 strings (YYYY-MM-DDTHH:mm:ss.sssZ) and readable local dates.",
    howToUse: [
      "Enter a Unix timestamp (10-digit seconds or 13-digit milliseconds) or an ISO date string.",
      "Click Set to Current Time to inspect the present moment.",
      "Copy your desired date format with one click.",
    ],
    whyUse: [
      "Quickly debug timestamps in server logs and database records.",
      "Automatically detects seconds vs milliseconds based on digit length.",
      "Provides both UTC and local timezone breakdowns.",
    ],
    faqs: [
      {
        question: "How does it detect seconds versus milliseconds?",
        answer: "Timestamps with 10 digits are treated as seconds; 13 digits or more are parsed as milliseconds.",
      },
      {
        question: "Can I enter a date string to get an ISO timestamp?",
        answer: "Yes, you can enter readable date strings (e.g. 2026-03-16) to convert them to epoch milliseconds and ISO UTC.",
      },
    ],
    features: [
      "ISO 8601 UTC string generation",
      "RFC 2822 and local time formats",
      "Epoch seconds and milliseconds display",
      "Current timestamp generator button",
    ],
    tips: [
      "Always store and transmit dates in ISO 8601 UTC format in REST and GraphQL APIs",
      "Remember that JavaScript Date.now() returns milliseconds, while Unix standard uses seconds",
    ],
  },
  {
    slug: "hex-to-ascii",
    name: "Hex to ASCII Converter",
    category: "Encoding",
    shortDescription: "Convert Hexadecimal strings to plain ASCII text and encode text into Hex dumps.",
    heroTitle: "Convert Hex to ASCII text and text to Hexadecimal",
    heroDescription: "Decode hex byte dumps into readable text and encode strings into space-separated or prefixed Hex.",
    about: "Hex to ASCII Converter converts hexadecimal numbers and byte sequences into readable ASCII characters, and encodes plain text into clean hexadecimal values.",
    howToUse: [
      "Enter a Hexadecimal string (e.g. 48 65 6c 6c 6f) or plain text.",
      "Choose your preferred Hex formatting (space-separated, continuous, or 0x prefixed).",
      "Click Hex to ASCII or ASCII to Hex to transform.",
    ],
    whyUse: [
      "Decode network packet dumps, binary streams, and memory hex values.",
      "Cleanly handles spaces, 0x prefixes, and continuous hex strings.",
      "100% client-side decoding with zero external services.",
    ],
    faqs: [
      {
        question: "Does it matter if hex characters are uppercase or lowercase?",
        answer: "No, the decoder supports both uppercase (4A) and lowercase (4a) hexadecimal characters.",
      },
      {
        question: "What happens if the hex string has an odd length?",
        answer: "Hex strings must have an even number of digits (2 hex digits per ASCII byte). An error will be shown if invalid.",
      },
    ],
    features: [
      "Bidirectional conversion (Hex <-> ASCII)",
      "Space, continuous, and 0x prefix formatting",
      "Handles arbitrary text length",
      "Instant copy to clipboard",
    ],
    tips: [
      "Use 0x prefix mode when exporting hex constants for C, C++, or Solidity smart contracts",
      "Ensure non-hex characters like punctuation are stripped before decoding",
    ],
  },
  {
    slug: "tsv-to-csv",
    name: "TSV to CSV Converter",
    category: "Data",
    shortDescription: "Convert Tab-Separated Values (TSV) to Comma-Separated Values (CSV) and vice-versa.",
    heroTitle: "Convert TSV to CSV and CSV to TSV fast",
    heroDescription: "Seamlessly convert tab-delimited spreadsheet data into comma-separated files with proper quote escaping.",
    about: "TSV to CSV Converter allows data analysts, researchers, and developers to convert between Tab-Separated Values and Comma-Separated Values while maintaining proper quote and delimiter escaping.",
    howToUse: [
      "Paste your TSV or CSV data into the input box.",
      "Click TSV to CSV or CSV to TSV.",
      "Copy the converted tabular output for Excel, Google Sheets, or database imports.",
    ],
    whyUse: [
      "Effortlessly migrate data copied from Excel into CSV files.",
      "Properly handles embedded commas, newlines, and double quotes.",
      "Runs completely offline in your browser session.",
    ],
    faqs: [
      {
        question: "How are cells with embedded commas handled when converting to CSV?",
        answer: "Any cell containing commas, quotes, or newlines is safely enclosed in double quotes according to RFC 4180.",
      },
      {
        question: "Can I paste directly from Excel or Google Sheets?",
        answer: "Yes! When you copy cells from a spreadsheet, clipboard data is formatted as TSV, which converts instantly to CSV.",
      },
    ],
    features: [
      "Bidirectional TSV <-> CSV transformation",
      "RFC 4180 compliant quotation escaping",
      "Multi-row batch processing",
      "Instant copy to clipboard",
    ],
    tips: [
      "Copying rows from Google Sheets or Excel pastes as TSV by default",
      "Use CSV format for broad compatibility with database importing tools",
    ],
  },
  {
    slug: "email-extractor",
    name: "Email Extractor from Text",
    category: "Text",
    shortDescription: "Scan and extract all valid unique email addresses from unstructured text.",
    heroTitle: "Extract and deduplicate email addresses from text",
    heroDescription: "Extract all email addresses from documents, code, logs, and websites with sorting and deduplication.",
    about: "Email Extractor from Text scans unstructured text, source code, and documents to extract, deduplicate, and organize all valid email addresses.",
    howToUse: [
      "Paste text, logs, or HTML containing email addresses into the editor.",
      "Choose output format (one per line, comma-separated, or JSON array).",
      "Optionally enable alphabetical sorting and lowercase normalization.",
      "Click Extract Emails and copy the results.",
    ],
    whyUse: [
      "Quickly harvest contact lists from newsletters, meeting notes, or source code.",
      "Automatically deduplicates repeated email addresses.",
      "100% private: no emails are ever sent to or stored on a server.",
    ],
    faqs: [
      {
        question: "Does it filter out duplicate emails?",
        answer: "Yes, all duplicate email addresses are automatically merged into a single unique entry.",
      },
      {
        question: "Is my text or email list stored anywhere?",
        answer: "No. Extraction runs entirely in your browser RAM and is immediately discarded when you close the tab.",
      },
    ],
    features: [
      "Standard RFC 5322 regex extraction",
      "Automatic deduplication and counter",
      "Multiple export formats (Newline, Comma, JSON)",
      "Alphabetical sorting and lowercase conversion",
    ],
    tips: [
      "Use comma-separated mode when pasting directly into email client BCC fields",
      "Use JSON array mode when importing emails into database seed scripts",
    ],
  },
  {
    slug: "url-extractor",
    name: "URL & Link Extractor",
    category: "Text",
    shortDescription: "Extract and filter all HTTP/HTTPS links from raw text or source code.",
    heroTitle: "Extract and filter URLs from raw text and HTML",
    heroDescription: "Pull all web links and HTTP/HTTPS URLs from articles, source code, and documents.",
    about: "URL & Link Extractor scans text, HTML source code, and logs to extract all valid web links with optional domain filtering and deduplication.",
    howToUse: [
      "Paste text containing web links into the input box.",
      "Optionally enter a domain filter (e.g. github.com) to isolate specific links.",
      "Click Extract URLs and copy the clean link list.",
    ],
    whyUse: [
      "Quickly collect references and resource links from research documents.",
      "Filters out trailing punctuation like periods and brackets automatically.",
      "Client-side processing ensures fast performance.",
    ],
    faqs: [
      {
        question: "Does it support both HTTP and HTTPS links?",
        answer: "Yes, it extracts all links starting with http:// or https://.",
      },
      {
        question: "How does domain filtering work?",
        answer: "Entering a domain like example.com keeps only URLs containing that domain in the output.",
      },
    ],
    features: [
      "Robust URL regex extraction",
      "Domain keyword filtering",
      "Automatic URL deduplication",
      "Live extracted link counter",
    ],
    tips: [
      "Use domain filtering to isolate API endpoints from third-party links",
      "Clean link lists can be pasted into bulk URL checkers or sitemaps",
    ],
  },
  {
    slug: "read-time-calculator",
    name: "Reading & Speaking Time Calculator",
    category: "Text",
    shortDescription: "Estimate reading time, speech duration, and text readability metrics.",
    heroTitle: "Calculate reading time and speaking duration for articles",
    heroDescription: "Estimate silent reading time, speech duration, word counts, and sentence metrics.",
    about: "Reading & Speaking Time Calculator calculates accurate reading duration and speech time based on words per minute (WPM), helping bloggers, speakers, and copywriters pace their content.",
    howToUse: [
      "Paste your article, speech draft, or script into the editor.",
      "Adjust Reading Speed (default 225 WPM) or Speaking Speed (default 130 WPM) if needed.",
      "View instant metrics on duration, word counts, and sentence complexity.",
    ],
    whyUse: [
      "Add accurate '5 min read' badges to your blog posts and articles.",
      "Time speeches and presentations accurately before rehearsing.",
      "Provides character, word, sentence, and paragraph statistics.",
    ],
    faqs: [
      {
        question: "What is the average reading speed for adults?",
        answer: "The average adult reads silently at approximately 200 to 250 words per minute (WPM).",
      },
      {
        question: "What is the standard speaking rate for presentations?",
        answer: "A comfortable, engaging presentation speech rate is between 120 and 150 words per minute.",
      },
    ],
    features: [
      "Customizable reading WPM and speaking WPM",
      "Minutes and seconds precision",
      "Character counters with and without whitespace",
      "Average word length and sentence structure stats",
    ],
    tips: [
      "Aim for 3 to 7 minute reading times for optimal blog engagement",
      "For keynotes and presentations, budget 1 minute per 130 words of script",
    ],
  },
  {
    slug: "json-key-sorter",
    name: "JSON Key Alphabetical Sorter",
    category: "Data",
    shortDescription: "Recursively sort all JSON keys alphabetically (A-Z or Z-A) for clean git diffs.",
    heroTitle: "Sort JSON keys alphabetically for clean diffs",
    heroDescription: "Recursively sort all object keys in JSON structures in ascending or descending alphabetical order.",
    about: "JSON Key Alphabetical Sorter organizes JSON object keys alphabetically at every nesting level, making configuration files and API snapshots easy to compare and version control in Git.",
    howToUse: [
      "Paste your JSON document in the input editor.",
      "Choose Ascending (A-Z) or Descending (Z-A) order.",
      "Select 2 spaces or 4 spaces indentation.",
      "Click Sort JSON Keys and copy the formatted result.",
    ],
    whyUse: [
      "Eliminates noisy git diffs caused by disordered object keys.",
      "Maintains clean and predictable schema configurations.",
      "Recursively sorts nested objects and arrays of objects.",
    ],
    faqs: [
      {
        question: "Are nested objects inside arrays also sorted?",
        answer: "Yes, the sorter traverses all nested objects, arrays, and sub-objects recursively.",
      },
      {
        question: "Are array item orders modified?",
        answer: "Array element order is preserved; only key/value pairs within objects are sorted alphabetically.",
      },
    ],
    features: [
      "Deep recursive key sorting",
      "A-Z and Z-A sorting order options",
      "Customizable JSON formatting indentation",
      "Instant syntax validation and copy",
    ],
    tips: [
      "Run your package.json or i18n translation files through this tool to maintain clean alphabetical keys",
      "Sorted keys make comparing two JSON API payloads significantly faster",
    ],
  },
  {
    slug: "punycode-converter",
    name: "Punycode (IDN) Converter",
    category: "Encoding",
    shortDescription: "Convert Internationalized Domain Names (IDNs) to Punycode (xn--) and back.",
    heroTitle: "Convert Internationalized Domain Names to Punycode",
    heroDescription: "Encode non-ASCII domain names and emojis into DNS-compatible Punycode and decode xn-- domains to text.",
    about: "Punycode (IDN) Converter translates Internationalized Domain Names containing accents, umlauts, non-Latin alphabets, and emojis into ASCII-compatible Punycode (xn--...) and vice versa.",
    howToUse: [
      "Enter one or more domain names (one per line).",
      "Click To Punycode (xn--) to convert to DNS ASCII format.",
      "Click To Unicode (Text) to decode Punycode into readable native characters.",
    ],
    whyUse: [
      "Essential for configuring DNS records and SSL certificates for international domains.",
      "Batch convert multiple domains in one click.",
      "Uses modern browser-native URL encoding standards.",
    ],
    faqs: [
      {
        question: "What is Punycode?",
        answer: "Punycode is a special encoding syntax used by the Domain Name System (DNS) to represent non-ASCII Unicode characters using limited ASCII letters, digits, and hyphens.",
      },
      {
        question: "Why do Punycode domains start with xn--?",
        answer: "The xn-- prefix is the standardized Internationalizing Domain Names in Applications (IDNA) indicator for Punycode strings.",
      },
    ],
    features: [
      "Bidirectional conversion (Unicode <-> Punycode)",
      "Multi-domain batch conversion support",
      "Emoji and non-Latin character support",
      "Instant copy to clipboard",
    ],
    tips: [
      "Use Punycode format when adding DNS records at your domain registrar",
      "Punycode ensures international domain names resolve reliably across all email and web servers",
    ],
  },
  {
    slug: "chmod-calculator",
    name: "Linux Chmod Permissions Calculator",
    category: "Data",
    shortDescription: "Calculate Linux/Unix file permissions visually with octal numbers and symbolic notation.",
    heroTitle: "Visual Linux Chmod Permissions Calculator",
    heroDescription: "Calculate Unix file permissions visually with read, write, execute checkboxes and octal codes.",
    about: "Linux Chmod Permissions Calculator helps system administrators and developers calculate and understand Unix/Linux file permissions with octal numbers (e.g. 755), symbolic strings (rwxr-xr-x), and executable commands.",
    howToUse: [
      "Check or uncheck Read, Write, and Execute boxes for Owner, Group, and Public.",
      "Or click a quick preset like 755, 644, or 600.",
      "Enter your target filename and copy the generated chmod command.",
    ],
    whyUse: [
      "Eliminates guesswork when configuring server and script permissions.",
      "Provides instant octal and symbolic permission representations.",
      "Includes standard secure server presets (644 web files, 600 SSH keys).",
    ],
    faqs: [
      {
        question: "What does chmod 755 mean?",
        answer: "755 gives the Owner full read/write/execute permissions (7), while Group and Public have read and execute permissions (5).",
      },
      {
        question: "What permission should SSH private keys have?",
        answer: "SSH private keys must be set to 600 (read/write for Owner only) or 400 (read-only for Owner).",
      },
    ],
    features: [
      "Interactive 3x3 permission matrix",
      "One-click standard presets (755, 644, 777, 600, 700, 400)",
      "Instant octal (755) and symbolic (-rwxr-xr-x) calculation",
      "Customizable copyable terminal command",
    ],
    tips: [
      "Never use 777 in production environments as it allows anyone to modify and execute your files",
      "Use 644 for static web files and 755 for directories and executable scripts",
    ],
  },
  {
    slug: "base64-to-image",
    name: "Base64 to Image Decoder & Downloader",
    category: "Design",
    shortDescription: "Convert Base64 data strings into viewable and downloadable PNG, JPEG, SVG, or WEBP images.",
    heroTitle: "Decode Base64 strings to downloadable images",
    heroDescription: "Paste Base64 data URIs or raw base64 strings to instantly preview and download the image file.",
    about: "Base64 to Image Decoder transforms base64 data strings and Data URIs into rendered image previews with format detection and one-click file downloads.",
    howToUse: [
      "Paste your Base64 string or data:image/... Data URI into the editor.",
      "View the live image preview, format, and estimated file size.",
      "Enter an optional filename and click Download Image.",
    ],
    whyUse: [
      "Quickly inspect and save images embedded in JSON payloads, CSS, or HTML.",
      "Auto-detects PNG, JPEG, WEBP, and SVG image formats.",
      "100% private: image decoding is performed entirely on your device.",
    ],
    faqs: [
      {
        question: "Does the tool accept raw base64 without data:image prefix?",
        answer: "Yes, it automatically detects and prefixes raw base64 strings if the data URI header is missing.",
      },
      {
        question: "Can I download the decoded image directly?",
        answer: "Yes, clicking the Download button saves the image directly to your device with the correct file extension.",
      },
    ],
    features: [
      "Automatic MIME type and extension detection",
      "Live visual image preview",
      "Custom filename output downloader",
      "Instant client-side decoding",
    ],
    tips: [
      "Verify the base64 string is complete to prevent image decoding artifacts",
      "Use this tool to extract logo assets and favicons embedded in inline CSS or HTML",
    ],
  },
  {
    slug: "css-box-shadow-generator",
    name: "CSS Box Shadow Generator",
    category: "Design",
    shortDescription: "Create custom CSS box shadows with live visual preview, opacity, spread, and inset controls.",
    heroTitle: "Interactive CSS Box Shadow Generator & Preview",
    heroDescription: "Design multi-layer CSS box shadows with live visual feedback, blur, spread radius, color, and inset controls.",
    about: "CSS Box Shadow Generator allows web developers and designers to craft smooth, modern drop shadows and inset shadows visually without guessing CSS pixel values.",
    howToUse: [
      "Adjust horizontal and vertical offset sliders.",
      "Fine-tune blur radius and spread radius.",
      "Pick your shadow color, box background, and opacity.",
      "Toggle Inset Shadow for inner shadow effects.",
      "Click Copy CSS Code to paste directly into your stylesheet.",
    ],
    whyUse: [
      "Visual real-time shadow manipulation eliminates trial-and-error in CSS.",
      "Supports modern multi-vendor prefixes for cross-browser compatibility.",
      "Includes instant color opacity and inset controls.",
    ],
    faqs: [
      {
        question: "What is the difference between blur and spread in CSS box-shadow?",
        answer: "Blur softens the edges of the shadow, while spread expands or contracts the shadow footprint before blurring.",
      },
      {
        question: "How do I create an inner shadow?",
        answer: "Check the 'Inset Shadow' option, which places the shadow inside the container frame instead of behind it.",
      },
    ],
    features: [
      "Interactive X and Y offset controls",
      "Blur and spread radius sliders",
      "Hex and RGBA color opacity picker",
      "Inset shadow toggle",
      "One-click CSS code copy",
    ],
    tips: [
      "Use negative spread radius with large blur to create soft, modern elevated cards",
      "Lower shadow opacity (10-20%) creates much cleaner, more realistic lighting",
    ],
  },
  {
    slug: "css-glassmorphism-generator",
    name: "CSS Glassmorphism Generator",
    category: "Design",
    shortDescription: "Create modern frosted glass UI cards with backdrop blur, transparency, and glossy borders.",
    heroTitle: "CSS Glassmorphism & Frosted Glass Generator",
    heroDescription: "Generate frosted glass UI effects with backdrop-filter blur, opacity, gloss highlights, and Tailwind CSS classes.",
    about: "CSS Glassmorphism Generator creates modern frosted glass cards and modal dialogs with backdrop-filter blur, background opacity, saturation, and subtle translucent borders.",
    howToUse: [
      "Adjust backdrop blur slider to control frosting intensity.",
      "Adjust background opacity to balance translucency and readability.",
      "Fine-tune border opacity to create crisp glossy edge highlights.",
      "Copy either the pure CSS code or Tailwind CSS utility classes.",
    ],
    whyUse: [
      "Modern UI aesthetic used in Apple macOS, Windows Fluent, and cutting-edge web apps.",
      "Generates both pure CSS and Tailwind CSS classes.",
      "Includes vendor prefixes (-webkit-backdrop-filter) for Safari compatibility.",
    ],
    faqs: [
      {
        question: "Why does backdrop-filter require a vendor prefix?",
        answer: "Safari requires -webkit-backdrop-filter for hardware-accelerated blur rendering.",
      },
      {
        question: "Does glassmorphism work on plain white backgrounds?",
        answer: "Glassmorphism looks best over vibrant gradients, patterns, or images where the blur refraction is visible.",
      },
    ],
    features: [
      "Backdrop blur and saturation controls",
      "Background and border opacity sliders",
      "Live vibrant gradient card preview",
      "Instant pure CSS and Tailwind CSS export",
    ],
    tips: [
      "Keep text contrast high by using pure white or black text with subtle text-shadow",
      "Add a 1px semi-transparent white border to give the illusion of physical glass edges",
    ],
  },
  {
    slug: "css-gradient-generator",
    name: "CSS Gradient Generator",
    category: "Design",
    shortDescription: "Create beautiful linear and radial CSS gradients with multi-color stops and angles.",
    heroTitle: "CSS Linear & Radial Gradient Generator",
    heroDescription: "Build smooth CSS gradients with multi-color stops, 360-degree angle controls, and curated color presets.",
    about: "CSS Gradient Generator lets frontend engineers and UI designers create vibrant linear and radial gradients with customizable color stops, angles, and one-click CSS copy.",
    howToUse: [
      "Select Linear or Radial gradient mode.",
      "Adjust the gradient angle dial or slider.",
      "Pick your color stops (supports 2 or 3 colors).",
      "Click one of the curated presets for instant inspiration.",
      "Copy the CSS code.",
    ],
    whyUse: [
      "Fast visual color blending with real-time gradient preview.",
      "Supports 360-degree orientation angles.",
      "Includes popular design system presets (Hyper, Sunset, Ocean, Emerald).",
    ],
    faqs: [
      {
        question: "What is the standard angle for diagonal gradients?",
        answer: "135 degrees (top-left to bottom-right) is the most popular angle in modern web design.",
      },
      {
        question: "Is there a fallback color in the generated CSS?",
        answer: "Yes, the code includes a solid background fallback for legacy browsers that do not support CSS gradients.",
      },
    ],
    features: [
      "Linear and Radial gradient modes",
      "360-degree angle slider",
      "Multi-stop color picker with hex inputs",
      "Curated gradient preset library",
      "Copyable CSS code with fallback",
    ],
    tips: [
      "Pair adjacent color hues (e.g. indigo to purple to pink) for smooth, non-muddy gradients",
      "Use radial gradients as ambient background glow under hero sections",
    ],
  },
  {
    slug: "css-border-radius-generator",
    name: "CSS Border Radius & Blob Generator",
    category: "Design",
    shortDescription: "Create unique organic shapes, blobs, and fancy border-radius styling with 8-point controls.",
    heroTitle: "8-Point CSS Border Radius & Organic Blob Generator",
    heroDescription: "Craft organic blob shapes and asymmetric border radii using 8-value CSS border-radius notation.",
    about: "CSS Border Radius & Blob Generator gives you full 8-point control over horizontal and vertical radii, enabling organic floating blobs and asymmetric shape styling.",
    howToUse: [
      "Adjust horizontal radius sliders for all four corners.",
      "Adjust vertical radius sliders for all four corners.",
      "Or pick from organic presets like Blob, Egg, Leaf, Water Drop, or Pebble.",
      "Copy the generated border-radius CSS property.",
    ],
    whyUse: [
      "Creates organic, fluid shapes without needing external SVG or vector files.",
      "Provides granular control over the 8-value border-radius slash syntax.",
      "Lightweight, 100% pure CSS solution.",
    ],
    faqs: [
      {
        question: "How does the 8-value border-radius syntax work?",
        answer: "The format 'h1 h2 h3 h4 / v1 v2 v3 v4' defines individual horizontal (h) and vertical (v) radii for top-left, top-right, bottom-right, and bottom-left corners.",
      },
      {
        question: "Can I animate border-radius blobs in CSS?",
        answer: "Yes, you can transition or keyframe-animate border-radius values smoothly to create morphing blobs.",
      },
    ],
    features: [
      "8-point independent corner sliders",
      "Live morphing shape preview",
      "Curated organic shape presets",
      "Instant copy to clipboard",
    ],
    tips: [
      "Combine an organic blob border-radius with a subtle CSS gradient for modern hero illustrations",
      "Animate border-radius between two blob states for a living background effect",
    ],
  },
  {
    slug: "svg-to-css-data-uri",
    name: "SVG to CSS Data URI Generator",
    category: "Design",
    shortDescription: "Convert SVG code into optimized, URL-encoded CSS background-image Data URIs.",
    heroTitle: "Convert SVG to URL-Encoded CSS Data URI",
    heroDescription: "Transform raw SVG markup into lightweight, URL-encoded CSS background-image data without base64 overhead.",
    about: "SVG to CSS Data URI Generator encodes raw SVG code into UTF-8 URL-encoded CSS data URIs. Unlike Base64 encoding, URL-encoded SVGs are smaller, compressible via Gzip, and remain human-readable.",
    howToUse: [
      "Paste your raw <svg> markup into the input editor.",
      "Click Generate CSS Data URI.",
      "Copy the background-image CSS rule and test in the live background preview.",
    ],
    whyUse: [
      "Up to 30% smaller payload than Base64 encoding.",
      "Eliminates extra HTTP requests for small UI icons and background patterns.",
      "Automatically injects required XML namespaces and cleans special characters.",
    ],
    faqs: [
      {
        question: "Why is URL encoding better than Base64 for SVG?",
        answer: "Base64 increases file size by ~33%, whereas UTF-8 URL encoding only escapes necessary characters, resulting in a much lighter footprint that compresses well with Gzip/Brotli.",
      },
      {
        question: "Does this require an xmlns attribute?",
        answer: "Yes, CSS data URIs require xmlns='http://www.w3.org/2000/svg', which our tool automatically injects if missing.",
      },
    ],
    features: [
      "RFC 3986 compliant URL encoding",
      "Automatic xmlns validation and injection",
      "Live repeating CSS background preview",
      "Smaller than Base64 encoding",
    ],
    tips: [
      "Use SVG data URIs for custom form select dropdown arrows and subtle grid backgrounds",
      "Ensure color hex values (#000) are URL-encoded (%23000) to render properly across all browsers",
    ],
  },
  {
    slug: "css-clamp-calculator",
    name: "CSS Clamp() Typography Calculator",
    category: "Design",
    shortDescription: "Generate fluid responsive font-size and spacing values using modern CSS clamp() formulas.",
    heroTitle: "Fluid CSS Clamp() Typography & Spacing Calculator",
    heroDescription: "Calculate mathematical CSS clamp(min, preferred, max) formulas for responsive fluid typography without media queries.",
    about: "CSS Clamp() Typography Calculator computes the exact linear equation and viewport-width (vw) slope needed for fluid typography that scales smoothly between minimum and maximum screen sizes.",
    howToUse: [
      "Enter your minimum and maximum viewport widths (e.g., 375px and 1440px).",
      "Enter your minimum and maximum font sizes (e.g., 16px and 36px).",
      "Adjust the preview viewport slider to verify responsive scaling.",
      "Copy the clamp() formula.",
    ],
    whyUse: [
      "Eliminates dozens of breakpoint media queries across your CSS.",
      "Guarantees pixel-perfect typography across all mobile, tablet, and desktop screens.",
      "Converts px to rem automatically based on your root font size.",
    ],
    faqs: [
      {
        question: "How does CSS clamp() work?",
        answer: "clamp(MIN, PREFERRED, MAX) keeps a value between MIN and MAX, scaling dynamically with the PREFERRED formula.",
      },
      {
        question: "Can I use clamp() for padding and margins?",
        answer: "Yes, clamp() works on any CSS length property including font-size, padding, margin, width, and gap.",
      },
    ],
    features: [
      "Linear interpolation slope calculation",
      "Automatic rem conversion",
      "Configurable root font size",
      "Interactive viewport width preview slider",
      "Live font-size readout in pixels",
    ],
    tips: [
      "Use clamp() on heading h1-h3 tags to prevent awkward line breaks on mobile screens",
      "Set your minimum viewport to 375px (iPhone standard) and maximum to 1440px or 1920px",
    ],
  },
  {
    slug: "css-flexbox-playground",
    name: "CSS Flexbox Generator & Playground",
    category: "Design",
    shortDescription: "Visual interactive builder for CSS Flexbox layouts with direction, alignment, and gap controls.",
    heroTitle: "Interactive CSS Flexbox Generator & Visual Playground",
    heroDescription: "Experiment with flex-direction, justify-content, align-items, flex-wrap, and gap with real-time visual cards.",
    about: "CSS Flexbox Generator & Playground provides an interactive canvas to visually test and generate CSS flexbox container code.",
    howToUse: [
      "Select flex-direction (row, column, row-reverse, column-reverse).",
      "Choose justify-content and align-items alignments.",
      "Adjust gap and flex-wrap properties.",
      "Add or remove items to test responsive wrapping.",
      "Copy the CSS code.",
    ],
    whyUse: [
      "Master CSS flexbox alignment rules visually without guessing.",
      "Instant copyable CSS container rules.",
      "Interactive item count testing.",
    ],
    faqs: [
      {
        question: "What is the difference between justify-content and align-items?",
        answer: "justify-content aligns items along the primary axis (horizontal in row mode), while align-items aligns along the cross axis (vertical in row mode).",
      },
      {
        question: "What does flex-wrap: wrap do?",
        answer: "It allows flex items to wrap onto multiple lines when there is not enough room in the container.",
      },
    ],
    features: [
      "Full primary and cross axis controls",
      "Live interactive flex container preview",
      "Adjustable gap and item counters",
      "One-click CSS code copy",
    ],
    tips: [
      "Use 'justify-content: space-between' with 'align-items: center' for navigation headers",
      "Use modern 'gap' property instead of adding margins to child elements",
    ],
  },
  {
    slug: "css-grid-generator",
    name: "CSS Grid Layout Generator",
    category: "Design",
    shortDescription: "Create multi-column and multi-row CSS grid layouts with interactive column and gap controls.",
    heroTitle: "CSS Grid Layout Generator & Code Builder",
    heroDescription: "Build responsive CSS grid layouts with customizable column/row matrices, fractional units, and Tailwind classes.",
    about: "CSS Grid Layout Generator lets you visually construct grid structures with custom column counts, row counts, and independent row/column gaps, generating both standard CSS and Tailwind CSS classes.",
    howToUse: [
      "Set desired number of columns (1 to 6) and rows (1 to 6).",
      "Adjust column gap and row gap sliders.",
      "Review the live interactive grid matrix.",
      "Copy pure CSS or Tailwind CSS utility classes.",
    ],
    whyUse: [
      "Simplifies two-dimensional layout creation in CSS.",
      "Provides both CSS Grid syntax and Tailwind CSS classes.",
      "Instant visual matrix feedback.",
    ],
    faqs: [
      {
        question: "When should I use CSS Grid instead of Flexbox?",
        answer: "Use CSS Grid for 2D layouts (rows AND columns simultaneously) and Flexbox for 1D layouts (single row OR single column).",
      },
      {
        question: "What does '1fr' mean in CSS grid?",
        answer: "1fr represents one fraction of the available space inside the grid container.",
      },
    ],
    features: [
      "Interactive column and row sliders",
      "Independent column and row gap controls",
      "Live cell grid preview",
      "Tailwind CSS class generator",
    ],
    tips: [
      "Use 'repeat(auto-fit, minmax(250px, 1fr))' in production for auto-responsive card grids",
      "Set distinct row and column gaps to improve layout hierarchy",
    ],
  },
  {
    slug: "svg-to-jsx",
    name: "SVG to React JSX Converter",
    category: "Design",
    shortDescription: "Convert SVG code into clean React and React Native JSX components with camelCase attributes.",
    heroTitle: "Convert SVG to React & Next.js JSX Components",
    heroDescription: "Transform raw SVG files into production-ready React JSX components with camelCase properties and TypeScript support.",
    about: "SVG to React JSX Converter cleans and transforms raw SVG markup into standard React and Next.js functional components, converting kebab-case SVG attributes (e.g. stroke-width -> strokeWidth) and stripping XML boilerplate.",
    howToUse: [
      "Paste raw SVG code into the editor.",
      "Enter a custom component name (e.g., UserIcon).",
      "Toggle TypeScript SVGProps support if desired.",
      "Click Convert to JSX Component and copy your component code.",
    ],
    whyUse: [
      "Eliminates manual attribute renaming in React.",
      "Removes XML DOCTYPE and comment bloat.",
      "Generates clean TypeScript or JavaScript components ready to import.",
    ],
    faqs: [
      {
        question: "Why do SVG attributes need to be camelCase in React?",
        answer: "React JSX maps HTML and SVG attributes to DOM properties, requiring camelCase naming like strokeWidth, fillRule, and clipPath.",
      },
      {
        question: "Does it support spreading props onto the SVG?",
        answer: "Yes, the generated component accepts and spreads props (like className, onClick, and size) onto the root <svg> element.",
      },
    ],
    features: [
      "Converts all kebab-case SVG attributes to camelCase",
      "Strips XML headers, DOCTYPE, and comments",
      "Custom component naming",
      "TypeScript SVGProps support",
      "One-click copy",
    ],
    tips: [
      "Pass 'props' to your SVG component so you can easily override width, height, and colors in Tailwind",
      "Set 'stroke=\"currentColor\"' to allow the icon color to inherit from parent CSS text colors",
    ],
  },
  {
    slug: "svg-optimizer",
    name: "SVG Code Minifier & Optimizer",
    category: "Design",
    shortDescription: "Minify and clean SVG code by stripping XML headers, editor metadata, and redundant tags.",
    heroTitle: "Minify & Clean SVG Code Online",
    heroDescription: "Strip bloated editor metadata from Figma, Illustrator, and Inkscape, compress whitespace, and reduce SVG file size.",
    about: "SVG Code Minifier & Optimizer cleans export bloat from vector editors (Adobe Illustrator, Sketch, Figma, Inkscape), removing unused namespaces, metadata, and redundant whitespace.",
    howToUse: [
      "Paste your uncompressed SVG code into the input field.",
      "Click Minify & Optimize SVG.",
      "View total bytes saved and inspect the rendered preview.",
      "Copy the cleaned, minified SVG markup.",
    ],
    whyUse: [
      "Reduces SVG file weight by up to 50% for faster web page loading.",
      "Strips unnecessary editor tags and private metadata.",
      "Includes live visual verification to ensure no graphics are corrupted.",
    ],
    faqs: [
      {
        question: "What metadata does this tool remove?",
        answer: "It removes XML declarations, DOCTYPE headers, Adobe/Figma/Sketch namespace definitions, empty defs, and whitespace.",
      },
      {
        question: "Will optimization alter the visual appearance of my SVG?",
        answer: "No, only non-rendering metadata and whitespace are removed; all paths, fills, and strokes remain intact.",
      },
    ],
    features: [
      "Strips XML headers, DOCTYPE, and metadata",
      "Removes Illustrator, Figma, and Inkscape tags",
      "Calculates exact byte savings and percentage",
      "Live SVG render preview",
    ],
    tips: [
      "Minify SVGs before embedding them inline into HTML or CSS to reduce DOM size",
      "Ensure paths have clean viewBox coordinates before minification",
    ],
  },
  {
    slug: "css-triangle-generator",
    name: "CSS Triangle Generator",
    category: "Design",
    shortDescription: "Create pure CSS triangles pointing in any direction with custom dimensions and colors.",
    heroTitle: "Pure CSS Triangle Generator & Code Builder",
    heroDescription: "Generate lightweight CSS border triangles pointing top, bottom, left, right, or diagonally with custom colors.",
    about: "CSS Triangle Generator uses the classic CSS border geometry technique to create pure vector triangles without images or SVGs, perfect for tooltips, popover arrows, and dropdown indicators.",
    howToUse: [
      "Select your triangle direction (Top, Bottom, Left, Right, or Diagonals).",
      "Adjust width and height sliders.",
      "Pick your triangle color.",
      "Copy the pure CSS code.",
    ],
    whyUse: [
      "Zero HTTP requests or extra asset dependencies.",
      "Works in all browsers back to IE6.",
      "Ideal for tooltip pointers, breadcrumbs, and accordion arrows.",
    ],
    faqs: [
      {
        question: "How do CSS border triangles work?",
        answer: "By setting width and height to 0 and applying colored borders opposite to transparent borders, the browser renders triangular border miters.",
      },
      {
        question: "Can I use CSS triangles in pseudo-elements?",
        answer: "Yes, CSS triangles are commonly placed inside ::before and ::after pseudo-elements with 'content: \"\"'.",
      },
    ],
    features: [
      "8 triangle directions (cardinal and diagonal)",
      "Custom width and height sliders",
      "Hex and RGB color picker",
      "Clean CSS code generator",
    ],
    tips: [
      "Attach your triangle to a tooltip box using 'position: absolute' on the ::after pseudo-element",
      "For diagonal triangles, set the adjacent borders to transparent",
    ],
  },
  {
    slug: "css-clip-path-generator",
    name: "CSS Clip-Path Shape Generator",
    category: "Design",
    shortDescription: "Create polygon, star, geometric, and banner shapes using CSS clip-path.",
    heroTitle: "CSS Clip-Path Shape & Polygon Generator",
    heroDescription: "Create custom geometric shapes, banners, hexagons, chevrons, and stars using modern CSS clip-path.",
    about: "CSS Clip-Path Shape Generator allows designers and developers to create complex vector mask shapes in pure CSS, including polygons, stars, chevrons, arrows, and speech bubbles.",
    howToUse: [
      "Choose a shape from the preset shape matrix (Hexagon, Star, Chevron, Arrow, Message, etc.).",
      "Review the live clipped card preview.",
      "Copy the clip-path and -webkit-clip-path CSS rules.",
    ],
    whyUse: [
      "Creates stunning geometric UI masks without image masks or SVG clipping.",
      "Responsive and scales automatically with container dimensions.",
      "Hardware-accelerated rendering in modern browsers.",
    ],
    faqs: [
      {
        question: "What is CSS clip-path?",
        answer: "clip-path creates a clipping region that sets what part of an element should be visible, hiding everything outside the path.",
      },
      {
        question: "Can clip-path shapes be animated?",
        answer: "Yes, you can transition clip-path polygon points smoothly as long as both states have the same number of vertices.",
      },
    ],
    features: [
      "12+ geometric and UI shape presets",
      "Live visual gradient mask preview",
      "Includes -webkit-clip-path prefix",
      "One-click copy",
    ],
    tips: [
      "Use chevron or slant clip-paths on hero section bottom dividers for dynamic page transitions",
      "Use hexagon and circle clip-paths for modern profile avatars",
    ],
  },
  {
    slug: "css-animation-keyframes-generator",
    name: "CSS Keyframe Animation Generator",
    category: "Design",
    shortDescription: "Create customizable CSS @keyframes animations with duration, easing curves, and live preview.",
    heroTitle: "CSS Keyframe Animation Generator & Playground",
    heroDescription: "Build smooth CSS @keyframes animations for pulse, bounce, spin, float, shake, and flip with custom timing curves.",
    about: "CSS Keyframe Animation Generator lets you create, customize, and preview pure CSS animations with fine-tuned duration, easing curves, iteration counts, and live animated previews.",
    howToUse: [
      "Select an animation type (Pulse, Bounce, Spin, Shake, Float, Flip).",
      "Set duration in seconds and animation timing function (easing).",
      "Choose iteration count (infinite, 1, or 2 times).",
      "Watch the live animated preview and copy the @keyframes CSS code.",
    ],
    whyUse: [
      "No heavy JavaScript animation libraries required.",
      "Hardware-accelerated 60fps CSS transitions.",
      "Complete @keyframes rules and class selectors ready to copy.",
    ],
    faqs: [
      {
        question: "Why use CSS animations instead of JavaScript animations?",
        answer: "CSS animations run on the browser's compositor thread, delivering smoother 60fps performance without blocking the main JavaScript thread.",
      },
      {
        question: "What is cubic-bezier easing?",
        answer: "Cubic-bezier curves allow custom acceleration and deceleration curves for more natural, springy motion.",
      },
    ],
    features: [
      "6 core animation archetypes (Pulse, Bounce, Spin, Shake, Float, Flip)",
      "Duration and timing curve selectors",
      "Iteration count controls",
      "Live 60fps preview canvas",
    ],
    tips: [
      "Use 'cubic-bezier(0.4, 0, 0.2, 1)' for smooth Google Material-style transitions",
      "Keep UI notification badge animations subtle (pulse duration ~1.5s) to avoid distracting users",
    ],
  },
  {
    slug: "css-filter-generator",
    name: "CSS Filter Effects Playground",
    category: "Design",
    shortDescription: "Apply and adjust visual CSS image filters including blur, grayscale, contrast, hue-rotate, and sepia.",
    heroTitle: "CSS Filter Effects Generator & Playground",
    heroDescription: "Adjust visual CSS image filters in real time with sliders for blur, contrast, brightness, grayscale, and hue rotation.",
    about: "CSS Filter Effects Playground lets you graphically tweak and combine multiple CSS filter functions to create vintage, duotone, blurred, or high-contrast image effects.",
    howToUse: [
      "Adjust sliders for blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, and sepia.",
      "Observe the live visual effect on the preview card.",
      "Click Reset to restore default values or Copy Filter CSS to export.",
    ],
    whyUse: [
      "Eliminates the need for Photoshop or photo editing software for web image styling.",
      "Non-destructive image styling directly in the browser.",
      "Combines multiple filter functions into a single clean CSS property.",
    ],
    faqs: [
      {
        question: "Can multiple CSS filters be combined?",
        answer: "Yes, CSS allows chaining multiple filter functions like 'filter: contrast(120%) brightness(110%) blur(2px)'.",
      },
      {
        question: "Are CSS filters performant on mobile devices?",
        answer: "Yes, modern mobile browsers hardware-accelerate CSS filters via the GPU.",
      },
    ],
    features: [
      "9 independent filter sliders",
      "Real-time visual preview image",
      "One-click filter reset",
      "Copyable CSS with vendor prefix",
    ],
    tips: [
      "Combine 'grayscale(100%)' with a hover 'grayscale(0%)' transition for client logo showcases",
      "Use 'blur(10px)' on low-res placeholder images to create progressive image loading effects",
    ],
  },
  {
    slug: "color-contrast-checker",
    name: "WCAG Color Contrast Checker",
    category: "Design",
    shortDescription: "Check color contrast compliance for text and UI elements against WCAG 2.1 AA and AAA accessibility standards.",
    heroTitle: "WCAG 2.1 Color Contrast Ratio Checker (AA & AAA)",
    heroDescription: "Calculate exact color contrast ratios and verify accessibility compliance for normal text, large text, and UI components.",
    about: "WCAG Color Contrast Checker computes the exact mathematical contrast ratio between foreground and background colors using relative luminance, providing instant pass/fail ratings for WCAG 2.1 Level AA and AAA standards.",
    howToUse: [
      "Pick or enter text/foreground color and background color.",
      "View the calculated contrast ratio (e.g. 7.42 : 1).",
      "Check compliance badges for WCAG AA and AAA ratings.",
      "Use Swap Colors to test reversed contrast.",
    ],
    whyUse: [
      "Essential for building accessible, ADA-compliant, and SEO-friendly websites.",
      "Instant compliance grading for both normal body text and large headings.",
      "Includes quick one-click contrast presets.",
    ],
    faqs: [
      {
        question: "What is the minimum WCAG contrast ratio for regular text?",
        answer: "WCAG Level AA requires a minimum contrast ratio of 4.5:1 for normal text (under 18pt / 24px) and 3:1 for large text.",
      },
      {
        question: "What is the requirement for WCAG AAA?",
        answer: "WCAG Level AAA requires an enhanced contrast ratio of 7:1 for normal text and 4.5:1 for large text.",
      },
    ],
    features: [
      "Relative luminance mathematical ratio calculation",
      "WCAG 2.1 AA and AAA pass/fail compliance ratings",
      "Live sample text preview card",
      "Color swapping button and curated presets",
    ],
    tips: [
      "Aim for at least 4.5:1 for all essential text to pass Google Lighthouse accessibility audits",
      "Large text is defined as 18pt (24px) regular or 14pt (18.66px) bold",
    ],
  },
  {
    slug: "css-text-shadow-generator",
    name: "CSS Text Shadow Generator",
    category: "Design",
    shortDescription: "Create custom CSS text shadows, neon glow effects, and 3D typography styling.",
    heroTitle: "CSS Text Shadow Generator & 3D Text Styler",
    heroDescription: "Design glowing neon, vintage 3D, and soft drop text shadows with real-time typography previews.",
    about: "CSS Text Shadow Generator lets designers create stunning text effects including neon glow, retro 3D extrusions, and soft readability shadows with copyable CSS code.",
    howToUse: [
      "Type your custom preview text.",
      "Adjust horizontal offset, vertical offset, and blur radius.",
      "Select shadow color, text color, and background color.",
      "Or choose from presets like Neon Glow, Retro 3D, or Fire Glow.",
      "Copy the text-shadow CSS property.",
    ],
    whyUse: [
      "Make text readable over complex image or video backgrounds.",
      "Create stylized 80s neon, cyberpunk, or gaming typography.",
      "Visual real-time preview on custom text.",
    ],
    faqs: [
      {
        question: "How does text-shadow differ from box-shadow in CSS?",
        answer: "text-shadow applies directly to the glyph contours of text characters and does not accept a 'spread' radius.",
      },
      {
        question: "How do I create a neon text glow effect?",
        answer: "Set X and Y offsets to 0, use a bright saturated shadow color, and increase the blur radius to 15-25px.",
      },
    ],
    features: [
      "X and Y offset and blur sliders",
      "Color pickers for text, shadow, and background",
      "Curated style presets (Neon, Retro 3D, Subtle Drop)",
      "Live typographic preview canvas",
    ],
    tips: [
      "Use '0 1px 2px rgba(0,0,0,0.6)' on white text over hero background images to improve readability",
      "Use neon glow on dark backgrounds for gaming or tech landing pages",
    ],
  },
  {
    slug: "px-to-rem-converter",
    name: "PX to REM & REM to PX Converter",
    category: "Design",
    shortDescription: "Convert pixels (px) to rem/em units and back with customizable base root font sizes.",
    heroTitle: "Bidirectional PX to REM & REM to PX Converter",
    heroDescription: "Convert pixels to rem and rem to pixels instantly with custom root font size (16px / 10px) and standard Tailwind reference table.",
    about: "PX to REM Converter helps developers convert pixel values into relative REM units for accessible, scalable web layouts, featuring customizable root font sizes and a full Tailwind CSS conversion reference table.",
    howToUse: [
      "Enter a pixel value or a rem value in either input box.",
      "Choose your root font size (default 16px, or 10px 62.5% trick).",
      "Conversion updates bidirectionally in real time.",
      "Click any item in the reference table to load standard sizes.",
    ],
    whyUse: [
      "REM units respect user browser font size preferences for accessibility.",
      "Bidirectional: calculate px from rem or rem from px instantly.",
      "Includes complete conversion reference table matching Tailwind CSS spacing scales.",
    ],
    faqs: [
      {
        question: "Why should I use REM instead of PX in CSS?",
        answer: "REM units scale proportionally when users change their default browser font size, improving web accessibility.",
      },
      {
        question: "What is the 62.5% CSS font-size trick?",
        answer: "Setting 'html { font-size: 62.5%; }' makes 1rem equal to exactly 10px (e.g. 1.6rem = 16px), simplifying mental math.",
      },
    ],
    features: [
      "Real-time bidirectional conversion (PX <-> REM)",
      "Customizable root base font size (16px, 10px, or custom)",
      "Interactive Tailwind CSS size reference table",
      "One-click values loading",
    ],
    tips: [
      "Use REM for font sizes, margins, and padding, and PX for 1px borders",
      "Standard browser default root font size is 16px (1rem = 16px)",
    ],
  },
  {
    slug: "css-neumorphism-generator",
    name: "CSS Neumorphism (Soft UI) Generator",
    category: "Design",
    shortDescription: "Create modern Soft UI extruded and pressed neumorphic shadows with customized lighting.",
    heroTitle: "CSS Neumorphism & Soft UI Generator",
    heroDescription: "Generate soft extruded and pressed neumorphic cards with light/dark shadow contrasts and shape styles.",
    about: "CSS Neumorphism Generator calculates the dual light and dark shadow pairs required to produce tactile Soft UI (Neumorphic) surfaces, supporting flat, concave, convex, and inset pressed states.",
    howToUse: [
      "Pick your base background color.",
      "Choose shape type: Flat, Concave, Convex, or Inset.",
      "Adjust shadow distance, blur radius, and corner radius.",
      "Copy the generated Soft UI CSS code.",
    ],
    whyUse: [
      "Calculates mathematically paired light and dark highlight shadows automatically.",
      "Supports 4 distinct tactile surface shapes.",
      "Live interactive canvas preview.",
    ],
    faqs: [
      {
        question: "What is Neumorphism / Soft UI?",
        answer: "Neumorphism is a design trend that uses dual soft shadows (one dark, one light) to make UI elements appear extruded directly from the background.",
      },
      {
        question: "Why does the background color need to match the element color in Neumorphism?",
        answer: "Neumorphic effects rely on the illusion that the element is molded from the same physical surface as the background.",
      },
    ],
    features: [
      "Automatic light and dark highlight shadow calculation",
      "4 surface modes: Flat, Concave, Convex, and Inset",
      "Distance, blur, and corner radius sliders",
      "One-click CSS code copy",
    ],
    tips: [
      "Soft off-white (#e0e5ec) and light slate backgrounds yield the most realistic neumorphic lighting",
      "Use inset pressed shadows for active button states and checkboxes",
    ],
  },
  {
    slug: "palette-generator",
    name: "Harmonious Color Palette Generator",
    category: "Design",
    shortDescription: "Generate complementary, analogous, triadic, and monochromatic color palettes from any base color.",
    heroTitle: "Harmonious Color Palette Generator",
    heroDescription: "Generate color palettes based on color theory harmonies (Complementary, Analogous, Triadic, Monochromatic).",
    about: "Harmonious Color Palette Generator creates balanced color schemes from any seed color using mathematical HSL color wheel harmony rules, providing instant one-click hex copying.",
    howToUse: [
      "Pick a seed color with the color picker or enter a hex code.",
      "Review generated Complementary, Analogous, Triadic, and Monochromatic palettes.",
      "Click any color swatch to copy its HEX code.",
    ],
    whyUse: [
      "Guarantees visually balanced, mathematically harmonious color pairings.",
      "Covers all 4 core color theory harmony models.",
      "One-click clipboard copying for rapid UI design prototyping.",
    ],
    faqs: [
      {
        question: "What is a Triadic color harmony?",
        answer: "A triadic harmony uses three colors evenly spaced by 120 degrees around the color wheel, creating vibrant yet balanced contrast.",
      },
      {
        question: "What are Analogous colors?",
        answer: "Analogous colors are located adjacent to each other on the color wheel, creating serene and comfortable color schemes.",
      },
    ],
    features: [
      "HSL mathematical color wheel algorithms",
      "4 harmony models (Complementary, Analogous, Triadic, Monochromatic)",
      "Interactive color swatches with one-click copy",
      "Live HEX code display",
    ],
    tips: [
      "Use Analogous colors for subtle background gradients and accents",
      "Use Complementary colors for call-to-action buttons against primary brand backgrounds",
    ],
  },
  {
    slug: "svg-path-visualizer",
    name: "SVG Path Visualizer & Scaler",
    category: "Design",
    shortDescription: "Inspect, render, and convert raw SVG path d-strings into complete scalable SVG elements.",
    heroTitle: "SVG Path (d attribute) Visualizer & Scaler",
    heroDescription: "Paste any SVG <path d=\"...\"> coordinate string to render, inspect, customize stroke/fill, and export full SVG code.",
    about: "SVG Path Visualizer renders raw path coordinate strings (the 'd' attribute) found in vector icons and charts, enabling developers to inspect geometry, adjust fill and stroke colors, and wrap coordinates in a full SVG element.",
    howToUse: [
      "Paste your SVG path 'd' string or entire <path> element.",
      "Set viewBox dimensions (e.g. 24, 100).",
      "Toggle and customize fill color, stroke color, and stroke width.",
      "Click Generate SVG Markup and copy the complete SVG code.",
    ],
    whyUse: [
      "Inspect path coordinates extracted from icon libraries or font files.",
      "Turn raw coordinate snippets into valid, copyable SVG tags.",
      "Customize stroke and fill colors visually before adding to code.",
    ],
    faqs: [
      {
        question: "What does the SVG 'd' attribute stand for?",
        answer: "The 'd' attribute stands for 'data' and contains a sequence of path drawing commands like M (moveto), L (lineto), C (curveto), and Z (closepath).",
      },
      {
        question: "Can I paste an entire <path ...> tag?",
        answer: "Yes, the tool automatically extracts the 'd' coordinate attribute if you paste an entire <path> or d=\"...\" tag.",
      },
    ],
    features: [
      "Auto-extracts d-coordinates from raw path strings or tags",
      "Customizable fill, stroke color, and stroke width",
      "Scalable viewBox dimensions",
      "Full SVG element code generator",
    ],
    tips: [
      "Use this tool to verify SVG icon paths copied from GitHub or icon packs before embedding in React",
      "Set fill to none and stroke to currentColor for clean outline icons",
    ],
  },
  {
    slug: "hmac-generator",
    name: "HMAC Generator & Verifier",
    category: "Auth",
    shortDescription: "Generate and verify Hash-based Message Authentication Codes (HMAC) with SHA-256, SHA-512, and secret keys.",
    heroTitle: "Generate Secure HMAC Authentication Codes",
    heroDescription: "Compute cryptographically verified HMAC codes using SHA-256, SHA-512, SHA-384, or SHA-1 with secret signing keys.",
    about: "HMAC Generator & Verifier calculates Hash-based Message Authentication Codes used for API request signing, webhook authentication (GitHub, Stripe, Shopify), and tamper-proof message verification.",
    howToUse: [
      "Enter the message or webhook payload in the input field.",
      "Provide your secret API key or signing secret.",
      "Select your hashing algorithm (HMAC-SHA256, HMAC-SHA512) and output encoding (Hex or Base64).",
      "Click 'Generate HMAC Code' and copy the resulting signature.",
    ],
    whyUse: [
      "Essential for verifying and testing Webhook signatures from Stripe, GitHub, and Shopify.",
      "Runs 100% in your browser using the native Web Crypto API for zero latency and privacy.",
      "Supports uppercase and lowercase hexadecimal output.",
    ],
    faqs: [
      {
        question: "What is an HMAC?",
        answer: "HMAC stands for Hash-based Message Authentication Code. It is a cryptographic mechanism that combines a secret key with a message to verify both data integrity and authentication.",
      },
      {
        question: "Is my secret key sent to any server?",
        answer: "No. The entire HMAC signature is calculated locally in your browser using window.crypto.subtle.",
      },
    ],
    features: [
      "Supports HMAC-SHA256, HMAC-SHA512, HMAC-SHA384, HMAC-SHA1",
      "Hexadecimal and Base64 output encodings",
      "Uppercase and lowercase hex options",
      "100% client-side Web Crypto API",
    ],
    tips: [
      "Use HMAC-SHA256 for standard modern webhook verification (GitHub, Stripe, AWS)",
      "Always keep your secret key confidential",
    ],
  },
  {
    slug: "sha512-hash-generator",
    name: "SHA-512 Hash Generator",
    category: "Encoding",
    shortDescription: "Compute secure 512-bit SHA-512 cryptographic checksums with client-side Web Crypto.",
    heroTitle: "Generate Secure 512-bit SHA-512 Hashes",
    heroDescription: "Instantly calculate 128-hex-character SHA-512 cryptographic hashes and checksums directly in your browser.",
    about: "SHA-512 Hash Generator produces a 512-bit (64-byte) cryptographic digest formatted as a 128-character hexadecimal string, widely used for password hashing, file integrity verification, and digital signatures.",
    howToUse: [
      "Type or paste your text into the input area.",
      "Toggle Uppercase HEX if required.",
      "Click 'Generate SHA-512 Hash' to compute the 128-character checksum.",
      "Copy the result with one click.",
    ],
    whyUse: [
      "Provides significantly higher collision resistance than SHA-256.",
      "Ideal for verifying high-security file downloads and cryptographic proofs.",
      "Calculated client-side with native browser Web Crypto performance.",
    ],
    faqs: [
      {
        question: "How long is a SHA-512 hash?",
        answer: "A SHA-512 hash is 512 bits long, which renders as exactly 128 hexadecimal characters.",
      },
      {
        question: "Can a SHA-512 hash be decrypted?",
        answer: "No. SHA-512 is a one-way cryptographic hash function and cannot be reversed or decrypted back into the original input.",
      },
    ],
    features: [
      "512-bit cryptographic digest",
      "128 hexadecimal character output",
      "Uppercase and lowercase toggles",
      "Client-side Web Crypto execution",
    ],
    tips: [
      "Use SHA-512 when building high-security signature systems or file integrity manifests",
    ],
  },
  {
    slug: "sha3-hash-generator",
    name: "SHA-3 (Keccak) Hash Generator",
    category: "Encoding",
    shortDescription: "Generate FIPS 202 compliant SHA-3 (Keccak) cryptographic hashes (SHA3-256, SHA3-512, SHA3-384, SHA3-224).",
    heroTitle: "SHA-3 / Keccak Cryptographic Hash Generator",
    heroDescription: "Compute official FIPS 202 SHA-3 and Keccak sponge cryptographic hashes for blockchain, Ethereum, and modern security.",
    about: "SHA-3 (Secure Hash Algorithm 3) is the latest cryptographic hash standard released by NIST based on the Keccak sponge function. It provides a fundamentally different mathematical structure from SHA-2.",
    howToUse: [
      "Paste your text string into the input area.",
      "Select your SHA-3 variant: SHA3-256, SHA3-512, SHA3-384, or SHA3-224.",
      "Click 'Generate SHA-3 Hash' to view the output.",
    ],
    whyUse: [
      "Immune to length-extension attacks that affect older hash algorithms.",
      "Widely used across Web3, Ethereum, and next-generation security standards.",
      "Pure client-side implementation with zero server transmission.",
    ],
    faqs: [
      {
        question: "How does SHA-3 differ from SHA-2?",
        answer: "While SHA-2 uses the Merkle–Damgård construction, SHA-3 uses the innovative Keccak sponge construction, making it completely immune to length extension attacks.",
      },
    ],
    features: [
      "Supports SHA3-256, SHA3-512, SHA3-384, SHA3-224",
      "FIPS 202 compliant Keccak implementation",
      "Uppercase / lowercase hexadecimal output",
      "One-click copy",
    ],
    tips: [
      "Use SHA3-256 for modern cryptographic projects requiring non-SHA-2 diversity",
    ],
  },
  {
    slug: "md5-hash-generator",
    name: "MD5 Hash & Checksum Generator",
    category: "Encoding",
    shortDescription: "Compute standard 128-bit (32 hex characters) MD5 cryptographic checksums instantly.",
    heroTitle: "Fast MD5 Hash & Checksum Generator",
    heroDescription: "Calculate standard 32-character hexadecimal MD5 checksums for file verification, database keys, and legacy hashes.",
    about: "MD5 Hash & Checksum Generator calculates 128-bit MD5 hashes commonly used for caching keys, Gravatar email hashes, and legacy data integrity validation.",
    howToUse: [
      "Enter your text or data into the input field.",
      "Toggle uppercase output if needed.",
      "Click 'Generate MD5 Checksum' to calculate the 32-character hash.",
    ],
    whyUse: [
      "Fast and ubiquitous for generating Gravatar hashes and cache keys.",
      "Useful for verifying file checksums from legacy downloads.",
    ],
    faqs: [
      {
        question: "Is MD5 safe for password hashing?",
        answer: "No. MD5 is not collision-resistant and should never be used for storing passwords. Use Bcrypt, Argon2, or PBKDF2 instead.",
      },
    ],
    features: [
      "Standard 128-bit MD5 calculation",
      "32-character hex output",
      "Uppercase/lowercase switcher",
      "Instant client-side calculation",
    ],
    tips: [
      "To generate a Gravatar URL, trim your email, convert to lowercase, and generate the MD5 hash",
    ],
  },
  {
    slug: "ripemd160-generator",
    name: "RIPEMD-160 Hash Generator",
    category: "Encoding",
    shortDescription: "Compute 160-bit (40 hex characters) RIPEMD-160 cryptographic hashes used in Bitcoin address generation and PGP.",
    heroTitle: "Generate RIPEMD-160 Cryptographic Hashes",
    heroDescription: "Calculate 160-bit RIPEMD-160 hashes used in Bitcoin (BTC) address derivation, PGP, and European cryptographic standards.",
    about: "RIPEMD-160 (RACE Integrity Primitives Evaluation Message Digest) is a 160-bit cryptographic hash function widely recognized for its use in Bitcoin's address generation algorithm (SHA-256 followed by RIPEMD-160).",
    howToUse: [
      "Paste your text or hex data in the input box.",
      "Click 'Generate RIPEMD-160 Hash'.",
      "Copy the resulting 40-character hex hash.",
    ],
    whyUse: [
      "Essential for developers building Bitcoin, cryptocurrency, and blockchain address tools.",
      "High-speed 160-bit hash calculation running locally in the browser.",
    ],
    faqs: [
      {
        question: "Why does Bitcoin use RIPEMD-160?",
        answer: "Bitcoin uses RIPEMD-160 to produce shorter (20-byte / 160-bit) address hashes from 256-bit public keys, reducing blockchain transaction data sizes.",
      },
    ],
    features: [
      "160-bit digest (40 hex chars)",
      "Standard Bitcoin & PGP algorithm",
      "Uppercase / lowercase toggle",
      "100% private in-browser computation",
    ],
    tips: [
      "Combine with SHA-256 for Bitcoin Hash160 simulation",
    ],
  },
  {
    slug: "bcrypt-generator",
    name: "Bcrypt Hash Generator & Verifier",
    category: "Auth",
    shortDescription: "Generate salted Bcrypt password hashes ($2a$ / $2b$) with custom cost factors (rounds 4–14) and verify passwords.",
    heroTitle: "Generate & Verify Bcrypt Password Hashes",
    heroDescription: "Create industry-standard salted Bcrypt hashes with adjustable cost factors (4-14) and verify plain passwords against hashes.",
    about: "Bcrypt is an adaptive password-hashing function based on the Blowfish cipher. It incorporates a random salt to protect against rainbow table attacks and an adjustable work factor to stay secure against hardware scaling.",
    howToUse: [
      "To generate: Enter a password, choose your cost factor (rounds 4–14), and click 'Generate Bcrypt Hash'.",
      "To verify: Switch to the 'Verify' tab, paste the plain password and the $2a$ or $2b$ hash, and check the match status.",
    ],
    whyUse: [
      "Standard password hashing format for Node.js (bcryptjs), Rails, Django, and Laravel.",
      "Allows testing and validating hash format compatibility ($2a$, $2b$, $2y$).",
    ],
    faqs: [
      {
        question: "What cost factor should I use for Bcrypt?",
        answer: "Cost 10 or 12 is currently recommended for standard web applications, providing a healthy balance between security and server response time.",
      },
    ],
    features: [
      "Standard $2a$ / $2b$ Bcrypt hash format",
      "Adjustable cost factor (4 to 14 rounds)",
      "Built-in password vs hash verifier",
      "Client-side security and privacy",
    ],
    tips: [
      "Bcrypt hashes are always exactly 60 characters long and begin with $2a$, $2b$, or $2y$",
    ],
  },
  {
    slug: "argon2-hasher",
    name: "PBKDF2 / Password Key Hasher",
    category: "Auth",
    shortDescription: "Derive secure cryptographic password hashes using PBKDF2 with custom iterations, salt, and SHA-512.",
    heroTitle: "Derive Cryptographic Keys & Hashes with PBKDF2",
    heroDescription: "Compute memory-hard key derivations using PBKDF2 with up to 600,000 iterations, custom salts, and SHA-512.",
    about: "PBKDF2 (Password-Based Key Derivation Function 2) applies a pseudorandom function to input passwords along with a cryptographic salt, repeating the process hundreds of thousands of times to thwart brute-force attacks.",
    howToUse: [
      "Enter the password to derive.",
      "Set your custom salt or click 'Random Salt'.",
      "Choose iteration count (100,000+ recommended) and key length (256 or 512 bits).",
      "Click 'Derive Cryptographic Key' to view the output in Hex or Base64.",
    ],
    whyUse: [
      "Complies with OWASP Password Storage Guidelines (100,000+ iterations for SHA-512).",
      "Used in password managers (Bitwarden, 1Password) and encrypted storage systems.",
    ],
    faqs: [
      {
        question: "What is PBKDF2 used for?",
        answer: "PBKDF2 is used to turn weak human passwords into strong, cryptographically secure keys for AES encryption and password storage.",
      },
    ],
    features: [
      "Configurable iterations (10k to 600k)",
      "Supports SHA-512 and SHA-256",
      "256-bit and 512-bit key lengths",
      "Hexadecimal and Base64 export",
    ],
    tips: [
      "OWASP recommends at least 100,000 iterations of PBKDF2-SHA512 for modern applications",
    ],
  },
  {
    slug: "crc32-checksum",
    name: "CRC32 Checksum Calculator",
    category: "Validation",
    shortDescription: "Compute standard 32-bit CRC32 checksums (IEEE 802.3) in Hexadecimal, Decimal, and Binary.",
    heroTitle: "Calculate 32-bit CRC32 Checksums",
    heroDescription: "Compute IEEE 802.3 cyclic redundancy checks (CRC-32) in hexadecimal (0x...), unsigned decimal, and binary formats.",
    about: "CRC32 (Cyclic Redundancy Check) is an error-detecting code commonly used in network protocols (Ethernet), archive formats (ZIP, PNG, GZIP), and data storage to detect accidental data corruption.",
    howToUse: [
      "Paste text or code into the input area.",
      "Click 'Calculate CRC32'.",
      "View the checksum in Hex (0x...), Unsigned Decimal, Signed Integer, and 32-bit Binary.",
    ],
    whyUse: [
      "Useful for verifying ZIP archive integrity, PNG chunk checksums, and Ethernet packets.",
      "Instant client-side calculation using precomputed IEEE 802.3 polynomial tables.",
    ],
    faqs: [
      {
        question: "Is CRC32 suitable for cryptographic security?",
        answer: "No. CRC32 is designed for detecting accidental errors (noise, bit flips), not for cryptographic security. For security, use SHA-256.",
      },
    ],
    features: [
      "Standard IEEE 802.3 polynomial",
      "Hexadecimal, Decimal, and Binary outputs",
      "Fast lookup table implementation",
      "100% client-side execution",
    ],
    tips: [
      "PNG files store a 4-byte CRC32 checksum after every chunk to verify image data integrity",
    ],
  },
  {
    slug: "aes-encryption-decryption",
    name: "AES-GCM Text Encryptor & Decryptor",
    category: "Auth",
    shortDescription: "Military-grade 256-bit AES-GCM client-side text encryption with PBKDF2 salt derivation.",
    heroTitle: "256-bit AES-GCM Text Encryptor & Decryptor",
    heroDescription: "Encrypt and decrypt confidential messages using authenticated 256-bit AES-GCM and PBKDF2 passphrase key derivation.",
    about: "AES-GCM (Advanced Encryption Standard in Galois/Counter Mode) provides both confidentiality and cryptographic integrity verification. This tool runs 100% in your browser using the native Web Crypto API.",
    howToUse: [
      "To Encrypt: Enter your text, choose a secret passphrase, and click 'Encrypt with AES-256-GCM'.",
      "To Decrypt: Paste the Base64 ciphertext, enter the exact passphrase, and click 'Decrypt Ciphertext'.",
    ],
    whyUse: [
      "Complete end-to-end security: your passphrase and messages never leave your browser.",
      "Uses 256-bit keys, unique 16-byte random salts, and 12-byte initialization vectors (IV).",
    ],
    faqs: [
      {
        question: "What makes AES-GCM superior to AES-CBC?",
        answer: "AES-GCM includes authenticated data validation, which immediately detects if the ciphertext was tampered with or modified.",
      },
    ],
    features: [
      "256-bit AES-GCM authenticated encryption",
      "PBKDF2 key derivation (100,000 iterations)",
      "Random 16-byte salt and 12-byte IV per encryption",
      "100% private in-browser Web Crypto API",
    ],
    tips: [
      "Always use a strong, complex passphrase for reliable encryption strength",
    ],
  },
  {
    slug: "rsa-key-generator",
    name: "RSA Public & Private Key Pair Generator",
    category: "Auth",
    shortDescription: "Generate cryptographically secure 2048-bit and 4096-bit RSA key pairs in standard PEM format.",
    heroTitle: "Generate RSA 2048-bit & 4096-bit Key Pairs",
    heroDescription: "Create asymmetric RSA public and private key pairs formatted in standard SPKI and PKCS#8 PEM formats.",
    about: "RSA (Rivest–Shamir–Adleman) is an asymmetric cryptographic algorithm used for secure data transmission, SSH keys, digital signatures, and SSL/TLS certificates.",
    howToUse: [
      "Select your key size: 2048-bit (Standard) or 4096-bit (Maximum Security).",
      "Click 'Generate RSA Key Pair'.",
      "Copy your Public Key (SPKI PEM) and Private Key (PKCS#8 PEM).",
    ],
    whyUse: [
      "Generates standard PEM blocks (-----BEGIN PUBLIC KEY-----, -----BEGIN PRIVATE KEY-----).",
      "Generated securely inside your browser's crypto sandbox with zero network requests.",
    ],
    faqs: [
      {
        question: "Should I use 2048-bit or 4096-bit RSA?",
        answer: "2048-bit is the industry standard and offers high security with fast operations. 4096-bit offers future-proof security but takes slightly longer to compute.",
      },
    ],
    features: [
      "2048-bit and 4096-bit key generation",
      "Standard PEM export format",
      "Web Crypto RSA-OAEP engine",
      "One-click copyable cards",
    ],
    tips: [
      "Never share your private key with anyone; only distribute your public key",
    ],
  },
  {
    slug: "jwt-generator",
    name: "JWT Token Generator & Signer",
    category: "Auth",
    shortDescription: "Create, customize claims, and cryptographically sign JSON Web Tokens with HMAC-SHA256.",
    heroTitle: "Create & Sign JSON Web Tokens (JWT)",
    heroDescription: "Build custom JWT headers and payload claims, set expiration timestamps, and sign tokens with secret keys.",
    about: "JWT Token Generator & Signer allows developers to create standard RFC 7519 JSON Web Tokens (header.payload.signature) with custom claims (sub, name, admin, iat, exp) and HMAC-SHA256 signatures.",
    howToUse: [
      "Edit the Header JSON and Payload Claims JSON.",
      "Use the quick expiration buttons (+1h, +24h, +7d) to set valid exp timestamps.",
      "Enter your HMAC secret key.",
      "Click 'Sign & Generate JWT Token' to copy the signed token string.",
    ],
    whyUse: [
      "Ideal for mocking authentication tokens, testing API endpoints, and debugging microservices.",
      "Provides color-coded visual breakdowns of the header, payload, and signature.",
    ],
    faqs: [
      {
        question: "What algorithm is used to sign the token?",
        answer: "This tool uses HMAC-SHA256 (HS256) running via the browser's native Web Crypto API.",
      },
    ],
    features: [
      "Customizable JSON header and payload claims",
      "Quick expiration presets (+1h, +24h, +7d)",
      "HMAC-SHA256 cryptographic signing",
      "Color-coded 3-part token breakdown",
    ],
    tips: [
      "Standard JWT tokens consist of three Base64URL parts separated by dots: header.payload.signature",
    ],
  },
  {
    slug: "ulid-generator",
    name: "ULID Generator & Timestamp Decoder",
    category: "Data",
    shortDescription: "Generate 128-bit lexicographically sortable Crockford Base32 ULIDs and decode embedded timestamps.",
    heroTitle: "Generate & Decode Universally Unique ULIDs",
    heroDescription: "Create 128-bit lexicographically sortable Crockford Base32 ULIDs and decode millisecond timestamps from any ULID.",
    about: "ULID (Universally Unique Lexicographically Sortable Identifier) is a 26-character, 128-bit identifier compatible with UUIDs. Unlike UUIDv4, ULIDs are time-ordered and sort naturally in databases, indexing significantly faster in B-trees.",
    howToUse: [
      "Set batch quantity (1 to 50) and toggle lowercase if desired.",
      "Click 'Generate ULIDs' to create a list of sortable identifiers.",
      "Paste any existing ULID into the Inspector to decode its exact creation date and UTC timestamp.",
    ],
    whyUse: [
      "Provides millisecond timestamp precision combined with 80 bits of cryptographic randomness.",
      "Superior database indexing performance compared to random UUIDs.",
    ],
    faqs: [
      {
        question: "Why choose ULID over UUIDv4?",
        answer: "ULIDs are 128-bit like UUIDs, but because the first 48 bits encode the timestamp, they sort in chronological order, preventing database index fragmentation.",
      },
    ],
    features: [
      "Standard 26-character Crockford Base32 encoding",
      "Batch generation (up to 50 ULIDs)",
      "Built-in timestamp decoder and inspector",
      "Uppercase and lowercase formatting",
    ],
    tips: [
      "ULIDs use Crockford's Base32 alphabet which eliminates ambiguous characters like I, L, O, and U",
    ],
  },
  {
    slug: "nanoid-generator",
    name: "Nano ID Generator",
    category: "Data",
    shortDescription: "Generate cryptographically secure, URL-safe compact unique IDs with customizable length and alphabets.",
    heroTitle: "Generate Compact & Secure Nano IDs",
    heroDescription: "Create URL-safe, compact unique string IDs with custom lengths (5-64) and alphabet presets (Numbers, Hex, Custom).",
    about: "Nano ID is a tiny, secure, URL-friendly unique string ID generator. It uses cryptographically strong hardware random values and is twice as compact as UUIDs with equal collision resistance.",
    howToUse: [
      "Select your ID length (default 21 characters) and batch count.",
      "Choose an alphabet preset (URL-Safe, Numbers Only, Hexadecimal, or Custom).",
      "Click 'Generate Nano IDs' to copy your generated IDs.",
    ],
    whyUse: [
      "Significantly shorter and more URL-friendly than standard 36-character UUIDs.",
      "Customizable alphabet allows generating numeric OTPs, short URLs, or alphanumeric codes.",
    ],
    faqs: [
      {
        question: "How collision-resistant is a 21-character Nano ID?",
        answer: "With a 21-character URL-safe alphabet, generating 1,000 IDs per second would take roughly 4,000 years for a single collision to occur.",
      },
    ],
    features: [
      "Customizable length from 5 to 64 characters",
      "Presets for URL-safe, Numbers, Hex, and Custom alphabets",
      "Batch generation up to 50 IDs",
      "Cryptographically secure randomness",
    ],
    tips: [
      "Use standard 21-character Nano IDs for modern database primary keys and public slug URLs",
    ],
  },
  {
    slug: "cuid-generator",
    name: "CUID2 & KSUID Generator",
    category: "Data",
    shortDescription: "Generate collision-resistant, horizontal-scaling database primary key identifiers (CUID2 & KSUID).",
    heroTitle: "Generate CUID2 & KSUID Database Identifiers",
    heroDescription: "Create collision-resistant horizontal database keys using CUID2 and Segment K-Sortable KSUIDs.",
    about: "CUID2 and KSUID are modern identification standards designed for distributed databases, horizontal scalability, and high-concurrency systems where sequential auto-increment IDs cause security leaks or bottlenecks.",
    howToUse: [
      "Choose your identifier type: CUID2 (24-char) or KSUID (27-char).",
      "Select batch quantity and length controls.",
      "Click 'Generate' to export clean primary keys for your database models.",
    ],
    whyUse: [
      "Designed specifically for modern ORMs like Prisma, Drizzle, and TypeORM.",
      "Prevents enumeration attacks while maintaining high insertion performance.",
    ],
    faqs: [
      {
        question: "What is KSUID?",
        answer: "KSUID (K-Sortable Unique Identifier) is a 27-character identifier developed by Segment that combines a 32-bit timestamp with 128 bits of randomness.",
      },
    ],
    features: [
      "CUID2 and KSUID generation",
      "Collision-resistant horizontal design",
      "Batch generation support",
      "Ideal for Prisma and PostgreSQL",
    ],
    tips: [
      "CUID2 is the recommended default ID format for Prisma ORM",
    ],
  },
  {
    slug: "password-strength-checker",
    name: "Password Strength & Entropy Analyzer",
    category: "Auth",
    shortDescription: "Calculate Shannon entropy bits, estimated GPU crack time, and audit password security.",
    heroTitle: "Audit Password Strength & Shannon Entropy",
    heroDescription: "Analyze password security with exact Shannon entropy bits, GPU cluster crack time estimates, and character diversity audits.",
    about: "Password Strength & Entropy Analyzer evaluates passwords using mathematical Shannon entropy formulas, auditing character pool diversity (uppercase, lowercase, numbers, symbols) and estimating brute-force resistance against 100-Billion-hash/sec GPU clusters.",
    howToUse: [
      "Type a password in the input field.",
      "Toggle password visibility using 'Show Password' if needed.",
      "Review the entropy score, strength meter, estimated crack time, and diversity checklist.",
    ],
    whyUse: [
      "Evaluates real mathematical entropy rather than arbitrary complexity rules.",
      "100% private and offline: passwords are never sent across any network.",
    ],
    faqs: [
      {
        question: "What is Shannon entropy in passwords?",
        answer: "Shannon entropy measures the information density and randomness of a password in bits. Passwords with 60+ bits of entropy are considered strong.",
      },
    ],
    features: [
      "Shannon entropy calculation in bits",
      "GPU cluster crack time estimation",
      "5-level visual strength indicator",
      "Character diversity audit checklist",
    ],
    tips: [
      "Aim for at least 60 bits of entropy and 14+ characters for sensitive master passwords",
    ],
  },
  {
    slug: "htpasswd-generator",
    name: "Apache & Nginx .htpasswd Generator",
    category: "Auth",
    shortDescription: "Generate secure HTTP Basic Authentication .htpasswd entries in Bcrypt, SHA-1, and MD5-APR1 formats.",
    heroTitle: "Generate .htpasswd Entries for Apache & Nginx",
    heroDescription: "Create HTTP Basic Authentication password lines in Bcrypt ($2y$), SHA-1 ({SHA}), and MD5-APR1 ($apr1$) formats.",
    about: "Apache & Nginx .htpasswd Generator produces password hash entries for .htpasswd files used in web server directory protection and HTTP Basic Authentication.",
    howToUse: [
      "Enter the username and password.",
      "Choose your hash algorithm: Bcrypt ($2y$), SHA-1 ({SHA}), or MD5-APR1 ($apr1$).",
      "Click 'Generate .htpasswd Entry' and copy the resulting string into your .htpasswd file.",
    ],
    whyUse: [
      "Protects staging websites, admin panels, and internal documentation.",
      "Supports modern Bcrypt format for Nginx and Apache 2.4+.",
    ],
    faqs: [
      {
        question: "Where do I put the generated line?",
        answer: "Copy the line into a file named .htpasswd on your web server, and reference it inside your Apache .htaccess or Nginx configuration.",
      },
    ],
    features: [
      "Bcrypt ($2y$) format",
      "Apache MD5-APR1 ($apr1$) format",
      "Legacy SHA-1 ({SHA}) format",
      "Instant one-click copy",
    ],
    tips: [
      "For modern Nginx and Apache servers, always choose Bcrypt for maximum brute-force resistance",
    ],
  },
  {
    slug: "cert-inspector",
    name: "SSL / X.509 Certificate Inspector",
    category: "Validation",
    shortDescription: "Inspect and decode PEM / CRT SSL certificates to view Common Name, Issuer, SANs, and Expiry.",
    heroTitle: "Decode & Inspect SSL / X.509 Certificates",
    heroDescription: "Parse PEM/CRT SSL certificates to view Common Name (CN), Issuer, Subject Alternative Names (SAN), and Expiration.",
    about: "SSL / X.509 Certificate Inspector decodes raw PEM certificate blocks (-----BEGIN CERTIFICATE-----) to reveal certificate metadata, issuer authority, validity dates, days remaining, and SAN domains without requiring OpenSSL CLI.",
    howToUse: [
      "Paste your PEM-formatted certificate block or click 'Load Sample Cert'.",
      "Click 'Inspect Certificate' to extract details.",
      "Review the Common Name, Issuer, Expiry status pill, and SAN domains.",
    ],
    whyUse: [
      "Quickly check certificate expiration and domain coverage without installing OpenSSL.",
      "Works entirely in the browser with zero certificate transmission.",
    ],
    faqs: [
      {
        question: "What is an X.509 certificate?",
        answer: "X.509 is the standard format for public key certificates used in TLS/SSL to bind public keys to domains and organizations.",
      },
    ],
    features: [
      "Decodes Common Name (CN) and Issuer",
      "Displays validity start and expiration dates",
      "Calculates days remaining with status badge",
      "Lists Subject Alternative Names (SAN)",
    ],
    tips: [
      "Use this tool to verify SSL certificates before deploying them to production web servers",
    ],
  },
  {
    slug: "base58-converter",
    name: "Base58 Encoder & Decoder",
    category: "Encoding",
    shortDescription: "Encode and decode text strings using Bitcoin, IPFS, and Solana Base58 format.",
    heroTitle: "Base58 (Bitcoin & IPFS) Encoder & Decoder",
    heroDescription: "Convert text and hexadecimal data to and from Bitcoin Base58 encoding without ambiguous characters.",
    about: "Base58 is a binary-to-text encoding scheme used in Bitcoin, IPFS, and Solana. It is designed specifically for humans by removing easily confused characters: 0 (zero), O (capital o), I (capital i), and l (lower L).",
    howToUse: [
      "Select 'Encode to Base58' or 'Decode from Base58'.",
      "Enter your input text or Base58 string.",
      "Click the convert button to view the result.",
    ],
    whyUse: [
      "Standard encoding for Bitcoin wallet addresses and IPFS content identifiers (CIDs).",
      "Eliminates typographic errors caused by visually ambiguous letters.",
    ],
    faqs: [
      {
        question: "How does Base58 differ from Base64?",
        answer: "Base58 removes non-alphanumeric symbols (+, /, =) and ambiguous characters (0, O, I, l) to make strings easier to copy and read on mobile devices.",
      },
    ],
    features: [
      "Bitcoin & IPFS Base58 alphabet",
      "Bidirectional encode and decode modes",
      "Preserves leading zero bytes as '1's",
      "Client-side execution",
    ],
    tips: [
      "Base58 is widely used across Solana public keys and Bitcoin legacy address formats",
    ],
  },
  {
    slug: "csr-generator",
    name: "CSR (Certificate Signing Request) Builder",
    category: "Auth",
    shortDescription: "Generate standard PKCS#10 SSL Certificate Signing Requests (CSR) and 2048-bit RSA Private Keys.",
    heroTitle: "Generate SSL Certificate Signing Requests (CSR)",
    heroDescription: "Create standard PKCS#10 Certificate Signing Requests (CSR) and 2048-bit RSA Private Keys for SSL/TLS certificates.",
    about: "CSR Builder creates standard PEM-formatted Certificate Signing Requests containing your domain name, organization, country, and public key needed to order SSL certificates from Certificate Authorities.",
    howToUse: [
      "Enter your Domain / Common Name (e.g. toolsnippet.com).",
      "Fill in your Organization, 2-letter Country code, and State.",
      "Click 'Generate CSR & Private Key'.",
      "Submit the CSR to your SSL provider and save the Private Key securely.",
    ],
    whyUse: [
      "Generates both the CSR and RSA Private Key in one step.",
      "Client-side generation guarantees your private key is never transmitted over the internet.",
    ],
    faqs: [
      {
        question: "What is a CSR?",
        answer: "A CSR (Certificate Signing Request) is an encrypted message sent to a Certificate Authority containing your public key and domain information to request an SSL certificate.",
      },
    ],
    features: [
      "Standard PKCS#10 CSR PEM output",
      "2048-bit RSA Private Key generation",
      "Custom organization and country fields",
      "100% private in-browser generation",
    ],
    tips: [
      "Always store your RSA Private Key safely; Certificate Authorities do not have a copy of it",
    ],
  },
  {
    slug: "hash-comparator",
    name: "Hash & Checksum Comparator",
    category: "Validation",
    shortDescription: "Compare two cryptographic hashes or file checksums with instant character-by-character integrity verification.",
    heroTitle: "Compare & Verify Cryptographic Checksums",
    heroDescription: "Compare downloaded file hashes against official checksums with instant character-matching diagnostics.",
    about: "Hash & Checksum Comparator eliminates human error when verifying file integrity, comparing two cryptographic hashes (SHA-256, MD5, SHA-512) and providing visual confirmation of exact matches.",
    howToUse: [
      "Paste your calculated file hash into Hash 1.",
      "Paste the vendor's official checksum into Hash 2.",
      "View the instant Match / Mismatch status banner.",
    ],
    whyUse: [
      "Prevents malware and corrupted file execution by ensuring downloaded binaries match vendor checksums.",
      "Includes case-insensitive normalization and automatic whitespace trimming.",
    ],
    faqs: [
      {
        question: "Why should I compare checksums?",
        answer: "Comparing checksums ensures that downloaded software or files have not been corrupted during download or tampered with by malicious third parties.",
      },
    ],
    features: [
      "Case-insensitive comparison toggle",
      "Automatic whitespace trimming",
      "Instant visual match / mismatch banner",
      "Character length diagnostic report",
    ],
    tips: [
      "Always verify checksums when downloading OS disk images, cryptographic software, or developer binaries",
    ],
  }
];

export function getToolBySlug(slug: string) {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string, limit = 3) {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tools
    .filter((t) => t.category === tool.category && t.slug !== slug)
    .slice(0, limit);
}

export function buildToolMetadata(tool: ToolInfo): Metadata {
  return {
    title: `${tool.name} - Free Online Tool | ToolSnippet`,
    description: tool.shortDescription,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: tool.heroTitle,
      description: tool.heroDescription,
      url: `https://www.toolsnippet.com/tools/${tool.slug}`,
      siteName: "ToolSnippet",
      type: "website",
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.heroTitle,
      description: tool.heroDescription,
      images: ["/images/og.jpg"],
    },
  };
}
