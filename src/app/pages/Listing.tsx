"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MorphingHeader, SiteFooter } from "../../imports/DesktopHomePage";
import { MobileNavDrawer } from "../components/MobileHomePage";
import { MobileFooterCard } from "../../imports/Frame1618872068-142-633";
import { TabletNav, TabletFooter } from "../components/TabletHomePage";
import svgPathsMobile from "../../imports/svg-4hybjba00c";

// ── Shared font style shorthand ───────────────────────────────────────────────
const FONT: React.CSSProperties = {
  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
  fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
};

// ── Mobile Top Bar ─────────────────────────────────────────────────────────────
function MobileTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
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
      <a href="/" style={{ display: "block", width: 32, height: 32, position: "relative" }}>
        <svg
          style={{ position: "absolute", width: "100%", height: "100%" }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 31.9999 31.9608"
        >
          <path clipRule="evenodd" d={svgPathsMobile.p2fe0400} fill="white" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPathsMobile.p2f88ca00} fill="white" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPathsMobile.p22c01780} fill="white" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPathsMobile.p527fe00} fill="white" fillRule="evenodd" />
        </svg>
      </a>
      <button
        onClick={onMenuClick}
        style={{ background: "transparent", border: 0, cursor: "pointer", padding: "4px" }}
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

// ── Viewport hook ──────────────────────────────────────────────────────────────
type Viewport = "mobile" | "tablet" | "desktop";

function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>("desktop");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVp(w < 600 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return vp;
}

// ── Animation variants ─────────────────────────────────────────────────────────
const smoothEase = [0.22, 0.61, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const heroChild = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
};

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const gridChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
};

const revealOnScroll = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: smoothEase } },
};

// ── Data ───────────────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    label: "Revenue",
    title: "Direct market economics",
    body: "Earn 50% fee revenue + 100% liquidation from the volume your listed markets generate.",
  },
  {
    label: "Speed",
    title: "Launch without listing bottlenecks",
    body: "List any token with a valid price feed, without waiting in a centralized manual review queue.",
  },
  {
    label: "Control",
    title: "Full market configuration control",
    body: "Set market parameters, choose index pricing sources, and manage market maker account setup.",
  },
  {
    label: "Coverage",
    title: "Long-tail + selected RWA support",
    body: "Support differentiated markets with session-aware configuration and custom pricing sources.",
  },
  {
    label: "Scale",
    title: "Scaleable listing",
    body: "Launch multiple markets in parallel as long as price feeds are available.",
  },
  {
    label: "Risk Isolation",
    title: "Builder-level market isolation",
    body: "Dedicated per-builder Insurance Fund and Isolated Margin for Community Listed markets help contain risk by market.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Become eligible",
    body: "During the promotion window (until June 6), Permissionless Listing is open to all builders. Outside this window, eligibility follows Builder Staking Program tier requirements.",
    note: null,
  },
  {
    n: "02",
    title: "Configure your market",
    body: "Set symbol details, parameters, and index pricing sources (CEX, platform oracle, or custom oracle).",
    note: null,
  },
  {
    n: "03",
    title: "Set launch time",
    body: "Schedule market go-live through the Builder dashboard.",
    note: null,
  },
  {
    n: "04",
    title: "Build liquidity and activate",
    body: "Markets begin in POST_ONLY. Once ±2% depth reaches $50K on both sides for 10 minutes, the market transitions to ACTIVE automatically.",
    note: "Market maker account binding is supported as part of the operating workflow.",
  },
];

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const LISTING_FAQS: FAQItem[] = [
  {
    question: "Who can use Permissionless Listing?",
    answer:
      "During the promotion window (until June 6), it is open to all builders. After the promotion, eligibility follows Builder Staking Program tier rules.",
  },
  {
    question: "What do I need to list a market?",
    answer: "A $50,000 USDT Insurance Fund deposit and a valid price oracle/price feed.",
  },
  {
    question: "Is the $50K a fee?",
    answer:
      "No. It is a deposit. It can be withdrawn when the market is delisted and all obligations are settled.",
  },
  {
    question: "Need to fund the $50K Insurance Fund?",
    answer: (
      <>
        Use Permissionless Vault to raise and structure capital, then deploy it to support your
        market listing.{" "}
        <a
          href="https://orderly.network/docs/introduction/trade-on-orderly/permissionless-vault"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#9c75ff", textDecoration: "underline" }}
        >
          Learn more about Permissionless Vault
        </a>
        .
      </>
    ),
  },
  {
    question: "Can I use my own oracle source?",
    answer: (
      <>
        Yes. You can use platform/CEX sources or custom oracle sources, depending on your market
        setup.{" "}
        <a
          href="https://orderly.network/docs/introduction/trade-on-orderly/custom-oracle"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#9c75ff", textDecoration: "underline" }}
        >
          Learn more about custom oracle
        </a>
        .
      </>
    ),
  },
  {
    question: "How does a market move from POST_ONLY to ACTIVE?",
    answer:
      "The market starts in POST_ONLY and auto-transitions to ACTIVE when ±2% depth sustains $50K per side for 10 minutes.",
  },
  {
    question: "How is risk contained?",
    answer:
      "Community Listed markets use builder-level isolation, including dedicated per-builder Insurance Fund, Isolated Margin model, and per-market controls (including reduce-only and delisting under unhealthy conditions).",
  },
  {
    question: "Is Orderly operating these markets?",
    answer:
      "Community Listed markets are created and operated by individual builders. Orderly does not vet, operate, or backstop these markets.",
  },
];

