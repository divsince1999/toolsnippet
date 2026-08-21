"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

// Unicode conversion mappings
function convertText(text: string, charMap: Record<string, string>): string {
  return text
    .split("")
    .map((c) => charMap[c] || c)
    .join("");
}

const BOLD_MAP: Record<string, string> = {
  a:"𝐚",b:"𝐛",c:"𝐜",d:"𝐝",e:"𝐞",f:"𝐟",g:"𝐠",h:"𝐡",i:"𝐢",j:"𝐣",k:"𝐤",l:"𝐥",m:"𝐦",
  n:"𝐧",o:"𝐨",p:"𝐩",q:"𝐪",r:"𝐫",s:"𝐬",t:"𝐭",u:"𝐮",v:"𝐯",w:"𝐰",x:"𝐱",y:"𝐲",z:"𝐳",
  A:"𝐀",B:"𝐁",C:"𝐂",D:"𝐃",E:"𝐄",F:"𝐅",G:"𝐆",H:"𝐇",I:"𝐈",J:"𝐉",K:"𝐊",L:"𝐋",M:"𝐌",
  N:"𝐍",O:"𝐎",P:"𝐏",Q:"𝐐",R:"𝐑",S:"𝐒",T:"𝐓",U:"𝐔",V:"𝐕",W:"𝐖",X:"𝐗",Y:"𝐘",Z:"𝐙",
  "0":"𝟎","1":"𝟏","2":"𝟐","3":"𝟑","4":"𝟒","5":"𝟓","6":"𝟔","7":"𝟕","8":"𝟖","9":"𝟗"
};

const ITALIC_MAP: Record<string, string> = {
  a:"𝑎",b:"𝑏",c:"𝑐",d:"𝑑",e:"𝑒",f:"𝑓",g:"𝑔",h:"ℎ",i:"𝑖",j:"𝑗",k:"𝑘",l:"𝑙",m:"𝑚",
  n:"𝑛",o:"𝑜",p:"𝑝",q:"𝑞",r:"𝑟",s:"𝑠",t:"𝑡",u:"𝑢",v:"𝑣",w:"𝑤",x:"𝑥",y:"𝑦",z:"𝑧",
  A:"𝐴",B:"𝐵",C:"𝐶",D:"𝐷",E:"𝐸",F:"𝐹",G:"𝐺",H:"𝐻",I:"𝐼",J:"𝐽",K:"𝐾",L:"𝐿",M:"𝑀",
  N:"𝑁",O:"𝑂",P:"𝑃",Q:"𝑄",R:"𝑅",S:"𝑆",T:"𝑇",U:"𝑈",V:"𝑉",W:"𝑊",X:"𝑋",Y:"𝑌",Z:"𝑍"
};

const MONO_MAP: Record<string, string> = {
  a:"𝚖",b:"𝚗",c:"𝚘",d:"𝚙",e:"𝚚",f:"𝚛",g:"𝚜",h:"𝚝",i:"𝚞",j:"𝚟",k:"𝚠",l:"𝚡",m:"𝚢",
  n:"𝚣",o:"𝚘",p:"𝚙",q:"𝚚",r:"𝚛",s:"𝚜",t:"𝚝",u:"𝚞",v:"𝚟",w:"𝚠",x:"𝚡",y:"𝚢",z:"𝚣",
  A:"𝙼",B:"𝙽",C:"𝙾",D:"𝙿",E:"𝚀",F:"𝚁",G:"𝚂",H:"𝚃",I:"𝚄",J:"𝚅",K:"𝚆",L:"𝚇",M:"𝚈",
  N:"𝚉",O:"𝙾",P:"𝙿",Q:"𝚀",R:"𝚁",S:"𝚂",T:"𝚃",U:"𝚄",V:"𝚅",W:"𝚆",X:"𝚇",Y:"𝚈",Z:"𝚉",
  "0":"𝟶","1":"𝟷","2":"𝟸","3":"𝟹","4":"𝟺","5":"𝟻","6":"𝟼","7":"𝟽","8":"𝟾","9":"𝟿"
};

