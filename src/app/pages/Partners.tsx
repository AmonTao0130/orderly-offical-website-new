'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavCanvas, SiteFooter } from "../../imports/Frame1618872018";
import { MobileNavDrawer } from "../components/MobileHomePage";
import { MobileAIAccessCard, MobileNewsletterCard, MobileFooterCard } from "../../imports/Frame1618872068-142-633";
import svgPathsMobile from "../../imports/svg-4hybjba00c";

// ─── ScaledSection ────────────────────────────────────────────────────────────
const DESIGN_WIDTH = 1440;

function ScaledSection({
  children,
  designHeight,
  designWidth = DESIGN_WIDTH,
}: {
  children: React.ReactNode;
  designHeight: number;
  designWidth?: number;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const COMFORTABLE_VIEWPORT = 1680;
  const updateScale = useCallback(() => {
    if (!outerRef.current) return;
    const vw = outerRef.current.offsetWidth;
    setScale(Math.min(vw / COMFORTABLE_VIEWPORT, 1));
  }, []);

  useEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [updateScale]);

  return (
    <div
      ref={outerRef}
      style={{
        width: "100%",
        height: `${designHeight * scale}px`,
        overflow: "visible",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: `${designWidth}px`,
          height: `${designHeight}px`,
          flexShrink: 0,
          transformOrigin: "top center",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Mobile Top Bar ──────────────────────────────────────────────────────────
function MobileTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 20px",
        background: "#000",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ width: 28, height: 28, position: "relative" }}>
        <svg style={{ position: "absolute", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 31.9999 31.9608">
          <path clipRule="evenodd" d={svgPathsMobile.p2fe0400} fill="white" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPathsMobile.p2f88ca00} fill="white" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPathsMobile.p22c01780} fill="white" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPathsMobile.p527fe00} fill="white" fillRule="evenodd" />
        </svg>
      </div>
      <button onClick={onMenuClick} style={{ background: "transparent", border: 0, cursor: "pointer", padding: "10px", marginRight: "-10px" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="6" width="16" height="2" rx="1" fill="white" />
          <rect x="4" y="11" width="16" height="2" rx="1" fill="white" />
          <rect x="4" y="16" width="16" height="2" rx="1" fill="white" />
        </svg>
      </button>
    </div>
  );
}

// ─── Viewport hook ────────────────────────────────────────────────────────────
type Viewport = "mobile" | "tablet" | "desktop";

function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>("desktop");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVp(w < 640 ? "mobile" : w < 1080 ? "tablet" : "desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return vp;
}

// ─── Animation variants ───────────────────────────────────────────────────────
const ease = [0.22, 0.61, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const heroChild = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};
const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const gridChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};
const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// ─── Partner data ─────────────────────────────────────────────────────────────
type Category = "All" | "Builder" | "Ecosystem" | "Product";

interface Partner {
  name: string;
  category: Exclude<Category, "All">;
  description: string;
  logo?: string;
  initials: string;
  color: string;
  url: string;
}

