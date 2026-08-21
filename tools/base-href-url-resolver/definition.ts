import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "base-href-url-resolver",
  name: "Base Href & Relative URL Resolver",
  category: "Web",
  shortDescription: "Resolve relative links and path references against a base URL according to the RFC 3986 specification.",
  heroTitle: "Base Href & Relative URL Resolver",
  heroDescription: "Resolve relative links and path references against a base URL according to the RFC 3986 specification.",
  about: "The Base Href & Relative URL Resolver evaluates relative paths (e.g. `../assets/logo.png`, `/api/v1`, `?page=2`, `#section`) against a base URL or `<base href='...'>` tag according to standard browser URL resolution rules.",
  features: [
    "Resolves relative paths, directory navigation (`../`), query strings, and anchors",
    "RFC 3986 compliant URL normalization",
    "Batch relative URL resolution support",
    "Displays URL component breakdown (Protocol, Hostname, Path, Query, Hash)"
],
  howToUse: [
    "Enter Base URL (e.g. `https://example.com/blog/posts/`).",
    "Enter one or more relative URLs (e.g. `../images/photo.jpg`, `/login`).",
    "Instantly view the fully resolved absolute URLs."
],
  whyUse: [
    "Debug web scrapers, crawler bots, and broken image links.",
    "Verify how HTML `<base href>` impacts asset loading across nested routes."
],
  tips: [
    "A trailing slash on the base URL matters: `https://example.com/blog/` + `post.html` resolves to `/blog/post.html`, whereas `https://example.com/blog` + `post.html` resolves to `/post.html`."
],
  faqs: [
    {
        "question": "Why does the trailing slash in the base URL change the resolved path?",
        "answer": "According to RFC 3986, if the base path does not end in a slash, the last segment is treated as a filename and replaced by the relative path."
    },
    {
        "question": "How do protocol-relative URLs (//example.com) resolve?",
        "answer": "Protocol-relative URLs inherit the scheme (http or https) of the base URL."
    }
]
};
