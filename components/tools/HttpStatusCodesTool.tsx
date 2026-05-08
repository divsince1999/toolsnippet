"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

const STATUS_CODES = [
  { code: 200, name: "OK", desc: "The request has succeeded." },
  { code: 201, name: "Created", desc: "The request has been fulfilled and has resulted in one or more new resources being created." },
  { code: 204, name: "No Content", desc: "The server successfully processed the request, but is not returning any content." },
  { code: 301, name: "Moved Permanently", desc: "The target resource has been assigned a new permanent URI." },
  { code: 302, name: "Found", desc: "The target resource resides temporarily under a different URI." },
  { code: 400, name: "Bad Request", desc: "The server cannot or will not process the request due to something that is perceived to be a client error." },
  { code: 401, name: "Unauthorized", desc: "The request has not been applied because it lacks valid authentication credentials for the target resource." },
  { code: 403, name: "Forbidden", desc: "The server understood the request but refuses to authorize it." },
  { code: 404, name: "Not Found", desc: "The server cannot find the requested resource." },
  { code: 405, name: "Method Not Allowed", desc: "The request method is known by the server but has been disabled and cannot be used." },
  { code: 500, name: "Internal Server Error", desc: "The server encountered an unexpected condition that prevented it from fulfilling the request." },
  { code: 502, name: "Bad Gateway", desc: "The server, while acting as a gateway or proxy, received an invalid response from an upstream server." },
  { code: 503, name: "Service Unavailable", desc: "The server is currently unable to handle the request due to a temporary overload or scheduled maintenance." },
  { code: 504, name: "Gateway Timeout", desc: "The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server." },
];

export default function HttpStatusCodesTool() {
  const [search, setSearch] = useState("");

  const filtered = STATUS_CODES.filter(s => 
    s.code.toString().includes(search) || 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ToolContainer
      title="HTTP Status Codes"
      description="Quick reference for standard HTTP response status codes and their meanings."
    >
      <div className="grid gap-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by code or name (e.g., 404)..."
          className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(s => (
            <div key={s.code} className="p-4 rounded-lg border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-lg font-bold ${s.code >= 500 ? 'text-red-500' : s.code >= 400 ? 'text-orange-500' : 'text-green-500'}`}>
                  {s.code}
                </span>
                <span className="text-xs font-medium uppercase text-gray-500">{s.name}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-8 text-gray-500 italic">No status codes found for "{search}"</p>
        )}
      </div>
    </ToolContainer>
  );
}
