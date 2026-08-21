"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

interface MimeEntry {
  mime: string;
  ext: string[];
  category: "application" | "image" | "audio" | "video" | "font" | "text";
  desc: string;
}

const MIME_DATA: MimeEntry[] = [
  { mime: "application/json", ext: [".json"], category: "application", desc: "JavaScript Object Notation format" },
  { mime: "application/javascript", ext: [".js", ".mjs"], category: "application", desc: "JavaScript source code" },
  { mime: "application/pdf", ext: [".pdf"], category: "application", desc: "Adobe Portable Document Format" },
  { mime: "application/xml", ext: [".xml"], category: "application", desc: "Extensible Markup Language" },
  { mime: "application/zip", ext: [".zip"], category: "application", desc: "ZIP archive archive file" },
  { mime: "application/wasm", ext: [".wasm"], category: "application", desc: "WebAssembly binary module" },
  { mime: "application/x-tar", ext: [".tar"], category: "application", desc: "Tape Archive file" },
  { mime: "application/gzip", ext: [".gz"], category: "application", desc: "GZip compressed archive" },
  { mime: "application/vnd.ms-excel", ext: [".xls"], category: "application", desc: "Microsoft Excel spreadsheet" },
  { mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ext: [".xlsx"], category: "application", desc: "OpenXML Excel spreadsheet" },
  { mime: "image/png", ext: [".png"], category: "image", desc: "Portable Network Graphics lossless bitmap" },
  { mime: "image/jpeg", ext: [".jpg", ".jpeg"], category: "image", desc: "JPEG compressed raster image" },
  { mime: "image/webp", ext: [".webp"], category: "image", desc: "Google WebP image format" },
  { mime: "image/svg+xml", ext: [".svg"], category: "image", desc: "Scalable Vector Graphics" },
  { mime: "image/gif", ext: [".gif"], category: "image", desc: "Graphics Interchange Format" },
  { mime: "image/avif", ext: [".avif"], category: "image", desc: "AV1 Image File Format" },
  { mime: "image/x-icon", ext: [".ico"], category: "image", desc: "Windows Favicon / Icon format" },
  { mime: "text/html", ext: [".html", ".htm"], category: "text", desc: "HyperText Markup Language" },
  { mime: "text/css", ext: [".css"], category: "text", desc: "Cascading Style Sheets" },
  { mime: "text/plain", ext: [".txt", ".log"], category: "text", desc: "Plain text document" },
  { mime: "text/csv", ext: [".csv"], category: "text", desc: "Comma-Separated Values table" },
  { mime: "text/markdown", ext: [".md", ".markdown"], category: "text", desc: "Markdown formatted text" },
  { mime: "audio/mpeg", ext: [".mp3"], category: "audio", desc: "MPEG Audio Layer III" },
  { mime: "audio/wav", ext: [".wav"], category: "audio", desc: "Waveform Audio File" },
  { mime: "audio/ogg", ext: [".ogg", ".oga"], category: "audio", desc: "Ogg Vorbis Audio" },
  { mime: "video/mp4", ext: [".mp4"], category: "video", desc: "MPEG-4 Part 14 Video" },
  { mime: "video/webm", ext: [".webm"], category: "video", desc: "WebM Open Media Video" },
  { mime: "video/quicktime", ext: [".mov"], category: "video", desc: "Apple QuickTime Movie" },
  { mime: "font/woff2", ext: [".woff2"], category: "font", desc: "Web Open Font Format 2.0" },
  { mime: "font/woff", ext: [".woff"], category: "font", desc: "Web Open Font Format 1.0" },
  { mime: "font/ttf", ext: [".ttf"], category: "font", desc: "TrueType Font file" },
  { mime: "font/otf", ext: [".otf"], category: "font", desc: "OpenType Font file" },
];

export default function MimeTypeLookupTool() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filteredMimes = useMemo(() => {
    return MIME_DATA.filter((m) => {
      const matchesCat = category === "all" || m.category === category;
      const cleanQ = search.trim().toLowerCase().replace(/^\./, "");
      const matchesQuery =
        cleanQ === "" ||
        m.mime.toLowerCase().includes(cleanQ) ||
        m.desc.toLowerCase().includes(cleanQ) ||
        m.ext.some((e) => e.replace(".", "").toLowerCase().includes(cleanQ));
      return matchesCat && matchesQuery;
    });
  }, [search, category]);

  return (
    <ToolContainer
      title="MIME Type & File Extension Directory"
      description="Instant lookup connecting file extensions to official IANA MIME content-type headers."
      maxWidth="5xl"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by extension (e.g. .png, wasm) or MIME type (e.g. video/mp4)..."
            className="w-full sm:max-w-md rounded-lg border border-black/15 bg-white p-3 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {["all", "application", "image", "text", "audio", "video", "font"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-lg px-3 py-2 uppercase transition ${
                  category === cat
                    ? "bg-primary text-white"
                    : "border border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMimes.map((item) => (
            <div
              key={item.mime}
              className="flex flex-col justify-between rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] transition hover:border-primary/50"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded-md border border-black/10 px-2 py-0.5 text-xs font-bold font-mono text-primary bg-primary/5">
                    {item.ext.join(", ")}
                  </span>
                  <span className="text-[11px] uppercase font-bold text-gray-400">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold font-mono text-gray-900 dark:text-white break-all mb-1.5">
                  {item.mime}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
}
