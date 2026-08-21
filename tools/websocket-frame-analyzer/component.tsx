"use client";

import { useState } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function WebsocketFrameAnalyzerTool() {
  const [wsUrl, setWsUrl] = useState("wss://echo.websocket.events");
  const [method, setMethod] = useState("eth_blockNumber");
  const [params, setParams] = useState("[]");
  const [frameType, setFrameType] = useState<"jsonrpc" | "raw">("jsonrpc");
  const [rawPayload, setRawPayload] = useState('{"type": "subscribe", "channel": "ticker"}');

  const generatedPayload = frameType === "jsonrpc"
    ? JSON.stringify(
        {
          jsonrpc: "2.0",
          id: 1,
          method: method,
          params: (() => {
            try { return JSON.parse(params); } catch { return []; }
          })(),
        },
        null,
        2
      )
    : rawPayload;

  const clientSnippet = `const ws = new WebSocket("${wsUrl}");\n\n` +
    `ws.onopen = () => {\n` +
    `  console.log("Connected to WebSocket");\n` +
    `  ws.send(${JSON.stringify(generatedPayload.replace(/\n/g, ""))});\n` +
    `};\n\n` +
    `ws.onmessage = (event) => {\n` +
    `  console.log("Message received:", JSON.parse(event.data));\n` +
    `};\n\n` +
    `ws.onerror = (err) => console.error("WebSocket error:", err);\n` +
    `ws.onclose = () => console.log("WebSocket closed");`;

  return (
    <ToolContainer
      title="WebSocket & JSON-RPC Frame Inspector"
      description="Construct, validate, and simulate JSON-RPC 2.0 WebSocket messages and client connection scripts."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              WebSocket Endpoint URL (WSS / WS)
            </label>
            <input
              type="text"
              value={wsUrl}
              onChange={(e) => setWsUrl(e.target.value)}
              placeholder="wss://api.example.com/ws"
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Frame Structure
            </label>
            <select
              value={frameType}
              onChange={(e) => setFrameType(e.target.value as "jsonrpc" | "raw")}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="jsonrpc">JSON-RPC 2.0 Standard Frame</option>
              <option value="raw">Custom JSON Payload</option>
            </select>
          </div>

          {frameType === "jsonrpc" ? (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                  Method Name
                </label>
                <input
                  type="text"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  placeholder="e.g. eth_blockNumber, ping, getMarketData"
                  className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                  Params Array / Object (JSON)
                </label>
                <input
                  type="text"
                  value={params}
                  onChange={(e) => setParams(e.target.value)}
                  placeholder='[] or {"pair": "BTC/USD"}'
                  className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>
            </>
          ) : (
            <TextArea
              label="Custom JSON Payload"
              value={rawPayload}
              onChange={(e) => setRawPayload(e.target.value)}
              rows={5}
            />
          )}

          <div className="rounded-2xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] space-y-2 text-xs">
            <span className="font-bold uppercase text-gray-500">RFC 6455 Opcode Reference</span>
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              <div><span className="font-bold text-primary">0x1</span>: Text Frame</div>
              <div><span className="font-bold text-primary">0x2</span>: Binary Frame</div>
              <div><span className="font-bold text-primary">0x8</span>: Connection Close</div>
              <div><span className="font-bold text-primary">0x9</span>: Ping Frame</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="WebSocket Message Frame (JSON)"
            readOnly
            copyable
            value={generatedPayload}
            rows={6}
          />

          <TextArea
            label="Browser JavaScript Client Script"
            readOnly
            copyable
            value={clientSnippet}
            rows={9}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
