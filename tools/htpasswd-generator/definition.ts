import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "htpasswd-generator",
  "name": "Apache & Nginx .htpasswd Generator",
  "category": "Auth",
  "shortDescription": "Generate secure HTTP Basic Authentication .htpasswd entries in Bcrypt, SHA-1, and MD5-APR1 formats.",
  "heroTitle": "Generate .htpasswd Entries for Apache & Nginx",
  "heroDescription": "Create HTTP Basic Authentication password lines in Bcrypt ($2y$), SHA-1 ({SHA}), and MD5-APR1 ($apr1$) formats.",
  "about": "Apache & Nginx .htpasswd Generator produces password hash entries for .htpasswd files used in web server directory protection and HTTP Basic Authentication.",
  "howToUse": [
    "Enter the username and password.",
    "Choose your hash algorithm: Bcrypt ($2y$), SHA-1 ({SHA}), or MD5-APR1 ($apr1$).",
    "Click 'Generate .htpasswd Entry' and copy the resulting string into your .htpasswd file."
  ],
  "whyUse": [
    "Protects staging websites, admin panels, and internal documentation.",
    "Supports modern Bcrypt format for Nginx and Apache 2.4+."
  ],
  "faqs": [
    {
      "question": "Where do I put the generated line?",
      "answer": "Copy the line into a file named .htpasswd on your web server, and reference it inside your Apache .htaccess or Nginx configuration."
    }
  ],
  "features": [
    "Bcrypt ($2y$) format",
    "Apache MD5-APR1 ($apr1$) format",
    "Legacy SHA-1 ({SHA}) format",
    "Instant one-click copy"
  ],
  "tips": [
    "For modern Nginx and Apache servers, always choose Bcrypt for maximum brute-force resistance"
  ]
};
