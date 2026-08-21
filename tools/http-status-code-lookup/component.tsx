"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

interface StatusCode {
  code: number;
  phrase: string;
  category: "1xx" | "2xx" | "3xx" | "4xx" | "5xx";
  description: string;
  cacheable: boolean;
  spec: string;
}

const STATUS_CODES: StatusCode[] = [
  { code: 100, phrase: "Continue", category: "1xx", description: "The server has received the request headers and the client should proceed to send the request body.", cacheable: false, spec: "RFC 9110" },
  { code: 101, phrase: "Switching Protocols", category: "1xx", description: "The requester has asked the server to switch protocols (e.g. HTTP to WebSocket).", cacheable: false, spec: "RFC 9110" },
  { code: 200, phrase: "OK", category: "2xx", description: "Standard response for successful HTTP requests.", cacheable: true, spec: "RFC 9110" },
  { code: 201, phrase: "Created", category: "2xx", description: "The request has been fulfilled, resulting in the creation of a new resource.", cacheable: true, spec: "RFC 9110" },
  { code: 202, phrase: "Accepted", category: "2xx", description: "The request has been accepted for processing, but processing has not completed.", cacheable: false, spec: "RFC 9110" },
  { code: 204, phrase: "No Content", category: "2xx", description: "The server successfully processed the request, but is not returning any content.", cacheable: true, spec: "RFC 9110" },
  { code: 206, phrase: "Partial Content", category: "2xx", description: "The server is delivering only part of the resource due to a Range header sent by the client.", cacheable: true, spec: "RFC 9110" },
  { code: 301, phrase: "Moved Permanently", category: "3xx", description: "This and all future requests should be directed to the given URI in the Location header.", cacheable: true, spec: "RFC 9110" },
  { code: 302, phrase: "Found (Temporary Redirect)", category: "3xx", description: "Tells the client to look at another URL temporarily.", cacheable: false, spec: "RFC 9110" },
  { code: 304, phrase: "Not Modified", category: "3xx", description: "Indicates that the resource has not been modified since the version specified by the request headers.", cacheable: true, spec: "RFC 9110" },
  { code: 307, phrase: "Temporary Redirect", category: "3xx", description: "The request should be repeated with another URI, preserving the HTTP method (e.g. POST remains POST).", cacheable: false, spec: "RFC 9110" },
  { code: 308, phrase: "Permanent Redirect", category: "3xx", description: "The request and all future requests should be repeated using another URI, preserving the HTTP method.", cacheable: true, spec: "RFC 9110" },
  { code: 400, phrase: "Bad Request", category: "4xx", description: "The server cannot process the request due to a client error (e.g. malformed syntax, invalid request framing).", cacheable: false, spec: "RFC 9110" },
  { code: 401, phrase: "Unauthorized", category: "4xx", description: "Authentication is required and has failed or has not yet been provided.", cacheable: false, spec: "RFC 9110" },
  { code: 403, phrase: "Forbidden", category: "4xx", description: "The request contained valid data and was understood by the server, but the server refuses action.", cacheable: false, spec: "RFC 9110" },
  { code: 404, phrase: "Not Found", category: "4xx", description: "The requested resource could not be found but may be available in the future.", cacheable: true, spec: "RFC 9110" },
  { code: 405, phrase: "Method Not Allowed", category: "4xx", description: "A request method is not supported for the requested resource (e.g. GET on a POST-only endpoint).", cacheable: false, spec: "RFC 9110" },
  { code: 408, phrase: "Request Timeout", category: "4xx", description: "The server timed out waiting for the request.", cacheable: false, spec: "RFC 9110" },
  { code: 409, phrase: "Conflict", category: "4xx", description: "Indicates that the request could not be processed because of conflict in the current state of the resource.", cacheable: false, spec: "RFC 9110" },
  { code: 410, phrase: "Gone", category: "4xx", description: "Indicates that the resource requested is no longer available and will not be available again.", cacheable: true, spec: "RFC 9110" },
  { code: 413, phrase: "Payload Too Large", category: "4xx", description: "The request is larger than the server is willing or able to process.", cacheable: false, spec: "RFC 9110" },
  { code: 422, phrase: "Unprocessable Content", category: "4xx", description: "The request was well-formed but was unable to be followed due to semantic errors.", cacheable: false, spec: "RFC 9110" },
  { code: 429, phrase: "Too Many Requests", category: "4xx", description: "The user has sent too many requests in a given amount of time (rate limiting).", cacheable: false, spec: "RFC 6585" },
  { code: 500, phrase: "Internal Server Error", category: "5xx", description: "A generic error message, given when an unexpected condition was encountered.", cacheable: false, spec: "RFC 9110" },
  { code: 501, phrase: "Not Implemented", category: "5xx", description: "The server either does not recognize the request method, or lacks the ability to fulfill it.", cacheable: false, spec: "RFC 9110" },
  { code: 502, phrase: "Bad Gateway", category: "5xx", description: "The server, while acting as a gateway or proxy, received an invalid response from the inbound server.", cacheable: false, spec: "RFC 9110" },
  { code: 503, phrase: "Service Unavailable", category: "5xx", description: "The server cannot handle the request (because it is overloaded or down for maintenance).", cacheable: false, spec: "RFC 9110" },
  { code: 504, phrase: "Gateway Timeout", category: "5xx", description: "The server, while acting as a gateway or proxy, did not receive a timely response from upstream.", cacheable: false, spec: "RFC 9110" },
];

export default function HttpStatusCodeLookupTool() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCodes = useMemo(() => {
    return STATUS_CODES.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        search.trim() === "" ||
        item.code.toString().includes(search.trim()) ||
        item.phrase.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const getBadgeColor = (cat: string) => {
    switch (cat) {
      case "1xx": return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300";
      case "2xx": return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300";
      case "3xx": return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
      case "4xx": return "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300";
      case "5xx": return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ToolContainer
      title="HTTP Status Codes Directory"
      description="Instant lookup and reference for all RFC HTTP response status codes with definitions and caching rules."
      maxWidth="5xl"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by code (e.g. 404), name (e.g. Created), or description..."
            className="w-full sm:max-w-md rounded-lg border border-black/15 bg-white p-3 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {["all", "1xx", "2xx", "3xx", "4xx", "5xx"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-3 py-2 uppercase transition ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "border border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                }`}
              >
                {cat === "all" ? "All Codes" : `${cat} Series`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCodes.map((item) => (
            <div
              key={item.code}
              className="flex flex-col justify-between rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] transition hover:border-primary/50"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`rounded-md px-2.5 py-1 text-sm font-extrabold font-mono ${getBadgeColor(item.category)}`}>
                    {item.code}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    {item.spec}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                  {item.phrase}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-medium text-gray-500">
                <span>Default Caching:</span>
                <span className={item.cacheable ? "text-green-600 dark:text-green-400 font-semibold" : "text-gray-400"}>
                  {item.cacheable ? "Cacheable" : "Not Cacheable"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
}
