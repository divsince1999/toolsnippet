"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function EmailValidatorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const validateEmail = () => {
    const email = input.trim();
    if (!email) {
      setOutput(null);
      return;
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = regex.test(email);
    
    const parts = email.split('@');
    const domain = parts[1] || "";
    
    const results = {
      isValid,
      format: isValid ? "Valid format" : "Invalid format",
      user: parts[0],
      domain: domain,
      tld: domain.split('.').pop(),
      suggestions: [] as string[]
    };

    if (!isValid) {
      if (!email.includes('@')) results.suggestions.push("Missing '@' symbol.");
      if (email.includes(' ')) results.suggestions.push("Email cannot contain spaces.");
      if (domain && !domain.includes('.')) results.suggestions.push("Domain must have a dot (e.g., .com).");
    }

    setOutput(results);
  };

  return (
    <ToolContainer title="Email Validator" description="Check if an email address is properly formatted.">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Email Address</label>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onBlur={validateEmail}
            placeholder="example@domain.com"
            className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={validateEmail}>Validate</Button>
          <Button variant="ghost" onClick={clearAll}>Clear</Button>
        </div>

        {output && (
          <div className={`p-6 rounded-xl border ${output.isValid ? 'bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20' : 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`h-3 w-3 rounded-full ${output.isValid ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-bold text-lg">{output.format}</span>
            </div>
            
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between border-b border-black/5 dark:border-white/5 py-2">
                <span className="text-gray-500">Username</span>
                <span className="font-mono">{output.user || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 dark:border-white/5 py-2">
                <span className="text-gray-500">Domain</span>
                <span className="font-mono">{output.domain || '-'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Top-Level Domain</span>
                <span className="font-mono">.{output.tld || '-'}</span>
              </div>
            </div>

            {output.suggestions.length > 0 && (
              <div className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-lg text-sm text-red-700 dark:text-red-400">
                <div className="font-semibold mb-1 text-xs uppercase">Suggestions:</div>
                <ul className="list-disc list-inside">
                  {output.suggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
