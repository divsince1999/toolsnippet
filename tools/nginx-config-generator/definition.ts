import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "nginx-config-generator",
  name: "Nginx Configuration & Virtual Host Generator",
  category: "Dev",
  shortDescription: "Generate secure, high-performance Nginx server blocks for Reverse Proxies, SSL Certificates, Gzip compression, and SPAs.",
  heroTitle: "Nginx Configuration & Virtual Host Generator",
  heroDescription: "Generate secure, high-performance Nginx server blocks for Reverse Proxies, SSL Certificates, Gzip compression, and SPAs.",
  about: "The Nginx Configuration Generator crafts production-grade virtual host files with HTTP-to-HTTPS redirects, Let's Encrypt SSL directives, WebSocket support, rate limiting, and security headers.",
  features: [
    "Reverse Proxy configuration with WebSocket support (`Upgrade` & `Connection` headers)",
    "SSL Certificate & HTTPS redirection (Certbot / Let's Encrypt)",
    "Single Page Application (SPA) fallback `try_files $uri $uri/ /index.html`",
    "Gzip and Brotli static asset caching directives"
],
  howToUse: [
    "Enter your Domain Name (e.g. `example.com`).",
    "Choose Server Type (Reverse Proxy Node/Python, Static SPA, or PHP-FPM).",
    "Specify backend port or root folder directory.",
    "Copy Nginx configuration into `/etc/nginx/sites-available/`."
],
  whyUse: [
    "Prevent common Nginx misconfigurations like missing `proxy_set_header X-Forwarded-For`.",
    "Enable instant HTTPS and modern TLS 1.2/1.3 security ciphers."
],
  tips: [
    "Always test your configuration syntax before restarting Nginx with `sudo nginx -t`."
],
  faqs: [
    {
        "question": "How do I test my Nginx configuration before reloading?",
        "answer": "Run `sudo nginx -t` in your terminal. If the syntax is valid, safely apply changes using `sudo systemctl reload nginx`."
    },
    {
        "question": "What headers are required for WebSocket proxying in Nginx?",
        "answer": "You must include `proxy_set_header Upgrade $http_upgrade;` and `proxy_set_header Connection 'upgrade';`."
    }
]
};
