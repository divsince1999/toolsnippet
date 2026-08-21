import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "curl-to-go-http",
  name: "cURL to Go HTTP Client Code Converter",
  category: "Dev",
  shortDescription: "Convert cURL commands into idiomatic Golang net/http client requests with context and error handling.",
  heroTitle: "cURL to Go HTTP Client Code Converter",
  heroDescription: "Convert cURL commands into idiomatic Golang net/http client requests with context and error handling.",
  about: "The cURL to Go HTTP Converter translates command-line `curl` requests into native Go `net/http` code, handling request creation, header injection, request body readers (`bytes.NewBuffer`), and response reading with `io.ReadAll`.",
  features: [
    "Generates clean, idiomatic Go `http.NewRequestWithContext` code",
    "Handles string payload readers (`strings.NewReader` or `bytes.NewBuffer`)",
    "Injects request headers and Authorization tokens",
    "Includes deferred `resp.Body.Close()` and response error handling"
],
  howToUse: [
    "Paste your cURL command into the input box.",
    "Instantly view the converted Go application code.",
    "Copy and paste into your Go backend handler or client package."
],
  whyUse: [
    "Speed up Go microservice development when consuming third-party REST APIs.",
    "Ensure proper Go memory management with deferred body closing."
],
  tips: [
    "Always defer `resp.Body.Close()` immediately after checking `err == nil` to avoid socket leaks in Go."
],
  faqs: [
    {
        "question": "Why does the generated Go code use http.NewRequestWithContext?",
        "answer": "Using `http.NewRequestWithContext` allows you to set request timeouts and propagate cancellation signals in Go HTTP servers."
    },
    {
        "question": "How are request headers set in Go http.Request?",
        "answer": "Headers are added using `req.Header.Add(\"Header-Name\", \"value\")` or `req.Header.Set()`."
    }
]
};
