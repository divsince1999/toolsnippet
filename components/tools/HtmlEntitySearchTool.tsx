"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

const ENTITIES = [
  { char: "©", name: "copyright", entity: "&copy;", hex: "&#xa9;" },
  { char: "®", name: "registered", entity: "&reg;", hex: "&#xae;" },
  { char: "™", name: "trademark", entity: "&trade;", hex: "&#x2122;" },
  { char: "€", name: "euro", entity: "&euro;", hex: "&#x20ac;" },
  { char: "£", name: "pound", entity: "&pound;", hex: "&#xa3;" },
  { char: "¥", name: "yen", entity: "&yen;", hex: "&#xa5;" },
  { char: "¢", name: "cent", entity: "&cent;", hex: "&#xa2;" },
  { char: "°", name: "degree", entity: "&deg;", hex: "&#xb0;" },
  { char: "±", name: "plus-minus", entity: "&plusmn;", hex: "&#xb1;" },
  { char: "×", name: "multiply", entity: "&times;", hex: "&#xd7;" },
  { char: "÷", name: "divide", entity: "&divide;", hex: "&#xf7;" },
  { char: "¶", name: "paragraph", entity: "&para;", hex: "&#xb6;" },
  { char: "§", name: "section", entity: "&sect;", hex: "&#xa7;" },
  { char: "«", name: "laquo", entity: "&laquo;", hex: "&#xab;" },
  { char: "»", name: "raquo", entity: "&raquo;", hex: "&#xbb;" },
  { char: "…", name: "ellipsis", entity: "&hellip;", hex: "&#x2026;" },
];

export default function HtmlEntitySearchTool() {
  const [search, setSearch] = useState("");

  const filtered = ENTITIES.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.entity.toLowerCase().includes(search.toLowerCase()) ||
    e.char.includes(search)
  );

  return (
    <ToolContainer title="HTML Entity Search" description="Find and copy HTML entities and special characters.">
      <div className="grid gap-6">
        <input 
          type="text" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search entities (e.g., copyright, &copy;)..."
          className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {filtered.map(e => (
            <div 
              key={e.entity} 
              className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex flex-col items-center gap-2 hover:border-primary transition-colors cursor-pointer group"
              onClick={() => navigator.clipboard.writeText(e.entity)}
            >
              <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">{e.char}</div>
              <div className="text-[10px] font-bold text-primary font-mono">{e.entity}</div>
              <div className="text-[8px] text-gray-400 font-mono">{e.hex}</div>
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
}
