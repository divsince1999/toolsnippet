import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "unicode-escape-converter",
  name: "Unicode & UTF-16 Escape Converter",
  category: "Encoding",
  shortDescription: "Encode text to Unicode escape sequences (\u0041, \u{1F600}) and decode escaped strings back to UTF-8.",
  heroTitle: "Unicode & UTF-16 Escape Converter",
  heroDescription: "Encode text to Unicode escape sequences (\\u0041, \\u{1F600}) and decode escaped strings back to UTF-8.",
  about: "The Unicode & UTF-16 Escape Converter encodes strings into standard 4-digit hexadecimal Unicode escape sequences (`\\uXXXX`), ES6 code point escapes (`\\u{1F600}`), and HTML entity codes (`&#x...;`), and decodes escaped strings back to plain text.",
  features: [
    "Encodes text to 4-digit `\\uXXXX` and ES6 `\\u{XXXXX}` Unicode escapes",
    "Decodes escaped Unicode strings back to readable UTF-8 characters",
    "Handles emojis and surrogate pairs (`\\uD83D\\uDE00`)",
    "Bi-directional encode / decode with instant copy"
],
  howToUse: [
    "Select mode (Encode to Unicode Escapes or Decode to Plain Text).",
    "Type or paste your text content.",
    "Instantly view and copy the converted Unicode string."
],
  whyUse: [
    "Embed non-ASCII characters and emojis safely inside JSON, Java, or C++ source files.",
    "Unpack escaped strings extracted from log files or network payloads."
],
  tips: [
    "Characters outside the Basic Multilingual Plane (BMP, like emojis) require surrogate pairs (`\\uD83D\\uDE80`) in legacy JavaScript engines."
],
  faqs: [
    {
        "question": "What is the difference between \\u0041 and \\u{41}?",
        "answer": "`\\u0041` is the fixed 4-hex-digit escape notation. `\\u{41}` is the ES6 variable-length code point notation that supports characters up to `\\u{10FFFF}` without surrogate pairs."
    },
    {
        "question": "How are surrogate pairs represented?",
        "answer": "A surrogate pair consists of a High Surrogate (`0xD800–0xDBFF`) and a Low Surrogate (`0xDC00–0xDFFF`) combined to represent code points > 65,535."
    }
]
};
