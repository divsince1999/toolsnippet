import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "prefix-suffix-adder",
  "name": "Prefix & Suffix Adder",
  "category": "Text",
  "shortDescription": "Add a custom prefix or suffix to each line of text.",
  "heroTitle": "Batch add prefixes and suffixes",
  "heroDescription": "Quickly prepend or append custom text to every single line in a list.",
  "about": "Prefix & Suffix Adder is a huge time-saver for generating arrays, formatting SQL lists, or building HTML tags around bulk text.",
  "howToUse": [
    "Paste a list of text into the input area.",
    "Type the desired prefix (e.g., <li>) and suffix (e.g., </li>).",
    "The tool updates all lines instantly in the output area."
  ],
  "whyUse": [
    "Eliminates repetitive manual typing or cursor manipulation.",
    "Perfect for wrapping lists in quotes, brackets, or HTML tags.",
    "All processing happens privately in your browser."
  ],
  "faqs": [
    {
      "question": "Can I use spaces in the prefix/suffix?",
      "answer": "Yes, any spaces you type will be exactly prepended or appended to the lines."
    },
    {
      "question": "Does it skip empty lines?",
      "answer": "There is an option you can toggle to skip adding prefixes/suffixes to empty lines."
    }
  ],
  "features": [
    "Add custom text to the beginning of lines",
    "Add custom text to the end of lines",
    "Option to ignore empty lines",
    "Real-time preview",
    "Instant copy to clipboard"
  ],
  "tips": [
    "Use prefix \" and suffix \", to format text into a JSON or SQL array",
    "Wrap lines in <li> and </li> for quick HTML lists",
    "Add a comma suffix to convert vertical lists to CSV format"
  ]
};
