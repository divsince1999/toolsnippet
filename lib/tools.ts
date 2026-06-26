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
    title: `${tool.name} - ToolSnippet`,
    description: tool.shortDescription,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title: tool.heroTitle,
      description: tool.heroDescription,
    },
  };
}
