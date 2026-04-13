"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MorphingHeader, SiteFooter } from "../../imports/DesktopHomePage";
import { MobileNavDrawer } from "../components/MobileHomePage";
import { MobileFooterCard } from "../../imports/Frame1618872068-142-633";
import { TabletNav, TabletFooter } from "../components/TabletHomePage";
import svgPathsMobile from "../../imports/svg-4hybjba00c";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  type BlogPost,
  type BlogCategory,
} from "../shared/blog";

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
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
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

// ── Category pill ─────────────────────────────────────────────────────────────
function CategoryPill({
  label,
  active,
  onClick,
  isMobile,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        padding: isMobile ? "7px 14px" : "8px 18px",
        borderRadius: "100px",
        border: active ? "1.5px solid #6700ce" : "1.5px solid rgba(255,255,255,0.18)",
        background: active ? "#6700ce" : hovered ? "rgba(255,255,255,0.06)" : "transparent",
        color: active ? "white" : "rgba(255,255,255,0.6)",
        fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
        fontVariationSettings: "'wght' 500",
        fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
        fontSize: isMobile ? "13px" : "14px",
        letterSpacing: "0.02em",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

// ── Post card ─────────────────────────────────────────────────────────────────
function PostCard({ post, vp }: { post: BlogPost; vp: Viewport }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = vp === "mobile";

  return (
    <a
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#111114",
        borderRadius: "16px",
        overflow: "hidden",
        border: hovered
          ? "1px solid rgba(103,0,206,0.5)"
          : "1px solid rgba(255,255,255,0.07)",
        textDecoration: "none",
        transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(103,0,206,0.2)" : "none",
        cursor: "pointer",
      }}
    >
      {/* Cover image */}
      <div
        style={{
          width: "100%",
          paddingTop: "56.25%", // 16:9
          position: "relative",
          background: "#1a1a1f",
          flexShrink: 0,
        }}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, #1a0040 0%, #0d0020 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity={0.3}>
              <rect x="8" y="10" width="32" height="4" rx="2" fill="white" />
              <rect x="8" y="20" width="24" height="4" rx="2" fill="white" />
              <rect x="8" y="30" width="28" height="4" rx="2" fill="white" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: isMobile ? "16px" : "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: 1,
        }}
      >
        {/* Category + date row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span
            style={{
              background: "rgba(103,0,206,0.25)",
              color: "#b47dff",
              padding: "3px 10px",
              borderRadius: "6px",
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 500",
              fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {post.category}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono','dm-mono',monospace",
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.02em",
            }}
          >
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
            fontVariationSettings: "'wght' 600",
            fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
            fontSize: isMobile ? "17px" : "19px",
            color: "white",
            margin: 0,
            lineHeight: 1.35,
            letterSpacing: "0.01em",
          }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
            fontVariationSettings: "'wght' 300",
            fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
            margin: 0,
            lineHeight: 1.55,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "4px",
          }}
        >
          <span
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 400",
              fontSize: "12px",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.02em",
            }}
          >
            {post.readTime} min read
          </span>
          <span
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 500",
              fontSize: "13px",
              color: hovered ? "#9c75ff" : "rgba(255,255,255,0.5)",
              letterSpacing: "0.02em",
              transition: "color 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Read more
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6h8M6 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Featured carousel ─────────────────────────────────────────────────────────
function FeaturedCarousel({ posts, vp }: { posts: BlogPost[]; vp: Viewport }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const isMobile = vp === "mobile";
  const isTablet = vp === "tablet";
  const isDesktop = vp === "desktop";
  const n = posts.length;

  // Auto-advance
  useEffect(() => {
    if (paused || n <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, n]);

  const go = (dir: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i + dir + n) % n);
  };

  const post = posts[idx];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Slide */}
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "0" : "12px" }}>
        {/* Left arrow */}
        {isDesktop && n > 1 && (
          <button
            onClick={(e) => go(-1, e)}
            style={{
              flexShrink: 0,
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
              transition: "background 0.2s ease",
              marginLeft: "-28px",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(103,0,206,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)")}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
        <AnimatePresence mode="wait">
          <motion.a
            key={post.slug}
            href={`/blog/${post.slug}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              alignItems: isDesktop ? "flex-start" : undefined,
              gap: isDesktop ? "28px" : "0",
              textDecoration: "none",
            }}
          >
            {/* Image — 16:9, fixed width on wide screens */}
            {/* Outer wrapper: sets aspect ratio, arrows position relative to this */}
            <div
              style={{
                flexShrink: 0,
                width: isDesktop ? "48%" : "100%",
                paddingTop: isDesktop ? "27%" : "56.25%",
                position: "relative",
              }}
            >
              {/* Inner: border-radius + overflow clip for the image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                {/* Featured tag overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    zIndex: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(8px)",
                    color: "rgba(255,255,255,0.85)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                    fontVariationSettings: "'wght' 500",
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1l1.3 2.6L10 4.1 8 6.1l.5 2.9L6 7.6 3.5 9l.5-2.9-2-2 2.7-.5L6 1z" fill="currentColor" />
                  </svg>
                  Featured
                </div>
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, #1a0040 0%, #0d0020 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="64" height="64" viewBox="0 0 48 48" fill="none" opacity={0.2}>
                      <rect x="8" y="10" width="32" height="4" rx="2" fill="white" />
                      <rect x="8" y="20" width="24" height="4" rx="2" fill="white" />
                      <rect x="8" y="30" width="28" height="4" rx="2" fill="white" />
                    </svg>
                  </div>
                )}
              </div>

            </div>

            {/* Content */}
            <div
              style={{
                flex: 1,
                padding: isDesktop ? "4px 0" : "16px 0 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span
                  style={{
                    background: "rgba(103,0,206,0.25)",
                    color: "#b47dff",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                    fontVariationSettings: "'wght' 500",
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {post.category}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono','dm-mono',monospace",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {post.date}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                  fontVariationSettings: "'wght' 700",
                  fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
                  fontSize: isMobile ? "18px" : isTablet ? "22px" : "clamp(18px, 1.8vw, 26px)",
                  color: "white",
                  margin: 0,
                  lineHeight: 1.25,
                  letterSpacing: "0.01em",
                }}
              >
                {post.title}
              </h2>

              <p
                style={{
                  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                  fontVariationSettings: "'wght' 300",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                  lineHeight: 1.55,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: isMobile ? 2 : 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.excerpt}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "4px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                    fontVariationSettings: "'wght' 600",
                    fontSize: "13px",
                    color: "white",
                    letterSpacing: "0.03em",
                    padding: "8px 18px",
                    borderRadius: "999px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.5)",
                  }}
                >
                  Read article
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 11.5L11.5 2.5M7 2.5h4.5V7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  style={{
                    fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                    fontVariationSettings: "'wght' 400",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </motion.a>
        </AnimatePresence>
        </div>

        {/* Right arrow */}
        {isDesktop && n > 1 && (
          <button
            onClick={(e) => go(1, e)}
            style={{
              flexShrink: 0,
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
              transition: "background 0.2s ease",
              marginRight: "-28px",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(103,0,206,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)")}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom controls: dots + counter */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "14px",
          padding: "0 2px",
        }}
      >
        {/* Dot indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === idx ? "#6700ce" : "rgba(255,255,255,0.18)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.3s ease, background 0.3s ease",
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Mobile arrows */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {!isDesktop && n > 1 && (
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={(e) => go(-1, e)}
                style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white", display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={(e) => go(1, e)}
                style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white", display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Blog() {
  const vp = useViewport();
  const isMobile = vp === "mobile";
  const isTablet = vp === "tablet";
  const [navOpen, setNavOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");
  const [gridPage, setGridPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const CAROUSEL_COUNT = 4;
  const GRID_PER_PAGE = 6;

  const q = searchQuery.trim().toLowerCase();
  const isSearching = q.length > 0;

  // When searching, flatten all posts and match against title + excerpt + category
  const searchResults = isSearching
    ? BLOG_POSTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    : [];

  const carouselPosts = !isSearching ? BLOG_POSTS.slice(0, CAROUSEL_COUNT) : [];
  const allGridPosts = isSearching
    ? searchResults
    : activeCategory === "All"
    ? BLOG_POSTS.slice(CAROUSEL_COUNT)
    : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const gridPageCount = Math.ceil(allGridPosts.length / GRID_PER_PAGE);
  const gridPosts = allGridPosts.slice((gridPage - 1) * GRID_PER_PAGE, gridPage * GRID_PER_PAGE);

  const maxW = "1200px";

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
          padding: isMobile
            ? "48px 16px 40px"
            : isTablet
            ? "56px 32px 48px"
            : "72px 40px 64px",
        }}
      >
        <motion.h1
          variants={heroChild}
          style={{
            fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
            fontVariationSettings: "'wght' 700",
            fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
            fontSize: isMobile ? "40px" : "clamp(48px,6vw,60px)",
            color: "#ffffff",
            letterSpacing: "0.01em",
            lineHeight: 1.15,
            margin: "0 0 20px",
            textAlign: "center",
          }}
        >
          Blog
        </motion.h1>
        <motion.p
          variants={heroChild}
          style={{
            fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
            fontVariationSettings: "'wght' 400",
            fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
            fontSize: isMobile ? "15px" : "17px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.5,
            maxWidth: "520px",
            margin: "0 auto",
            letterSpacing: "0.02em",
            textAlign: "center",
          }}
        >
          Insights, updates, and deep dives from the Orderly team.
        </motion.p>

        {/* Search input */}
        <motion.div
          variants={heroChild}
          style={{
            marginTop: isMobile ? "28px" : "36px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: isMobile ? "100%" : "480px",
            }}
          >
            {/* Search icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.35)",
                pointerEvents: "none",
              }}
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setGridPage(1); }}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 40px 12px 44px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "999px",
                color: "white",
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: "'wght' 400",
                fontSize: "14px",
                letterSpacing: "0.02em",
                outline: "none",
                transition: "border-color 0.2s ease, background 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(103,0,206,0.6)";
                e.currentTarget.style.background = "rgba(103,0,206,0.08)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
            />

            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setGridPage(1); }}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.6)",
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Featured carousel (above tabs) ── */}
      {!isSearching && carouselPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: smoothEase }}
          style={{
            maxWidth: maxW,
            margin: "0 auto",
            padding: isMobile ? "0 24px 32px" : isTablet ? "0 40px 40px" : "0 160px 48px",
          }}
        >
          <FeaturedCarousel posts={carouselPosts} vp={vp} />
        </motion.div>
      )}

      {/* ── Category filter ── */}
      {!isSearching && <motion.div
        variants={revealOnScroll}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: maxW,
          margin: "0 auto",
          padding: isMobile ? "0 16px 40px" : isTablet ? "0 32px 48px" : "0 40px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: isMobile ? "8px" : "10px",
            overflowX: "auto",
            paddingBottom: "4px",
            scrollbarWidth: "none",
          }}
        >
          <CategoryPill
            label="All"
            active={activeCategory === "All"}
            onClick={() => { setActiveCategory("All"); setGridPage(1); }}
            isMobile={isMobile}
          />
          {BLOG_CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => { setActiveCategory(cat); setGridPage(1); }}
              isMobile={isMobile}
            />
          ))}
        </div>
      </motion.div>}

      {/* ── Content area ── */}
      <div
        style={{
          maxWidth: maxW,
          margin: "0 auto",
          padding: isMobile ? "0 16px" : isTablet ? "0 32px" : "0 40px",
        }}
      >
        {/* Search results label */}
        {isSearching && (
          <div
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 400",
              fontSize: "14px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.02em",
              marginBottom: "24px",
            }}
          >
            {searchResults.length > 0
              ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"} for "${searchQuery}"`
              : ""}
          </div>
        )}

        {/* Post grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isSearching ? `search-${q}` : activeCategory}
            variants={gridContainer}
            initial="hidden"
            animate="visible"
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(3, 1fr)",
              gap: isMobile ? "20px" : "24px",
              marginBottom: "32px",
            }}
          >
            {gridPosts.length > 0 ? (
              gridPosts.map((post) => (
                <motion.div key={post.slug} variants={gridChild} style={{ height: "100%" }}>
                  <PostCard post={post} vp={vp} />
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={gridChild}
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "80px 0",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                  fontVariationSettings: "'wght' 400",
                  fontSize: "16px",
                  letterSpacing: "0.02em",
                }}
              >
                {isSearching
                  ? `No results for "${searchQuery}"`
                  : "No posts in this category yet."}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Pagination ── */}
        {gridPageCount > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              paddingBottom: isMobile ? "24px" : "32px",
              paddingTop: "8px",
            }}
          >
            {/* Prev */}
            <button
              onClick={() => setGridPage((p) => Math.max(1, p - 1))}
              disabled={gridPage === 1}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: isMobile ? "36px" : "40px",
                height: isMobile ? "36px" : "40px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.15)",
                background: "transparent",
                cursor: gridPage === 1 ? "not-allowed" : "pointer",
                opacity: gridPage === 1 ? 0.3 : 1,
                transition: "all 0.2s ease",
                color: "white",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Page numbers */}
            {Array.from({ length: gridPageCount }, (_, i) => i + 1).map((page) => {
              const isActive = page === gridPage;
              return (
                <button
                  key={page}
                  onClick={() => setGridPage(page)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: isMobile ? "36px" : "40px",
                    height: isMobile ? "36px" : "40px",
                    borderRadius: "50%",
                    border: isActive ? "1.5px solid #6700CE" : "1.5px solid rgba(255,255,255,0.15)",
                    background: isActive ? "#6700CE" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                    fontVariationSettings: isActive ? "'wght' 700" : "'wght' 400",
                    fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
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
              onClick={() => setGridPage((p) => Math.min(gridPageCount, p + 1))}
              disabled={gridPage === gridPageCount}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: isMobile ? "36px" : "40px",
                height: isMobile ? "36px" : "40px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.15)",
                background: "transparent",
                cursor: gridPage === gridPageCount ? "not-allowed" : "pointer",
                opacity: gridPage === gridPageCount ? 0.3 : 1,
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
      </div>

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

      <AnimatePresence mode="wait">
        {navOpen && <MobileNavDrawer onClose={() => setNavOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
