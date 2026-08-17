"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssAnimationKeyframesGeneratorTool() {
  const [animationType, setAnimationType] = useState<"pulse" | "bounce" | "spin" | "shake" | "float" | "flip">("pulse");
  const [duration, setDuration] = useState(1.5);
  const [delay, setDelay] = useState(0);
  const [timing, setTiming] = useState<"ease" | "ease-in-out" | "linear" | "cubic-bezier(0.4, 0, 0.2, 1)">("ease-in-out");
  const [iteration, setIteration] = useState<"infinite" | "1" | "2">("infinite");
  const [isCopied, setIsCopied] = useState(false);

  const keyframesMap: Record<string, string> = {
    pulse: `@keyframes pulse {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: scale(1.15);\n    opacity: 0.8;\n  }\n}`,
    bounce: `@keyframes bounce {\n  0%, 20%, 50%, 80%, 100% {\n    transform: translateY(0);\n  }\n  40% {\n    transform: translateY(-30px);\n  }\n  60% {\n    transform: translateY(-15px);\n  }\n}`,
    spin: `@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}`,
    shake: `@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  20%, 60% { transform: translateX(-10px); }\n  40%, 80% { transform: translateX(10px); }\n}`,
    float: `@keyframes float {\n  0%, 100% {\n    transform: translateY(0px);\n  }\n  50% {\n    transform: translateY(-16px);\n  }\n}`,
    flip: `@keyframes flip {\n  0% { transform: perspective(400px) rotateY(0); }\n  100% { transform: perspective(400px) rotateY(360deg); }\n}`,
  };

  const keyframeCss = keyframesMap[animationType];

  const fullCss = useMemo(() => {
    const animRule = `animation: ${animationType} ${duration}s ${timing} ${delay > 0 ? `${delay}s ` : ""}${iteration};`;
    return `${keyframeCss}\n\n.animated-element {\n  ${animRule}\n}`;
  }, [animationType, duration, timing, delay, iteration, keyframeCss]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullCss);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Keyframe Animation Generator"
      description="Create customizable CSS @keyframes animations with duration, easing curves, and live preview."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Animation Type
            </label>
            <select
              value={animationType}
              onChange={(e) => setAnimationType(e.target.value as typeof animationType)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="pulse">Pulse</option>
              <option value="bounce">Bounce</option>
              <option value="spin">Spin 360°</option>
              <option value="shake">Shake</option>
              <option value="float">Smooth Float</option>
              <option value="flip">3D Flip</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Duration</span>
              <span className="font-mono">{duration}s</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="5"
              step="0.1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Delay</span>
              <span className="font-mono">{delay}s</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Timing Function (Easing)
            </label>
            <select
              value={timing}
              onChange={(e) => setTiming(e.target.value as typeof timing)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="ease">ease</option>
              <option value="ease-in-out">ease-in-out</option>
              <option value="linear">linear</option>
              <option value="cubic-bezier(0.4, 0, 0.2, 1)">cubic-bezier(0.4, 0, 0.2, 1)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Iteration Count
            </label>
            <select
              value={iteration}
              onChange={(e) => setIteration(e.target.value as typeof iteration)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="infinite">infinite</option>
              <option value="1">1 time</option>
              <option value="2">2 times</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-black/10 p-8 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <style dangerouslySetInnerHTML={{ __html: fullCss }} />
            <div
              className="animated-element h-24 w-24 rounded-2xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center font-bold text-white shadow-lg text-xs"
            >
              Preview
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {isCopied ? "Copied CSS!" : "Copy Animation CSS"}
              </Button>
            </div>
            <TextArea
              label="CSS Code"
              readOnly
              copyable
              value={fullCss}
              rows={8}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
