"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

const MORSE_MAP: Record<string, string> = {
  "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.", "g": "--.", "h": "....",
  "i": "..", "j": ".---", "k": "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---", "p": ".--.",
  "q": "--.-", "r": ".-.", "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-",
  "y": "-.--", "z": "--..", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
  "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----", " ": "/"
};

export default function MorseCodeConverterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const isMorse = input.includes(".") || input.includes("-");
    if (isMorse) {
      const reverseMap = Object.entries(MORSE_MAP).reduce((acc, [k, v]) => ({ ...acc, [v]: k }), {} as any);
      const text = input.trim().split(" ").map(code => reverseMap[code] || "?").join("");
      setOutput(text.toUpperCase());
    } else {
      const morse = input.toLowerCase().split("").map(char => MORSE_MAP[char] || "").join(" ");
      setOutput(morse);
    }
  };

  return (
    <ToolContainer title="Morse Code Converter" description="Convert text to Morse code and vice-versa.">
      <div className="grid gap-6">
        <TextArea label="Input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type text or morse code..." rows={5} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Translate</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Output" readOnly copyable value={output} rows={5} />}
      </div>
    </ToolContainer>
  );
}