const PARTNERS: Partner[] = [
  // ── Builders ──
  {
    name: "WOOFi Pro",
    category: "Builder",
    description: "All the tools you need, in one place. WOOFi Pro offers professional-grade perpetual trading with deep liquidity powered by Orderly's shared orderbook.",
    logo: "logos/woofi.png",
    initials: "WF",
    color: "#1a3a5c",
    url: "https://woofi.com/about/",
  },
  {
    name: "LogX",
    category: "Builder",
    description: "Decentralised exchange for perps trading with aggregated liquidity, giving traders access to deep, CEX-grade depth across every supported chain.",
    logo: "logos/logx.png",
    initials: "LX",
    color: "#0a1f40",
    url: "https://logx.trade/",
  },
  {
    name: "Empyreal",
    category: "Builder",
    description: "Innovative development toolkit bridging the Web3 landscape and traditional developers, making it easier to build next-gen DeFi applications.",
    logo: "logos/empyreal.jpg",
    initials: "EM",
    color: "#1a0a2e",
    url: "https://empyreal.app/",
  },
  {
    name: "BTSE",
    category: "Builder",
    description: "Crypto exchange offering simple, secure and efficient cryptocurrency trading, enhanced by Orderly's institutional-grade liquidity infrastructure.",
    logo: "logos/btse.png",
    initials: "BT",
    color: "#0d2233",
    url: "https://www.btse.com/",
  },
  {
    name: "QuickSwap",
    category: "Builder",
    description: "Next-gen DEX offering lightning-fast trades, near-zero gas fees, and perps with up to 50x leverage — all running on Orderly's shared orderbook.",
    logo: "logos/quickswap.svg",
    initials: "QS",
    color: "#1e1050",
    url: "https://quickswap.exchange/",
  },
  {
    name: "CoolWallet",
    category: "Builder",
    description: "Self-custodial, multi-chain supported wallet with hardware-software integration. Trade directly from your hardware wallet with full Orderly liquidity access.",
    logo: "logos/coolwallet.svg",
    initials: "CW",
    color: "#0a2a1a",
    url: "https://www.coolwallet.io/",
  },
  {
    name: "Kodiak",
    category: "Builder",
    description: "Perpetual futures trading platform on Berachain, powered by Orderly's shared orderbook for deep, bootstrapped liquidity from day one.",
    logo: "logos/kodiak.jpg",
    initials: "KD",
    color: "#1a1200",
    url: "https://perps.kodiak.finance/",
  },
  {
    name: "Perptools",
    category: "Builder",
    description: "AI-powered perpetuals trading interface bringing intelligent order routing and strategy execution on top of Orderly's omnichain infrastructure.",
    logo: "logos/perpstool.jpg",
    initials: "PT",
    color: "#0a1a2e",
    url: "https://app.perptools.ai/",
  },
  {
    name: "Zetarium",
    category: "Builder",
    description: "A next-generation decentralised exchange delivering high-performance perp trading on ZetaChain, backed by Orderly's shared liquidity layer.",
    logo: "logos/Zetarium.jpg",
    initials: "ZT",
    color: "#0a1a1a",
    url: "https://www.zdex.world/",
  },
  {
    name: "Aden",
    category: "Builder",
    description: "Fully featured DeFi trading platform with a focus on user experience and institutional-grade execution, built on top of Orderly's orderbook infrastructure.",
    logo: "logos/aden.png",
    initials: "AD",
    color: "#1a0a36",
    url: "https://aden.finance/",
  },
  {
    name: "Raydium",
    category: "Builder",
    description: "The leading Solana AMM and DEX powering DeFi with concentrated liquidity, farms, and perps — connected to Orderly's shared orderbook on Solana.",
    logo: "logos/raydium.png",
    initials: "RY",
    color: "#1a0a4a",
    url: "https://raydium.io/swap",
  },
  {
    name: "What.Exchange",
    category: "Builder",
    description: "A clean, fast perpetuals trading interface with advanced order types and portfolio tools, built on Orderly's omnichain liquidity network.",
    logo: "logos/whatexchange.png",
    initials: "WX",
    color: "#0d2033",
    url: "https://www.what.exchange/",
  },
  {
    name: "VOOI",
    category: "Builder",
    description: "Cross-chain perp DEX aggregator that routes orders to the deepest available liquidity — including Orderly's shared orderbook across 17+ chains.",
    logo: "logos/vooi.png",
    initials: "VO",
    color: "#052e32",
    url: "https://vooi.io/",
  },

  // ── Ecosystem ──
  {
    name: "Optimism",
    category: "Ecosystem",
    description: "Leading Ethereum L2 powering Orderly's innovative settlement layer via OP Stack. Fast, cheap, and fully EVM-compatible — the backbone of Orderly's settlement.",
    logo: "logos/optimism.svg",
    initials: "OP",
    color: "#3a0a0a",
    url: "https://www.optimism.io/",
  },
  {
    name: "Arbitrum",
    category: "Ecosystem",
    description: "The leading L2 technology empowering builders to explore the largest L1 ecosystem — Ethereum. Orderly brings deep perp liquidity natively to Arbitrum.",
    logo: "logos/arbitrum.svg",
    initials: "AB",
    color: "#0a1a2e",
    url: "https://arbitrum.io/",
  },
  {
    name: "BASE",
    category: "Ecosystem",
    description: "Secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain. Orderly DEXes on Base benefit from shared orderbook liquidity.",
    logo: "logos/base.png",
    initials: "BS",
    color: "#0a0a3a",
    url: "https://base.org/",
  },
  {
    name: "Polygon",
    category: "Ecosystem",
    description: "The value layer of the internet that allows anyone to create and exchange value, powered by zero-knowledge technology. Orderly is live on Polygon.",
    logo: "logos/polygon.svg",
    initials: "PL",
    color: "#2a0a4a",
    url: "https://polygon.technology/",
  },
  {
    name: "Solana",
    category: "Ecosystem",
    description: "High-performance blockchain with sub-second finality and ultra-low fees. Orderly's shared orderbook is fully integrated on Solana, giving builders native access.",
    logo: "logos/solana.svg",
    initials: "SOL",
    color: "#0a1a2e",
    url: "https://solana.com/",
  },
  {
    name: "Near",
    category: "Ecosystem",
    description: "The blockchain platform for simplifying open web development. Orderly's omnichain infrastructure extends full orderbook access to the NEAR ecosystem.",
    logo: "logos/near.svg",
    initials: "NR",
    color: "#0a1a0a",
    url: "https://near.org/",
  },
  {
    name: "Mantle",
    category: "Ecosystem",
    description: "High-performance Ethereum L2 with modular architecture and a large ecosystem fund. Orderly brings institutional perp liquidity natively to Mantle.",
    logo: "logos/mantle.svg",
    initials: "MT",
    color: "#0a1a1a",
    url: "https://www.mantle.xyz/",
  },

  // ── Product ──
  {
    name: "LayerZero",
    category: "Product",
    description: "Omnichain interoperability protocol designed for lightweight message passing across chains. LayerZero powers the cross-chain messaging that underpins Orderly's omnichain design.",
    logo: "logos/layerzero.svg",
    initials: "LZ",
    color: "#10111a",
    url: "https://layerzero.network/",
  },
  {
    name: "Elixir",
    category: "Product",
    description: "High-throughput DPoS consensus network that enables anyone to supply liquidity to orderbooks. Elixir deepens Orderly's shared liquidity pool for all builders.",
    logo: "logos/elixir.png",
    initials: "EL",
    color: "#1a0636",
    url: "https://www.elixir.xyz/",
  },
  {
    name: "Pyth",
    category: "Product",
    description: "Real-time financial data oracle network delivering high-fidelity price feeds on-chain. Orderly uses Pyth to power accurate, tamper-proof price discovery across all its markets.",
    logo: "logos/pyth.svg",
    initials: "PY",
    color: "#1a0a1a",
    url: "https://pyth.network/",
  },
  {
    name: "Wormhole",
    category: "Product",
    description: "Generic message passing protocol connecting 30+ blockchains. Wormhole's cross-chain bridging infrastructure supports secure asset movement across Orderly's omnichain network.",
    logo: "logos/wormhole.png",
    initials: "WH",
    color: "#1a0a2e",
    url: "https://wormhole.com/",
  },
];

