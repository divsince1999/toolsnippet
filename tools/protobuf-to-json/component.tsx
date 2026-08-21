"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

interface ProtoField {
  type: string;
  name: string;
  tag: number;
  repeated: boolean;
}

function parseProtoMessage(proto: string): { messageName: string; fields: ProtoField[] }[] {
  const messages: { messageName: string; fields: ProtoField[] }[] = [];
  const messageRegex = /message\s+([a-zA-Z0-9_]+)\s*\{([^}]+)\}/g;

  let match;
  while ((match = messageRegex.exec(proto)) !== null) {
    const messageName = match[1];
    const body = match[2];
    const fields: ProtoField[] = [];

    const fieldLines = body.split(";");
    fieldLines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("//")) return;

      const fieldMatch = trimmed.match(/^(repeated\s+)?([a-zA-Z0-9_]+)\s+([a-zA-Z0-9_]+)\s*=\s*(\d+)/);
      if (fieldMatch) {
        fields.push({
          repeated: Boolean(fieldMatch[1]),
          type: fieldMatch[2],
          name: fieldMatch[3],
          tag: Number(fieldMatch[4]),
        });
      }
    });

    messages.push({ messageName, fields });
  }

  return messages;
}

function protoTypeToJsonType(type: string): string {
  switch (type) {
    case "int32":
    case "int64":
    case "uint32":
    case "uint64":
    case "sint32":
    case "sint64":
      return "integer";
    case "float":
    case "double":
      return "number";
    case "bool":
      return "boolean";
    case "string":
      return "string";
    case "bytes":
      return "string";
    default:
      return "object";
  }
}

export default function ProtobufToJsonTool() {
  const [protoInput, setProtoInput] = useState(
    `syntax = "proto3";\n\n` +
    `package user.v1;\n\n` +
    `message UserProfile {\n` +
    `  int64 id = 1;\n` +
    `  string username = 2;\n` +
    `  string email = 3;\n` +
    `  bool is_active = 4;\n` +
    `  double reputation_score = 5;\n` +
    `  repeated string tags = 6;\n` +
    `}`
  );
  const [outputMode, setOutputMode] = useState<"schema" | "mock">("mock");

  const { convertedOutput, error } = useMemo(() => {
    try {
      if (!protoInput.trim()) return { convertedOutput: "", error: "" };
      const messages = parseProtoMessage(protoInput);
      if (messages.length === 0) return { convertedOutput: "// No 'message Name { ... }' blocks found", error: "" };

      const main = messages[0];

      if (outputMode === "mock") {
        const mock: Record<string, unknown> = {};
        main.fields.forEach((f) => {
          if (f.repeated) {
            mock[f.name] = [f.type === "string" ? "sample_tag" : 1];
          } else if (f.type.includes("int")) {
            mock[f.name] = 1001;
          } else if (f.type === "float" || f.type === "double") {
            mock[f.name] = 99.5;
          } else if (f.type === "bool") {
            mock[f.name] = true;
          } else {
            mock[f.name] = `sample_${f.name}`;
          }
        });
        return { convertedOutput: JSON.stringify(mock, null, 2), error: "" };
      }

      const properties: Record<string, unknown> = {};
      const required: string[] = [];

      main.fields.forEach((f) => {
        const jsonType = protoTypeToJsonType(f.type);
        if (f.repeated) {
          properties[f.name] = {
            type: "array",
            items: { type: jsonType },
          };
        } else {
          properties[f.name] = { type: jsonType };
        }
        required.push(f.name);
      });

      const schema = {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: main.messageName,
        type: "object",
        properties,
        required,
      };

      return { convertedOutput: JSON.stringify(schema, null, 2), error: "" };
    } catch (err: unknown) {
      return { convertedOutput: "", error: err instanceof Error ? err.message : "Error parsing Protocol Buffer" };
    }
  }, [protoInput, outputMode]);

  return (
    <ToolContainer
      title="Protobuf (.proto) to JSON Schema Converter"
      description="Parse Protocol Buffer (proto3) message definitions into mock JSON data or JSON Schema specifications."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="Protocol Buffer (.proto) Definition"
            value={protoInput}
            onChange={(e) => setProtoInput(e.target.value)}
            rows={14}
            error={error}
          />

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Conversion Target
            </label>
            <select
              value={outputMode}
              onChange={(e) => setOutputMode(e.target.value as typeof outputMode)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="mock">Sample Mock JSON Payload</option>
              <option value="schema">Draft-07 JSON Schema</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label={outputMode === "mock" ? "Generated Mock JSON Object" : "Generated JSON Schema"}
            readOnly
            copyable
            value={convertedOutput}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