// ── Accordion item ─────────────────────────────────────────────────────────────
function AccordionItem({ item, vp }: { item: FAQItem; vp: Viewport }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isMobile = vp === "mobile";
  const isTablet = vp === "tablet";

  return (
    <div style={{ background: "#1a1a1f", borderRadius: isMobile ? "10px" : "12px", overflow: "hidden" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "16px 18px" : isTablet ? "20px 24px" : "24px 28px",
          background: open ? "#1a1a1f" : hovered ? "#7b1de6" : "#6700ce",
          border: "none",
          cursor: "pointer",
          gap: "12px",
          textAlign: "left",
          transition: "background 0.2s ease",
        }}
      >
        <span
          style={{
            ...FONT,
            fontVariationSettings: "'wght' 500",
            fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px",
            color: "white",
            letterSpacing: "0.02em",
            lineHeight: 1.3,
            flex: 1,
          }}
        >
          {item.question}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "rgba(255,255,255,0.5)",
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg width={isMobile ? "16" : "20"} height={isMobile ? "16" : "20"} viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            style={{
              ...FONT,
              fontVariationSettings: "'wght' 300",
              fontSize: isMobile ? "14px" : "16px",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.6,
              padding: isMobile ? "0 18px 20px" : isTablet ? "0 24px 24px" : "0 28px 28px",
              margin: 0,
              letterSpacing: "0.025em",
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── CTA buttons ────────────────────────────────────────────────────────────────
function CTAButtons({ isMobile, primaryColor = "#6700ce" }: { isMobile: boolean; primaryColor?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "10px" : "12px",
        width: isMobile ? "100%" : "auto",
        justifyContent: "center",
      }}
    >
      <a
        href="https://admin.orderly.network/permissionless-listing"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          background: primaryColor,
          borderRadius: "100px",
          padding: "14px 28px",
          color: "white",
          textDecoration: "none",
          ...FONT,
          fontVariationSettings: "'wght' 600",
          fontSize: "15px",
          letterSpacing: "0.02em",
          width: isMobile ? "100%" : "auto",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Launch your market
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 11.5L11.5 2.5M7 2.5h4.5V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <a
        href="https://orderly.network/docs/introduction/trade-on-orderly/permissionless-listing"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          border: "1.5px solid rgba(255,255,255,0.6)",
          borderRadius: "100px",
          padding: "14px 28px",
          color: "white",
          textDecoration: "none",
          ...FONT,
          fontVariationSettings: "'wght' 600",
          fontSize: "15px",
          letterSpacing: "0.02em",
          width: isMobile ? "100%" : "auto",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "white")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")}
      >
        Read full docs
      </a>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Listing() {
  const vp = useViewport();
  const isMobile = vp === "mobile";
  const isTablet = vp === "tablet";
  const [navOpen, setNavOpen] = useState(false);

  const px = isMobile ? "20px" : isTablet ? "32px" : "24px";
  const maxW = "1100px";

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        paddingTop: isMobile ? "64px" : isTablet ? 0 : "80px",
      }}
    >
      {/* ── Nav ── */}
      {isMobile ? (
        <MobileTopBar onMenuClick={() => setNavOpen(true)} />
      ) : isTablet ? (
        <TabletNav onMenuClick={() => setNavOpen(true)} />
      ) : (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", justifyContent: "center" }}>
          <MorphingHeader />
        </div>
      )}

      {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
      <motion.div variants={heroContainer} initial="hidden" animate="visible">
        <div
          style={{
            maxWidth: maxW,
            margin: "0 auto",
            padding: isMobile ? "48px 20px 56px" : isTablet ? "56px 32px 72px" : "72px 24px 96px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isMobile ? "20px" : "24px",
          }}
        >
          {/* Eyebrow */}
          <motion.div variants={heroChild}>
            <span
              style={{
                display: "inline-block",
                background: "#6700ce",
                borderRadius: "100px",
                padding: "6px 14px",
                ...FONT,
                fontVariationSettings: "'wght' 600",
                fontSize: "12px",
                color: "white",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Permissionless Listing
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={heroChild}
            style={{
              ...FONT,
              fontVariationSettings: "'wght' 700",
              fontSize: isMobile ? "32px" : "60px",
              color: "white",
              letterSpacing: "0.01em",
              lineHeight: 1.08,
              margin: 0,
              maxWidth: "820px",
            }}
          >
            Permissionless listing for perpetual markets.
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={heroChild}
            style={{
              ...FONT,
              fontVariationSettings: "'wght' 400",
              fontSize: isMobile ? "14px" : "16px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.6,
              maxWidth: "580px",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            If it has a price feed, it can be traded. Launch and operate markets on Orderly's matching and liquidation infrastructure without waiting for centralized approval processes.
          </motion.p>

          {/* Promo badge */}
          <motion.div variants={heroChild}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(68,222,211,0.3)",
                borderRadius: "100px",
                padding: "7px 14px",
                ...FONT,
                fontVariationSettings: "'wght' 500",
                fontSize: "13px",
                color: "rgba(255,255,255,0.8)",
                letterSpacing: "0.02em",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#44DED3",
                  flexShrink: 0,
                  boxShadow: "0 0 6px #44DED3",
                }}
              />
              Open to all builders until June 6.
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={heroChild}>
            <CTAButtons isMobile={isMobile} />
          </motion.div>
        </div>
      </motion.div>

      {/* ══ BENEFITS GRID ═══════════════════════════════════════════════════════ */}
      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div
          style={{
            maxWidth: maxW,
            margin: "0 auto",
            padding: isMobile ? "0 20px 80px" : isTablet ? "0 32px 96px" : "0 24px 120px",
          }}
        >
          <motion.div
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "12px" : "14px",
            }}
          >
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                variants={gridChild}
                style={{
                  background: i % 2 === 0 ? "#3f0086" : "#6700ce",
                  borderRadius: "24px",
                  padding: isMobile ? "24px" : "28px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    alignSelf: "flex-start",
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: "100px",
                    padding: "4px 12px",
                    ...FONT,
                    fontVariationSettings: "'wght' 600",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.85)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {b.label}
                </span>
                <p
                  style={{
                    ...FONT,
                    fontVariationSettings: "'wght' 600",
                    fontSize: isMobile ? "17px" : "18px",
                    color: "white",
                    margin: 0,
                    lineHeight: 1.35,
                    letterSpacing: "0.01em",
                  }}
                >
                  {b.title}
                </p>
                <p
                  style={{
                    ...FONT,
                    fontVariationSettings: "'wght' 400",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                    lineHeight: 1.6,
                    letterSpacing: "0.02em",
                  }}
                >
                  {b.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ══ REQUIREMENTS ════════════════════════════════════════════════════════ */}
      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: isMobile ? "0 20px 80px" : isTablet ? "0 32px 96px" : "0 24px 120px",
          }}
        >
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "48px" }}>
            <h2
              style={{
                ...FONT,
                fontVariationSettings: "'wght' 700",
                fontSize: isMobile ? "26px" : "clamp(28px,3.5vw,42px)",
                color: "white",
                margin: "0 0 14px",
                letterSpacing: "0.01em",
                lineHeight: 1.15,
              }}
            >
              Simple requirements during promotion
            </h2>
            <p
              style={{
                ...FONT,
                fontVariationSettings: "'wght' 400",
                fontSize: "14px",
                color: "rgba(255,255,255,0.45)",
                margin: "0 0 4px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Until June 6
            </p>
            <p
              style={{
                ...FONT,
                fontVariationSettings: "'wght' 400",
                fontSize: isMobile ? "15px" : "17px",
                color: "rgba(255,255,255,0.65)",
                margin: 0,
                lineHeight: 1.5,
                marginTop: "12px",
              }}
            >
              You can create a market with just two requirements:
            </p>
          </div>

          {/* Requirement pills */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "12px",
              marginBottom: isMobile ? "24px" : "32px",
            }}
          >
            {[
              { n: "1", text: "$50,000 USDT Insurance Fund" },
              { n: "2", text: "A valid price oracle / price feed" },
            ].map((r) => (
              <div
                key={r.n}
                style={{
                  background: "#1a1a1f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: isMobile ? "20px 20px" : "24px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#6700ce",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    ...FONT,
                    fontVariationSettings: "'wght' 700",
                    fontSize: "16px",
                    color: "white",
                  }}
                >
                  {r.n}
                </span>
                <span
                  style={{
                    ...FONT,
                    fontVariationSettings: "'wght' 600",
                    fontSize: isMobile ? "15px" : "17px",
                    color: "white",
                    letterSpacing: "0.01em",
                    lineHeight: 1.4,
                  }}
                >
                  {r.text}
                </span>
              </div>
            ))}
          </div>

          {/* Info callouts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              {
                title: "Why the $50K Insurance Fund is required",
                body: "It acts as a risk buffer to absorb potential liquidation shortfalls and help keep market conditions healthy under stress.",
              },
              {
                title: "Important: this is not a payment",
                body: "The $50K is a deposit, not a fee. When a market is delisted and all obligations are settled, the deposit can be withdrawn.",
              },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  background: "#1e2026",
                  borderRadius: "14px",
                  borderLeft: "3px solid #6700ce",
                  padding: isMobile ? "16px 18px" : "20px 24px",
                }}
              >
                <p
                  style={{
                    ...FONT,
                    fontVariationSettings: "'wght' 600",
                    fontSize: "15px",
                    color: "white",
                    margin: "0 0 6px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {c.title}
                </p>
                <p
                  style={{
                    ...FONT,
                    fontVariationSettings: "'wght' 400",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    margin: 0,
                    lineHeight: 1.6,
                    letterSpacing: "0.02em",
                  }}
                >
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ══ HOW IT WORKS ════════════════════════════════════════════════════════ */}
      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: isMobile ? "0 20px 80px" : isTablet ? "0 32px 96px" : "0 24px 120px",
          }}
        >
          {/* Section header */}
          <h2
            style={{
              ...FONT,
              fontVariationSettings: "'wght' 700",
              fontSize: isMobile ? "26px" : "clamp(28px,3.5vw,42px)",
              color: "white",
              margin: "0 0 48px",
              textAlign: "center",
              letterSpacing: "0.01em",
              lineHeight: 1.15,
            }}
          >
            How it works
          </h2>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {STEPS.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: isMobile ? "16px" : "24px",
                  position: "relative",
                }}
              >
                {/* Left: number + connecting line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div
                    style={{
                      width: isMobile ? "40px" : "48px",
                      height: isMobile ? "40px" : "48px",
                      borderRadius: "50%",
                      background: "#6700ce",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      ...FONT,
                      fontVariationSettings: "'wght' 700",
                      fontSize: isMobile ? "14px" : "16px",
                      color: "white",
                      letterSpacing: "0.04em",
                      flexShrink: 0,
                    }}
                  >
                    {step.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        minHeight: "32px",
                        background: "rgba(103,0,206,0.3)",
                        margin: "8px 0",
                      }}
                    />
                  )}
                </div>

                {/* Right: content */}
                <div
                  style={{
                    paddingBottom: i < STEPS.length - 1 ? (isMobile ? "32px" : "40px") : 0,
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      ...FONT,
                      fontVariationSettings: "'wght' 600",
                      fontSize: isMobile ? "18px" : "20px",
                      color: "white",
                      margin: isMobile ? "8px 0 10px" : "10px 0 12px",
                      letterSpacing: "0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      ...FONT,
                      fontVariationSettings: "'wght' 400",
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.7)",
                      margin: 0,
                      lineHeight: 1.6,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {step.body}
                  </p>
                  {step.note && (
                    <p
                      style={{
                        ...FONT,
                        fontVariationSettings: "'wght' 400",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.45)",
                        background: "#1a1a1f",
                        borderRadius: "10px",
                        padding: "10px 14px",
                        margin: "14px 0 0",
                        lineHeight: 1.55,
                        letterSpacing: "0.02em",
                      }}
                    >
                      * {step.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ══ FAQ ACCORDION ═══════════════════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: isMobile ? "0 20px 80px" : isTablet ? "0 32px 96px" : "0 24px 120px",
        }}
      >
        <h2
          style={{
            ...FONT,
            fontVariationSettings: "'wght' 700",
            fontSize: isMobile ? "26px" : "clamp(28px,3.5vw,42px)",
            color: "white",
            margin: "0 0 40px",
            textAlign: "center",
            letterSpacing: "0.01em",
            lineHeight: 1.15,
          }}
        >
          Frequently asked questions
        </h2>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ display: "flex", flexDirection: "column", gap: isMobile ? "12px" : "16px" }}
        >
          {LISTING_FAQS.map((item, i) => (
            <motion.div key={i} variants={gridChild}>
              <AccordionItem item={item} vp={vp} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ══ CTA STRIP ═══════════════════════════════════════════════════════════ */}
      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div
          style={{
            maxWidth: maxW,
            margin: "0 auto",
            padding: isMobile ? "0 20px 64px" : isTablet ? "0 32px 80px" : "0 24px 96px",
          }}
        >
          <div
            style={{
              background: "#3f0086",
              border: "none",
              borderRadius: isMobile ? "20px" : "28px",
              padding: isMobile ? "40px 24px" : isTablet ? "56px 40px" : "64px 56px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: isMobile ? "16px" : "20px",
            }}
          >
            <h2
              style={{
                ...FONT,
                fontVariationSettings: "'wght' 700",
                fontSize: isMobile ? "26px" : "clamp(28px,3.5vw,42px)",
                color: "white",
                margin: 0,
                letterSpacing: "0.01em",
                lineHeight: 1.1,
              }}
            >
              Launch your market now
            </h2>
            <p
              style={{
                ...FONT,
                fontVariationSettings: "'wght' 400",
                fontSize: isMobile ? "14px" : "17px",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "520px",
                margin: 0,
                lineHeight: 1.55,
                letterSpacing: "0.02em",
              }}
            >
              If you have a price feed, you can start building a perpetual market business on Orderly today.
            </p>
            <div style={{ marginTop: "4px" }}>
              <CTAButtons isMobile={isMobile} primaryColor="#9c75ff" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ══ FOOTER DISCLAIMER ═══════════════════════════════════════════════════ */}
      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: isMobile ? "0 20px 32px" : "0 24px 40px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              ...FONT,
              fontVariationSettings: "'wght' 400",
              fontSize: "13px",
              color: "rgba(255,255,255,0.35)",
              margin: 0,
              lineHeight: 1.6,
              letterSpacing: "0.02em",
            }}
          >
            Community Listed markets are created and operated by individual builders. Orderly does not vet, operate, or backstop these markets.
          </p>
        </div>
      </motion.div>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════════ */}
      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {isMobile ? (
          <div style={{ padding: "0 20px 32px", boxSizing: "border-box", width: "100%" }}>
            <MobileFooterCard />
          </div>
        ) : isTablet ? (
          <div className="pb-[24px]">
            <TabletFooter />
          </div>
        ) : (
          <div style={{ zoom: 0.85 }}>
            <SiteFooter />
          </div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {navOpen && <MobileNavDrawer onClose={() => setNavOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