const CATEGORIES: Category[] = ["All", "Builder", "Ecosystem", "Product"];

const CATEGORY_COLORS: Record<Exclude<Category, "All">, string> = {
  Builder:   "#6700CE",
  Ecosystem: "#1e4a2e",
  Product:   "#0a2a4a",
};

const STATS = [
  { label: "Traders",            value: "895K+" },
  { label: "Ecosystem partners", value: "32+" },
  { label: "Supported chains",   value: "17+" },
];

// ─── Arrow icon ───────────────────────────────────────────────────────────────
function ArrowUpRight({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2.5 11.5L11.5 2.5M7 2.5h4.5V7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Partner Card ─────────────────────────────────────────────────────────────
function PartnerCard({ partner, isMobile }: { partner: Partner; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        background: hovered ? "rgba(103,0,206,0.18)" : "rgba(20,21,26,0.75)",
        border: `1px solid ${hovered ? "rgba(156,117,255,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "20px",
        padding: isMobile ? "24px 20px" : "28px 24px",
        textDecoration: "none",
        transition: "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        height: "100%",
        boxSizing: "border-box",
        cursor: "pointer",
      }}
    >
      {/* Top row: logo + name + category */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        {/* Logo */}
        <div
          style={{
            width: isMobile ? 48 : 56,
            height: isMobile ? 48 : 56,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: partner.logo ? "transparent" : partner.color,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {partner.logo ? (
            <img
              src={`/images/${partner.logo}`}
              alt={partner.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: "'wght' 700",
                fontSize: partner.initials.length > 2 ? "12px" : "14px",
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "0.04em",
              }}
            >
              {partner.initials}
            </span>
          )}
        </div>

        {/* Name + category */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 700",
              fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
              fontSize: isMobile ? "16px" : "18px",
              color: "white",
              margin: "0 0 6px",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {partner.name}
          </p>
          <span
            style={{
              display: "inline-block",
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 500",
              fontSize: "11px",
              color: partner.category === "Builder" ? "#9c75ff" : partner.category === "Ecosystem" ? "#4ade80" : "#60b8ff",
              background: partner.category === "Builder" ? "rgba(103,0,206,0.25)" : partner.category === "Ecosystem" ? "rgba(22,101,52,0.35)" : "rgba(10,42,74,0.5)",
              border: `1px solid ${partner.category === "Builder" ? "rgba(156,117,255,0.3)" : partner.category === "Ecosystem" ? "rgba(74,222,128,0.25)" : "rgba(96,184,255,0.25)"}`,
              borderRadius: "100px",
              padding: "3px 10px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {partner.category}
          </span>
        </div>

      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
          fontVariationSettings: "'wght' 400",
          fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1",
          fontSize: isMobile ? "13px" : "14px",
          color: "rgba(255,255,255,0.65)",
          margin: 0,
          lineHeight: 1.65,
          flex: 1,
        }}
      >
        {partner.description}
      </p>

      {/* Visit link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
          fontVariationSettings: "'wght' 600",
          fontSize: "13px",
          color: hovered ? "#9c75ff" : "rgba(255,255,255,0.4)",
          transition: "color 0.2s ease",
          letterSpacing: "0.02em",
        }}
      >
        Visit
        <ArrowUpRight size={12} color={hovered ? "#9c75ff" : "rgba(255,255,255,0.4)"} />
      </div>
    </a>
  );
}

// ─── Pagination constants ──────────────────────────────────────────────────────
const CARDS_PER_PAGE = 12;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Partners() {
  const vp = useViewport();
  const isMobile = vp === "mobile";
  const isTablet = vp === "tablet";
  const [navOpen, setNavOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = activeCategory === "All"
    ? PARTNERS
    : PARTNERS.filter((p) => p.category === activeCategory);

  const pageCount = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const paginatedPartners = filtered.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  return (
    <div style={{ background: "#000", minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>

      {/* ── Nav ── */}
      {isMobile || isTablet ? (
        <MobileTopBar onMenuClick={() => setNavOpen(true)} />
      ) : (
        <ScaledSection designHeight={200}>
          <NavCanvas />
        </ScaledSection>
      )}

      {/* ── Hero ── */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: isMobile ? "52px 20px 48px" : isTablet ? "60px 40px 56px" : "80px 24px 72px",
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <motion.h1
          variants={heroChild}
          style={{
            fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
            fontVariationSettings: "'wght' 700",
            fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
            fontSize: isMobile ? "38px" : isTablet ? "56px" : "80px",
            color: "white",
            margin: "0 0 24px",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
          }}
        >
          Explore Orderly's<br />Unified Ecosystem
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={heroChild}
          style={{
            fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
            fontVariationSettings: "'wght' 400",
            fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
            fontSize: isMobile ? "16px" : "22px",
            color: "rgba(255,255,255,0.6)",
            margin: "0 auto",
            lineHeight: 1.55,
            maxWidth: "600px",
          }}
        >
          An expansive ecosystem, featuring CEXs, DEXs, aggregators, wallets,
          and more, all powered by Orderly's permissionless liquidity layer.
        </motion.p>
      </motion.div>

      {/* ── Stats ── */}
      <motion.div
        variants={reveal}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: isMobile ? "calc(100% - 40px)" : isTablet ? "calc(100% - 80px)" : "min(1000px, 87%)",
          margin: "0 auto",
          marginBottom: isMobile ? "48px" : "64px",
        }}
      >
        <div
          style={{
            background: "#6700CE",
            borderRadius: "30px",
            padding: isMobile ? "32px 24px" : "44px 64px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? "32px" : "0",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: !isMobile && i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
              }}
            >
              <p
                style={{
                  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                  fontVariationSettings: "'wght' 700",
                  fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
                  fontSize: isMobile ? "42px" : "56px",
                  color: "white",
                  margin: "0 0 8px",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                  fontVariationSettings: "'wght' 400",
                  fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1",
                  fontSize: isMobile ? "14px" : "18px",
                  color: "rgba(255,255,255,0.7)",
                  margin: 0,
                  letterSpacing: "0.01em",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Filter tabs ── */}
      <div
        style={{
          maxWidth: isMobile ? "calc(100% - 40px)" : isTablet ? "calc(100% - 80px)" : "min(1100px, 87%)",
          margin: "0 auto",
          marginBottom: isMobile ? "28px" : "40px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {CATEGORIES.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: active ? "'wght' 600" : "'wght' 400",
                fontSize: isMobile ? "13px" : "15px",
                padding: isMobile ? "9px 20px" : "11px 28px",
                borderRadius: "100px",
                border: active ? "1.5px solid #6700CE" : "1.5px solid rgba(255,255,255,0.15)",
                background: active ? "#6700CE" : "transparent",
                color: active ? "white" : "rgba(255,255,255,0.65)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}
            >
              {cat}
              {cat !== "All" && (
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "11px",
                    opacity: 0.75,
                  }}
                >
                  {PARTNERS.filter((p) => p.category === cat).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Partner grid ── */}
      <motion.div
        key={`${activeCategory}-${currentPage}`}
        variants={gridContainer}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: isMobile ? "calc(100% - 40px)" : isTablet ? "calc(100% - 80px)" : "min(1100px, 87%)",
          margin: "0 auto",
          marginBottom: isMobile ? "32px" : "48px",
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
            ? "repeat(2, 1fr)"
            : "repeat(3, 1fr)",
          gap: isMobile ? "16px" : "20px",
          alignItems: "stretch",
        }}
      >
        {paginatedPartners.map((partner) => (
          <motion.div
            key={partner.name}
            variants={gridChild}
            style={{ display: "flex" }}
          >
            <PartnerCard partner={partner} isMobile={isMobile} />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Pagination ── */}
      {pageCount > 1 && (
        <div
          style={{
            maxWidth: isMobile ? "calc(100% - 40px)" : isTablet ? "calc(100% - 80px)" : "min(1100px, 87%)",
            margin: "0 auto",
            marginBottom: isMobile ? "64px" : "96px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {/* Prev */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: isMobile ? "36px" : "40px",
              height: isMobile ? "36px" : "40px",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.15)",
              background: "transparent",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.3 : 1,
              transition: "all 0.2s ease",
              color: "white",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Page numbers */}
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: isMobile ? "36px" : "40px",
                  height: isMobile ? "36px" : "40px",
                  borderRadius: "50%",
                  border: isActive ? "1.5px solid #6700CE" : "1.5px solid rgba(255,255,255,0.15)",
                  background: isActive ? "#6700CE" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                  fontVariationSettings: isActive ? "'wght' 700" : "'wght' 400",
                  fontSize: isMobile ? "13px" : "15px",
                  color: "white",
                }}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: isMobile ? "36px" : "40px",
              height: isMobile ? "36px" : "40px",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.15)",
              background: "transparent",
              cursor: currentPage === pageCount ? "not-allowed" : "pointer",
              opacity: currentPage === pageCount ? 0.3 : 1,
              transition: "all 0.2s ease",
              color: "white",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Footer ── */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {isMobile ? (
          <div
            style={{
              padding: "0 20px 32px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <MobileFooterCard />
          </div>
        ) : isTablet ? (
          <div
            style={{
              padding: "0 40px 40px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <MobileFooterCard />
          </div>
        ) : (
          <ScaledSection designWidth={1440} designHeight={900}>
            <SiteFooter />
          </ScaledSection>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {navOpen && <MobileNavDrawer onClose={() => setNavOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
