"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import Frame7, { MorphingHeader } from "../../imports/DesktopHomePage";
import { MobileHomePage, MobileNavDrawer } from "../components/MobileHomePage";
import { MobileFullFooter } from "../../imports/Frame1618872068-142-633";
import { TabletHomePage } from "../components/TabletHomePage";
import svgPaths from "../../imports/svg-4hybjba00c";
import { useCompetitionPrizePoolTotal } from "../hooks/useCompetitionPrizePoolTotal";

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
    const comfortCap = comfortableViewport
      ? Math.min(vw / comfortableViewport, 1)
      : 1;
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

function MobileFixedNav({
  onMenuClick,
  bannerHeight = 0,
}: {
  onMenuClick: () => void;
  bannerHeight?: number;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: bannerHeight,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 24px",
        background: "#000",
        height: 72,
      }}
    >
      <Link
        href="/"
        style={{
          display: "block",
          width: 32,
          height: 32,
          position: "relative",
        }}
      >
        <svg
          style={{ position: "absolute", width: "100%", height: "100%" }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 31.9999 31.9608"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.p2fe0400}
            fill="white"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p2f88ca00}
            fill="white"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p22c01780}
            fill="white"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p527fe00}
            fill="white"
            fillRule="evenodd"
          />
        </svg>
      </Link>
      <button
        onClick={onMenuClick}
        style={{
          background: "transparent",
          border: 0,
          cursor: "pointer",
          padding: "4px",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="9" width="24" height="2.5" rx="1.25" fill="white" />
          <rect x="4" y="15" width="24" height="2.5" rx="1.25" fill="white" />
          <rect x="4" y="21" width="24" height="2.5" rx="1.25" fill="white" />
        </svg>
      </button>
    </div>
  );
}

const BANNER_HEIGHT = 44;
const BANNER_HEIGHT_MOBILE = 60;

const BANNER_BG = "#6700CE";

const BANNER_FONT = {
  fontFamily: "'atyp-bl-variable', 'atyp-bl', sans-serif",
  fontVariationSettings: "'wght' 500",
  fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'",
} as const;

const BANNER_TEXT_STYLE = {
  color: "#fff",
  ...BANNER_FONT,
} as const;

const BANNER_INLINE_LINK_STYLE = {
  color: "#44DED3",
  ...BANNER_FONT,
  fontVariationSettings: "'wght' 600",
  textDecoration: "none",
  transition: "opacity 0.15s",
} as const;

const CLOSE_BTN_STYLE = {
  background: "transparent",
  border: 0,
  cursor: "pointer",
  padding: 6,
  color: "rgba(255,255,255,0.65)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M1 1L11 11M11 1L1 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AnnouncementBanner({
  mobile,
  onClose,
  prizeText,
}: {
  mobile?: boolean;
  onClose: () => void;
  prizeText: string;
}) {
  if (mobile) {
    // Mobile: text wraps to ~2 lines, X vertically centered on right
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          willChange: "transform",
          height: `calc(${BANNER_HEIGHT_MOBILE}px + var(--sai-top, 0px))`,
          paddingTop: "var(--sai-top, 0px)",
          background: BANNER_BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--sai-top, 0px) 36px 0 16px",
          textAlign: "center",
        }}
      >
        <span style={{ ...BANNER_TEXT_STYLE, fontSize: 13, lineHeight: 1.5 }}>
          I 💜 Perps Trading Competition
          <br />
          Compete for {prizeText} ·{" "}
          <a
            href="https://app.orderly.network/campaigns/?utm_source=orderly_website&utm_medium=navbar"
            target="_blank"
            rel="noopener noreferrer"
            className="banner-link"
            style={{ ...BANNER_INLINE_LINK_STYLE, fontSize: 13 }}
          >
            Join Now →
          </a>
        </span>
        <button
          onClick={onClose}
          aria-label="Close announcement"
          style={{
            ...CLOSE_BTN_STYLE,
            position: "absolute",
            top: "50%",
            right: 6,
            transform: "translateY(-50%)",
          }}
        >
          <CloseIcon />
        </button>
      </motion.div>
    );
  }

  // Desktop / tablet: single row — spacer | text with inline link | X
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        willChange: "transform",
        height: `calc(${BANNER_HEIGHT}px + var(--sai-top, 0px))`,
        paddingTop: "var(--sai-top, 0px)",
        background: BANNER_BG,
        display: "flex",
        alignItems: "center",
        padding: "var(--sai-top, 0px) 8px 0 16px",
      }}
    >
      <div style={{ flex: 1 }} />

      <span
        style={{ ...BANNER_TEXT_STYLE, fontSize: 13, whiteSpace: "nowrap" }}
      >
        I 💜 Perps Trading Competition · Compete for {prizeText} ·{" "}
        <a
          href="https://app.orderly.network/campaigns/?utm_source=orderly_website&utm_medium=navbar"
          target="_blank"
          rel="noopener noreferrer"
          className="banner-link"
          style={{ ...BANNER_INLINE_LINK_STYLE, fontSize: 13 }}
        >
          Join Now →
        </a>
      </span>

      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onClose}
          aria-label="Close announcement"
          style={CLOSE_BTN_STYLE}
        >
          <CloseIcon />
        </button>
      </div>
    </motion.div>
  );
}

