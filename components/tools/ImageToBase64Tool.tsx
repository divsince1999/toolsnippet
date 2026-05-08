"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ImageToBase64Tool() {
  const { output, setOutput, clearAll } = useTool();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOutput(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ToolContainer title="Image to Base64" description="Convert images to Base64 data strings for embedding.">
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={clearAll} disabled={!output}>Clear</Button>
        </div>
        {output && (
          <div className="grid gap-4">
            <img src={output} alt="Preview" className="max-h-40 w-fit rounded-lg border border-black/10" />
            <TextArea label="Base64 Data URI" readOnly copyable value={output} rows={5} />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
