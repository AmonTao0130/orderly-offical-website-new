"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { MorphingHeader, SiteFooter } from "../../imports/DesktopHomePage";
import { MobileNavDrawer } from "../components/MobileHomePage";
import { MobileFooterCard } from "../../imports/Frame1618872068-142-633";
import { TabletNav, TabletFooter } from "../components/TabletHomePage";
import svgPathsMobile from "../../imports/svg-4hybjba00c";
import {
  formatBlogDisplayDate,
  type BlogPost as BlogPostType,
} from "../features/blog/types";
import { copyToClipboard } from "../shared/orderly";

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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const heroChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } },
};
const revealOnScroll = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } },
};

// ── Related post card ─────────────────────────────────────────────────────────
function RelatedCard({ post, isMobile }: { post: BlogPostType; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#111114",
        borderRadius: "14px",
        overflow: "hidden",
        border: hovered ? "1px solid rgba(103,0,206,0.5)" : "1px solid rgba(255,255,255,0.07)",
        textDecoration: "none",
        transition: "border-color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "100%",
          paddingTop: "56.25%",
          position: "relative",
          background: "#1a1a1f",
        }}
      >
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg,#1a0040 0%,#0d0020 100%)",
            }}
          />
        )}
      </div>
      <div style={{ padding: isMobile ? "14px" : "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              background: "rgba(103,0,206,0.25)",
              color: "#b47dff",
              padding: "2px 8px",
              borderRadius: "5px",
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 500",
              fontSize: "10px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {post.categoryName}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono','dm-mono',monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {formatBlogDisplayDate(post.displayTime)}
          </span>
        </div>
        <h4
          style={{
            fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
            fontVariationSettings: "'wght' 600",
            fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
            fontSize: "16px",
            color: "white",
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: "0.01em",
          }}
        >
          {post.title}
        </h4>
      </div>
    </a>
  );
}

// ── Share button ──────────────────────────────────────────────────────────────
function ShareButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        borderRadius: "100px",
        border: "1.5px solid rgba(255,255,255,0.2)",
        background: hovered ? "rgba(255,255,255,0.06)" : "transparent",
        color: "white",
        fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
        fontVariationSettings: "'wght' 500",
        fontSize: "14px",
        letterSpacing: "0.02em",
        cursor: "pointer",
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// ── Prose styles injected once ────────────────────────────────────────────────
const PROSE_CSS = `
.orderly-prose {
  font-family: 'atyp-bl-variable','atyp-bl',sans-serif;
  font-feature-settings: 'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1;
  color: rgba(255,255,255,0.85);
  font-size: 17px;
  line-height: 1.75;
  font-variation-settings: 'wght' 350;
  letter-spacing: 0.018em;
}
.orderly-prose p { margin: 0 0 20px; }
.orderly-prose h2 {
  font-size: 26px;
  font-variation-settings: 'wght' 700;
  color: white;
  margin: 48px 0 16px;
  line-height: 1.25;
  letter-spacing: 0.01em;
}
.orderly-prose h3 {
  font-size: 20px;
  font-variation-settings: 'wght' 600;
  color: white;
  margin: 36px 0 12px;
  line-height: 1.3;
}
.orderly-prose ul, .orderly-prose ol {
  margin: 0 0 20px;
  padding-left: 24px;
}
.orderly-prose li { margin-bottom: 8px; }
.orderly-prose a {
  color: #9c75ff;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.orderly-prose a:hover { color: #b47dff; }
.orderly-prose strong { font-variation-settings: 'wght' 700; color: white; }
.orderly-prose blockquote {
  border-left: 3px solid #6700ce;
  padding-left: 20px;
  margin: 24px 0;
  font-style: italic;
  color: rgba(255,255,255,0.6);
}
.orderly-prose code {
  font-family: 'DM Mono','dm-mono',monospace;
  color: #44DED3;
  background: #1a1a1f;
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 0.88em;
}
.orderly-prose pre {
  background: #1a1a1f;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 20px 24px;
  overflow-x: auto;
  margin: 24px 0;
}
.orderly-prose pre code {
  background: none;
  padding: 0;
  color: #44DED3;
  font-size: 14px;
}
.orderly-prose hr {
  border: none;
  border-top: 1px solid rgba(255,255,255,0.1);
  margin: 40px 0;
}
`;

