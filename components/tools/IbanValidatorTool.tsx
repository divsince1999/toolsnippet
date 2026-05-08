"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function IbanValidatorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool<{
    isValid: boolean;
    countryCode: string;
  }>();

  const validateIBAN = (iban: string) => {
    try {
      iban = iban.replace(/\s/g, '').toUpperCase();
      if (iban.length < 4) return false;

      // Rearrange: move first 4 chars to end
      const rearranged = iban.substring(4) + iban.substring(0, 4);
      
      // Convert letters to numbers (A=10, B=11, ...)
      let numeric = '';
      for (let i = 0; i < rearranged.length; i++) {
        const char = rearranged[i];
        if (/[A-Z]/.test(char)) {
          numeric += (char.charCodeAt(0) - 55).toString();
        } else {
          numeric += char;
        }
      }

      // Modulo 97 using BigInt for large numbers
      const mod = BigInt(numeric) % BigInt(97);
      return mod === BigInt(1);
    } catch (e) {
      return false;
    }
  };

  const handleValidate = () => {
    const isValid = validateIBAN(input);
    const countryCode = input.substring(0, 2).toUpperCase();
    setOutput({ isValid, countryCode });
  };

  return (
    <ToolContainer title="IBAN Validator" description="Validate International Bank Account Numbers.">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <label className="text-sm font-medium">IBAN</label>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="DE89 3704 0044 0532 0130 00"
            className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20 font-mono"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleValidate}>Validate IBAN</Button>
          <Button variant="ghost" onClick={clearAll}>Clear</Button>
        </div>

        {output && (
          <div className={`p-6 rounded-xl border ${output.isValid ? 'bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20' : 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20'}`}>
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${output.isValid ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-bold text-lg">{output.isValid ? 'Valid IBAN' : 'Invalid IBAN Checksum'}</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">Country Code: <span className="font-bold text-primary">{output.countryCode}</span></div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
