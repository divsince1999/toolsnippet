import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "curl-to-php-curl",
  name: "cURL to PHP cURL Code Converter",
  category: "Dev",
  shortDescription: "Convert cURL terminal commands into PHP curl_init and curl_setopt_array scripts with headers and JSON payloads.",
  heroTitle: "cURL to PHP cURL Code Converter",
  heroDescription: "Convert cURL terminal commands into PHP curl_init and curl_setopt_array scripts with headers and JSON payloads.",
  about: "The cURL to PHP cURL Converter transforms raw terminal `curl` commands into native PHP scripts using `curl_init()`, `curl_setopt_array()`, and `curl_exec()` with complete error handling.",
  features: [
    "Parses GET, POST, PUT, DELETE, PATCH HTTP methods",
    "Handles custom headers (`-H`), Authorization tokens, and User-Agents",
    "Converts raw JSON payload strings (`-d` / `--data`) into clean PHP array parameters",
    "Includes boilerplate error checking (`curl_error`)"
],
  howToUse: [
    "Paste your cURL command into the input box.",
    "Instantly view the converted native PHP cURL script.",
    "Copy and execute directly in your PHP backend application."
],
  whyUse: [
    "Quickly integrate third-party API documentation examples into Laravel, Symfony, or WordPress plugins.",
    "Avoid syntax typos in `CURLOPT_HTTPHEADER` and `CURLOPT_POSTFIELDS`."
],
  tips: [
    "Remember to close the curl session with `curl_close($ch)` to free system resources."
],
  faqs: [
    {
        "question": "Why should I use curl_setopt_array instead of multiple curl_setopt calls?",
        "answer": "`curl_setopt_array()` sets all options in a single array, resulting in cleaner, more readable, and faster code."
    },
    {
        "question": "Does this handle SSL verification in PHP?",
        "answer": "By default, PHP cURL verifies SSL certificates (`CURLOPT_SSL_VERIFYPEER => true`)."
    }
]
};
