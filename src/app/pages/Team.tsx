"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MorphingHeader, SiteFooter } from "../../imports/DesktopHomePage";
import { MobileNavDrawer } from "../components/MobileHomePage";
import { MobileFooterCard } from "../../imports/Frame1618872068-142-633";
import { TabletNav, TabletFooter } from "../components/TabletHomePage";
import svgPathsMobile from "../../imports/svg-4hybjba00c";

// ── Viewport hook ─────────────────────────────────────────────────────────────
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

// ── Mobile Top Bar ────────────────────────────────────────────────────────────
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

// ── Animation variants ────────────────────────────────────────────────────────
const smoothEase = [0.22, 0.61, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const heroChild = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: smoothEase } },
};

const revealOnScroll = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: smoothEase } },
};

const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const gridItem = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: smoothEase } },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const FOUNDERS = [
  {
    name: "Ran Yi",
    title: "Co-Founder",
    initials: "RY",
    avatar: "/images/Ran yi.png",
    xUrl: "https://x.com/ranyi_orderly",
    bio: "Building the infrastructure layer for the next generation of decentralized finance.",
  },
  {
    name: "Terence Ng",
    title: "Co-Founder",
    initials: "TN",
    avatar: "/images/Terence.png",
    xUrl: "https://x.com/terence_orderly",
    bio: "FinTech Enthusiast.\nEquity Derivative Trading, OMS, FIX Protocol, Market Making, Quant Trading, Crypto Platform.",
  },
];

const INVESTORS = [
  { name: "Pantera", img: "/images/investors/Pantera_White.png" },
  { name: "Sequoia Capital", img: "/images/investors/Sequoia Capital_White.png" },
  { name: "Dragonfly Capital", img: "/images/investors/Dragonfly_White.png" },
  { name: "Jump", img: "/images/investors/jump_White.png" },
  { name: "GSR", img: "/images/investors/GSR_White.png" },
  { name: "OKX Ventures", img: "/images/investors/okx ventures.png" },
  { name: "Laser Digital", img: "/images/investors/Laser_White.png" },
  { name: "Crypto.com Capital", img: "/images/investors/crypto.com_White.png" },
  { name: "Primitive", img: "/images/investors/Primitive_White.png" },
  { name: "SevenX", img: "/images/investors/SevenX_White.png" },
  { name: "CoinDCX", img: "/images/investors/CoinDCX_White.png" },
  { name: "Kronos", img: "/images/investors/kronos_White.png" },
  { name: "Raydium", img: "/images/investors/Raydium_White.png" },
  { name: "Amber", img: "/images/investors/Amber_White.png" },
  { name: "AG Build", img: "/images/investors/AGBuild_White.png" },
  { name: "Cobo Ventures", img: "/images/investors/cobo_White.png" },
  { name: "Gate Ventures", img: "/images/investors/Gate_White.png" },
  { name: "Mirana", img: "/images/investors/Mirana_White.png" },
  { name: "Puzzle Ventures", img: "/images/investors/Puzzle_White.png" },
  { name: "IOSG", img: "/images/investors/IOSG_White.png" },
  { name: "WOO", img: "/images/investors/WOOFi_White.png", scale: 0.75 },
  { name: "Subzero", img: "/images/investors/Subzero_White.png" },
  { name: "DI Ventures", img: "/images/investors/DI_White.png" },
  { name: "Newman", img: "/images/investors/Newman_White.png", scale: 1.3 },
];

