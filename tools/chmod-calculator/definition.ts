import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "chmod-calculator",
  "name": "Linux Chmod Permissions Calculator",
  "category": "Data",
  "shortDescription": "Calculate Linux/Unix file permissions visually with octal numbers and symbolic notation.",
  "heroTitle": "Visual Linux Chmod Permissions Calculator",
  "heroDescription": "Calculate Unix file permissions visually with read, write, execute checkboxes and octal codes.",
  "about": "Linux Chmod Permissions Calculator helps system administrators and developers calculate and understand Unix/Linux file permissions with octal numbers (e.g. 755), symbolic strings (rwxr-xr-x), and executable commands.",
  "howToUse": [
    "Check or uncheck Read, Write, and Execute boxes for Owner, Group, and Public.",
    "Or click a quick preset like 755, 644, or 600.",
    "Enter your target filename and copy the generated chmod command."
  ],
  "whyUse": [
    "Eliminates guesswork when configuring server and script permissions.",
    "Provides instant octal and symbolic permission representations.",
    "Includes standard secure server presets (644 web files, 600 SSH keys)."
  ],
  "faqs": [
    {
      "question": "What does chmod 755 mean?",
      "answer": "755 gives the Owner full read/write/execute permissions (7), while Group and Public have read and execute permissions (5)."
    },
    {
      "question": "What permission should SSH private keys have?",
      "answer": "SSH private keys must be set to 600 (read/write for Owner only) or 400 (read-only for Owner)."
    }
  ],
  "features": [
    "Interactive 3x3 permission matrix",
    "One-click standard presets (755, 644, 777, 600, 700, 400)",
    "Instant octal (755) and symbolic (-rwxr-xr-x) calculation",
    "Customizable copyable terminal command"
  ],
  "tips": [
    "Never use 777 in production environments as it allows anyone to modify and execute your files",
    "Use 644 for static web files and 755 for directories and executable scripts"
  ]
};
