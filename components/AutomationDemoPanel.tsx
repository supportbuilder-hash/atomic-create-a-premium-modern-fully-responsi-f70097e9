"use client";

import { AlertCircle } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import { Badge, type BadgeVariant } from "@/components/ui/badge";

type CheckStatus = "Queued" | "Running" | "Passed" | "Needs Review";

type Check = { name: string; status: string };

export interface AutomationDemoPanelProps {
  checks: Check[];
  label?: string;
}

const STATUS_SEQUENCE: CheckStatus[] = ["Queued", "Running", "Passed", "Needs Review"];
const CYCLE_INTERVAL_MS = 2200;

function isKnownStatus(status: string): status is CheckStatus {
  return (STATUS_SEQUENCE as string[]).includes(status);
}

function nextStatus(status: string): CheckStatus {
  if (!isKnownStatus(status)) return STATUS_SEQUENCE[0];
  const currentIndex = STATUS_SEQUENCE.indexOf(status);
  const nextIndex = (currentIndex + 1) % STATUS_SEQUENCE.length;
  return STATUS_SEQUENCE[nextIndex];
}

const STATUS_BADGE_VARIANT: Record<CheckStatus, BadgeVariant> = {
  Queued: "outline",
  Running: "secondary",
  Passed: "default",
  "Needs Review": "outline",
};

function StatusIndicator({ status }: { status: string }) {
  if (status === "Passed") return <span aria-hidden="true" className="mr-1.5 inline-block h-2 w-2 rounded-full bg-primary" />;
  if (status === "Running" || status === "Needs Review") {
    return <span aria-hidden="true" className="mr-1.5 inline-block h-2 w-2 rounded-full bg-secondary" />;
  }
  return null;
}

export default function AutomationDemoPanel({ checks, label = "Interactive demonstration — not live production data" }: AutomationDemoPanelProps) {
  const [rows, setRows] = useState<Check[]>(() => checks.map((c) => ({ ...c })));
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    setRows(checks.map((c) => ({ ...c })));
  }, [checks]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mediaQuery.matches;
    if (reduceMotionRef.current) return;

    const intervalId = setInterval(() => {
      setRows((prev) => {
        if (prev.length === 0) return prev;
        const index = Math.floor(Math.random() * prev.length);
        return prev.map((row, i) => (i === index ? { ...row, status: nextStatus(row.status) } : row));
      });
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <AlertCircle aria-hidden="true" className="h-4 w-4" />
        {label}
      </p>
      <ul className="space-y-3">
        {rows.map((row) => {
          const variant = isKnownStatus(row.status) ? STATUS_BADGE_VARIANT[row.status] : "outline";
          return (
            <li
              key={row.name}
              className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-background/40 px-4 py-3"
            >
              <span className="text-sm font-medium text-foreground">{row.name}</span>
              <Badge variant={variant} className="flex items-center">
                <StatusIndicator status={row.status} />
                {row.status}
              </Badge>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