const SCRIPT_MAP: Record<string, string> = {
  a:"𝒶",b:"𝒷",c:"𝒸",d:"𝒹",e:"ℯ",f:"𝒻",g:"ℊ",h:"𝒽",i:"𝒾",j:"𝒿",k:"𝓀",l:"𝓁",m:"𝓂",
  n:"𝓃",o:"ℴ",p:"𝓅",q:"𝓆",r:"𝓇",s:"𝓈",t:"𝓉",u:"𝓊",v:"𝓋",w:"𝓌",x:"𝓍",y:"𝓎",z:"𝓏",
  A:"𝒜",B:"ℬ",C:"𝒞",D:"𝒟",E:"ℰ",F:"ℱ",G:"𝒢",H:"ℋ",I:"ℐ",J:"𝒥",K:"𝒦",L:"ℒ",M:"ℳ",
  N:"𝒩",O:"𝒪",P:"𝒫",Q:"𝒬",R:"ℛ",S:"𝒮",T:"𝒯",U:"𝒰",V:"𝒱",W:"𝒲",X:"𝒳",Y:"𝒴",Z:"𝒵"
};

const DOUBLE_MAP: Record<string, string> = {
  a:"𝕒",b:"𝕓",c:"𝕔",d:"𝕕",e:"𝕖",f:"𝕗",g:"𝕘",h:"𝕙",i:"𝕚",j:"𝕛",k:"𝕜",l:"𝕝",m:"𝕞",
  n:"𝕟",o:"𝕠",p:"𝕡",q:"𝕢",r:"𝕣",s:"𝕤",t:"𝕥",u:"𝕦",v:"𝕧",w:"𝕨",x:"𝕩",y:"𝕪",z:"𝕫",
  A:"𝔸",B:"𝔹",C:"ℂ",D:"𝔻",E:"𝔼",F:"𝔽",G:"𝔾",H:"ℍ",I:"𝕀",J:"𝕁",K:"𝕂",L:"𝕃",M:"𝕄",
  N:"ℕ",O:"𝕆",P:"ℙ",Q:"ℚ",R:"ℝ",S:"𝕊",T:"𝕋",U:"𝕌",V:"𝕍",W:"𝕎",X:"𝕏",Y:"𝕐",Z:"ℤ",
  "0":"𝟘","1":"𝟙","2":"𝟚","3":"𝟛","4":"𝟜","5":"𝟝","6":"𝟞","7":"𝟟","8":"𝟠","9":"𝟡"
};

export default function SocialMediaPostFormatter() {
  const [input, setInput] = useState("Big Announcement! We just launched our new developer tools suite.");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const formattedStyles = useMemo(() => {
    if (!input.trim()) return [];

    const strikethrough = input.split("").map((c) => c + "\u0336").join("");
    const underline = input.split("").map((c) => c + "\u0332").join("");

    return [
      { name: "Bold (Serif)", text: convertText(input, BOLD_MAP) },
      { name: "Italic (Serif)", text: convertText(input, ITALIC_MAP) },
      { name: "Monospace (Code)", text: convertText(input, MONO_MAP) },
      { name: "Cursive / Script", text: convertText(input, SCRIPT_MAP) },
      { name: "Double-Struck", text: convertText(input, DOUBLE_MAP) },
      { name: "Strikethrough", text: strikethrough },
      { name: "Underline", text: underline }
    ];
  }, [input]);

  const handleCopy = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(name);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <ToolContainer title="Social Media Unicode Font Formatter" description="Convert plain text into Unicode bold, italic, monospace, cursive, and gothic font styles for social posts.">
      <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Your Text / Post:</label>
          <span className="text-gray-500 font-mono">{input.length} characters</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type social text here..."
          rows={3}
          className="w-full rounded-xl border border-black/15 bg-transparent p-4 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
        />
      </div>

      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Formatted Unicode Styles ({formattedStyles.length}):
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {formattedStyles.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-solid">
                  {item.name}
                </span>
                <p className="mt-2 text-sm text-gray-900 dark:text-gray-100 break-words font-medium">
                  {item.text}
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(item.text, item.name)}
                >
                  {copiedKey === item.name ? "✓ Copied" : "Copy"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