function FloatingCampaignHeart() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://app.orderly.network/campaigns/?utm_source=orderly_website&utm_medium=navbar"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-heart-btn"
      aria-label="Join Perps Trading Campaign"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 28,
        right: 24,
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        textDecoration: "none",
      }}
    >
      <img
        src="/images/love1.png"
        alt="Join Campaign"
        width={64}
        height={64}
        style={{ display: "block", flexShrink: 0 }}
      />
      <span
        style={{
          color: "#fff",
          fontSize: 12,
          fontFamily: "'atyp-bl-variable', sans-serif",
          fontWeight: 500,
          whiteSpace: "nowrap",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          pointerEvents: "none",
          background: "rgba(0,0,0,0.55)",
          borderRadius: 6,
          padding: "3px 8px",
        }}
      >
        Competition
      </span>
    </a>
  );
}

type Viewport = "mobile" | "tablet" | "desktop";

export default function Home() {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [navOpen, setNavOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [safeAreaTop, setSafeAreaTop] = useState(0);
  const { total: prizePoolTotal, ready: prizePoolReady } =
    useCompetitionPrizePoolTotal();
  const prizeText = `$${new Intl.NumberFormat("en-US").format(
    Math.round(prizePoolTotal)
  )}+`;
  const bannerShown = bannerVisible && prizePoolReady;

  const handleOpenNav = useCallback(() => setNavOpen(true), []);
  const handleCloseNav = useCallback(() => setNavOpen(false), []);
  const handleCloseBanner = useCallback(() => setBannerVisible(false), []);

  // Read env(safe-area-inset-top) from CSS variable (requires viewport-fit=cover)
  useEffect(() => {
    const read = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--sai-top")
        .trim();
      setSafeAreaTop(parseFloat(raw) || 0);
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  useEffect(() => {
    let meta = document.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta") as HTMLMetaElement;
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", bannerShown ? BANNER_BG : "#000000");
  }, [bannerShown]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 600) setViewport("mobile");
      else if (w < 1024) setViewport("tablet");
      else setViewport("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const bannerH = bannerShown ? BANNER_HEIGHT + safeAreaTop : 0;
  const bannerHMobile = bannerShown ? BANNER_HEIGHT_MOBILE + safeAreaTop : 0;

  // Mobile (< 600 px): custom stacked MobileHomePage scaled to 375 px canvas
  if (viewport === "mobile") {
    return (
      <div style={{ width: "100vw", overflowX: "clip", background: "#000" }}>
        <AnimatePresence>
          {bannerShown && (
            <AnnouncementBanner
              mobile
              onClose={handleCloseBanner}
              prizeText={prizeText}
            />
          )}
        </AnimatePresence>
        <MobileFixedNav
          onMenuClick={handleOpenNav}
          bannerHeight={bannerHMobile}
        />
        <div
          style={{
            paddingTop: 72 + bannerHMobile,
            transition: "padding-top 220ms ease-out",
          }}
        >
          <ScaledFrame designWidth={MOBILE_DESIGN_WIDTH} autoHeight>
            <MobileHomePage onMenuClick={handleOpenNav} hideNav hideFooter />
          </ScaledFrame>
          <div
            style={{
              padding: "0 20px 32px",
              marginTop: "46px",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <MobileFullFooter />
          </div>
        </div>
        {/* Nav drawer lives outside ScaledFrame so position:fixed works correctly */}
        <AnimatePresence>
          {navOpen && (
            <MobileNavDrawer key="mobile-nav" onClose={handleCloseNav} />
          )}
        </AnimatePresence>
        <FloatingCampaignHeart />
      </div>
    );
  }

  // Tablet (600–1023 px): full tablet homepage in normal flow
  if (viewport === "tablet") {
    return (
      <>
        <AnimatePresence>
          {bannerShown && (
            <AnnouncementBanner
              onClose={handleCloseBanner}
              prizeText={prizeText}
            />
          )}
        </AnimatePresence>
        <div
          style={{
            paddingTop: bannerH,
            transition: "padding-top 220ms ease-out",
          }}
        >
          <TabletHomePage bannerOffset={bannerH} />
        </div>
        <FloatingCampaignHeart />
      </>
    );
  }

  // Desktop (≥ 1024 px): pixel-perfect ScaledFrame of the 1440 px Figma canvas
  return (
    <div style={{ width: "100%", overflowX: "clip", background: "#000" }}>
      <AnimatePresence>
        {bannerShown && (
          <AnnouncementBanner
            onClose={handleCloseBanner}
            prizeText={prizeText}
          />
        )}
      </AnimatePresence>
      {/* Morphing Header - fixed position outside ScaledFrame */}
      <div
        style={{
          position: "fixed",
          top: bannerH,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "top 220ms ease-out",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MorphingHeader />
      </div>
      <div
        style={{
          paddingTop: bannerH,
          transition: "padding-top 220ms ease-out",
        }}
      >
        <ScaledFrame cap comfortableViewport={1680} autoHeight>
          <Frame7 />
        </ScaledFrame>
      </div>
      <FloatingCampaignHeart />
    </div>
  );
}
