"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TimerCountdownTool() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [input, setInput] = useState(5); // Default 5 mins
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, seconds]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    setSeconds(input * 60);
    setIsRunning(true);
  };

  return (
    <ToolContainer title="Online Timer" description="Set a countdown timer for focus sessions or breaks.">
      <div className="flex flex-col items-center gap-8 py-8">
        {!isRunning && seconds === 0 ? (
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              value={input} 
              onChange={e => setInput(parseInt(e.target.value) || 0)} 
              className="w-24 rounded-lg border border-black/15 bg-transparent p-3 text-2xl text-center outline-none focus:ring-2 focus:ring-primary dark:border-white/20" 
            />
            <span className="text-xl font-medium">minutes</span>
          </div>
        ) : (
          <div className="text-8xl font-mono tabular-nums tracking-tighter">
            {formatTime(seconds)}
          </div>
        )}
        <div className="flex gap-4">
          {!isRunning && seconds === 0 ? (
            <Button size="lg" onClick={startTimer}>Start Timer</Button>
          ) : (
            <>
              <Button size="lg" onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "Pause" : "Resume"}
              </Button>
              <Button size="lg" variant="outline" onClick={() => { setSeconds(0); setIsRunning(false); }}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </ToolContainer>
  );
}
