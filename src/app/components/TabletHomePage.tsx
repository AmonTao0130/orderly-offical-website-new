'use client';

import { useState, useCallback } from "react";
import DeveloperCard from "../../imports/Group1597879965";
import { MobileFooterCard, MobileAIAccessCard } from "../../imports/Frame1618872068-142-633";
import { useNewsletterSubscribe } from "../hooks/useNewsletterSubscribe";
import { BuyOrderModal, PartnershipFormModal } from "../../imports/Frame1618872018";
import { useOrderlyStats, formatLargeNumber } from "../hooks/useOrderlyStats";
import { AnimatedNumber } from "./AnimatedNumber";
import svgPathsMobile from "../../imports/svg-4hybjba00c";

// ── Font helper ───────────────────────────────────────────────────────────────
function af(wght: number, extra?: React.CSSProperties): React.CSSProperties {
  return {
    fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
    fontVariationSettings: `'wght' ${wght}`,
    fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
    ...extra,
  };
}

// ── Section wrapper: consistent horizontal padding + bottom spacing ───────────
const SP: React.CSSProperties = { padding: "0 32px 64px" };

// ── TopBar ────────────────────────────────────────────────────────────────────
function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 28px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Orderly brandmark */}
      <div style={{ width: 32, height: 32, position: "relative", flexShrink: 0 }}>
        <svg
          style={{ position: "absolute", width: "100%", height: "100%" }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 31.9999 31.9608"
        >
          <path clipRule="evenodd" d={svgPathsMobile.p2fe0400}  fill="white" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPathsMobile.p2f88ca00} fill="white" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPathsMobile.p22c01780} fill="white" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPathsMobile.p527fe00}  fill="white" fillRule="evenodd" />
        </svg>
      </div>

      {/* Right side: Launch CTA + Hamburger */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <a
          href="https://dex.orderly.network/dex/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...af(700),
            display: "inline-flex",
            alignItems: "center",
            height: "38px",
            padding: "0 20px",
            borderRadius: "19px",
            background: "white",
            color: "#3f0086",
            textDecoration: "none",
            fontSize: "14px",
            letterSpacing: "0.01em",
            transition: "opacity 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          Launch Now
        </a>

        {/* Hamburger */}
        <button
          onClick={onMenuClick}
          style={{
            background: "transparent",
            border: 0,
            cursor: "pointer",
            padding: "8px",
            margin: "0 -8px 0 0",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Open navigation"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="6"  width="16" height="2" rx="1" fill="white" />
            <rect x="4" y="11" width="16" height="2" rx="1" fill="white" />
            <rect x="4" y="16" width="16" height="2" rx="1" fill="white" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: "28px",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2
          style={{
            ...af(700, { fontVariationSettings: "'wght' 700,'opsz' 72" }),
            fontSize: "clamp(24px, 3.5vw, 38px)",
            margin: "0 0 10px",
            lineHeight: 1.1,
            color: "white",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ ...af(400), fontSize: "15px", color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.5 }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

// ── How it works — 3 steps ────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Connect",
    desc: "Plug into Orderly's shared orderbook via SDK or white-label (Orderly One).",
  },
  {
    step: "2",
    title: "Customize",
    desc: "Brand it, set fees, choose your chain. Your exchange, your rules.",
  },
  {
    step: "3",
    title: "Earn",
    desc: "Every trade on your frontend = revenue to you. Day one.",
  },
];

// ── Why Orderly cards ─────────────────────────────────────────────────────────
const WHY_CARDS = [
  {
    title: "Deep Shared Liquidity",
    desc: "One orderbook powers every builder. Your users get CEX-grade depth from day one — no bootstrapping needed.",
    bg: "#3f0086",
    img: "/images/deep-liquidity.png",
  },
  {
    title: "Omnichain by Default",
    desc: "Live on Ethereum, Arbitrum, Base, Solana, and 14+ more. One integration, every chain.",
    bg: "#6700ce",
    img: "/images/omnichain-by-default.png",
  },
  {
    title: "You own the economics",
    desc: "Set your own fees. Keep your revenue. No rev-share traps.",
    bg: "#3f0086",
    img: "/images/you-own-the-economics.png",
  },
  {
    title: "Ship Fast",
    desc: "White-label DEX in minutes. SDK: full custom integration in days.",
    bg: "#6700ce",
    img: "/images/ship-fast.png",
  },
  {
    title: "Self Custody",
    desc: "User funds stay on-chain. No counterparty risk. Sleep at night.",
    bg: "#3f0086",
    img: "/images/self-custody.png",
  },
  {
    title: "Battle-Tested",
    desc: "$30B+ cumulative volume. Multiple audits. 1M+ users across the ecosystem.",
    bg: "#6700ce",
    img: "/images/battle-tested.png",
  },
];

// ── What you can build cards ──────────────────────────────────────────────────
const BUILD_CARDS = [
  {
    title: "Launch a branded Perp DEX",
    link: "Orderly One",
    href: "https://dex.orderly.network/",
    bg: "#3f0086",
  },
  {
    title: "Add perps to your dApp or wallet",
    link: "SDK & API",
    href: "https://orderly.network/docs/build-on-omnichain/evm-api/introduction",
    bg: "#6700ce",
  },
  {
    title: "List your token",
    link: "Listings",
    href: "https://orderly.network/listing/",
    bg: "#3f0086",
  },
  {
    title: "Building trading tools",
    link: "Start Building",
    href: "https://dex.orderly.network/",
    bg: "#6700ce",
  },
];

// ── Newsletter section ────────────────────────────────────────────────────────
function TabletNewsletterSection() {
  const [email, setEmail] = useState("");
  const { status, subscribe } = useNewsletterSubscribe();
  const sent = status === "success";

  return (
    <div
      style={{
        padding: "0 32px 64px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        alignItems: "center",
      }}
    >
      {/* Left: descriptive text */}
      <p
        style={{
          ...af(700, { fontVariationSettings: "'wght' 700,'opsz' 72" }),
          fontSize: "clamp(20px, 2.8vw, 28px)",
          color: "white",
          lineHeight: 1.35,
          margin: 0,
        }}
      >
        Be the first to hear about launches, token listings, and builder updates.
      </p>

      {/* Right: purple email card */}
      <div
        style={{
          background: "#6700ce",
          borderRadius: "20px",
          padding: "24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <p style={{ ...af(700), fontSize: "16px", color: "white", margin: 0 }}>
          Enter Your Email
        </p>

        {sent ? (
          <p style={{ ...af(500), fontSize: "15px", color: "rgba(255,255,255,0.85)", margin: 0 }}>
            ✓ You're subscribed!
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(0,0,0,0.3)",
              borderRadius: "12px",
              overflow: "hidden",
              gap: "0",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") subscribe(email); }}
              placeholder="satoshi@orderly.network"
              style={{
                flex: 1,
                background: "transparent",
                border: 0,
                outline: "none",
                padding: "14px 16px",
                color: "white",
                fontSize: "15px",
                ...af(400),
                minWidth: 0,
              }}
            />
            <button
              onClick={() => subscribe(email)}
              disabled={status === "loading"}
              style={{
                ...af(700),
                background: "black",
                color: "white",
                border: 0,
                borderRadius: "10px",
                padding: "12px 20px",
                margin: "4px",
                fontSize: "14px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
                opacity: status === "loading" ? 0.6 : 1,
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Trusted DEX list ──────────────────────────────────────────────────────────
const TRUSTED_DEXES: {
  name: string;
  logo: string | null;
  initials?: string;
  url: string;
  bg: string;
  textColor?: string;
}[] = [
  { name: "WOOFi Pro",     logo: "/images/logos/woofi.png",        url: "https://woofi.com/about/",       bg: "#00a9de" },
  { name: "Raydium",       logo: "/images/logos/raydium.png",      url: "https://raydium.io/swap",        bg: "#131A35" },
  { name: "Quickswap",     logo: "/images/logos/quickswap.svg",    url: "https://quickswap.exchange/",    bg: "#ffffff" },
  { name: "LogX",          logo: "/images/logos/logx.png",         url: "https://logx.network/",          bg: "#eda320" },
  { name: "What.Exchange", logo: "/images/logos/whatexchange.png", url: "https://www.what.exchange/",     bg: "#1e2026" },
  { name: "VOOI",          logo: "/images/logos/vooi.png",         url: "https://vooi.io/",               bg: "#000000" },
  { name: "Aden",          logo: "/images/logos/aden.png",         url: "https://aden.finance/",          bg: "#ffffff" },
  { name: "Kyrrio",        logo: null, initials: "KY",             url: "https://kyrr.io/",               bg: "#ffffff", textColor: "#000" },
];

function TrustedDexCard({ dex }: { dex: (typeof TRUSTED_DEXES)[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={dex.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        background: hovered ? "rgba(103,0,206,0.15)" : "rgba(20,21,26,0.75)",
        border: `1px solid ${hovered ? "rgba(156,117,255,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px",
        padding: "16px 20px",
        textDecoration: "none",
        transition: "background 0.2s, border-color 0.2s, transform 0.2s",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "14px",
          overflow: "hidden",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: dex.bg,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {dex.logo ? (
          <img src={dex.logo} alt={dex.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ ...af(700), fontSize: "14px", color: dex.textColor ?? "white" }}>
            {dex.initials}
          </span>
        )}
      </div>
      <p style={{ ...af(600), fontSize: "17px", color: "white", margin: 0 }}>{dex.name}</p>
    </a>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TabletHomePage({ onMenuClick }: { onMenuClick: () => void }) {
  const [partnershipOpen, setPartnershipOpen] = useState(false);
  const [buyOrderOpen,    setBuyOrderOpen]    = useState(false);

  const stats = useOrderlyStats();
  const fmtVol      = useCallback((v: number) => formatLargeNumber(v),  []);
  const fmtBuilders = useCallback((v: number) => `${Math.round(v)}+`,   []);
  const fmtChains   = useCallback((v: number) => `${Math.round(v)}+`,   []);

  const STAT_ROWS = [
    { label: "TVL",           node: <AnimatedNumber value={stats.tvl}          format={fmtVol}      /> },
    { label: "24h Volume",    node: <AnimatedNumber value={stats.tradingVolume} format={fmtVol}      /> },
    { label: "Live Builders", node: <AnimatedNumber value={stats.liveBuilders}  format={fmtBuilders} /> },
    { label: "Chains",        node: <AnimatedNumber value={stats.chains}        format={fmtChains}   /> },
  ];

  return (
    <div style={{ background: "#000", color: "white", minHeight: "100vh" }}>
      <TopBar onMenuClick={onMenuClick} />

      {/* ──────────────────────────────────────────────────────────────────────
          HERO
      ────────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "80px 32px 72px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Purple radial glow behind the headline */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            maxWidth: "700px",
            height: "400px",
            background: "radial-gradient(ellipse at 50% 30%, rgba(103,0,206,0.4) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />

        <h1
          style={{
            ...af(700, { fontVariationSettings: "'wght' 700,'opsz' 72", letterSpacing: "-0.02em" }),
            fontSize: "clamp(44px, 7vw, 72px)",
            lineHeight: 1.0,
            textTransform: "uppercase",
            margin: "0 0 22px",
            position: "relative",
          }}
        >
          Launch your
          <br />
          own perp DEX
        </h1>

        <p
          style={{
            ...af(400),
            fontSize: "clamp(15px, 2.1vw, 20px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.65)",
            maxWidth: "560px",
            margin: "0 auto 40px",
            position: "relative",
          }}
        >
          Launch a perpetuals DEX on any chain — with shared liquidity, zero
          infra cost, and fees that go to you.
        </p>

        <div
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <a
            href="https://dex.orderly.network/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...af(700),
              display: "inline-flex",
              alignItems: "center",
              height: "52px",
              padding: "0 32px",
              borderRadius: "26px",
              background: "#6700ce",
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
              transition: "opacity 0.2s",
            }}
          >
            Start Building
          </a>
          <button
            onClick={() => setPartnershipOpen(true)}
            style={{
              ...af(700),
              display: "inline-flex",
              alignItems: "center",
              height: "52px",
              padding: "0 32px",
              borderRadius: "26px",
              background: "transparent",
              color: "white",
              border: "1.5px solid rgba(255,255,255,0.6)",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
          >
            Talk to Partnerships
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          STATS — 2 × 2 purple grid
      ────────────────────────────────────────────────────────────────────── */}
      <div style={SP}>
        <div
          style={{
            background: "#6700ce",
            borderRadius: "24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {STAT_ROWS.map((s, i) => (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                padding: "40px 16px",
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none",
                borderRight:  i % 2 === 0 ? "1px solid rgba(255,255,255,0.15)" : "none",
              }}
            >
              <p
                style={{
                  ...af(700, { fontVariationSettings: "'wght' 700,'opsz' 72" }),
                  fontSize: "clamp(30px, 4.5vw, 50px)",
                  margin: "0 0 8px",
                  lineHeight: 1,
                }}
              >
                {s.node}
              </p>
              <p
                style={{
                  ...af(400),
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.65)",
                  margin: 0,
                  letterSpacing: "0.01em",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          HOW IT WORKS — 3 equal columns (Connect / Customize / Earn)
      ────────────────────────────────────────────────────────────────────── */}
      <div style={SP}>
        <SectionHeading title="From zero to live DEX in one integration" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "20px",
                padding: "36px 24px",
                background: "rgba(63,0,134,0.12)",
                border: "1px solid rgba(156,117,255,0.16)",
                borderRadius: "24px",
              }}
            >
              {/* Step number badge */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "16px",
                  background: "#6700ce",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ ...af(600), fontSize: "26px", color: "white", lineHeight: 1 }}>
                  {item.step}
                </span>
              </div>

              <div>
                <p
                  style={{
                    ...af(700, { fontVariationSettings: "'wght' 700,'opsz' 72" }),
                    fontSize: "clamp(22px, 2.8vw, 30px)",
                    color: "white",
                    margin: "0 0 10px",
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    ...af(400),
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          WHY ORDERLY — 2-column grid, 6 feature cards with illustrations
      ────────────────────────────────────────────────────────────────────── */}
      <div style={SP}>
        <SectionHeading
          title="Why Orderly?"
          subtitle="The infrastructure layer for permissionless perpetuals."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {WHY_CARDS.map((card) => (
            <div
              key={card.title}
              style={{
                background: card.bg,
                borderRadius: "24px",
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h3
                style={{
                  ...af(600),
                  fontSize: "clamp(17px, 2.3vw, 24px)",
                  color: "white",
                  margin: 0,
                  lineHeight: 1.2,
                  position: "relative",
                  zIndex: 1,
                  maxWidth: "70%",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  ...af(400),
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.55,
                  margin: 0,
                  position: "relative",
                  zIndex: 1,
                  maxWidth: "80%",
                }}
              >
                {card.desc}
              </p>
              {/* Decorative illustration — bottom-right, softly faded */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "45%",
                  height: "75%",
                  backgroundImage: `url(${card.img})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom right",
                  opacity: 0.55,
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          WHAT YOU CAN BUILD — 2-column grid, 4 action cards
      ────────────────────────────────────────────────────────────────────── */}
      <div style={SP}>
        <SectionHeading
          title="What you can build"
          subtitle="One integration. Endless possibilities."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {BUILD_CARDS.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: card.bg,
                borderRadius: "24px",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "180px",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              <h3
                style={{
                  ...af(600),
                  fontSize: "clamp(18px, 2.5vw, 26px)",
                  color: "white",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {card.title}
              </h3>

              {/* CTA row */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "20px" }}>
                <span style={{ ...af(700), fontSize: "15px", color: "white" }}>
                  {card.link}
                </span>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 11.5l9-9M6.5 2.5h5v5"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          AGENTIC QUICK START
      ────────────────────────────────────────────────────────────────────── */}
      <div style={SP}>
        <SectionHeading
          title="Quick Start"
          subtitle="Install the Orderly MCP Server in seconds."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {/* Both cards share identical outer container treatment */}
          <div
            style={{
              background: "#1e2026",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DeveloperCard variant="bare" />
          </div>
          <div
            style={{
              background: "#1e2026",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <MobileAIAccessCard />
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          TRUSTED BY BUILDERS — 2-column logo grid
      ────────────────────────────────────────────────────────────────────── */}
      <div style={SP}>
        <SectionHeading
          title="Trusted by builders you know"
          subtitle="DEXs and protocols powered by the Orderly omnichain infrastructure."
          action={
            <a
              href="https://dex.orderly.network/board/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...af(700),
                fontSize: "15px",
                color: "white",
                textDecoration: "none",
                opacity: 0.65,
                flexShrink: 0,
                transition: "opacity 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              View all →
            </a>
          }
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {TRUSTED_DEXES.map((dex) => (
            <TrustedDexCard key={dex.name} dex={dex} />
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          NEWSLETTER
      ────────────────────────────────────────────────────────────────────── */}
      <TabletNewsletterSection />

      {/* ──────────────────────────────────────────────────────────────────────
          FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <div style={{ padding: "0 32px 48px" }}>
        <MobileFooterCard />
      </div>

      {/* ── Modals ── */}
      {partnershipOpen && (
        <PartnershipFormModal onClose={() => setPartnershipOpen(false)} />
      )}
      {buyOrderOpen && (
        <BuyOrderModal onClose={() => setBuyOrderOpen(false)} />
      )}
    </div>
  );
}
