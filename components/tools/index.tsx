import dynamic from "next/dynamic";
import React from "react";

const ToolSkeleton = () => (
  <div className="mx-auto w-full max-w-4xl px-4 mt-6">
    <div className="h-64 animate-pulse rounded-xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5" />
  </div>
);


export const ToolRegistry: Record<string, any> = {
  "text-case": dynamic(() => import("./TextCaseTool"), { loading: ToolSkeleton }),
  "json-formatter": dynamic(() => import("./JsonFormatterTool"), { loading: ToolSkeleton }),
  "base64-encoder-decoder": dynamic(() => import("./Base64Tool"), { loading: ToolSkeleton }),
  "url-encoder-decoder": dynamic(() => import("./UrlEncoderDecoderTool"), { loading: ToolSkeleton }),
  "jwt-decoder": dynamic(() => import("./JwtDecoderTool"), { loading: ToolSkeleton }),
  "regex-tester": dynamic(() => import("./RegexTesterTool"), { loading: ToolSkeleton }),
  "uuid-generator": dynamic(() => import("./UuidGeneratorTool"), { loading: ToolSkeleton }),
  "lorem-ipsum-generator": dynamic(() => import("./LoremIpsumGeneratorTool"), { loading: ToolSkeleton }),
  "sql-formatter": dynamic(() => import("./SqlFormatterTool"), { loading: ToolSkeleton }),
  "yaml-to-json": dynamic(() => import("./YamlToJsonTool"), { loading: ToolSkeleton }),
  "json-to-yaml": dynamic(() => import("./JsonToYamlTool"), { loading: ToolSkeleton }),
  "html-formatter": dynamic(() => import("./HtmlFormatterTool"), { loading: ToolSkeleton }),
  "markdown-previewer": dynamic(() => import("./MarkdownPreviewerTool"), { loading: ToolSkeleton }),
  "url-parser": dynamic(() => import("./UrlParserTool"), { loading: ToolSkeleton }),
  "xml-formatter": dynamic(() => import("./XmlFormatterTool"), { loading: ToolSkeleton }),
  "hash-generator": dynamic(() => import("./HashGeneratorTool"), { loading: ToolSkeleton }),
  "json-minifier": dynamic(() => import("./JsonMinifierTool"), { loading: ToolSkeleton }),
  "css-formatter": dynamic(() => import("./CssFormatterTool"), { loading: ToolSkeleton }),
  "css-minifier": dynamic(() => import("./CssMinifierTool"), { loading: ToolSkeleton }),
  "js-formatter": dynamic(() => import("./JsFormatterTool"), { loading: ToolSkeleton }),
  "js-minifier": dynamic(() => import("./JsMinifierTool"), { loading: ToolSkeleton }),
  "html-minifier": dynamic(() => import("./HtmlMinifierTool"), { loading: ToolSkeleton }),
  "xml-minifier": dynamic(() => import("./XmlMinifierTool"), { loading: ToolSkeleton }),
  "csv-to-json": dynamic(() => import("./CsvToJsonTool"), { loading: ToolSkeleton }),
  "json-to-csv": dynamic(() => import("./JsonToCsvTool"), { loading: ToolSkeleton }),
  "unix-timestamp-converter": dynamic(() => import("./UnixTimestampConverterTool"), { loading: ToolSkeleton }),
  "date-to-unix-timestamp": dynamic(() => import("./DateToUnixTimestampTool"), { loading: ToolSkeleton }),
  "rgb-to-hex": dynamic(() => import("./RgbToHexTool"), { loading: ToolSkeleton }),
  "hex-to-rgb": dynamic(() => import("./HexToRgbTool"), { loading: ToolSkeleton }),
  "password-generator": dynamic(() => import("./PasswordGeneratorTool"), { loading: ToolSkeleton }),
  "number-base-converter": dynamic(() => import("./NumberBaseConverterTool"), { loading: ToolSkeleton }),
  "binary-to-text": dynamic(() => import("./BinaryToTextTool"), { loading: ToolSkeleton }),
  "text-to-binary": dynamic(() => import("./TextToBinaryTool"), { loading: ToolSkeleton }),
  "html-entity-encoder": dynamic(() => import("./HtmlEntityEncoderTool"), { loading: ToolSkeleton }),
  "html-entity-decoder": dynamic(() => import("./HtmlEntityDecoderTool"), { loading: ToolSkeleton }),
  "string-escape": dynamic(() => import("./StringEscapeTool"), { loading: ToolSkeleton }),
  "string-unescape": dynamic(() => import("./StringUnescapeTool"), { loading: ToolSkeleton }),
  "advanced-case-converter": dynamic(() => import("./AdvancedCaseConverterTool"), { loading: ToolSkeleton }),
  "duplicate-line-remover": dynamic(() => import("./DuplicateLineRemoverTool"), { loading: ToolSkeleton }),
  "text-reverser": dynamic(() => import("./TextReverserTool"), { loading: ToolSkeleton }),
  "list-randomizer": dynamic(() => import("./ListRandomizerTool"), { loading: ToolSkeleton }),
  "user-agent-parser": dynamic(() => import("./UserAgentParserTool"), { loading: ToolSkeleton }),
  "morse-code-converter": dynamic(() => import("./MorseCodeConverterTool"), { loading: ToolSkeleton }),
  "rot13-converter": dynamic(() => import("./Rot13ConverterTool"), { loading: ToolSkeleton }),
  "url-slug-generator": dynamic(() => import("./UrlSlugGeneratorTool"), { loading: ToolSkeleton }),
  "json-validator": dynamic(() => import("./JsonValidatorTool"), { loading: ToolSkeleton }),
  "cron-descriptor": dynamic(() => import("./CronDescriptorTool"), { loading: ToolSkeleton }),
  "qr-code-generator": dynamic(() => import("./QrCodeGeneratorTool"), { loading: ToolSkeleton }),
  "image-to-base64": dynamic(() => import("./ImageToBase64Tool"), { loading: ToolSkeleton }),
  "json-to-typescript": dynamic(() => import("./JsonToTypescriptTool"), { loading: ToolSkeleton }),
};
