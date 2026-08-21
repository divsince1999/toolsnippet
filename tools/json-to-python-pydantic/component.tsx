"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "")
    .replace(/__+/g, "_");
}

function toPascalCase(str: string): string {
  return str.replace(/(^|_|-|\s)(\w)/g, (_, __, c) => c.toUpperCase());
}

function inferPydanticType(val: unknown, key: string, models: string[]): string {
  if (val === null || val === undefined) return "Optional[Any] = None";
  if (typeof val === "boolean") return "bool";
  if (typeof val === "number") return Number.isInteger(val) ? "int" : "float";
  if (typeof val === "string") return "str";

  if (Array.isArray(val)) {
    if (val.length === 0) return "list[Any]";
    const itemType = inferPydanticType(val[0], `${key}Item`, models);
    return `list[${itemType}]`;
  }

  if (typeof val === "object") {
    const modelName = toPascalCase(key);
    generatePydanticModel(val as Record<string, unknown>, modelName, models);
    return modelName;
  }

  return "Any";
}

function generatePydanticModel(obj: Record<string, unknown>, modelName: string, models: string[]): void {
  const fields = Object.entries(obj).map(([k, v]) => {
    const pyFieldName = toSnakeCase(k);
    const pyType = inferPydanticType(v, k, models);
    const alias = pyFieldName !== k ? ` = Field(alias="${k}")` : "";
    return `    ${pyFieldName}: ${pyType}${alias}`;
  });

  const modelDef = `class ${modelName}(BaseModel):\n${fields.join("\n")}`;
  models.unshift(modelDef);
}

export default function JsonToPythonPydanticTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        userId: "usr_5544",
        username: "pythonista",
        email: "dev@python.org",
        isActive: true,
        accountBalance: 2450.75,
        tags: ["fastapi", "ai", "pydantic"],
        companyDetails: {
          companyName: "PyData Labs",
          employeeCount: 45,
        },
      },
      null,
      2
    )
  );
  const [rootModel, setRootModel] = useState("UserModel");

  const { pythonCode, error } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { pythonCode: "", error: "" };
      const parsed = JSON.parse(jsonInput);
      const models: string[] = [];

      generatePydanticModel(parsed, rootModel || "RootModel", models);

      return {
        pythonCode:
          `from typing import Any, Optional\n` +
          `from pydantic import BaseModel, Field\n\n\n` +
          models.join("\n\n\n"),
        error: "",
      };
    } catch (err: unknown) {
      return { pythonCode: "", error: err instanceof Error ? err.message : "Invalid JSON input" };
    }
  }, [jsonInput, rootModel]);

  return (
    <ToolContainer
      title="JSON to Python Pydantic (v2) Generator"
      description="Convert JSON payloads into strict Python Pydantic v2 BaseModel classes with type annotations."
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
              Root Pydantic Model Name
            </label>
            <input
              type="text"
              value={rootModel}
              onChange={(e) => setRootModel(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated Python Pydantic v2 Models"
            readOnly
            copyable
            value={pythonCode}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
