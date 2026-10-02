"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export type SystemNode = {
  key: string;
  label: string;
  risks: string;
  approach: string;
};

export interface SystemsGraphProps {
  nodes: SystemNode[];
}

export default function SystemsGraph({ nodes }: SystemsGraphProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selected = nodes.find((node) => node.key === selectedKey) ?? null;

  return (
    <div className="bg-muted/30 rounded-2xl p-6 md:p-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {nodes.map((node) => {
          const isSelected = node.key === selectedKey;
          return (
            <button
              key={node.key}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedKey(isSelected ? null : node.key)}
              className={cn(
                "rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                isSelected && "border-primary bg-primary/10 text-foreground shadow-glow",
              )}
            >
              {node.label}
            </button>
          );
        })}
      </div>

      {selected ? (
        <Reveal className="glass mt-8 rounded-2xl p-8">
          <h3 className="font-display text-xl font-semibold">{selected.label}</h3>
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Common risks</p>
              <p className="mt-2 text-muted-foreground">{selected.risks}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">How I test it</p>
              <p className="mt-2 text-muted-foreground">{selected.approach}</p>
            </div>
          </div>
        </Reveal>
      ) : (
        <p className="mt-8 text-center text-muted-foreground">
          Select a system above to see what I watch for.
        </p>
      )}
    </div>
  );
}
