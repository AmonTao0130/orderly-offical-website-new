"use client";

/**
 * TabletHomePage — desktop-composition hero, compact typography
 *
 * Hero composition matches desktop exactly:
 *   background decorative shapes → headline + CTAs → MacBook video with
 *   floating feature tags → stats card overlapping MacBook bottom.
 *
 * All 5 desktop background shapes are reproduced using percentage-based
 * absolute positioning on the hero container so they scale with viewport width.
 *
 * Typography (compact scale — identical to QuickStartSection):
 *   Hero display:   96px → 48px  (Atyp_BL:Display_-_Bold)
 *   Subtitle:       24px → 16px  (Atyp_BL:Medium)
 *   Stats numbers:  60px → 36px  (Atyp_BL:Display_-_SemiBold)
 *   Stats labels:   24px → 16px  (Atyp_BL:Medium)
 *   Feature titles: 48px → 28px  (Atyp_BL:Display_-_Bold)
 *   Feature desc:   23px → 16px  (Atyp_BL:Display_-_Medium)
 *   Chips/tags:     18px → 14px  (Atyp_BL:Semibold)
 *   Buttons:        16px → 14px  (Atyp_BL:Bold)
 */

import { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";

import {
  HeaderLogo,
  PartnershipFormModal,
  BackgroundVector,
  BackgroundVector1,
} from "../../imports/Frame1618872018";
import { MobileNavDrawer } from "./MobileHomePage";
import {
  useOrderlyStats,
  formatLargeNumber,
} from "@/app/hooks/useOrderlyStats";
import { AnimatedNumber } from "@/app/components/AnimatedNumber";
import MacbookVideo from "@/app/components/MacbookVideo";

// ─── Stable format refs ────────────────────────────────────────────────────────
const fmtLarge = (v: number) => formatLargeNumber(v);
const fmtInt = (v: number) => `${Math.round(v)}`;

// ─── 1. Nav ───────────────────────────────────────────────────────────────────

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect y="3" width="22" height="2" rx="1" fill="white" />
      <rect y="10" width="22" height="2" rx="1" fill="white" />
      <rect y="17" width="22" height="2" rx="1" fill="white" />
    </svg>
  );
}

function TabletNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div
      className="sticky top-0 z-[100] flex items-center justify-between h-[68px] px-6 gap-4"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "rgba(0,0,0,0.55)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ transform: "scale(0.8)", transformOrigin: "left center" }}>
        <HeaderLogo />
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://dex.orderly.network/dex/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-['Atyp_BL:Bold',sans-serif] text-[14px] text-[#3f0086] leading-none no-underline whitespace-nowrap rounded-[46px] bg-white px-[18px] py-[8px]"
        >
          Launch Now
        </a>
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center bg-transparent border-0 cursor-pointer p-1"
          aria-label="Open navigation"
        >
          <HamburgerIcon />
        </button>
      </div>
    </div>
  );
}

// ─── 2. Hero (matches desktop composition exactly) ────────────────────────────

/**
 * FeatureChip — matches desktop FeatureTag: glassmorphism pill with a
 * 11px colour dot and 14px (compact: 18→14) semibold label.
 * Positioned absolutely on the MacBook video container.
 */
