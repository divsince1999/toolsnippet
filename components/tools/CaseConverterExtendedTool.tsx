"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CaseConverterExtendedTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();

  const toSnakeCase = (str: string) => str.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join('_');
  const toKebabCase = (str: string) => str.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join('-');
  const toCamelCase = (str: string) => str.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');

  return (
    <ToolContainer title="Case Converter Extended" description="Extended case conversion including snake_case and kebab-case.">
      <TextArea value={input} onChange={e => setInput(e.target.value)} rows={8} />
      <div className="mt-6 flex flex-wrap gap-2">
        <Button onClick={() => setInput(toSnakeCase(input))}>snake_case</Button>
        <Button variant="outline" onClick={() => setInput(toKebabCase(input))}>kebab-case</Button>
        <Button variant="outline" onClick={() => setInput(toCamelCase(input))}>camelCase</Button>
        <Button variant="ghost" onClick={clearAll}>Clear</Button>
      </div>
    </ToolContainer>
  );
}
