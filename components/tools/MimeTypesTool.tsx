"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

const MIME_TYPES = [
  { ext: ".html", type: "text/html" },
  { ext: ".css", type: "text/css" },
  { ext: ".js", type: "text/javascript" },
  { ext: ".json", type: "application/json" },
  { ext: ".png", type: "image/png" },
  { ext: ".jpg", type: "image/jpeg" },
  { ext: ".gif", type: "image/gif" },
  { ext: ".svg", type: "image/svg+xml" },
  { ext: ".pdf", type: "application/pdf" },
  { ext: ".zip", type: "application/zip" },
  { ext: ".mp3", type: "audio/mpeg" },
  { ext: ".mp4", type: "video/mp4" },
  { ext: ".txt", type: "text/plain" },
  { ext: ".csv", type: "text/csv" },
  { ext: ".xml", type: "application/xml" },
];

export default function MimeTypesTool() {
  const [search, setSearch] = useState("");

  const filtered = MIME_TYPES.filter(m => 
    m.ext.toLowerCase().includes(search.toLowerCase()) || 
    m.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ToolContainer
      title="MIME Types Lookup"
      description="Quickly find the correct MIME type for any file extension."
    >
      <div className="grid gap-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by extension or type (e.g., .pdf)..."
          className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
        />
        <div className="overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/[0.03] dark:bg-white/[0.03] text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 font-medium">Extension</th>
                <th className="px-4 py-3 font-medium">MIME Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filtered.map(m => (
                <tr key={m.ext} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                  <td className="px-4 py-3 font-mono text-primary">{m.ext}</td>
                  <td className="px-4 py-3 font-mono">{m.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-8 text-gray-500 italic">No MIME types found for "{search}"</p>
        )}
      </div>
    </ToolContainer>
  );
}
