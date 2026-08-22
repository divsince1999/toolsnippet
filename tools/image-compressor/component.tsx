"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

interface ProcessedImage {
  id: string;
  name: string;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  originalDataUrl: string;
  compressedDataUrl: string;
  compressedSize: number;
  compressedWidth: number;
  compressedHeight: number;
  format: "image/webp" | "image/jpeg" | "image/png";
  quality: number;
  savingsPercent: number;
}

type OutputFormat = "image/webp" | "image/jpeg" | "image/png";
type ResizePreset = "original" | "75%" | "50%" | "1920px" | "1280px" | "custom";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function ImageCompressorTool() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [format, setFormat] = useState<OutputFormat>("image/webp");
  const [quality, setQuality] = useState<number>(75);
  const [resizePreset, setResizePreset] = useState<ResizePreset>("original");
  const [customMaxWidth, setCustomMaxWidth] = useState<number>(1920);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"comparison" | "compressed">("comparison");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core Canvas compression function
  const compressCanvas = useCallback(
    async (
      dataUrl: string,
      targetFormat: OutputFormat,
      targetQuality: number,
      preset: ResizePreset,
      customWidth: number
    ): Promise<{
      compressedDataUrl: string;
      compressedSize: number;
      width: number;
      height: number;
    }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const origW = img.naturalWidth || img.width;
          const origH = img.naturalHeight || img.height;

          let targetW = origW;
          let targetH = origH;

          if (preset === "75%") {
            targetW = Math.round(origW * 0.75);
            targetH = Math.round(origH * 0.75);
          } else if (preset === "50%") {
            targetW = Math.round(origW * 0.5);
            targetH = Math.round(origH * 0.5);
          } else if (preset === "1920px") {
            if (origW > 1920) {
              const ratio = 1920 / origW;
              targetW = 1920;
              targetH = Math.round(origH * ratio);
            }
          } else if (preset === "1280px") {
            if (origW > 1280) {
              const ratio = 1280 / origW;
              targetW = 1280;
              targetH = Math.round(origH * ratio);
            }
          } else if (preset === "custom" && customWidth > 0) {
            if (origW > customWidth) {
              const ratio = customWidth / origW;
              targetW = customWidth;
              targetH = Math.round(origH * ratio);
            }
          }

          targetW = Math.max(1, targetW);
          targetH = Math.max(1, targetH);

          const canvas = document.createElement("canvas");
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Canvas 2D context not supported"));
            return;
          }

          // If converting transparent image to JPEG, fill background with clean white
          if (targetFormat === "image/jpeg") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, targetW, targetH);
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, targetW, targetH);

          const q = targetFormat === "image/png" ? 1.0 : targetQuality / 100;
          const compressedDataUrl = canvas.toDataURL(targetFormat, q);

          // Calculate approximate byte size from base64
          const base64Data = compressedDataUrl.split(",")[1] || "";
          const padding = (base64Data.match(/=+$/) || [""])[0].length;
          const compressedSize = Math.floor((base64Data.length * 3) / 4) - padding;

          resolve({
            compressedDataUrl,
            compressedSize,
            width: targetW,
            height: targetH,
          });
        };
        img.onerror = () => reject(new Error("Failed to load source image into canvas"));
        img.src = dataUrl;
      });
    },
    []
  );

  // Process a list of File objects
  const processFiles = async (files: File[]) => {
    if (!files.length) return;
    setIsProcessing(true);

    const newItems: ProcessedImage[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;

      try {
        const originalDataUrl = await new Promise<string>((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result as string);
          reader.onerror = rej;
          reader.readAsDataURL(file);
        });

        // Determine natural dimensions
        const { width: origW, height: origH } = await new Promise<{ width: number; height: number }>((res) => {
          const tempImg = new Image();
          tempImg.onload = () => res({ width: tempImg.naturalWidth || tempImg.width, height: tempImg.naturalHeight || tempImg.height });
          tempImg.src = originalDataUrl;
        });

        const { compressedDataUrl, compressedSize, width: compW, height: compH } =
          await compressCanvas(originalDataUrl, format, quality, resizePreset, customMaxWidth);

        const originalSize = file.size;
        const diff = originalSize - compressedSize;
        const savingsPercent = originalSize > 0 ? Math.round((diff / originalSize) * 1000) / 10 : 0;

        const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

        newItems.push({
          id,
          name: file.name,
          originalSize,
          originalWidth: origW,
          originalHeight: origH,
          originalDataUrl,
          compressedDataUrl,
          compressedSize,
          compressedWidth: compW,
          compressedHeight: compH,
          format,
          quality,
          savingsPercent,
        });
      } catch (err) {
        console.error("Error compressing file:", file.name, err);
      }
    }

    setImages((prev) => {
      const combined = [...prev, ...newItems];
      if (!selectedId && combined.length > 0) {
        setSelectedId(combined[0].id);
      }
      return combined;
    });

    setIsProcessing(false);
  };

  // Re-compress existing images when settings change
  useEffect(() => {
    if (!images.length) return;

    let isMounted = true;

    const timer = setTimeout(async () => {
      setIsProcessing(true);
      const updated: ProcessedImage[] = [];
      for (const item of images) {
        try {
          const { compressedDataUrl, compressedSize, width: compW, height: compH } =
            await compressCanvas(item.originalDataUrl, format, quality, resizePreset, customMaxWidth);

          const diff = item.originalSize - compressedSize;
          const savingsPercent = item.originalSize > 0 ? Math.round((diff / item.originalSize) * 1000) / 10 : 0;

          updated.push({
            ...item,
            compressedDataUrl,
            compressedSize,
            compressedWidth: compW,
            compressedHeight: compH,
            format,
            quality,
            savingsPercent,
          });
        } catch {
          updated.push(item);
        }
      }

      if (isMounted) {
        setImages(updated);
        setIsProcessing(false);
      }
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, quality, resizePreset, customMaxWidth, compressCanvas]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  };

  const handleDownload = (item: ProcessedImage) => {
    const ext = item.format === "image/webp" ? "webp" : item.format === "image/jpeg" ? "jpg" : "png";
    const baseName = item.name.replace(/\.[^/.]+$/, "");
    const filename = `${baseName}-min.${ext}`;

    const link = document.createElement("a");
    link.href = item.compressedDataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    images.forEach((item, index) => {
      setTimeout(() => {
        handleDownload(item);
      }, index * 200);
    });
  };

  const handleCopyBase64 = (item: ProcessedImage) => {
    navigator.clipboard.writeText(item.compressedDataUrl);
    setCopiedId(item.id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === item.id ? null : prev));
    }, 2000);
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      if (selectedId === id) {
        setSelectedId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  const handleClearAll = () => {
    setImages([]);
    setSelectedId(null);
  };

  const selectedImage = images.find((img) => img.id === selectedId) || images[0];

  const totalOriginalBytes = images.reduce((acc, img) => acc + img.originalSize, 0);
  const totalCompressedBytes = images.reduce((acc, img) => acc + img.compressedSize, 0);
  const totalSavedBytes = totalOriginalBytes - totalCompressedBytes;
  const totalSavingsPercent =
    totalOriginalBytes > 0 ? Math.round((totalSavedBytes / totalOriginalBytes) * 1000) / 10 : 0;

  return (
    <ToolContainer
      title="Image Compressor & Optimizer"
      description="Compress, convert to WebP/JPG/PNG, and resize images client-side with zero server uploads."
    >
      <div className="space-y-6">
        {/* 1. Privacy Banner */}
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5 text-xs text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
          <span className="text-sm">🔒</span>
          <span>
            <strong>100% Client-Side Privacy:</strong> Your photos are decoded and compressed locally in your browser memory. No images or files are ever sent to any server.
          </span>
        </div>

        {/* 2. Drag & Drop Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
            isDragging
              ? "border-primary-solid bg-primary-solid/10 scale-[1.005]"
              : "border-black/15 bg-black/[0.015] hover:border-primary-solid/60 hover:bg-black/[0.03] dark:border-white/15 dark:bg-white/[0.015] dark:hover:border-primary-solid/60 dark:hover:bg-white/[0.03]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif, image/bmp, image/svg+xml"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-solid/10 text-primary-solid transition group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>

          <p className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
            Drop your images here, or <span className="text-primary-solid underline underline-offset-2">browse files</span>
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Supports JPG, PNG, WebP, GIF, BMP (Multiple files supported, unlimited size)
          </p>
        </div>

        {/* 3. Controls & Settings Bar */}
        <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Output Format */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Target Format
              </label>
              <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-black/10 bg-black/5 p-1 dark:border-white/10 dark:bg-white/5">
                {(
                  [
                    { id: "image/webp", label: "WebP", sub: "Smallest" },
                    { id: "image/jpeg", label: "JPEG", sub: "Photos" },
                    { id: "image/png", label: "PNG", sub: "Lossless" },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    className={`flex flex-col items-center justify-center rounded-lg py-1.5 text-xs font-semibold transition ${
                      format === f.id
                        ? "bg-primary-solid text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    <span>{f.label}</span>
                    <span className={`text-[10px] font-normal ${format === f.id ? "text-white/80" : "text-gray-400"}`}>
                      {f.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Slider */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Quality Level
                </label>
                <span className="rounded-md bg-primary-solid/10 px-2 py-0.5 font-mono text-xs font-bold text-primary-solid">
                  {format === "image/png" ? "100% (Lossless)" : `${quality}%`}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                disabled={format === "image/png"}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-black/15 accent-primary-solid disabled:opacity-40 dark:bg-white/15"
              />
              <div className="mt-2 flex items-center justify-between gap-1 text-[11px]">
                <button
                  type="button"
                  disabled={format === "image/png"}
                  onClick={() => setQuality(50)}
                  className={`rounded px-1.5 py-0.5 transition ${
                    quality === 50
                      ? "bg-primary-solid text-white"
                      : "text-gray-500 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/5"
                  }`}
                >
                  Max (50%)
                </button>
                <button
                  type="button"
                  disabled={format === "image/png"}
                  onClick={() => setQuality(75)}
                  className={`rounded px-1.5 py-0.5 transition ${
                    quality === 75
                      ? "bg-primary-solid text-white"
                      : "text-gray-500 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/5"
                  }`}
                >
                  Balanced (75%)
                </button>
                <button
                  type="button"
                  disabled={format === "image/png"}
                  onClick={() => setQuality(90)}
                  className={`rounded px-1.5 py-0.5 transition ${
                    quality === 90
                      ? "bg-primary-solid text-white"
                      : "text-gray-500 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/5"
                  }`}
                >
                  High (90%)
                </button>
              </div>
            </div>

            {/* Resize Scale */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Dimension Scaling
              </label>
              <select
                value={resizePreset}
                onChange={(e) => setResizePreset(e.target.value as ResizePreset)}
                className="h-10 w-full rounded-xl border border-black/15 bg-white px-3 text-xs font-medium text-gray-900 outline-none transition focus:border-primary-solid focus:ring-1 focus:ring-primary-solid dark:border-white/15 dark:bg-zinc-900 dark:text-white"
              >
                <option value="original">Original Dimensions (100%)</option>
                <option value="75%">Scale to 75% Dimensions</option>
                <option value="50%">Scale to 50% Dimensions</option>
                <option value="1920px">Max Width 1920px (Full HD)</option>
                <option value="1280px">Max Width 1280px (HD 720p)</option>
                <option value="custom">Custom Max Width</option>
              </select>

              {resizePreset === "custom" && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Width:</span>
                  <input
                    type="number"
                    min="100"
                    max="8000"
                    value={customMaxWidth}
                    onChange={(e) => setCustomMaxWidth(Number(e.target.value))}
                    className="h-8 w-24 rounded-lg border border-black/15 bg-white px-2 text-xs font-mono dark:border-white/15 dark:bg-zinc-900"
                  />
                  <span className="text-xs text-gray-500">px</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Active Results & Multi-File Queue */}
        {images.length > 0 && (
          <div className="space-y-6">
            {/* Batch Stats Summary Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-4 shadow-xs dark:border-white/10 dark:bg-zinc-900">
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Total Original: </span>
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    {formatBytes(totalOriginalBytes)}
                  </strong>
                </div>
                <div className="text-gray-300 dark:text-gray-600">→</div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Total Compressed: </span>
                  <strong className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatBytes(totalCompressedBytes)}
                  </strong>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  {totalSavingsPercent >= 0 ? `-${totalSavingsPercent}% Saved` : `+${Math.abs(totalSavingsPercent)}%`}
                </span>
                {isProcessing && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-primary-solid animate-pulse font-semibold">
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Optimizing...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" onClick={handleDownloadAll}>
                  Download All ({images.length})
                </Button>
                <Button size="sm" variant="ghost" onClick={handleClearAll}>
                  Clear All
                </Button>
              </div>
            </div>

            {/* Selected Image Visual Inspection Studio */}
            {selectedImage && (
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900">
                {/* Header with image info & view toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-black/[0.015] px-5 py-3.5 dark:border-white/10 dark:bg-white/[0.015]">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-solid/10 text-xs font-bold text-primary-solid">
                      🔍
                    </span>
                    <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white" title={selectedImage.name}>
                      {selectedImage.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex rounded-lg border border-black/10 bg-black/5 p-0.5 dark:border-white/10 dark:bg-white/5">
                      <button
                        type="button"
                        onClick={() => setViewMode("comparison")}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                          viewMode === "comparison"
                            ? "bg-white text-gray-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        }`}
                      >
                        Side-by-Side
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("compressed")}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                          viewMode === "compressed"
                            ? "bg-white text-gray-900 shadow-xs dark:bg-zinc-800 dark:text-white"
                            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        }`}
                      >
                        Compressed Preview
                      </button>
                    </div>

                    <Button size="sm" onClick={() => handleDownload(selectedImage)}>
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyBase64(selectedImage)}
                      title="Copy Base64 Data URI"
                    >
                      {copiedId === selectedImage.id ? "✓ Copied URI" : "Copy URI"}
                    </Button>
                  </div>
                </div>

                {/* Canvas Previews */}
                <div className="p-5">
                  {viewMode === "comparison" ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Original Card */}
                      <div className="flex flex-col overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
                        <div className="flex items-center justify-between border-b border-black/5 bg-black/[0.02] px-3.5 py-2 text-xs font-medium text-gray-600 dark:border-white/5 dark:bg-white/[0.02] dark:text-gray-300">
                          <span>Original</span>
                          <span>
                            {selectedImage.originalWidth} × {selectedImage.originalHeight} px •{" "}
                            <strong>{formatBytes(selectedImage.originalSize)}</strong>
                          </span>
                        </div>
                        <div className="flex h-64 items-center justify-center bg-[repeating-conic-gradient(#00000008_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-2 dark:bg-[repeating-conic-gradient(#ffffff08_0%_25%,transparent_0%_50%)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={selectedImage.originalDataUrl}
                            alt="Original preview"
                            className="max-h-full max-w-full rounded object-contain shadow-xs"
                          />
                        </div>
                      </div>

                      {/* Compressed Card */}
                      <div className="flex flex-col overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-500/[0.01] dark:border-emerald-500/30">
                        <div className="flex items-center justify-between border-b border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                          <span>Compressed Output</span>
                          <span>
                            {selectedImage.compressedWidth} × {selectedImage.compressedHeight} px •{" "}
                            <strong>{formatBytes(selectedImage.compressedSize)}</strong> (
                            {selectedImage.savingsPercent >= 0
                              ? `-${selectedImage.savingsPercent}%`
                              : `+${Math.abs(selectedImage.savingsPercent)}%`}
                            )
                          </span>
                        </div>
                        <div className="flex h-64 items-center justify-center bg-[repeating-conic-gradient(#00000008_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-2 dark:bg-[repeating-conic-gradient(#ffffff08_0%_25%,transparent_0%_50%)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={selectedImage.compressedDataUrl}
                            alt="Compressed preview"
                            className="max-h-full max-w-full rounded object-contain shadow-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Single Full Width Preview */
                    <div className="flex flex-col items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-[repeating-conic-gradient(#00000008_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-4 dark:border-white/10 dark:bg-[repeating-conic-gradient(#ffffff08_0%_25%,transparent_0%_50%)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedImage.compressedDataUrl}
                        alt="Compressed full view"
                        className="max-h-96 max-w-full rounded-lg object-contain shadow-sm"
                      />
                      <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                        <span>
                          {selectedImage.compressedWidth} × {selectedImage.compressedHeight} px
                        </span>
                        <span>•</span>
                        <strong className="text-emerald-600 dark:text-emerald-400">
                          {formatBytes(selectedImage.compressedSize)}
                        </strong>
                        <span>•</span>
                        <span className="font-semibold text-emerald-600">
                          {selectedImage.savingsPercent >= 0
                            ? `-${selectedImage.savingsPercent}% saved`
                            : "No reduction"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Multi-File Queue Card List */}
            {images.length > 1 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Compressed Queue ({images.length} files)
                </h4>
                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {images.map((item) => {
                    const isSelected = item.id === selectedId;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`group relative flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 transition ${
                          isSelected
                            ? "border-primary-solid bg-primary-solid/[0.04] shadow-sm dark:border-primary-solid dark:bg-primary-solid/[0.08]"
                            : "border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20"
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.compressedDataUrl}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* File Details */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                            {formatBytes(item.originalSize)} →{" "}
                            <strong className="text-emerald-600 dark:text-emerald-400">
                              {formatBytes(item.compressedSize)}
                            </strong>
                          </p>
                          <span className="inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            {item.savingsPercent >= 0 ? `-${item.savingsPercent}%` : `+${Math.abs(item.savingsPercent)}%`}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(item);
                            }}
                            title="Download this image"
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-black/10 text-gray-600 hover:border-primary-solid hover:text-primary-solid dark:border-white/10 dark:text-gray-300 dark:hover:border-primary-solid"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(item.id);
                            }}
                            title="Remove from queue"
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-black/10 text-gray-400 hover:border-rose-500 hover:text-rose-500 dark:border-white/10 dark:hover:border-rose-500"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
