"use client";

import posthog from "posthog-js";

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

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "motion/react";

import {
  HeaderLogo,
  PartnershipFormModal,
  BackgroundVector,
  BackgroundVector1,
  QuickStartSection,
  StatusMessageContainer,
} from "../../imports/DesktopHomePage";
import { MobileNavDrawer } from "./MobileHomePage";
import {
  useOrderlyStats,
  formatLargeNumber,
} from "@/app/hooks/useOrderlyStats";
import { AnimatedNumber } from "@/app/components/AnimatedNumber";
import MacbookVideo from "@/app/components/MacbookVideo";
import { useNewsletterSubscribe } from "@/app/hooks/useNewsletterSubscribe";
import WhyContentList from "../../imports/WhyContentList";

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

export function TabletNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div
      className="sticky top-0 z-[100] flex items-center justify-between h-[68px] px-10 gap-4"
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
          onClick={() => {
            posthog.capture("homepage_cta_clicked", {
              cta_name: "launch_now",
              source_page: "homepage",
              device_layout: "tablet",
            });
          }}
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
function TabletHero({ onPartnership }: { onPartnership: () => void }) {
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
        <div className="flex flex-col items-center gap-[20px] px-10 pt-[48px] pb-[40px] text-center">
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
              onClick={() => {
                posthog.capture("homepage_cta_clicked", {
                  cta_name: "start_building",
                  source_page: "homepage",
                  device_layout: "tablet",
                });
              }}
            >
              <p
                className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[12px] text-white"
                style={{
                  fontFamily: "'atyp-bl-variable', 'atyp-bl', sans-serif",
                  letterSpacing: "0.01em",
                  fontFeatureSettings:
                    "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
                }}
              >
                Start Building
              </p>
            </a>
            <button
              onClick={() => {
                posthog.capture("homepage_cta_clicked", {
                  cta_name: "talk_to_partnerships",
                  source_page: "homepage",
                  device_layout: "tablet",
                });
                onPartnership();
              }}
              className="flex h-[44px] items-center justify-center pl-[20px] pr-[16px] relative rounded-[24px] shrink-0 hover:bg-white/10 transition-colors bg-transparent border-0 cursor-pointer"
            >
              <div
                aria-hidden="true"
                className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[24px]"
              />
              <p
                className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[12px] text-white"
                style={{
                  fontFeatureSettings:
                    "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
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
          <div
            className="relative w-[75%]"
            style={{ aspectRatio: "900.323 / 670.158" }}
          >
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
          <div className="w-[85%] max-w-[820px]">
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
          <svg
            width="100%"
            height="2"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="#6700CE"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
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

// ─── Shared: scroll arrow button ─────────────────────────────────────────────

function ScrollArrowBtn({
  direction,
  enabled,
  onClick,
}: {
  direction: "left" | "right";
  enabled: boolean;
  onClick: () => void;
}) {
  const fill = enabled ? "#3F0086" : "#1E2026";
  const stroke = enabled ? "white" : "#2B2F36";
  return (
    <button
      onClick={onClick}
      disabled={!enabled}
      className="shrink-0 flex items-center justify-center bg-transparent border-0 p-0"
      style={{ width: 36, height: 36, cursor: enabled ? "pointer" : "default" }}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
    >
      <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="22" fill={fill} />
        {direction === "left" ? (
          <path
            d="M26 14L18 22L26 30"
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M18 14L26 22L18 30"
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

/** Small external-link arrow used on build cards and "View all" */
function ExternalArrowSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 9.5L9.5 2.5M5.5 2.5H9.5V6.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── 4. Why Orderly ───────────────────────────────────────────────────────────

/**
 * TabletWhySection — horizontal scrollable carousel of the 6 Why cards.
 * Reuses WhyContentList (compact 240×290px cards) from WhyContentList.tsx.
 * Arrow buttons scroll ±260px (one card width + gap).
 */
function TabletWhySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
  }, [checkScroll]);

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <p
          className="font-['Atyp_BL:Bold',sans-serif] text-[28px] text-white leading-[1.1]"
          style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
        >
          Why Orderly?
        </p>
        <div className="flex items-center gap-[8px]">
          <ScrollArrowBtn
            direction="left"
            enabled={canScrollLeft}
            onClick={() =>
              scrollRef.current?.scrollBy({ left: -260, behavior: "smooth" })
            }
          />
          <ScrollArrowBtn
            direction="right"
            enabled={canScrollRight}
            onClick={() =>
              scrollRef.current?.scrollBy({ left: 260, behavior: "smooth" })
            }
          />
        </div>
      </div>

      {/* Scrollable card strip — WhyContentList renders 6 × 240px cards */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="overflow-x-auto overscroll-x-none"
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
      >
        <WhyContentList />
      </div>
    </div>
  );
}

// ─── 5. On Orderly / Build ────────────────────────────────────────────────────

const BUILD_CARDS = [
  {
    title: "Launch a branded Perp DEX",
    linkLabel: "Orderly One",
    href: "https://dex.orderly.network/",
    bg: "#3f0086",
  },
  {
    title: "Add perps to your dApp or wallet",
    linkLabel: "SDK & API",
    href: "https://orderly.network/docs/build-on-omnichain/evm-api/introduction",
    bg: "#6700ce",
  },
  {
    title: "Earn with Vaults",
    linkLabel: "Vaults",
    href: "http://app.orderly.network/vaults",
    bg: "#3f0086",
  },
  {
    title: "List your token",
    linkLabel: "Listings",
    href: "https://orderly.network/listing/",
    bg: "#6700ce",
  },
  {
    title: "Building trading tools",
    linkLabel: "Start Building",
    href: "https://dex.orderly.network/",
    bg: "#3f0086",
  },
] as const;

const CARD_NAME_MAP: Record<string, string> = {
  "Orderly One": "dex",
  "SDK & API": "build",
  Vaults: "vaults",
  Listings: "listings",
  "Start Building": "start_building",
};

/**
 * TabletBuildSection — horizontal scrollable carousel of the 5 "On Orderly" cards.
 * Same title/link content as the desktop BuildSection containers.
 */
function TabletBuildSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
  }, [checkScroll]);

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <p
          className="font-['Atyp_BL:Bold',sans-serif] text-[28px] text-white leading-[1.1]"
          style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
        >
          On Orderly
        </p>
        <div className="flex items-center gap-[8px]">
          <ScrollArrowBtn
            direction="left"
            enabled={canScrollLeft}
            onClick={() =>
              scrollRef.current?.scrollBy({ left: -216, behavior: "smooth" })
            }
          />
          <ScrollArrowBtn
            direction="right"
            enabled={canScrollRight}
            onClick={() =>
              scrollRef.current?.scrollBy({ left: 216, behavior: "smooth" })
            }
          />
        </div>
      </div>

      {/* Scrollable card strip */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-[16px] overflow-x-auto overscroll-x-none"
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
      >
        {BUILD_CARDS.map((card) => (
          <div
            key={card.title}
            className="flex flex-col justify-between overflow-clip rounded-[20px] shrink-0 p-[24px]"
            style={{ background: card.bg, width: 240, height: 290 }}
          >
            <p
              className="font-['Atyp_BL:Semibold',sans-serif] text-[20px] text-white leading-[1.2]"
              style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
            >
              {card.title}
            </p>
            <a
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[6px] no-underline hover:opacity-80 transition-opacity"
              onClick={() => {
                posthog.capture("homepage_card_clicked", {
                  card_name: CARD_NAME_MAP[card.linkLabel],
                  source_page: "homepage",
                  device_layout: "tablet",
                  section: "on_orderly",
                });
              }}
            >
              <p
                className="font-['Atyp_BL:Bold',sans-serif] text-[15px] text-white leading-none tracking-[0.15px]"
                style={{ fontFeatureSettings: "'liga' 0" }}
              >
                {card.linkLabel}
              </p>
              <ExternalArrowSm />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 6. Trusted by builders ───────────────────────────────────────────────────

const TRUSTED_DEX_CARDS = [
  {
    name: "WOOFi Pro",
    logo: "/images/logos/woofi.png",
    href: "https://woofi.com/trade",
  },
  {
    name: "Raydium",
    logo: "/images/logos/raydium.png",
    href: "https://raydium.io/swap",
  },
  {
    name: "Quickswap",
    logo: "/images/logos/quickswap.svg",
    href: "https://quickswap.exchange/",
  },
  {
    name: "What.Exchange",
    logo: "/images/logos/whatexchange.png",
    href: "https://www.what.exchange/",
  },
  {
    name: "Kodiak",
    logo: "/images/logos/kodiak.jpg",
    href: "https://perps.kodiak.finance/",
  },
  {
    name: "Aden",
    logo: "/images/logos/aden.png",
    href: "https://aden.finance/",
  },
  { name: "VOOI", logo: "/images/logos/vooi.png", href: "https://vooi.io/" },
  {
    name: "Perptools",
    logo: "/images/logos/perpstool.jpg",
    href: "https://app.perptools.ai/",
  },
] as const;

function TabletTrustedSection() {
  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[10px]">
        <p
          className="font-['Atyp_BL:Display_-_Bold',sans-serif] text-[28px] text-white leading-[1.1]"
          style={{
            fontVariationSettings: "'ital' 0, 'opsz' 72",
            fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'",
          }}
        >
          Trusted by builders you know
        </p>
        <p
          className="font-['Atyp_BL:Medium',sans-serif] text-[14px] text-white leading-[1.4]"
          style={{
            opacity: 0.8,
            fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'",
          }}
        >
          DEXs and protocols powered by the Orderly omnichain infrastructure.
        </p>
      </div>

      {/* DEX grid — 4 columns, 2 rows */}
      <div className="grid grid-cols-2 gap-[12px]">
        {TRUSTED_DEX_CARDS.map((card) => (
          <a
            key={card.name}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[rgba(20,21,26,0.7)] flex items-center gap-[12px] p-[14px] rounded-[8px] no-underline hover:opacity-80 transition-opacity"
          >
            <img
              src={card.logo}
              alt={card.name}
              className="shrink-0 rounded-full object-cover"
              style={{ width: 40, height: 40 }}
            />
            <p
              className="font-['Atyp_BL:Semibold',sans-serif] text-[15px] text-white leading-none"
              style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
            >
              {card.name}
            </p>
          </a>
        ))}
      </div>

      {/* View all */}
      <a
        href="https://dex.orderly.network/board/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-[6px] no-underline hover:opacity-80 transition-opacity self-end"
      >
        <p
          className="font-['Atyp_BL:Bold',sans-serif] text-[16px] text-white leading-none tracking-[0.16px]"
          style={{ fontFeatureSettings: "'liga' 0" }}
        >
          View all
        </p>
        <ExternalArrowSm />
      </a>
    </div>
  );
}

// ─── 7. CTA ──────────────────────────────────────────────────────────────────

/**
 * TabletCTASection — matches desktop "The best time to launch" section.
 * Same copy, same button hierarchy as desktop Frame1 / HeroTextContainer1.
 */
function TabletCTASection({ onPartnership }: { onPartnership: () => void }) {
  return (
    <div className="flex flex-col items-center gap-[32px] text-center px-4">
      <p
        className="font-['Atyp_BL:Display_-_SemiBold',sans-serif] text-[32px] text-white leading-[1.2] uppercase"
        style={{
          fontVariationSettings: "'ital' 0, 'opsz' 72",
          fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'",
        }}
      >
        The best time to launch was yesterday.
      </p>
      <p
        className="font-['Atyp_BL:Display_-_Medium',sans-serif] text-[18px] text-white leading-[1.4]"
        style={{
          fontVariationSettings: "'ital' 0, 'opsz' 72",
          fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'",
        }}
      >
        The second best time is now. Start earning from day one.
      </p>
      <div className="flex flex-wrap gap-[12px] justify-center">
        <a
          href="https://dex.orderly.network/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#6700ce] flex h-[44px] items-center justify-center px-[24px] relative rounded-[24px] no-underline hover:opacity-90 transition-opacity"
          onClick={() => {
            posthog.capture("homepage_cta_clicked", {
              cta_name: "start_building",
              source_page: "homepage",
              device_layout: "tablet",
            });
          }}
        >
          <p
            className="font-['Atyp_BL:Bold',sans-serif] text-[14px] text-white leading-none"
            style={{
              fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
            }}
          >
            Start Building
          </p>
        </a>
        <button
          onClick={() => {
            posthog.capture("homepage_cta_clicked", {
              cta_name: "talk_to_partnerships",
              source_page: "homepage",
              device_layout: "tablet",
            });
            onPartnership();
          }}
          className="flex h-[44px] items-center justify-center pl-[20px] pr-[16px] relative rounded-[24px] hover:bg-white/10 transition-colors bg-transparent border-0 cursor-pointer"
        >
          <div
            aria-hidden
            className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[24px]"
          />
          <p
            className="font-['Atyp_BL:Bold',sans-serif] text-[14px] text-white leading-none"
            style={{
              fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
            }}
          >
            Talk to Partnerships
          </p>
        </button>
      </div>
    </div>
  );
}

// ─── 8. Newsletter ───────────────────────────────────────────────────────────

/**
 * TabletNewsletterSection — same content as desktop Frame12.
 * Stacked layout on tablet (text above, email card below).
 */
function TabletNewsletterSection() {
  const [email, setEmail] = useState("");
  const { status, subscribe, reset } = useNewsletterSubscribe();
  const isSubmitted = status === "success";

  const handleSubmit = useCallback(() => {
    if (email && email.includes("@")) {
      subscribe(email).then(() => {
        setTimeout(() => {
          reset();
          setEmail("");
        }, 3000);
      });
    }
  }, [email, subscribe, reset]);

  return (
    <div className="flex flex-row items-center gap-[24px]">
      {/* Left: text */}
      <div className="flex flex-col justify-center w-[50%] shrink-0">
        <p
          className="font-['Atyp_BL:Semibold',sans-serif] text-[22px] text-white leading-[1.2]"
          style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
        >
          Be the first to hear about launches, token listings, and builder
          updates.
        </p>
      </div>
      {/* Right: purple card */}
      <div className="bg-[#6700ce] rounded-[20px] px-[24px] py-[24px] flex flex-col gap-[14px] flex-1">
        <p
          className="font-['Atyp_BL:Semibold',sans-serif] text-[18px] text-white leading-none"
          style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
        >
          Enter Your Email
        </p>
        <div className="flex items-center h-[48px] rounded-[12px] overflow-hidden">
          <div className="flex-1 h-full bg-[#7800f0] flex items-center px-[14px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="font-['Atyp_BL:Medium',sans-serif] text-[14px] text-white bg-transparent border-0 outline-none w-full placeholder:opacity-70"
              style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
              placeholder="satoshi@orderly.network"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="h-full px-[20px] bg-black border-0 cursor-pointer hover:opacity-80 transition-opacity rounded-[12px] shrink-0"
          >
            <p
              className="font-['Atyp_BL:Bold',sans-serif] text-[14px] text-white leading-none flex items-center justify-center"
              style={{ fontFeatureSettings: "'liga' 0" }}
            >
              {isSubmitted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                "Sign Up"
              )}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 9. Footer ───────────────────────────────────────────────────────────────

const FOOTER_NAV_SECTIONS = [
  {
    heading: "Builders",
    links: [
      { label: "Orderly One", href: "https://dex.orderly.network/" },
      { label: "My DEX", href: "https://dex.orderly.network/dex" },
      {
        label: "Documentation",
        href: "https://orderly.network/docs/introduction/getting-started/what-is-orderly",
      },
      { label: "GitHub", href: "https://github.com/OrderlyNetwork" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Ecosystem",
    links: [
      { label: "Partners", href: "https://orderly.network/partners/" },
      { label: "Listings", href: "https://orderly.network/listing/" },
      {
        label: "Case Studies",
        href: "https://dex.orderly.network/case-studies",
      },
      { label: "Governance", href: "https://snapshot.box/#/s:orderlygov.eth" },
      { label: "Staking", href: "https://app.orderly.network/staking" },
    ],
  },
  {
    heading: "Traders",
    links: [
      { label: "Live DEXs", href: "https://dex.orderly.network/board/" },
      { label: "Dashboard", href: "https://dashboard.orderly.network" },
      { label: "Explorer", href: "https://explorer.orderly.network/" },
      { label: "Vaults", href: "http://app.orderly.network/vaults" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Blog", href: "https://orderly.network/blog/" },
      { label: "Team", href: "https://orderly.network/team/" },
      { label: "FAQ", href: "/faq" },
    ],
  },
] as const;

const FOOTER_SOCIAL = [
  {
    href: "https://discord.com/invite/OrderlyNetwork",
    label: "Discord",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.081.118 18.1.138 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
      </svg>
    ),
  },
  {
    href: "https://t.me/Orderly_Discussions",
    label: "Telegram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/OrderlyNetwork",
    label: "X",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@Orderly.Network",
    label: "YouTube",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/orderly-network",
    label: "LinkedIn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/OrderlyNetwork",
    label: "GitHub",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
] as const;

/**
 * TabletFooter — purple card with 2×2 nav grid + bottom status/social bar.
 * Same visual language as the desktop Footer, adapted for tablet width.
 */
export function TabletFooter() {
  return (
    <div>
      {/* Purple card */}
      <div
        className="rounded-[24px] overflow-hidden mx-8"
        style={{ background: "#6700ce" }}
      >
        {/* ORDER logo + price + Buy ORDER pill */}
        <div className="px-[28px] pt-[28px] inline-block">
          <StatusMessageContainer />
        </div>

        {/* Nav columns — 2×2 grid on tablet */}
        <div className="grid grid-cols-2 gap-x-[28px] gap-y-[28px] p-[28px]">
          {FOOTER_NAV_SECTIONS.map((section) => (
            <div key={section.heading} className="flex flex-col gap-[14px]">
              <p
                className="font-['Atyp_BL:Bold',sans-serif] text-[13px] text-white leading-none tracking-[0.13px]"
                style={{
                  fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'",
                }}
              >
                {section.heading}
              </p>
              <div className="flex flex-col gap-[12px]">
                {section.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="font-['Atyp_BL:Medium',sans-serif] text-[13px] text-[#9c75ff] leading-none tracking-[0.13px] no-underline hover:opacity-80 transition-opacity"
                    style={{
                      fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px mx-[28px]"
          style={{ background: "rgba(255,255,255,0.15)" }}
        />

        {/* Bottom bar: all systems operational + social icons */}
        <div className="flex items-center justify-between px-[28px] py-[20px] flex-wrap gap-[12px]">
          <div
            className="flex items-center gap-[6px] rounded-[63px] px-[12px] py-[8px]"
            style={{ background: "rgba(156,117,255,0.2)" }}
          >
            <div
              className="size-[6px] rounded-full shrink-0"
              style={{ background: "#24AD8F" }}
            />
            <p
              className="font-['Atyp_BL:Semibold',sans-serif] text-[12px] text-white tracking-[0.12px] leading-none"
              style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
            >
              All systems operational.
            </p>
          </div>

          <div className="flex items-center gap-[16px]">
            {FOOTER_SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity flex items-center justify-center"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright row below the card */}
      <div className="flex items-center justify-between px-8 py-[16px] flex-wrap gap-[8px]">
        <p
          style={{
            fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
            fontVariationSettings: "'wght' 600",
            fontSize: 12,
            color: "white",
            letterSpacing: "0.12px",
            margin: 0,
          }}
        >
          © 2026 Orderly Network
        </p>
        <div className="flex gap-[20px]">
          <a
            href="https://orderly.network/docs/introduction/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontSize: 12,
              color: "white",
              letterSpacing: "0.12px",
              textDecoration: "none",
              opacity: 0.8,
            }}
          >
            Terms of Service
          </a>
          <a
            href="https://orderly.network/docs/introduction/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontSize: 12,
              color: "white",
              letterSpacing: "0.12px",
              textDecoration: "none",
              opacity: 0.8,
            }}
          >
            Privacy Policy
          </a>
        </div>
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
  const handleOpenPartnership = useCallback(
    () => setPartnershipModalOpen(true),
    []
  );

  return (
    <div className="w-full bg-black text-white overflow-x-hidden">
      {/* 1. Sticky nav */}
      <TabletNav onMenuClick={handleOpenNav} />

      {/* 2. Hero — background shapes + headline + MacBook + stats */}
      <TabletHero onPartnership={handleOpenPartnership} />

      {/* 3. From zero to live DEX */}
      <div className="px-10 pt-[64px] pb-[64px]">
        <TabletFeaturesSection />
      </div>

      {/* 4. Why Orderly */}
      <div className="px-10 pt-[8px] pb-[64px]">
        <TabletWhySection />
      </div>

      {/* 5. On Orderly / Build */}
      <div className="px-10 pb-[64px]">
        <TabletBuildSection />
      </div>

      {/* 6. Quick Start — reuse exported col layout from desktop */}
      <div className="pb-[64px]">
        <QuickStartSection layout="col" deviceLayout="tablet" />
      </div>

      {/* 7. Trusted by builders */}
      <div className="px-10 pb-[64px]">
        <TabletTrustedSection />
      </div>

      {/* 8. CTA — "The best time to launch was yesterday" */}
      <div className="px-10 pb-[64px]">
        <TabletCTASection onPartnership={handleOpenPartnership} />
      </div>

      {/* 9. Newsletter */}
      <div className="px-10 pb-[32px]">
        <TabletNewsletterSection />
      </div>

      {/* 10. Footer */}
      <div className="pb-[24px]">
        <TabletFooter />
      </div>

      {/* ── Modals ── */}
      {partnershipModalOpen && (
        <PartnershipFormModal onClose={() => setPartnershipModalOpen(false)} />
      )}

      {/* ── Nav drawer (reused from mobile) ── */}
      <AnimatePresence>
        {navOpen && (
          <MobileNavDrawer
            key="tablet-nav"
            onClose={handleCloseNav}
            deviceLayout="tablet"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
