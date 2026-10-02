"use client";

// Lightweight, dependency-free interactive "glass cube" hero visual.
// Built entirely from CSS/SVG + theme role classes (no three.js).
import { useEffect, useRef, useState } from "react";

type LayerDef = {
  key: string;
  label: string;
  translateZ: number;
  inset: number;
};

const LAYERS: LayerDef[] = [
  { key: "ui", label: "UI", translateZ: 90, inset: 0 },
  { key: "api", label: "API", translateZ: 60, inset: 14 },
  { key: "database", label: "Database", translateZ: 30, inset: 28 },
  { key: "performance", label: "Performance", translateZ: 0, inset: 42 },
  { key: "security", label: "Security", translateZ: -30, inset: 56 },
  { key: "automation", label: "Automation", translateZ: -60, inset: 70 },
];

const VERIFIED_CLASS = "border-primary/60 bg-primary/10";
const ISSUE_CLASS = "border-secondary/70 bg-secondary/10";
const DEFAULT_CLASS = "border-border bg-card/40";

interface HeroSceneProps {
  label?: string;
}

export default function HeroScene({ label = "Testing beyond the happy path." }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 10, y: -14 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [flashLayerKey, setFlashLayerKey] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const checkWidth = () => setIsMobile(window.innerWidth < 640);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const node = containerRef.current;
    if (!node) return;

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        setRotation({ x: 10 - relY * 16, y: -14 + relX * 16 });
      });
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      try {
        if (e.beta == null || e.gamma == null) return;
        const clampedBeta = Math.max(-8, Math.min(8, (e.beta - 45) / 4));
        const clampedGamma = Math.max(-8, Math.min(8, e.gamma / 4));
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setRotation({ x: 10 + clampedBeta, y: -14 + clampedGamma });
        });
      } catch {
        // ignore unsupported/blocked orientation access
      }
    };

    node.addEventListener("mousemove", handleMove);
    try {
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    } catch {
      // ignore
    }

    return () => {
      node.removeEventListener("mousemove", handleMove);
      try {
        window.removeEventListener("deviceorientation", handleOrientation);
      } catch {
        // ignore
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, isMobile]);

  useEffect(() => {
    if (reducedMotion) return;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const intervalId = setInterval(() => {
      try {
        const randomLayer = LAYERS[Math.floor(Math.random() * LAYERS.length)];
        if (!randomLayer) return;
        setFlashLayerKey(randomLayer.key);
        timeoutId = setTimeout(() => setFlashLayerKey(null), 900);
      } catch {
        // purely decorative, never let this throw
      }
    }, 4000);
    return () => {
      clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [reducedMotion]);

  const scanLines = (
    <>
      <div
        aria-hidden="true"
        className="hero-scan-line pointer-events-none absolute left-0 right-0 h-px bg-primary/60 motion-reduce:hidden"
        style={{ animationDelay: "0s" }}
      />
      <div
        aria-hidden="true"
        className="hero-scan-line pointer-events-none absolute left-0 right-0 h-px bg-primary/60 motion-reduce:hidden"
        style={{ animationDelay: "1.8s" }}
      />
    </>
  );

  const renderLayers = (layered: boolean) =>
    LAYERS.map((layer) => {
      const flashed = flashLayerKey === layer.key;
      const accentClass = flashed ? ISSUE_CLASS : layer.key === "ui" || layer.key === "automation" ? VERIFIED_CLASS : DEFAULT_CLASS;
      return (
        <div
          key={layer.key}
          className={`absolute left-1/2 top-1/2 flex items-center justify-center rounded-xl border backdrop-blur-sm transition-colors duration-500 ${accentClass}`}
          style={
            layered
              ? {
                  width: `${280 - layer.inset}px`,
                  height: `${180 - layer.inset * 0.6}px`,
                  transform: `translate3d(-50%, -50%, ${layer.translateZ}px)`,
                }
              : {
                  width: "100%",
                  height: "34px",
                  position: "static",
                  marginBottom: "10px",
                }
          }
        >
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{layer.label}</span>
        </div>
      );
    });

  const caption = (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      <span>{label}</span>
    </div>
  );

  if (!mounted) {
    return <div className="h-[320px] w-full max-w-[380px]" aria-hidden="true" />;
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        <style>{`
          @keyframes hero-scan-sweep {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .hero-scan-line { animation: hero-scan-sweep 4s linear infinite; }
        `}</style>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-4">
          {scanLines}
          <div className="relative flex flex-col">{renderLayers(false)}</div>
        </div>
        {caption}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-5">
      <style>{`
        @keyframes hero-scan-sweep {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .hero-scan-line { animation: hero-scan-sweep 4s linear infinite; }
      `}</style>
      <div
        ref={containerRef}
        className="relative h-[340px] w-[340px] max-w-full"
        style={{ perspective: "900px" }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card/30"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: reducedMotion ? "none" : "transform 220ms ease-out",
          }}
        >
          {scanLines}
          {renderLayers(true)}
        </div>
      </div>
      {caption}
    </div>
  );
}
