"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import Frame7, { QuickStartSection } from "../../imports/Frame1618872018";
import { MobileHomePage, MobileNavDrawer } from "../components/MobileHomePage";

// Desktop / tablet Figma canvas: 1440 × 6500 px
const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 6550;

// Mobile Figma canvas: 375 px wide
const MOBILE_DESIGN_WIDTH = 375;

function ScaledFrame({
  children,
  cap,
  designWidth,
  designHeight,
  autoHeight,
  comfortableViewport,
}: {
  children: React.ReactNode;
  cap?: boolean;
  designWidth?: number;
  designHeight?: number;
  autoHeight?: boolean;
  comfortableViewport?: number;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [measuredDH, setMeasuredDH] = useState<number | null>(null);

  const dw = designWidth ?? DESIGN_WIDTH;
  const dh = designHeight ?? DESIGN_HEIGHT;

  const updateScale = useCallback(() => {
    if (!outerRef.current) return;
    const vw = outerRef.current.offsetWidth;
    const raw = vw / dw;
    const comfortCap = comfortableViewport ? Math.min(vw / comfortableViewport, 1) : 1;
    setScale(cap ? Math.min(raw, comfortCap) : raw);
  }, [cap, dw, comfortableViewport]);

  useEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [updateScale]);

  // Measure inner height with ResizeObserver instead of useLayoutEffect
  // to avoid synchronous layout reflows on every re-render.
  useEffect(() => {
    if (!autoHeight || !innerRef.current) return;
    const el = innerRef.current;
    let lastH = 0;
    const measure = () => {
      const h = el.scrollHeight;
      if (h > 100 && Math.abs(h - lastH) > 2) {
        lastH = h;
        setMeasuredDH(h);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoHeight]);

  const effectiveDH = autoHeight && measuredDH ? measuredDH : dh;
  const scaledHeight = effectiveDH * scale;

  return (
    <div
      ref={outerRef}
      style={{
        width: "100%",
        height: `${scaledHeight}px`,
        // clip on X prevents horizontal page scrollbar without creating a scroll container,
        // so overflowY stays truly visible (nav dropdowns are never clipped).
        overflowX: "clip",
        overflowY: "visible",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: cap ? "center" : "flex-start",
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: `${dw}px`,
          height: autoHeight ? "auto" : `${dh}px`,
          flexShrink: 0,
          transformOrigin: cap ? "top center" : "top left",
          transform: `scale(${scale})`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

type Viewport = "mobile" | "tablet" | "desktop";

export default function Home() {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [navOpen,  setNavOpen]  = useState(false);

  const handleOpenNav  = useCallback(() => setNavOpen(true),  []);
  const handleCloseNav = useCallback(() => setNavOpen(false), []);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 600) setViewport("mobile");
      else if (w < 900) setViewport("tablet");
      else setViewport("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Mobile (< 768 px): custom stacked MobileHomePage scaled to 375 px canvas
  if (viewport === "mobile") {
    return (
      <div style={{ width: "100vw", overflowX: "clip", background: "#000" }}>
        <ScaledFrame designWidth={MOBILE_DESIGN_WIDTH} autoHeight cap>
          <MobileHomePage onMenuClick={handleOpenNav} />
        </ScaledFrame>
        {/* Nav drawer lives outside ScaledFrame so position:fixed works correctly */}
        <AnimatePresence>
          {navOpen && (
            <MobileNavDrawer key="mobile-nav" onClose={handleCloseNav} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Tablet (768–1023 px): Quick Start section in normal flow
  if (viewport === "tablet") {
    return (
      <div style={{ width: "100%", background: "#000", padding: "80px 0" }}>
        <QuickStartSection layout="col" />
      </div>
    );
  }

  // Desktop (≥ 1024 px): pixel-perfect ScaledFrame of the 1440 px Figma canvas
  return (
    <div style={{ width: "100%", overflowX: "hidden", background: "#000" }}>
      <ScaledFrame cap comfortableViewport={1680}>
        <Frame7 />
      </ScaledFrame>
    </div>
  );
}
