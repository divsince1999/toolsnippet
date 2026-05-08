"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function StopwatchTool() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const msec = Math.floor((ms % 1000) / 10);
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${msec.toString().padStart(2, "0")}`;
  };

  return (
    <ToolContainer title="Online Stopwatch" description="Track time intervals with millisecond accuracy.">
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="text-6xl font-mono tabular-nums tracking-tighter">
          {formatTime(time)}
        </div>
        <div className="flex gap-4">
          <Button size="lg" onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button size="lg" variant="outline" onClick={() => { setTime(0); setIsRunning(false); }}>
            Reset
          </Button>
        </div>
      </div>
    </ToolContainer>
  );
}