// ── Not found state ───────────────────────────────────────────────────────────
function NotFound({ vp }: { vp: Viewport }) {
  const isMobile = vp === "mobile";
  return (
    <div
      style={{
        textAlign: "center",
        padding: isMobile ? "120px 24px" : "160px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1
        style={{
          fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
          fontVariationSettings: "'wght' 700",
          fontSize: isMobile ? "32px" : "48px",
          color: "white",
          margin: 0,
        }}
      >
        Post Not Found
      </h1>
      <p
        style={{
          fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
          fontVariationSettings: "'wght' 400",
          fontSize: "16px",
          color: "rgba(255,255,255,0.5)",
          margin: 0,
        }}
      >
        This article doesn&apos;t exist or may have moved.
      </p>
      <a
        href="/blog"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          border: "1.5px solid rgba(255,255,255,0.4)",
          borderRadius: "100px",
          padding: "12px 24px",
          color: "white",
          textDecoration: "none",
          fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
          fontVariationSettings: "'wght' 600",
          fontSize: "15px",
          marginTop: "8px",
        }}
      >
        ← Back to Blog
      </a>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BlogPost({
  slug,
  post,
  latestPosts,
}: {
  slug: string;
  post: BlogPostType | null;
  latestPosts: BlogPostType[];
}) {
  const vp = useViewport();
  const isMobile = vp === "mobile";
  const isTablet = vp === "tablet";
  const [navOpen, setNavOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const relatedPosts = post ? latestPosts : [];

  const handleCopyLink = async () => {
    await copyToClipboard(
      typeof window !== "undefined" ? window.location.href : `https://orderly.network/blog/${slug}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const url = typeof window !== "undefined" ? window.location.href : `https://orderly.network/blog/${slug}`;
    const text = post ? `${post.title} — @OrderlyNetwork` : "Check this out on Orderly Network";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const px = isMobile ? "16px" : isTablet ? "32px" : "24px";
  const contentMaxW = "740px";

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
      {/* Inject prose styles */}
      <style dangerouslySetInnerHTML={{ __html: PROSE_CSS }} />

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

      {!post ? (
        <NotFound vp={vp} />
      ) : (
        <>
          {/* ── Article header ── */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            style={{
              maxWidth: contentMaxW,
              margin: "0 auto",
              padding: isMobile
                ? "40px 16px 32px"
                : isTablet
                ? "48px 32px 40px"
                : "60px 24px 48px",
            }}
          >
            {/* Back link */}
            <motion.div variants={heroChild} style={{ marginBottom: "32px" }}>
              <a
                href="/blog"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                  fontVariationSettings: "'wght' 500",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 3L5 8l5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Blog
              </a>
            </motion.div>

            {/* Category + read time */}
            <motion.div
              variants={heroChild}
              style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}
            >
              <span
                style={{
                  background: "rgba(103,0,206,0.25)",
                  color: "#b47dff",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                  fontVariationSettings: "'wght' 500",
                  fontSize: "12px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {post.categoryName}
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono','dm-mono',monospace",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {post.readTime} min read
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={heroChild}
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: "'wght' 700",
                fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
                fontSize: isMobile ? "28px" : "clamp(32px,4vw,52px)",
                color: "white",
                letterSpacing: "0.01em",
                lineHeight: 1.18,
                margin: "0 0 24px",
              }}
            >
              {post.title}
            </motion.h1>

            {/* Date + author */}
            <motion.div
              variants={heroChild}
              style={{ display: "flex", alignItems: "center", gap: "16px" }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono','dm-mono',monospace",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {formatBlogDisplayDate(post.displayTime)}
              </span>
              <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.15)" }} />
              <span
                style={{
                  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                  fontVariationSettings: "'wght' 400",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {post.authorName}
              </span>
            </motion.div>
          </motion.div>

          {/* ── Cover image ── */}
          {post.coverImageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: smoothEase, delay: 0.3 }}
              style={{
                maxWidth: isMobile ? "100%" : isTablet ? "calc(100% - 128px)" : "720px",
                margin: "0 auto",
                padding: isMobile ? "0" : isTablet ? "0 0px" : "0 0px",
                marginBottom: isMobile ? "40px" : "56px",
              }}
            >
              <div
                style={{
                  borderRadius: isMobile ? "0" : "20px",
                  overflow: "hidden",
                  maxHeight: "480px",
                }}
              >
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </motion.div>
          )}

          {/* ── Article body ── */}
          <motion.div
            variants={revealOnScroll}
            initial="hidden"
            animate="visible"
            style={{
              maxWidth: contentMaxW,
              margin: "0 auto",
              padding: isMobile ? "0 16px" : isTablet ? "0 32px" : "0 24px",
              marginBottom: isMobile ? "56px" : "72px",
            }}
          >
            <div
              className="orderly-prose"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </motion.div>

          {/* ── Share section ── */}
          <motion.div
            variants={revealOnScroll}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div
              style={{
                maxWidth: contentMaxW,
                margin: "0 auto",
                padding: isMobile ? "0 16px 56px" : isTablet ? "0 32px 64px" : "0 24px 72px",
              }}
            >
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: isMobile ? "32px" : "40px",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                    fontVariationSettings: "'wght' 500",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.03em",
                    flexShrink: 0,
                  }}
                >
                  Share this article
                </span>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <ShareButton
                    onClick={handleShareTwitter}
                    label="Share on X"
                    icon={
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M11.025.25H13.25L8.725 5.425 14 13.75H9.9L6.675 9.35 2.975 13.75H.75L5.6 8.225.5.25H4.7L7.6 4.275 11.025.25ZM10.275 12.375H11.5L4.275 1.5H2.95L10.275 12.375Z"
                          fill="white"
                        />
                      </svg>
                    }
                  />
                  <ShareButton
                    onClick={handleCopyLink}
                    label={copied ? "Copied!" : "Copy link"}
                    icon={
                      copied ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M2 7l3.5 3.5 6.5-7"
                            stroke="#44DED3"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M5.5 8.5a3 3 0 0 0 4.24 0L12 6.25A3 3 0 0 0 7.76 2L6.63 3.13M8.5 5.5a3 3 0 0 0-4.24 0L2 7.75A3 3 0 0 0 6.24 12L7.37 10.87"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Related posts ── */}
          {relatedPosts.length > 0 && (
            <motion.div
              variants={revealOnScroll}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div
                style={{
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: isMobile ? "0 16px 64px" : isTablet ? "0 32px 72px" : "0 40px 80px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                    fontVariationSettings: "'wght' 700",
                    fontFeatureSettings: "'ss02' 1,'ss03' 1,'ss05' 1,'ss06' 1",
                    fontSize: isMobile ? "22px" : "28px",
                    color: "white",
                    margin: "0 0 28px",
                    letterSpacing: "0.01em",
                  }}
                >
                  More Blog
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : isTablet
                      ? "repeat(2, 1fr)"
                      : "repeat(3, 1fr)",
                    gap: isMobile ? "16px" : "20px",
                  }}
                >
                  {relatedPosts.map((p) => (
                    <RelatedCard key={p.slug} post={p} isMobile={isMobile} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

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
