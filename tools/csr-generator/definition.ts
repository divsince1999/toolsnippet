import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "csr-generator",
  "name": "CSR (Certificate Signing Request) Builder",
  "category": "Auth",
  "shortDescription": "Generate standard PKCS#10 SSL Certificate Signing Requests (CSR) and 2048-bit RSA Private Keys.",
  "heroTitle": "Generate SSL Certificate Signing Requests (CSR)",
  "heroDescription": "Create standard PKCS#10 Certificate Signing Requests (CSR) and 2048-bit RSA Private Keys for SSL/TLS certificates.",
  "about": "CSR Builder creates standard PEM-formatted Certificate Signing Requests containing your domain name, organization, country, and public key needed to order SSL certificates from Certificate Authorities.",
  "howToUse": [
    "Enter your Domain / Common Name (e.g. toolsnippet.com).",
    "Fill in your Organization, 2-letter Country code, and State.",
    "Click 'Generate CSR & Private Key'.",
    "Submit the CSR to your SSL provider and save the Private Key securely."
  ],
  "whyUse": [
    "Generates both the CSR and RSA Private Key in one step.",
    "Client-side generation guarantees your private key is never transmitted over the internet."
  ],
  "faqs": [
    {
      "question": "What is a CSR?",
      "answer": "A CSR (Certificate Signing Request) is an encrypted message sent to a Certificate Authority containing your public key and domain information to request an SSL certificate."
    }
  ],
  "features": [
    "Standard PKCS#10 CSR PEM output",
    "2048-bit RSA Private Key generation",
    "Custom organization and country fields",
    "100% private in-browser generation"
  ],
  "tips": [
    "Always store your RSA Private Key safely; Certificate Authorities do not have a copy of it"
  ]
};
