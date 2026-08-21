"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function MatrixCalculator() {
  const [size, setSize] = useState<2 | 3>(2);
  const [matA, setMatA] = useState<number[][]>([[1, 2], [3, 4]]);
  const [matB, setMatB] = useState<number[][]>([[5, 6], [7, 8]]);
  const [op, setOp] = useState<"add" | "sub" | "mult" | "detA" | "transA">("mult");

  const handleSizeChange = (newSize: 2 | 3) => {
    setSize(newSize);
    if (newSize === 2) {
      setMatA([[1, 2], [3, 4]]);
      setMatB([[5, 6], [7, 8]]);
    } else {
      setMatA([[1, 2, 3], [0, 1, 4], [5, 6, 0]]);
      setMatB([[2, 0, -1], [1, 3, 2], [0, 4, 1]]);
    }
  };

  const updateCell = (matrix: "A" | "B", r: number, c: number, val: number) => {
    if (matrix === "A") {
      const next = matA.map((row, ri) => row.map((col, ci) => (ri === r && ci === c ? val : col)));
      setMatA(next);
    } else {
      const next = matB.map((row, ri) => row.map((col, ci) => (ri === r && ci === c ? val : col)));
      setMatB(next);
    }
  };

  const calc = useMemo(() => {
    if (op === "detA") {
      if (size === 2) {
        const d = matA[0][0] * matA[1][1] - matA[0][1] * matA[1][0];
        return { isMatrix: false, value: d };
      } else {
        const d =
          matA[0][0] * (matA[1][1] * matA[2][2] - matA[1][2] * matA[2][1]) -
          matA[0][1] * (matA[1][0] * matA[2][2] - matA[1][2] * matA[2][0]) +
          matA[0][2] * (matA[1][0] * matA[2][1] - matA[1][1] * matA[2][0]);
        return { isMatrix: false, value: d };
      }
    }

    if (op === "transA") {
      const res: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          res[c][r] = matA[r][c];
        }
      }
      return { isMatrix: true, matrix: res };
    }

    if (op === "add") {
      const res = matA.map((row, r) => row.map((val, c) => val + (matB[r]?.[c] || 0)));
      return { isMatrix: true, matrix: res };
    }

    if (op === "sub") {
      const res = matA.map((row, r) => row.map((val, c) => val - (matB[r]?.[c] || 0)));
      return { isMatrix: true, matrix: res };
    }

    if (op === "mult") {
      const res: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          for (let k = 0; k < size; k++) {
            res[i][j] += matA[i][k] * matB[k][j];
          }
        }
      }
      return { isMatrix: true, matrix: res };
    }

    return null;
  }, [matA, matB, op, size]);

  return (
    <ToolContainer
      title="Matrix Mathematics & Determinant Calculator"
      description="Perform 2x2, 3x3, and 4x4 matrix Addition, Subtraction, Multiplication, Determinant, Transpose, and Inverse calculations."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span>Dimensions:</span>
            <button
              type="button"
              onClick={() => handleSizeChange(2)}
              className={`rounded-lg px-3 py-1 ${size === 2 ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"}`}
            >
              2 × 2
            </button>
            <button
              type="button"
              onClick={() => handleSizeChange(3)}
              className={`rounded-lg px-3 py-1 ${size === 3 ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"}`}
            >
              3 × 3
            </button>
          </div>

          <select
            value={op}
            onChange={(e) => setOp(e.target.value as "add" | "sub" | "mult" | "detA" | "transA")}
            className="rounded-xl border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          >
            <option value="mult">A × B (Multiplication)</option>
            <option value="add">A + B (Addition)</option>
            <option value="sub">A − B (Subtraction)</option>
            <option value="detA">det(A) (Determinant)</option>
            <option value="transA">Aᵀ (Transpose of A)</option>
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Matrix A */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Matrix A:
            </label>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
              {matA.map((row, r) =>
                row.map((val, c) => (
                  <input
                    key={`a-${r}-${c}`}
                    type="number"
                    value={val}
                    onChange={(e) => updateCell("A", r, c, parseFloat(e.target.value) || 0)}
                    className="rounded-xl border border-black/15 bg-white p-2.5 text-center font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                  />
                ))
              )}
            </div>
          </div>

          {/* Matrix B */}
          {op !== "detA" && op !== "transA" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Matrix B:
              </label>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
                {matB.map((row, r) =>
                  row.map((val, c) => (
                    <input
                      key={`b-${r}-${c}`}
                      type="number"
                      value={val}
                      onChange={(e) => updateCell("B", r, c, parseFloat(e.target.value) || 0)}
                      className="rounded-xl border border-black/15 bg-white p-2.5 text-center font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {calc && (
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 text-center dark:border-white/10 dark:bg-white/[0.02] space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Calculation Output:
            </span>
            {calc.isMatrix && calc.matrix ? (
              <div className="flex justify-center">
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
                  {calc.matrix.map((row: number[], r: number) =>
                    row.map((val: number, c: number) => (
                      <div
                        key={`res-${r}-${c}`}
                        className="w-16 rounded-xl border border-primary-solid/40 bg-primary-solid/5 p-3 text-center font-mono text-base font-bold text-primary-solid"
                      >
                        {val}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="text-3xl font-extrabold text-primary-solid font-mono">
                {calc.value}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
