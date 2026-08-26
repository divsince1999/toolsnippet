"use client";

import { useState, useMemo, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

const emptySubscribe = () => () => {};

// Helper math conversions
function hexToRgb(hex: string): { r: number; g: number; b: number; a: number } {
  let cleanHex = hex.replace(/^#/, "").trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split("").map((c) => c + c).join("") + "ff";
  } else if (cleanHex.length === 6) {
    cleanHex += "ff";
  } else if (cleanHex.length !== 8) {
    cleanHex = "4f46e5ff";
  }

  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 24) & 255,
    g: (num >> 16) & 255,
    b: (num >> 8) & 255,
    a: Math.round(((num & 255) / 255) * 100) / 100,
  };
}

function rgbToHex(r: number, g: number, b: number, a = 1): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, "0");
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (a < 1) {
    const alphaHex = Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, "0");
    return `${hex}${alphaHex}`.toUpperCase();
  }
  return hex.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  h /= 60;
  s /= 100;
  v /= 100;
  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));

  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - rNorm - k) / (1 - k);
  const m = (1 - gNorm - k) / (1 - k);
  const y = (1 - bNorm - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  const srgb = [r / 255, g / 255, b / 255].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function getContrastRatio(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  const lum1 = getRelativeLuminance(r1, g1, b1);
  const lum2 = getRelativeLuminance(r2, g2, b2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Math.round(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100;
}

export default function HtmlColorPickerTool() {
  const [hue, setHue] = useState(243);
  const [saturation, setSaturation] = useState(69);
  const [value, setValue] = useState(90);
  const [alpha, setAlpha] = useState(1);
  const [manualHex, setManualHex] = useState<string | null>(null);
  const [recentColors, setRecentColors] = useState<string[]>([
    "#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#1E293B"
  ]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const satValCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingSatVal = useRef(false);

  // Compute RGB from HSV
  const { r, g, b } = useMemo(() => hsvToRgb(hue, saturation, value), [hue, saturation, value]);
  const hex = useMemo(() => rgbToHex(r, g, b, alpha), [r, g, b, alpha]);
  const { h: hslH, s: hslS, l: hslL } = useMemo(() => rgbToHsl(r, g, b), [r, g, b]);
  const cmyk = useMemo(() => rgbToCmyk(r, g, b), [r, g, b]);

  const displayedHexInput = manualHex ?? hex;
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isEyeDropperSupported = isClient && typeof window !== "undefined" && "EyeDropper" in window;

  // Render 2D Saturation-Value Canvas
  const drawSatValCanvas = useCallback(() => {
    const canvas = satValCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Base pure hue color
    const pureRgb = hsvToRgb(hue, 100, 100);
    ctx.fillStyle = `rgb(${pureRgb.r}, ${pureRgb.g}, ${pureRgb.b})`;
    ctx.fillRect(0, 0, width, height);

    // Horizontal white gradient (Saturation)
    const whiteGrad = ctx.createLinearGradient(0, 0, width, 0);
    whiteGrad.addColorStop(0, "rgba(255,255,255,1)");
    whiteGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = whiteGrad;
    ctx.fillRect(0, 0, width, height);

    // Vertical black gradient (Value/Brightness)
    const blackGrad = ctx.createLinearGradient(0, 0, 0, height);
    blackGrad.addColorStop(0, "rgba(0,0,0,0)");
    blackGrad.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = blackGrad;
    ctx.fillRect(0, 0, width, height);
  }, [hue]);

  useEffect(() => {
    drawSatValCanvas();
  }, [drawSatValCanvas]);

  const handleSatValPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = satValCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    const s = Math.round((x / rect.width) * 100);
    const v = Math.round((1 - y / rect.height) * 100);

    setManualHex(null);
    setSaturation(s);
    setValue(v);
  };

  const handleHexInputChange = (val: string) => {
    setManualHex(val);
    if (/^#?[0-9A-Fa-f]{3,8}$/.test(val)) {
      const parsed = hexToRgb(val);
      const hsv = rgbToHsv(parsed.r, parsed.g, parsed.b);
      setHue(hsv.h);
      setSaturation(hsv.s);
      setValue(hsv.v);
      setAlpha(parsed.a);
    }
  };

  const handleEyeDropper = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      if (result && result.sRGBHex) {
        handleHexInputChange(result.sRGBHex);
        setRecentColors((prev) => [result.sRGBHex.toUpperCase(), ...prev.filter((c) => c !== result.sRGBHex.toUpperCase())].slice(0, 12));
      }
    } catch {
      // EyeDropper cancelled by user or not allowed
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setRecentColors((prev) => [hex, ...prev.filter((c) => c !== hex)].slice(0, 12));
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  // WCAG Contrasts
  const contrastWhite = useMemo(() => getContrastRatio(r, g, b, 255, 255, 255), [r, g, b]);
  const contrastBlack = useMemo(() => getContrastRatio(r, g, b, 0, 0, 0), [r, g, b]);

  // Color Harmonies
  const harmonies = useMemo(() => {
    const getHexForHue = (hDeg: number) => {
      const normalizedH = (hDeg % 360 + 360) % 360;
      const rgb = hsvToRgb(normalizedH, saturation, value);
      return rgbToHex(rgb.r, rgb.g, rgb.b, alpha);
    };

    return [
      { name: "Complementary", colors: [hex, getHexForHue(hue + 180)] },
      { name: "Analogous", colors: [getHexForHue(hue - 30), hex, getHexForHue(hue + 30)] },
      { name: "Triadic", colors: [hex, getHexForHue(hue + 120), getHexForHue(hue + 240)] },
      { name: "Tetradic", colors: [hex, getHexForHue(hue + 90), getHexForHue(hue + 180), getHexForHue(hue + 270)] },
      { name: "Split-Comp.", colors: [hex, getHexForHue(hue + 150), getHexForHue(hue + 210)] },
    ];
  }, [hue, saturation, value, alpha, hex]);

  // Tints & Shades
  const tintsAndShades = useMemo(() => {
    const steps = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    return steps.map((lVal) => {
      const rgb = hslToRgb(hslH, hslS, lVal);
      return {
        lightness: `${lVal}%`,
        hex: rgbToHex(rgb.r, rgb.g, rgb.b, alpha),
      };
    });
  }, [hslH, hslS, alpha]);

  return (
    <ToolContainer
      title="HTML Color Picker & EyeDropper"
      description="Visual color picker, screen sampler, multi-format CSS converters, color harmonies, and WCAG accessibility contrast checker."
    >
      <div className="space-y-8">
        {/* Main Interactive Studio Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column: Visual Canvas Picker & Sliders (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            {/* 2D Saturation-Value Canvas */}
            <div className="relative h-64 w-full cursor-crosshair overflow-hidden rounded-2xl border border-black/15 dark:border-white/15">
              <canvas
                ref={satValCanvasRef}
                width={400}
                height={256}
                onPointerDown={(e) => {
                  isDraggingSatVal.current = true;
                  handleSatValPointer(e);
                }}
                onPointerMove={(e) => {
                  if (isDraggingSatVal.current) handleSatValPointer(e);
                }}
                onPointerUp={() => {
                  isDraggingSatVal.current = false;
                }}
                className="h-full w-full object-cover"
              />
              {/* Draggable Picker Indicator */}
              <div
                style={{
                  left: `${saturation}%`,
                  top: `${100 - value}%`,
                }}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* Hue Rainbow Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>Hue</span>
                <span className="font-mono">{hue}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={(e) => setHue(Number(e.target.value))}
                style={{
                  background: "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
                }}
                className="h-4 w-full cursor-pointer appearance-none rounded-lg accent-white"
              />
            </div>

            {/* Alpha Opacity Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>Alpha Opacity</span>
                <span className="font-mono">{Math.round(alpha * 100)}%</span>
              </div>
              <div className="relative h-4 w-full overflow-hidden rounded-lg bg-[repeating-conic-gradient(#00000010_0%_25%,transparent_0%_50%)] bg-[length:12px_12px]">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, transparent, rgb(${r}, ${g}, ${b}))`,
                  }}
                  className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent accent-white"
                />
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {isEyeDropperSupported && (
                <Button variant="outline" size="sm" onClick={handleEyeDropper} className="gap-2">
                  <span>💉</span> Pick Screen Color (EyeDropper)
                </Button>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">Manual Input:</span>
                <input
                  type="text"
                  value={displayedHexInput}
                  onChange={(e) => handleHexInputChange(e.target.value)}
                  placeholder="#4F46E5"
                  className="h-8 w-28 rounded-lg border border-black/15 bg-white px-2.5 font-mono text-xs uppercase font-bold text-gray-900 outline-none focus:border-primary-solid dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Swatch & Formats Display (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            {/* Live Color Swatch Banner */}
            <div
              style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})` }}
              className="relative flex h-28 w-full flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-sm border border-black/10 transition-colors"
            >
              <span
                style={{ color: contrastWhite >= 4.5 ? "#ffffff" : "#000000" }}
                className="text-xs font-bold uppercase tracking-wider opacity-80"
              >
                Active Color Preview
              </span>
              <div
                style={{ color: contrastWhite >= 4.5 ? "#ffffff" : "#000000" }}
                className="flex items-baseline justify-between"
              >
                <span className="font-mono text-2xl font-extrabold">{hex}</span>
                <span className="text-xs font-semibold opacity-75">
                  {Math.round(alpha * 100)}% Opacity
                </span>
              </div>
            </div>

            {/* Code Formats Table with 1-Click Copy */}
            <div className="divide-y divide-black/5 rounded-2xl border border-black/10 bg-black/[0.02] p-2 dark:divide-white/5 dark:border-white/10 dark:bg-white/[0.02]">
              {[
                { label: "HEX", val: hex, key: "hex" },
                { label: "RGB", val: alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`, key: "rgb" },
                { label: "HSL", val: alpha < 1 ? `hsla(${hslH}, ${hslS}%, ${hslL}%, ${alpha})` : `hsl(${hslH}, ${hslS}%, ${hslL}%)`, key: "hsl" },
                { label: "HSV", val: `hsv(${hue}°, ${saturation}%, ${value}%)`, key: "hsv" },
                { label: "CMYK", val: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, key: "cmyk" },
                { label: "CSS Variable", val: `--color-primary: ${hex};`, key: "css" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between px-3 py-2 text-xs">
                  <span className="w-20 font-semibold text-gray-500 dark:text-gray-400">{item.label}</span>
                  <code className="flex-1 font-mono text-gray-900 dark:text-gray-200 truncate pr-2">
                    {item.val}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(item.val, item.key)}
                    className="flex h-7 w-16 items-center justify-center rounded-md bg-white text-[11px] font-bold text-gray-700 shadow-xs hover:bg-primary-solid hover:text-white dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-primary-solid"
                  >
                    {copiedKey === item.key ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. WCAG Contrast Accessibility Studio */}
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            WCAG 2.1 Contrast & Accessibility Validation
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* White Text on Color Card */}
            <div
              style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
              className="flex flex-col justify-between rounded-xl p-4 text-white shadow-xs"
            >
              <p className="text-sm font-bold">White Text on Active Color</p>
              <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2 text-xs">
                <span className="font-mono font-bold">{contrastWhite}:1 Ratio</span>
                <div className="flex gap-1.5">
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${contrastWhite >= 4.5 ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}>
                    AA {contrastWhite >= 4.5 ? "Pass" : "Fail"}
                  </span>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${contrastWhite >= 7.0 ? "bg-emerald-500 text-white" : "bg-black/30 text-white"}`}>
                    AAA {contrastWhite >= 7.0 ? "Pass" : "Fail"}
                  </span>
                </div>
              </div>
            </div>

            {/* Black Text on Color Card */}
            <div
              style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
              className="flex flex-col justify-between rounded-xl p-4 text-black shadow-xs"
            >
              <p className="text-sm font-bold">Black Text on Active Color</p>
              <div className="mt-3 flex items-center justify-between border-t border-black/20 pt-2 text-xs">
                <span className="font-mono font-bold">{contrastBlack}:1 Ratio</span>
                <div className="flex gap-1.5">
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${contrastBlack >= 4.5 ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}`}>
                    AA {contrastBlack >= 4.5 ? "Pass" : "Fail"}
                  </span>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${contrastBlack >= 7.0 ? "bg-emerald-600 text-white" : "bg-black/30 text-white"}`}>
                    AAA {contrastBlack >= 7.0 ? "Pass" : "Fail"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Color Harmonies & Palettes */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Color Harmonies & Palettes
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {harmonies.map((h) => (
              <div
                key={h.name}
                className="overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-zinc-900"
              >
                <div className="flex h-14 w-full">
                  {h.colors.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      style={{ backgroundColor: c }}
                      onClick={() => handleHexInputChange(c)}
                      title={`Select ${c}`}
                      className="h-full flex-1 transition hover:opacity-90"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between px-3 py-2 text-xs">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{h.name}</span>
                  <div className="flex gap-1 font-mono text-[11px] text-gray-500">
                    {h.colors.map((c, i) => (
                      <span key={i} className="hover:text-primary-solid cursor-pointer" onClick={() => copyToClipboard(c, `${h.name}-${i}`)}>
                        {c.substring(0, 7)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Tints & Shades Ladder */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Tints & Shades (Design Tokens)
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
            {tintsAndShades.map((t) => (
              <button
                key={t.lightness}
                type="button"
                style={{ backgroundColor: t.hex }}
                onClick={() => handleHexInputChange(t.hex)}
                className="group flex h-16 flex-col justify-between rounded-xl border border-black/10 p-2 text-left transition hover:scale-105 hover:shadow-md dark:border-white/10"
              >
                <span className="text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {t.lightness}
                </span>
                <span className="text-[10px] font-mono text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {t.hex.substring(0, 7)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Recent Color History Swatches */}
        {recentColors.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Recent Colors
            </span>
            <div className="flex flex-wrap gap-2">
              {recentColors.map((c, i) => (
                <button
                  key={`${c}-${i}`}
                  type="button"
                  style={{ backgroundColor: c }}
                  onClick={() => handleHexInputChange(c)}
                  title={`Select ${c}`}
                  className="h-8 w-8 rounded-lg border border-black/15 shadow-xs transition hover:scale-110 dark:border-white/20"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
