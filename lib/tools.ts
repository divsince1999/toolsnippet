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