// ── X (Twitter) icon ──────────────────────────────────────────────────────────
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.622 5.905-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ── Founder Card ──────────────────────────────────────────────────────────────
function FounderCard({
  founder,
  vp,
}: {
  founder: (typeof FOUNDERS)[0];
  vp: Viewport;
}) {
  const isMobile = vp === "mobile";

  return (
    <motion.div
      variants={gridItem}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? "14px" : "18px",
        textAlign: "center",
      }}
    >
      {/* Avatar */}
      <img
        src={founder.avatar}
        alt={founder.name}
        style={{
          width: isMobile ? 120 : 148,
          height: isMobile ? 120 : 148,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      {/* Name + title */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span
          style={{
            fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
            fontVariationSettings: "'wght' 700",
            fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
            fontSize: isMobile ? "22px" : "26px",
            color: "white",
            letterSpacing: "0.01em",
          }}
        >
          {founder.name}
        </span>
        <span
          style={{
            fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
            fontVariationSettings: "'wght' 500",
            fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
            fontSize: isMobile ? "12px" : "13px",
            color: "#9c75ff",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {founder.title}
        </span>
      </div>

      {/* Bio */}
      <p
        style={{
          fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
          fontVariationSettings: "'wght' 400",
          fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
          fontSize: isMobile ? "14px" : "15px",
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.65,
          margin: 0,
          letterSpacing: "0.02em",
          maxWidth: "280px",
          whiteSpace: "pre-line",
        }}
      >
        {founder.bio}
      </p>

      {/* X follow button */}
      <a
        href={founder.xUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          border: "1.5px solid rgba(255,255,255,0.18)",
          borderRadius: "100px",
          padding: "10px 22px",
          color: "rgba(255,255,255,0.7)",
          textDecoration: "none",
          fontSize: "13px",
          fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
          fontVariationSettings: "'wght' 500",
          letterSpacing: "0.03em",
          transition: "border-color 0.2s ease, color 0.2s ease",
          marginTop: "4px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(156,117,255,0.7)";
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
          e.currentTarget.style.color = "rgba(255,255,255,0.7)";
        }}
      >
        Follow on
        <XIcon size={14} />
      </a>
    </motion.div>
  );
}

// ── Investor Logo ────────────────────────────────────────────────────────────
function InvestorBadge({ name, img, vp, scale = 1 }: { name: string; img: string; vp: Viewport; scale?: number }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = vp === "mobile";

  return (
    <motion.div
      variants={gridItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "8px 12px" : "10px 16px",
      }}
    >
      <img
        src={img}
        alt={name}
        style={{
          maxHeight: (isMobile ? 24 : 28) * scale,
          maxWidth: (isMobile ? 100 : 130) * scale,
          objectFit: "contain",
          opacity: hovered ? 1 : 0.55,
          transition: "opacity 0.25s ease",
          display: "block",
        }}
      />
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Team() {
  const vp = useViewport();
  const isMobile = vp === "mobile";
  const isTablet = vp === "tablet";
  const [navOpen, setNavOpen] = useState(false);

  const px = isMobile ? "20px" : isTablet ? "32px" : "24px";
  const maxW = "900px";

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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MorphingHeader />
        </div>
      )}

      {/* ── Hero ── */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: maxW,
          margin: "0 auto",
          padding: isMobile ? "48px 20px 56px" : isTablet ? "56px 32px 72px" : "72px 24px 96px",
          textAlign: "center",
        }}
      >
        <motion.h1
          variants={heroChild}
          style={{
            fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
            fontVariationSettings: "'wght' 700, 'opsz' 72",
            fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
            fontSize: isMobile ? "36px" : isTablet ? "52px" : "clamp(52px,6vw,80px)",
            color: "white",
            letterSpacing: "0.01em",
            lineHeight: 1.05,
            margin: `0 0 ${isMobile ? "20px" : "28px"}`,
          }}
        >
          The Visionaries
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #9c75ff 0%, #6700ce 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Behind Orderly
          </span>
        </motion.h1>


      </motion.div>

      {/* ── Mission strip ── */}
      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          maxWidth: maxW,
          margin: "0 auto",
          padding: `0 ${px} ${isMobile ? "56px" : "80px"}`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 700",
              fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
              fontSize: isMobile ? "28px" : "clamp(32px,4vw,48px)",
              color: "white",
              margin: `0 0 ${isMobile ? "20px" : "28px"}`,
              letterSpacing: "0.01em",
              lineHeight: 1.1,
            }}
          >
            Who We Are
          </h2>

          <p
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 400",
              fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
              fontSize: isMobile ? "15px" : "17px",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              margin: "0 auto",
              letterSpacing: "0.02em",
              maxWidth: "720px",
            }}
          >
            Orderly Network provides the shared orderbook infrastructure that powers the next
            generation of decentralized exchanges. By concentrating liquidity across chains and
            protocols, we solve the liquidity paradox — giving every DEX access to deep,
            institutional-grade order flow across 17+ blockchains simultaneously.
          </p>
        </div>
      </motion.div>

      {/* ── Founders section ── */}
      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          maxWidth: maxW,
          margin: "0 auto",
          padding: `0 ${px} ${isMobile ? "56px" : "80px"}`,
        }}
      >
        {/* Section heading */}
        <div style={{ marginBottom: isMobile ? "28px" : "40px", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 700",
              fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
              fontSize: isMobile ? "28px" : "clamp(32px,4vw,48px)",
              color: "white",
              margin: 0,
              letterSpacing: "0.01em",
              lineHeight: 1.1,
            }}
          >
            Meet the Co-Founders
          </h2>
        </div>

        {/* Founders grid */}
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "40px" : "64px",
          }}
        >
          {FOUNDERS.map((founder) => (
            <FounderCard key={founder.name} founder={founder} vp={vp} />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Backed By section ── */}
      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: `0 ${px} ${isMobile ? "56px" : "80px"}`,
        }}
      >
        {/* Section heading */}
        <div style={{ marginBottom: isMobile ? "28px" : "40px", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 700",
              fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
              fontSize: isMobile ? "28px" : "clamp(32px,4vw,48px)",
              color: "white",
              margin: "0 0 12px",
              letterSpacing: "0.01em",
              lineHeight: 1.1,
            }}
          >
            Backed By the Best
          </h2>
          <p
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 400",
              fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
              fontSize: isMobile ? "14px" : "16px",
              color: "rgba(255,255,255,0.45)",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            25+ world-class investors backing Orderly's vision
          </p>
        </div>

        {/* Investors grid */}
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: isMobile ? "8px" : "12px",
            justifyContent: "center",
          }}
        >
          {INVESTORS.map(({ name, img, scale }) => (
            <InvestorBadge key={name} name={name} img={img} vp={vp} scale={scale} />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Join us CTA ── */}
      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        style={{
          maxWidth: maxW,
          margin: `0 auto ${isMobile ? "64px" : "80px"}`,
          padding: `0 ${px}`,
        }}
      >
        <div
          style={{
            background: "#3F0086",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: isMobile ? "16px" : "20px",
            padding: isMobile ? "36px 24px" : isTablet ? "44px 40px" : "56px 64px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isMobile ? "16px" : "20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
        
          <h2
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 700",
              fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
              fontSize: isMobile ? "26px" : "clamp(30px,4vw,44px)",
              color: "white",
              margin: 0,
              letterSpacing: "0.01em",
              lineHeight: 1.15,
            }}
          >
            Join the Team
          </h2>

          <p
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 400",
              fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
              fontSize: isMobile ? "14px" : "16px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
              maxWidth: "640px",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            We're always looking for exceptional people who want to shape the future
            of decentralized finance. Explore open roles.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "12px",
              marginTop: "8px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <a
              href="https://job-boards.greenhouse.io/orderly"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "#9C75FF",
                borderRadius: "100px",
                padding: "13px 28px",
                color: "white",
                textDecoration: "none",
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: "'wght' 600",
                fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
                fontSize: "15px",
                letterSpacing: "0.02em",
                width: isMobile ? "100%" : "auto",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#b08fff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#9C75FF")}
            >
              View Open Roles
            </a>

            <a
              href="https://x.com/OrderlyNetwork"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "1.5px solid rgba(255,255,255,0.2)",
                borderRadius: "100px",
                padding: "13px 28px",
                color: "white",
                textDecoration: "none",
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: "'wght' 600",
                fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
                fontSize: "15px",
                letterSpacing: "0.02em",
                width: isMobile ? "100%" : "auto",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              <XIcon size={15} />
              Follow Us
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Footer ── */}
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

      {/* ── Mobile nav drawer ── */}
      <AnimatePresence mode="wait">
        {navOpen && <MobileNavDrawer onClose={() => setNavOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