function FeatureChip({ dot, label }: { dot: string; label: string }) {
  return (
    <div
      className="flex items-center gap-[10px] px-[20px] py-[14px] rounded-[124px] shrink-0"
      style={{
        background:
          "linear-gradient(to top, rgba(156,117,255,0.6) 0%, rgba(156,117,255,0) 100%)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "2px solid rgba(255,255,255,0.65)",
        boxShadow: "14px 18px 30px 0px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="shrink-0 rounded-full"
        style={{ width: 11, height: 11, background: dot }}
      />
      <p className="font-['Atyp_BL:Semibold',sans-serif] text-[12px] text-white leading-none whitespace-nowrap capitalize">
        {label}
      </p>
    </div>
  );
}

/**
 * StatItem — matches desktop exactly, scaled for tablet:
 *   label  24px → 14px (Atyp_BL:Medium)
 *   number 60px → 32px (Atyp_BL:Display_-_SemiBold, font-[612])
 */
function StatItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 text-white">
      <p
        className="font-['Atyp_BL:Medium',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[14px] text-center"
        style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
      >
        {label}
      </p>
      <div
        className="capitalize flex flex-col font-['Atyp_BL:Display_-_SemiBold',sans-serif] font-[612] justify-center leading-none relative shrink-0 text-[32px] whitespace-nowrap"
        style={{
          fontVariationSettings: "'ital' 0, 'opsz' 72",
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function StatsDivider() {
  return <div className="self-stretch w-[2px] bg-[#9C75FF] shrink-0" />;
}

/** 3-column layout matching desktop StatsContent exactly */
function TabletStatsSection() {
  const stats = useOrderlyStats();

  return (
    <div className="flex items-stretch bg-[#6700ce] rounded-[24px] px-[20px] py-[28px]">
      {/* Col 1 — Total Trading Volume + TVL */}
      <div className="flex flex-1 flex-col items-center justify-center gap-[24px]">
        <StatItem label="Total Trading Volume">
          <AnimatedNumber value={stats.totalVolume} format={fmtLarge} />
        </StatItem>
        <StatItem label="TVL">
          <AnimatedNumber value={stats.tvl} format={fmtLarge} />
        </StatItem>
      </div>

      <StatsDivider />

      {/* Col 2 — 24h Trading Volume + Open Interest */}
      <div className="flex flex-1 flex-col items-center justify-center gap-[24px]">
        <StatItem label="24h Trading Volume">
          <AnimatedNumber value={stats.tradingVolume} format={fmtLarge} />
        </StatItem>
        <StatItem label="Open Interest">
          <AnimatedNumber value={stats.openInterest} format={fmtLarge} />
        </StatItem>
      </div>

      <StatsDivider />

      {/* Col 3 — Live Builders + Chains */}
      <div className="flex flex-1 flex-col items-center justify-center gap-[24px]">
        <StatItem label="Live Builders">
          <AnimatedNumber value={stats.liveBuilders} format={fmtInt} />
        </StatItem>
        <StatItem label="Chains">
          <AnimatedNumber value={stats.chains} format={fmtInt} />
        </StatItem>
      </div>
    </div>
  );
}

/**
 * TabletHero — compositionally identical to the desktop Frame7 hero:
 *
 * Layer order (back → front):
 *   1. BackgroundVector  — dark purple (#3F0086) diamond, top-right (rotated 45°)
 *   2. BackgroundVector1 — light purple (#9C75FF) polygon, top-left (rotated −30°)
 *   3. Large ellipse     — dark purple (#3F0086), left side (rotated 24.52°)
 *   4. Small circle      — medium purple (#6700CE), left side (rotated 24.52°)
 *   5. Right path        — light purple (#9C75FF), upper-right
 *   6. Hero text + CTA buttons (centered, normal flow)
 *   7. MacBook video (full width, normal flow)
 *      ↳ Feature tags floating on MacBook (absolute, matching desktop positions)
 *   8. Stats card (overlaps MacBook bottom ~24px, matching desktop overlap)
 *
 * Background shapes use percentage-based absolute positioning derived from
 * desktop canvas coordinates (1440 × ~1602 px hero area), so they scale
 * proportionally with the tablet viewport width.
 */
function TabletHero({
  onPartnership,
}: {
  onPartnership: () => void;
}) {
  return (
    <div className="relative w-full">

      {/* ── Background decorative shapes ──────────────────────────────────── */}

      {/* 1. BackgroundVector — dark diamond, top-right, partially off-canvas
          Desktop: centered at (93.9% width, ~40% hero height), size 28.5% of canvas  */}
      <div
        className="pointer-events-none absolute"
        style={{ right: "-7%", top: "50%", width: "28.5%" }}
      >
        {/* paddingTop: 100% → square container (height = width) */}
        <div style={{ position: "relative", paddingTop: "100%" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "rotate(45deg)",
            }}
          >
            <BackgroundVector />
          </div>
        </div>
      </div>

      {/* 2. BackgroundVector1 — light polygon, top-left
          Desktop: centered at (16.7% width, ~26% hero height), size 18.6%  */}
      <div
        className="pointer-events-none absolute"
        style={{ left: "5%", top: "35%", width: "18.6%" }}
      >
        <div style={{ position: "relative", paddingTop: "100%" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "rotate(-30deg)",
            }}
          >
            <BackgroundVector1 />
          </div>
        </div>
      </div>

      {/* 3. Large ellipse (#3F0086) — left side, mid-hero, rotated 24.52°
          Desktop: left −143px, top 858px, outer size 573×434px  */}
      <div
        className="pointer-events-none absolute"
        style={{ left: "-10%", top: "53%", width: "39.8%" }}
      >
        <div style={{ transform: "rotate(24.52deg)" }}>
          <svg
            viewBox="0 0 520.857 239.242"
            style={{ display: "block", width: "100%", height: "auto" }}
          >
            <ellipse
              cx="260.429"
              cy="119.621"
              fill="#3F0086"
              rx="260.429"
              ry="119.621"
            />
          </svg>
        </div>
      </div>

      {/* 4. Small circle (#6700CE) — left side, above mid
          Desktop: left 41px, top 787px, 78×78px  */}
      <div
        className="pointer-events-none absolute"
        style={{ left: "2%", top: "47%", width: "5.4%" }}
      >
        <div style={{ transform: "rotate(24.52deg)" }}>
          <svg
            viewBox="0 0 59.0751 59.153"
            style={{ display: "block", width: "100%", height: "auto" }}
          >
            <ellipse
              cx="29.5376"
              cy="29.5765"
              fill="#6700CE"
              rx="29.5376"
              ry="29.5765"
            />
          </svg>
        </div>
      </div>

      {/* 5. Right path (#9C75FF) — upper-right area
          Desktop: left 1019px, top 409px, 337×375px  */}
      <div
        className="pointer-events-none absolute"
        style={{ right: "0", top: "28%", width: "23.4%" }}
      >
        <svg
          viewBox="0 0 336.94 374.798"
          style={{ display: "block", width: "100%", height: "auto" }}
        >
          <path
            d="M118.253 211.737L141.742 374.798L230.836 211.737L336.94 168.74L242.176 123.31L230.836 0L155.511 123.31L0 157.383L118.253 211.737Z"
            fill="#9C75FF"
          />
        </svg>
      </div>

      {/* ── Main content (z-10, above background shapes) ─────────────────── */}
      <div className="relative z-10">

        {/* Hero text + CTA buttons — centered, same copy & hierarchy as desktop */}
        <div className="flex flex-col items-center gap-[20px] px-6 pt-[48px] pb-[40px] text-center">
          {/* Display headline */}
          <div className="font-['Atyp_BL:Display_-_Bold',sans-serif] text-[48px] leading-none text-white">
            <p className="mb-0">LAUNCH YOUR</p>
            <p className="mb-0">OWN PERP DEX</p>
          </div>

          {/* Subtitle */}
          <p className="font-['Atyp_BL:Medium',sans-serif] text-[13px] leading-[1.4] text-white max-w-[480px]">
            Launch a perpetuals DEX on any chain — for humans and agents with
            shared liquidity, zero infra cost, and fees that go to you.
          </p>

          {/* CTA buttons — matches desktop HeroButtonsContainer exactly */}
          <div className="flex flex-wrap gap-[10px] justify-center">
            <a
              href="https://dex.orderly.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#6700ce] flex h-[44px] items-center justify-center px-[20px] relative rounded-[24px] shrink-0 no-underline hover:opacity-90 transition-opacity"
            >
              <p
                className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[12px] text-white"
                style={{
                  fontFamily: "'atyp-bl-variable', 'atyp-bl', sans-serif",
                  letterSpacing: "0.01em",
                  fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
                }}
              >
                Start Building
              </p>
            </a>
            <button
              onClick={onPartnership}
              className="flex h-[44px] items-center justify-center pl-[20px] pr-[16px] relative rounded-[24px] shrink-0 hover:bg-white/10 transition-colors bg-transparent border-0 cursor-pointer"
            >
              <div
                aria-hidden="true"
                className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[24px]"
              />
              <p
                className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[12px] text-white"
                style={{
                  fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
                }}
              >
                Talk to Partnerships
              </p>
            </button>
          </div>
        </div>

        {/* MacBook video + floating feature tags
            Aspect ratio 900.323 : 670.158 ≈ 74.44% (matches desktop Figma dimensions).
            Feature tags are absolutely positioned on this container, mirroring
            the desktop's FeatureTag positions relative to the MacBook:
              · Deep Liquidity: right side, near top  (desktop: left 1016px, top 700px)
              · No-code:        left side, mid         (desktop: left 184px,  top 1021px)
              · Customizable:   right side, lower      (desktop: left 992px,  top 1070px)
        */}
        {/* Outer centering wrapper — constrains MacBook to 75% of viewport width */}
        <div className="flex justify-center w-full">
          <div className="relative w-[75%]" style={{ aspectRatio: "900.323 / 670.158" }}>
            <MacbookVideo
              className="absolute inset-0 w-full h-full"
              canvasWidth={768}
            />

            {/* Deep Liquidity — right side, near top of MacBook */}
            <div className="absolute" style={{ right: "-10%", top: "16%" }}>
              <FeatureChip dot="#44DED3" label="Deep Liquidity" />
            </div>

            {/* No-code — left side, mid MacBook */}
            <div className="absolute" style={{ left: "-8%", top: "62%" }}>
              <FeatureChip dot="#44DED3" label="No-code" />
            </div>

            {/* Customizable — right side, lower MacBook */}
            <div className="absolute" style={{ right: "-10%", top: "70%" }}>
              <FeatureChip dot="#44DED3" label="Customizable" />
            </div>
          </div>
        </div>

        {/* Stats card — overlaps MacBook bottom ~24px, matching desktop
            (desktop overlap: 1325px MacBook bottom − 1276px stats top = ~50px) */}
        <div className="relative z-10 -mt-[24px] pb-[32px] flex justify-center">
          <div className="w-[85%] max-w-[680px]">
            <TabletStatsSection />
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── 3. "From zero to live DEX" / Features ───────────────────────────────────

const FEATURE_STEPS = [
  {
    num: "1",
    title: "Connect",
    description:
      "Plug into Orderly's shared orderbook via SDK or white-label (OrderlyOne).",
  },
  {
    num: "2",
    title: "Customize",
    description:
      "Brand it, set fees, choose your chain. Your exchange, your rules.",
  },
  {
    num: "3",
    title: "Earn",
    description: "Every trade on your frontend = revenue to you. Day one.",
  },
];

function TabletFeaturesSection() {
  return (
    <div className="flex flex-col gap-[40px]">
      {/* Section heading */}
      <p className="font-['Atyp_BL:Bold',sans-serif] text-[24px] text-white text-center leading-[1.1]">
        From zero to live DEX in one integration
      </p>

      {/* Steps row — no wrapping so items always stay on one line.
          Each item is exactly 1/3 of the container (flex: 1 1 0, no gap).
          The dashed line spans from circle-1 center to circle-3 center:
            left = 1/6 of container, right = 1/6 of container.
          Circles carry relative z-10 so they render on top of the line. */}
      <div className="relative flex items-start">
        <div
          className="absolute top-[21px] pointer-events-none overflow-visible"
          style={{ left: "calc(100% / 6)", right: "calc(100% / 6)", height: 2 }}
        >
          <svg width="100%" height="2" preserveAspectRatio="none" style={{ display: "block" }}>
            <line x1="0" y1="1" x2="100%" y2="1" stroke="#6700CE" strokeWidth="1" strokeDasharray="3 4" />
          </svg>
        </div>
        {FEATURE_STEPS.map((step) => (
          <div
            key={step.num}
            className="flex flex-col items-center gap-[20px] px-3"
            style={{ flex: "1 1 0", minWidth: 0 }}
          >
            <div className="relative z-10 flex items-center justify-center bg-[#6700ce] rounded-[40px] shrink-0 size-[44px]">
              <p className="font-['Atyp_BL:Semibold',sans-serif] text-[26px] text-white leading-[1.2]">
                {step.num}
              </p>
            </div>
            <p className="font-['Atyp_BL:Display_-_Bold',sans-serif] text-[20px] text-white text-center leading-[1.2]">
              {step.title}
            </p>
            <p className="font-['Atyp_BL:Display_-_Medium',sans-serif] text-[13px] text-white text-center leading-[1.4]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function TabletHomePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [partnershipModalOpen, setPartnershipModalOpen] = useState(false);

  const handleOpenNav = useCallback(() => setNavOpen(true), []);
  const handleCloseNav = useCallback(() => setNavOpen(false), []);

  return (
    <div className="w-full bg-black text-white overflow-x-hidden">
      {/* 1. Nav */}
      <TabletNav onMenuClick={handleOpenNav} />

      {/* 2. Hero — background shapes + headline + MacBook + feature tags + stats */}
      <TabletHero
        onPartnership={() => setPartnershipModalOpen(true)}
      />

      {/* 3. From zero to live DEX */}
      <div className="px-6 pt-[64px] pb-[64px]">
        <TabletFeaturesSection />
      </div>

      {/* ── Modals ── */}
      {partnershipModalOpen && (
        <PartnershipFormModal onClose={() => setPartnershipModalOpen(false)} />
      )}

      {/* ── Nav drawer (reused from mobile) ── */}
      <AnimatePresence>
        {navOpen && (
          <MobileNavDrawer key="tablet-nav" onClose={handleCloseNav} />
        )}
      </AnimatePresence>
    </div>
  );
}
