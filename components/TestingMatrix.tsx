"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type AreaItem = { key: string; label: string; description: string };

export interface TestingMatrixProps {
  areas: AreaItem[];
}

export default function TestingMatrix({ areas }: TestingMatrixProps) {
  const [activeKey, setActiveKey] = useState<string | undefined>(areas[0]?.key);
  const active = areas.find((area) => area.key === activeKey) ?? areas[0];

  if (!active) return null;

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,280px)_1fr]">
      <div className="flex flex-row flex-wrap gap-2 md:flex-col md:flex-nowrap">
        {areas.map((area) => {
          const selected = area.key === active.key;
          return (
            <button
              key={area.key}
              type="button"
              onClick={() => setActiveKey(area.key)}
              aria-pressed={selected}
              className={cn(
                "rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected
                  ? "border-primary bg-primary/10 text-foreground shadow-glow"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {area.label}
            </button>
          );
        })}
      </div>

      <div key={active.key} className="glass animate-in rounded-2xl p-8 opacity-0 transition-opacity duration-300" style={{ animation: "testing-matrix-fade-in 300ms ease-out forwards" }}>
        <h3 className="font-display text-xl font-semibold">{active.label}</h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">{active.description}</p>
        <style jsx>{`
          @keyframes testing-matrix-fade-in {
            from {
              opacity: 0;
              transform: translateY(4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
