"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function toPascalCase(str: string): string {
  return str.replace(/(^|_|-|\s)(\w)/g, (_, __, c) => c.toUpperCase());
}

function inferKotlinType(val: unknown, key: string, classes: string[]): string {
  if (val === null || val === undefined) return "Any?";
  if (typeof val === "boolean") return "Boolean";
  if (typeof val === "number") return Number.isInteger(val) ? "Int" : "Double";
  if (typeof val === "string") return "String";

  if (Array.isArray(val)) {
    if (val.length === 0) return "List<Any>";
    const itemType = inferKotlinType(val[0], `${key}Item`, classes);
    return `List<${itemType}>`;
  }

  if (typeof val === "object") {
    const className = toPascalCase(key);
    generateKotlinClass(val as Record<string, unknown>, className, classes);
    return className;
  }

  return "Any";
}

function generateKotlinClass(obj: Record<string, unknown>, className: string, classes: string[]): void {
  const fields = Object.entries(obj).map(([k, v]) => {
    const type = inferKotlinType(v, k, classes);
    return `    @SerialName("${k}")\n    val ${k}: ${type},`;
  });

  const classDef = `@Serializable\ndata class ${className}(\n${fields.join("\n")}\n)`;
  classes.unshift(classDef);
}

export default function JsonToKotlinTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        id: 1001,
        full_name: "Sarah Connor",
        email: "sarah@skynet.dev",
        is_admin: true,
        score: 98.5,
        skills: ["Kotlin", "Android", "Jetpack Compose"],
        profile: {
          avatar_url: "https://example.com/avatar.jpg",
          location: "Los Angeles",
        },
      },
      null,
      2
    )
  );
  const [rootClass, setRootClass] = useState("UserResponse");

  const { kotlinCode, error } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { kotlinCode: "", error: "" };
      const parsed = JSON.parse(jsonInput);
      const classes: string[] = [];

      generateKotlinClass(parsed, rootClass || "RootResponse", classes);

      return {
        kotlinCode:
          `import kotlinx.serialization.Serializable\n` +
          `import kotlinx.serialization.SerialName\n\n` +
          classes.join("\n\n"),
        error: "",
      };
    } catch (err: unknown) {
      return { kotlinCode: "", error: err instanceof Error ? err.message : "Invalid JSON input" };
    }
  }, [jsonInput, rootClass]);

  return (
    <ToolContainer
      title="JSON to Kotlin Data Class Converter"
      description="Transform JSON payloads into Kotlin data classes with kotlinx.serialization annotations."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="JSON Input"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={14}
            error={error}
          />

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Root Kotlin Class Name
            </label>
            <input
              type="text"
              value={rootClass}
              onChange={(e) => setRootClass(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated Kotlin Data Classes"
            readOnly
            copyable
            value={kotlinCode}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
