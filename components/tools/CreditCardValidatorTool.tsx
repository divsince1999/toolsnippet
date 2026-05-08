"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CreditCardValidatorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const validateLuhn = (num: string) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const getCardType = (num: string) => {
    if (/^4/.test(num)) return "Visa";
    if (/^5[1-5]/.test(num)) return "Mastercard";
    if (/^3[47]/.test(num)) return "American Express";
    if (/^6(?:011|5)/.test(num)) return "Discover";
    if (/^3(?:0[0-5]|[68])/.test(num)) return "Diners Club";
    if (/^(?:2131|1800|35)/.test(num)) return "JCB";
    return "Unknown";
  };

  const handleValidate = () => {
    const cleanNum = input.replace(/\D/g, "");
    if (!cleanNum) {
      setOutput(null);
      return;
    }

    const isValid = validateLuhn(cleanNum);
    const type = getCardType(cleanNum);
    
    setOutput({
      isValid,
      type,
      length: cleanNum.length,
      formatted: cleanNum.replace(/(.{4})/g, "$1 ").trim()
    });
  };

  return (
    <ToolContainer title="Credit Card Validator" description="Verify card numbers using the Luhn algorithm.">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Card Number</label>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="XXXX XXXX XXXX XXXX"
            className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20 font-mono"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleValidate}>Validate Card</Button>
          <Button variant="ghost" onClick={clearAll}>Clear</Button>
        </div>

        {output && (
          <div className={`p-6 rounded-xl border ${output.isValid ? 'bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20' : 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${output.isValid ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="font-bold text-lg">{output.isValid ? 'Valid Card Number' : 'Invalid Checksum'}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-bold uppercase tracking-wider">{output.type}</span>
            </div>

            <div className="relative h-40 w-full max-w-sm mx-auto rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20 text-4xl font-black italic">{output.type}</div>
              <div className="mt-8 font-mono text-xl tracking-widest">{output.formatted}</div>
              <div className="mt-6 flex justify-between items-end">
                <div className="text-[10px] uppercase opacity-50">Luhn Validated</div>
                <div className="h-8 w-10 bg-yellow-500/80 rounded" />
              </div>
            </div>

            {!output.isValid && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-center">
                This number failed the Luhn algorithm checksum. Please check for typos.
              </p>
            )}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
