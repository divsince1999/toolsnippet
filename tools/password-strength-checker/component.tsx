"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PasswordStrengthCheckerTool() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const stats = useMemo(() => {
    if (!password) {
      return {
        entropy: 0,
        score: 0,
        label: "Empty",
        color: "bg-gray-300",
        crackTime: "Instant",
        hasLower: false,
        hasUpper: false,
        hasNumber: false,
        hasSymbol: false,
        hasLength: false,
      };
    }

    let poolSize = 0;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    const hasLength = password.length >= 12;

    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSymbol) poolSize += 33;

    // Shannon Entropy formula: L * log2(R)
    const entropy = poolSize > 0 ? Math.round(password.length * (Math.log(poolSize) / Math.LN2)) : 0;

    let score = 0;
    let label = "Very Weak";
    let color = "bg-red-500";

    if (entropy < 28) {
      score = 1;
      label = "Very Weak";
      color = "bg-red-500";
    } else if (entropy < 40) {
      score = 2;
      label = "Weak";
      color = "bg-orange-500";
    } else if (entropy < 60) {
      score = 3;
      label = "Fair / Moderate";
      color = "bg-yellow-500";
    } else if (entropy < 80) {
      score = 4;
      label = "Strong";
      color = "bg-green-500";
    } else {
      score = 5;
      label = "Very Strong (Cryptographic)";
      color = "bg-emerald-500";
    }

    // Estimate crack time assuming 100 Billion hashes/sec (modern GPU cluster)
    const combinations = Math.pow(poolSize, password.length);
    const seconds = combinations / 100_000_000_000;

    let crackTime = "Instant";
    if (seconds < 1) crackTime = "Less than 1 second";
    else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`;
    else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`;
    else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`;
    else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)} days`;
    else if (seconds < 31536000 * 100) crackTime = `${Math.round(seconds / 31536000)} years`;
    else if (seconds < 31536000 * 1_000_000) crackTime = `${(seconds / 31536000 / 1000).toFixed(0)} thousand years`;
    else crackTime = `${(seconds / 31536000 / 1_000_000).toFixed(0)} million+ years`;

    return {
      entropy,
      score,
      label,
      color,
      crackTime,
      hasLower,
      hasUpper,
      hasNumber,
      hasSymbol,
      hasLength,
    };
  }, [password]);

  return (
    <ToolContainer
      title="Password Strength & Entropy Analyzer"
      description="Calculate Shannon entropy bits, estimated GPU crack time, and audit password security."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold uppercase text-gray-500">
              Test Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-primary font-medium hover:underline"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type a password to test security strength..."
            className="w-full rounded-lg border border-black/15 bg-transparent p-3.5 text-base font-mono dark:border-white/20 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Strength meter bar */}
        <div>
          <div className="flex justify-between text-xs font-bold uppercase mb-1.5">
            <span>Strength: <span className="font-semibold">{stats.label}</span></span>
            <span className="font-mono">{stats.entropy} bits of entropy</span>
          </div>
          <div className="flex h-2.5 w-full gap-1.5 rounded-full overflow-hidden bg-black/10 dark:bg-white/10 p-0.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-full flex-1 rounded-full transition-all duration-300 ${
                  stats.score >= level ? stats.color : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <div className="text-xs font-semibold uppercase text-gray-500 mb-1">
              Estimated Crack Time (GPU Cluster)
            </div>
            <div className="text-xl font-bold text-primary">
              {stats.crackTime}
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              Based on 100 Billion guesses / sec
            </div>
          </div>

          <div className="rounded-xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <div className="text-xs font-semibold uppercase text-gray-500 mb-1">
              Character Length
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {password.length} characters
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              {password.length >= 16 ? "Excellent length" : password.length >= 12 ? "Good length" : "Too short (min 12 recommended)"}
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 text-xs font-medium">
          <div className={`flex items-center gap-2 ${stats.hasLength ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
            <span>{stats.hasLength ? "✓" : "○"}</span> 12+ Characters
          </div>
          <div className={`flex items-center gap-2 ${stats.hasLower ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
            <span>{stats.hasLower ? "✓" : "○"}</span> Lowercase (a-z)
          </div>
          <div className={`flex items-center gap-2 ${stats.hasUpper ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
            <span>{stats.hasUpper ? "✓" : "○"}</span> Uppercase (A-Z)
          </div>
          <div className={`flex items-center gap-2 ${stats.hasNumber ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
            <span>{stats.hasNumber ? "✓" : "○"}</span> Numbers (0-9)
          </div>
          <div className={`flex items-center gap-2 ${stats.hasSymbol ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
            <span>{stats.hasSymbol ? "✓" : "○"}</span> Symbols (!@#$%)
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
