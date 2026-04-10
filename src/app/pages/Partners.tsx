"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MorphingHeader, SiteFooter } from "../../imports/DesktopHomePage";
import { MobileNavDrawer } from "../components/MobileHomePage";
import { MobileFullFooter, MobileFooterCard } from "../../imports/Frame1618872068-142-633";
import { TabletNav, TabletFooter } from "../components/TabletHomePage";
import svgPathsMobile from "../../imports/svg-4hybjba00c";
import { useOrderlyStats, formatLargeNumber } from "../hooks/useOrderlyStats";

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
      <a
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
            d={svgPathsMobile.p2fe0400}
            fill="white"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d={svgPathsMobile.p2f88ca00}
            fill="white"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d={svgPathsMobile.p22c01780}
            fill="white"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d={svgPathsMobile.p527fe00}
            fill="white"
            fillRule="evenodd"
          />
        </svg>
      </a>
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

// ─── Viewport hook ────────────────────────────────────────────────────────────
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
  // ── Builders ── (sorted by Dune 30-day volume, updated 2026-04-10)
  {
    name: "FillX",
    category: "Builder",
    description: "A professional-grade on-chain trading interface offering perpetual futures with efficient order execution and deep liquidity via Orderly's shared orderbook.",
    logo: "logos/fillx.jpg",
    initials: "FX",
    color: "#0a1a2e",
    url: "https://fillx.io",
  },
  {
    name: "DEXLESS",
    category: "Builder",
    description: "A next-generation decentralized perpetuals exchange offering seamless on-chain derivatives trading with deep liquidity from Orderly's shared orderbook.",
    logo: "logos/dexless.jpg",
    initials: "DL",
    color: "#0a0a1a",
    url: "https://dexless.exchange/perp/PERP_ETH_USDC",
  },
  {
    name: "Raydium",
    category: "Builder",
    description:
      "The leading Solana AMM and DEX powering DeFi with concentrated liquidity, farms, and perps — connected to Orderly's shared orderbook on Solana.",
    logo: "logos/raydium.png",
    initials: "RY",
    color: "#1a0a4a",
    url: "https://raydium.io/swap",
  },
  {
    name: "Kodiak",
    category: "Builder",
    description:
      "Perpetual futures trading platform on Berachain, powered by Orderly's shared orderbook for deep, bootstrapped liquidity from day one.",
    logo: "logos/kodiak.jpg",
    initials: "KD",
    color: "#1a1200",
    url: "https://perps.kodiak.finance/",
  },
  {
    name: "Solinu Exchange",
    category: "Builder",
    description: "A decentralized trading platform bringing accessible perpetual futures to users with seamless on-chain execution backed by Orderly's shared liquidity layer.",
    logo: "logos/solinu.jpg",
    initials: "SL",
    color: "#0a1a0a",
    url: "https://solinu.exchange",
  },
  {
    name: "WOOFi Pro",
    category: "Builder",
    description:
      "All the tools you need, in one place. WOOFi Pro offers professional-grade perpetual trading with deep liquidity powered by Orderly's shared orderbook.",
    logo: "logos/woofi.png",
    initials: "WF",
    color: "#1a3a5c",
    url: "https://pro.woofi.com/",
  },
  {
    name: "Velto",
    category: "Builder",
    description: "Next-generation perpetual futures platform delivering a seamless trading experience, built on Orderly's shared orderbook for deep, bootstrapped liquidity.",
    logo: "logos/velto.jpg",
    initials: "VL",
    color: "#0a1a2e",
    url: "https://bld-foggy-harbor.velto.com/perp/PERP_ETH_USDC",
  },
  {
    name: "Alpix.io",
    category: "Builder",
    description: "Professional-grade perpetual futures exchange combining a powerful trading interface with deep liquidity from Orderly's omnichain shared orderbook.",
    logo: "logos/Alpix.jpg",
    initials: "AP",
    color: "#0a2010",
    url: "https://alpix.io",
  },
  {
    name: "Aden",
    category: "Builder",
    description:
      "Fully featured DeFi trading platform with a focus on user experience and institutional-grade execution, built on top of Orderly's orderbook infrastructure.",
    logo: "logos/aden.png",
    initials: "AD",
    color: "#1a0a36",
    url: "https://aden.finance/",
  },
  {
    name: "Holy Labs",
    category: "Builder",
    description: "A next-generation DeFi trading protocol built on Orderly's infrastructure, enabling advanced on-chain derivatives and perpetual futures trading.",
    logo: "logos/holy labs.jpg",
    initials: "HL",
    color: "#0a1a36",
    url: "https://holylabs.xyz/",
  },
  {
    name: "UXUY",
    category: "Builder",
    description: "Multi-chain crypto wallet and trading platform offering seamless access to decentralized markets, powered by Orderly's shared liquidity infrastructure.",
    logo: "logos/uxuy.jpg",
    initials: "UX",
    color: "#1a0a36",
    url: "https://www.uxuy.com/",
  },
  {
    name: "What.Exchange",
    category: "Builder",
    description:
      "A clean, fast perpetuals trading interface with advanced order types and portfolio tools, built on Orderly's omnichain liquidity network.",
    logo: "logos/whatexchange.png",
    initials: "WX",
    color: "#0d2033",
    url: "https://www.what.exchange/",
  },
  {
    name: "Novex Finance",
    category: "Builder",
    description: "A decentralized perpetuals exchange offering seamless on-chain derivatives trading with deep liquidity from Orderly's shared orderbook.",
    logo: "logos/Novex Finance.jpg",
    initials: "NV",
    color: "#1a0a10",
    url: "https://quests.novex.finance/",
  },
  {
    name: "Interlink",
    category: "Builder",
    description: "AI-native trading infrastructure connecting on-chain liquidity across ecosystems, leveraging Orderly's omnichain orderbook for deep, unified market depth.",
    logo: "logos/interlink.jpg",
    initials: "IL",
    color: "#061a2e",
    url: "https://interlinklabs.ai",
  },
  {
    name: "FastX",
    category: "Builder",
    description: "A high-performance perpetual futures trading platform delivering fast execution and deep liquidity powered by Orderly's omnichain shared orderbook.",
    logo: "logos/FastX.png",
    initials: "FX",
    color: "#0a1a2e",
    url: "https://fastx.co",
  },
  {
    name: "LOL DEX",
    category: "Builder",
    description: "LOL DEX leverages Orderly One to bring native perpetual trading into the LOL ecosystem, turning community activity into a sustainable source of growth through fee capture.",
    logo: "logos/lol.jpg",
    initials: "LOL",
    color: "#1a1a0a",
    url: "https://www.loldex.lol/perp/PERP_ETH_USDC/",
  },
  {
    name: "AlphaNet",
    category: "Builder",
    description: "A high-performance perpetuals trading platform delivering institutional-grade execution and deep liquidity powered by Orderly's shared orderbook.",
    logo: "logos/alphanet.jpg",
    initials: "AN",
    color: "#0a1a2e",
    url: "https://alphanet.phoenix.global",
  },
  {
    name: "Berrie",
    category: "Builder",
    description: "Innovative decentralized exchange bringing accessible perpetual futures trading to users, leveraging Orderly's shared orderbook for reliable market depth.",
    logo: "logos/berrie.png",
    initials: "BR",
    color: "#1a0a1a",
    url: "https://berriedex.com",
  },
  {
    name: "Clutch",
    category: "Builder",
    description: "Professional-grade perpetual futures trading platform delivering deep liquidity and seamless execution powered by Orderly's shared orderbook.",
    logo: "logos/clutch.png",
    initials: "CL",
    color: "#1a0a2e",
    url: "https://anvil.clutch.market",
  },
  {
    name: "Volt",
    category: "Builder",
    description: "A high-performance perpetual futures trading platform delivering fast execution and deep liquidity powered by Orderly's omnichain shared orderbook.",
    logo: "logos/Volt.png",
    initials: "VT",
    color: "#1a1a0a",
    url: "https://dex.orderly.network/volt-0351/",
  },
  {
    name: "OKLONG",
    category: "Builder",
    description: "A decentralized perpetuals exchange offering efficient on-chain derivatives trading with deep, bootstrapped liquidity from Orderly's omnichain orderbook.",
    logo: "logos/OKLONG.jpg",
    initials: "OK",
    color: "#0a1a0a",
    url: "https://oklong.io",
  },
  {
    name: "Orange Perps",
    category: "Builder",
    description: "Perpetual futures DEX built for traders who demand speed and reliability, tapping into Orderly's omnichain orderbook for deep, bootstrapped liquidity.",
    logo: "logos/orange-perps.jpg",
    initials: "OP",
    color: "#2a1200",
    url: "https://home.orangeperps.com",
  },
  {
    name: "Pangolin",
    category: "Builder",
    description: "Pangolin is Avalanche's premier and most battle-tested DEX, low fees, and high-performance trading across spot, perps and advanced AMM designs.",
    logo: "logos/Pangolin.jpg",
    initials: "PG",
    color: "#0a2a1a",
    url: "https://perps.pangolin.exchange",
  },
  {
    name: "AEGIS",
    category: "Builder",
    description: "A decentralized derivatives exchange offering secure and efficient perpetual futures trading, built on Orderly's shared orderbook infrastructure.",
    logo: "logos/aegis.jpg",
    initials: "AG",
    color: "#0a1a1a",
    url: "https://aegisdex.io",
  },
  {
    name: "DiamondX",
    category: "Builder",
    description: "A perpetuals-focused decentralized exchange delivering professional-grade derivatives trading powered by Orderly's shared orderbook.",
    logo: "logos/DiamondX.jpg",
    initials: "DX",
    color: "#061a2e",
    url: "https://diamondx.exchange",
  },
  {
    name: "Arthur",
    category: "Builder",
    description: "A decentralized perpetuals DEX delivering professional-grade derivatives trading with deep liquidity powered by Orderly's shared orderbook.",
    logo: "logos/Arthur.png",
    initials: "AR",
    color: "#1a0a0a",
    url: "https://arthurdex.com",
  },
  {
    name: "SIX DEX",
    category: "Builder",
    description: "A next-generation decentralized exchange bringing accessible and efficient perpetual futures trading to users, powered by Orderly's shared orderbook infrastructure.",
    logo: "logos/SIX DEX.jpg",
    initials: "SIX",
    color: "#0a0a1a",
    url: "https://sixdex.xyz/",
  },
  {
    name: "Clypto",
    category: "Builder",
    description: "A next-gen cross-chain DeFi aggregation protocol and perp DEX. Swap seamlessly across 16+ blockchains and trade perpetuals powered by Orderly's shared orderbook.",
    logo: "logos/clypto.jpg",
    initials: "CL",
    color: "#0a1a10",
    url: "https://perps.clypto.com",
  },
  {
    name: "Zetarium",
    category: "Builder",
    description:
      "A next-generation decentralised exchange delivering high-performance perp trading on ZetaChain, backed by Orderly's shared liquidity layer.",
    logo: "logos/Zetarium.jpg",
    initials: "ZT",
    color: "#0a1a1a",
    url: "https://www.zdex.world/",
  },
  {
    name: "Toro",
    category: "Builder",
    description: "A decentralized perpetuals DEX delivering fast, non-custodial derivatives trading with deep liquidity powered by Orderly's omnichain orderbook.",
    logo: "logos/toro.jpg",
    initials: "TR",
    color: "#1a0a0a",
    url: "https://dex.torodex.xyz/perp/PERP_ETH_USDC",
  },
  /* ── Low volume — keep for future use ──
  {
    name: "PERPTools",
    category: "Builder",
    description:
      "AI-powered perpetuals trading interface bringing intelligent order routing and strategy execution on top of Orderly's omnichain infrastructure.",
    logo: "logos/perpstool.jpg",
    initials: "PT",
    color: "#0a1a2e",
    url: "https://app.perptools.ai/",
  },
  {
    name: "BTSE",
    category: "Builder",
    description:
      "Crypto exchange offering simple, secure and efficient cryptocurrency trading, enhanced by Orderly's institutional-grade liquidity infrastructure.",
    logo: "logos/btse.png",
    initials: "BT",
    color: "#0d2233",
    url: "https://www.btse.com/",
  },
  {
    name: "Bitbaazi",
    category: "Builder",
    description: "Decentralized perpetuals trading platform offering a fast, intuitive interface and competitive market depth powered by Orderly's liquidity infrastructure.",
    logo: "logos/Bitbaazi.jpg",
    initials: "BB",
    color: "#1a0a0a",
    url: "https://bitbaazi.exchange/perp/PERP_ETH_USDC",
  },
  {
    name: "FusionX",
    category: "Builder",
    description: "FusionX is the one-stop DeFi ecosystem on Mantle Network.",
    logo: "logos/fusionx.png",
    initials: "FX",
    color: "#0a1a10",
    url: "https://fusionx.finance/",
  },
  {
    name: "Algowhirl",
    category: "Builder",
    description: "An algorithmic trading platform with built-in automation tools, enabling strategy-driven perpetual trading on Orderly's shared orderbook.",
    logo: "logos/Algowhirl.jpg",
    initials: "AW",
    color: "#0a1a2e",
    url: "https://algowhirl.com",
  },
  {
    name: "Toro",
    category: "Builder",
    description: "A decentralized perpetuals DEX delivering fast, non-custodial derivatives trading with deep liquidity powered by Orderly's omnichain orderbook.",
    logo: "logos/toro.jpg",
    initials: "TR",
    color: "#1a0a0a",
    url: "https://dex.torodex.xyz/perp/PERP_ETH_USDC",
  },
  {
    name: "VOOI",
    category: "Builder",
    description:
      "Cross-chain perp DEX aggregator that routes orders to the deepest available liquidity — including Orderly's shared orderbook across 17+ chains.",
    logo: "logos/vooi.png",
    initials: "VO",
    color: "#052e32",
    url: "https://vooi.io/",
  },
  {
    name: "QuickSwap",
    category: "Builder",
    description:
      "Next-gen DEX offering lightning-fast trades, near-zero gas fees, and perps with up to 50x leverage — all running on Orderly's shared orderbook.",
    logo: "logos/quickswap.svg",
    initials: "QS",
    color: "#1e1050",
    url: "https://quickswap.exchange/",
  },
  ── end low volume ── */
  // ── Ecosystem ──
  {
    name: "Ethereum",
    category: "Ecosystem",
    description:
      "The world's leading programmable blockchain and the foundation of decentralized finance. Orderly's settlement layer is built on the OP Stack, securing all perp trading activity with Ethereum's security guarantees.",
    logo: "logos/eth.png",
    initials: "ETH",
    color: "#0a0e2e",
    url: "https://ethereum.org/",
  },
  {
    name: "BNB Chain",
    category: "Ecosystem",
    description:
      "High-performance EVM-compatible blockchain with one of the largest DeFi ecosystems. Orderly's integration on BNB Chain gives builders access to a shared orderbook with deep, bootstrapped perp liquidity.",
    logo: "logos/BNB chain.png",
    initials: "BNB",
    color: "#1a1000",
    url: "https://www.bnbchain.org/",
  },
  {
    name: "Optimism",
    category: "Ecosystem",
    description:
      "Leading Ethereum L2 powering Orderly's innovative settlement layer via OP Stack. Fast, cheap, and fully EVM-compatible — the backbone of Orderly's settlement.",
    logo: "logos/optimism.svg",
    initials: "OP",
    color: "#3a0a0a",
    url: "https://www.optimism.io/",
  },
  {
    name: "Arbitrum",
    category: "Ecosystem",
    description:
      "The leading L2 technology empowering builders to explore the largest L1 ecosystem — Ethereum. Orderly brings deep perp liquidity natively to Arbitrum.",
    logo: "logos/arbitrum.svg",
    initials: "AB",
    color: "#0a1a2e",
    url: "https://arbitrum.io/",
  },
  {
    name: "BASE",
    category: "Ecosystem",
    description:
      "Secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain. Orderly DEXes on Base benefit from shared orderbook liquidity.",
    logo: "logos/base.png",
    initials: "BS",
    color: "#0a0a3a",
    url: "https://base.org/",
  },
  {
    name: "Polygon",
    category: "Ecosystem",
    description:
      "The value layer of the internet that allows anyone to create and exchange value, powered by zero-knowledge technology. Orderly is live on Polygon.",
    logo: "logos/polygon.svg",
    initials: "PL",
    color: "#2a0a4a",
    url: "https://polygon.technology/",
  },
  {
    name: "Solana",
    category: "Ecosystem",
    description:
      "High-performance blockchain with sub-second finality and ultra-low fees. Orderly's shared orderbook is fully integrated on Solana, giving builders native access.",
    logo: "logos/solana.svg",
    initials: "SOL",
    color: "#0a1a2e",
    url: "https://solana.com/",
  },
  {
    name: "Mantle",
    category: "Ecosystem",
    description:
      "High-performance Ethereum L2 with modular architecture and a large ecosystem fund. Orderly brings institutional perp liquidity natively to Mantle.",
    logo: "logos/mantle.svg",
    initials: "MT",
    color: "#0a1a1a",
    url: "https://www.mantle.xyz/",
  },
  {
    name: "Sonic",
    category: "Ecosystem",
    description:
      "The fastest EVM Layer-1 blockchain, delivering high throughput and ultra-low fees. Orderly deployed its omnichain orderbook on Sonic in January 2025, bringing shared liquidity to the ecosystem.",
    logo: "logos/sonic.png",
    initials: "S",
    color: "#1a0a06",
    url: "https://www.soniclabs.com/",
  },
  {
    name: "Berachain",
    category: "Ecosystem",
    description:
      "High-performance EVM-compatible L1 powered by Proof-of-Liquidity consensus. Orderly integrated Berachain in February 2025, enabling DEXes like Kodiak to offer perps with 100+ trading pairs and up to 50x leverage.",
    logo: "logos/berachain.png",
    initials: "BR",
    color: "#0a1206",
    url: "https://www.berachain.com/",
  },
  {
    name: "Monad",
    category: "Ecosystem",
    description:
      "Superscalable EVM-compatible Layer-1 with 10,000 TPS, 1-second block times and finality, and full Ethereum RPC compatibility. Orderly's omnichain orderbook brings deep, bootstrapped liquidity to Monad from day one.",
    logo: "logos/monad.png",
    initials: "MON",
    color: "#140520",
    url: "https://www.monad.xyz/",
  },
  {
    name: "Story",
    category: "Ecosystem",
    description:
      "Purpose-built Layer-1 for tokenizing intellectual property into programmable on-chain assets. Orderly's integration enables Story ecosystem projects to access deep cross-chain liquidity for trading tokenized IP.",
    logo: "logos/story.png",
    initials: "IP",
    color: "#1a1206",
    url: "https://www.story.foundation/",
  },
  {
    name: "Mode",
    category: "Ecosystem",
    description:
      "Ethereum L2 focused on DeFi with a collaborative revenue-sharing model. Mode launched Mode Trade, an AI-native perpetuals DEX powered by Orderly — the first L2 to integrate a perp exchange directly on its platform.",
    logo: "logos/mode.png",
    initials: "MD",
    color: "#1a1a06",
    url: "https://www.mode.network/",
  },
  {
    name: "Sei Network",
    category: "Ecosystem",
    description:
      "The fastest Layer-1 blockchain optimized for trading, with sub-400ms finality and a built-in order matching engine. Orderly's shared orderbook brings deep cross-chain perp liquidity natively to Sei.",
    logo: "logos/sei.png",
    initials: "SEI",
    color: "#0e0a1a",
    url: "https://www.sei.io/",
  },
  {
    name: "Avalanche",
    category: "Ecosystem",
    description:
      "High-throughput Layer-1 with sub-second finality and a scalable subnet architecture. Orderly extends its omnichain orderbook to Avalanche, giving builders access to deep, shared perp liquidity.",
    logo: "logos/Avalanche.png",
    initials: "AVAX",
    color: "#2a0a0a",
    url: "https://www.avax.network/",
  },
  {
    name: "Morph",
    category: "Ecosystem",
    description:
      "Consumer-focused Ethereum L2 combining optimistic and ZK rollup technology for low-cost, high-performance transactions. Orderly brings shared orderbook liquidity to the Morph ecosystem.",
    logo: "logos/morph.svg",
    initials: "MOR",
    color: "#0a160a",
    url: "https://www.morphl2.io/",
  },
  {
    name: "Plume",
    category: "Ecosystem",
    description:
      "Modular L2 blockchain purpose-built for real-world assets, enabling compliant tokenization and on-chain trading. Orderly powers perpetual futures infrastructure across the Plume ecosystem.",
    logo: "logos/plume.png",
    initials: "PLM",
    color: "#1a1206",
    url: "https://plumenetwork.xyz/",
  },
  {
    name: "Abstract",
    category: "Ecosystem",
    description:
      "Consumer-centric Ethereum L2 built for accessible, user-friendly on-chain applications. Orderly's omnichain orderbook brings institutional-grade perp liquidity to Abstract's growing ecosystem.",
    logo: "logos/abstract.png",
    initials: "ABS",
    color: "#0e0e0e",
    url: "https://abs.xyz/",
  },

  // ── Product ──
  {
    name: "LayerZero",
    category: "Product",
    description:
      "Omnichain interoperability protocol designed for lightweight message passing across chains. LayerZero powers the cross-chain messaging that underpins Orderly's omnichain design.",
    logo: "logos/layerzero.svg",
    initials: "LZ",
    color: "#10111a",
    url: "https://layerzero.network/",
  },
  {
    name: "Pyth",
    category: "Product",
    description:
      "A decentralized oracle network delivering real-time market data from institutional sources to smart contracts.",
    logo: "logos/pyth.svg",
    initials: "PY",
    color: "#1a0a1a",
    url: "https://pyth.network/",
  },
  {
    name: "Wormhole",
    category: "Product",
    description:
      "Generic message passing protocol connecting 30+ blockchains. Wormhole's cross-chain bridging infrastructure supports secure asset movement across Orderly's omnichain network.",
    logo: "logos/wormhole.png",
    initials: "WH",
    color: "#1a0a2e",
    url: "https://wormhole.com/",
  },
  {
    name: "Stargate Finance",
    category: "Product",
    description:
      "Fully composable liquidity transport protocol enabling seamless cross-chain asset transfers. Stargate powers USDC.e bridging to the Orderly Chain, connecting it to 55+ blockchain ecosystems.",
    logo: "logos/stargate.png",
    initials: "STG",
    color: "#0a1a10",
    url: "https://stargate.finance/",
  },
  {
    name: "Google Cloud",
    category: "Product",
    description:
      "Global cloud computing platform partnering with Orderly to drive secure, scalable DeFi adoption. Google Cloud supports Orderly's SDK infrastructure and co-ran an AI bounty program with the ecosystem.",
    logo: "logos/google-cloud.svg",
    initials: "GC",
    color: "#0a0a1a",
    url: "https://cloud.google.com/",
  },
  {
    name: "Halborn",
    category: "Product",
    description:
      "A leading blockchain security firm providing smart contract audits and security assessments for Web3 projects.",
    logo: "logos/Halborn.jpg",
    initials: "HB",
    color: "#1a0a0a",
    url: "https://www.halborn.com/",
  },
  {
    name: "Zellic",
    category: "Product",
    description:
      "A security research company specializing in audits of smart contracts, cryptography, and complex blockchain systems.",
    logo: "logos/Zellic.jpg",
    initials: "ZL",
    color: "#0a101a",
    url: "https://www.zellic.io/",
  },
  {
    name: "Guardian Audits",
    category: "Product",
    description:
      "A Web3 security firm focused on smart contract audits and vulnerability detection for DeFi protocols.",
    logo: "logos/Guardian.jpg",
    initials: "GA",
    color: "#0a1a0a",
    url: "https://guardianaudits.com/",
  },
  {
    name: "Chainlink",
    category: "Product",
    description:
      "A leading decentralized oracle network enabling smart contracts to securely access off-chain data and services.",
    logo: "logos/Chainlink.jpg",
    initials: "CL",
    color: "#0a0a1a",
    url: "https://chain.link/",
  },
  {
    name: "Stork",
    category: "Product",
    description:
      "A low-latency oracle designed to provide fast and reliable data feeds for high-performance DeFi applications.",
    logo: "logos/Stork.jpg",
    initials: "ST",
    color: "#1a1a0a",
    url: "https://www.stork.network/",
  },
];

const CATEGORIES: Category[] = ["All", "Builder", "Ecosystem", "Product"];

const CATEGORY_COLORS: Record<Exclude<Category, "All">, string> = {
  Builder: "#6700CE",
  Ecosystem: "#1e4a2e",
  Product: "#0a2a4a",
};

const TRADERS_COUNT = "895K";

// ─── Arrow icon ───────────────────────────────────────────────────────────────
function ArrowUpRight({
  size = 14,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M2.5 11.5L11.5 2.5M7 2.5h4.5V7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Partner Card ─────────────────────────────────────────────────────────────
function PartnerCard({
  partner,
  isMobile,
}: {
  partner: Partner;
  isMobile: boolean;
}) {
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
        border: `1px solid ${
          hovered ? "rgba(156,117,255,0.4)" : "rgba(255,255,255,0.08)"
        }`,
        borderRadius: "20px",
        padding: isMobile ? "24px 20px" : "28px 24px",
        textDecoration: "none",
        transition:
          "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
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
                fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
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
              fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
              fontSize: "11px",
              color:
                partner.category === "Builder"
                  ? "#9c75ff"
                  : partner.category === "Ecosystem"
                  ? "#4ade80"
                  : "#60b8ff",
              background:
                partner.category === "Builder"
                  ? "rgba(103,0,206,0.25)"
                  : partner.category === "Ecosystem"
                  ? "rgba(22,101,52,0.35)"
                  : "rgba(10,42,74,0.5)",
              border: `1px solid ${
                partner.category === "Builder"
                  ? "rgba(156,117,255,0.3)"
                  : partner.category === "Ecosystem"
                  ? "rgba(74,222,128,0.25)"
                  : "rgba(96,184,255,0.25)"
              }`,
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
          fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
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
          fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
          fontSize: "13px",
          color: hovered ? "#9c75ff" : "rgba(255,255,255,0.4)",
          transition: "color 0.2s ease",
          letterSpacing: "0.02em",
        }}
      >
        Visit
        <ArrowUpRight
          size={12}
          color={hovered ? "#9c75ff" : "rgba(255,255,255,0.4)"}
        />
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
  const stats = useOrderlyStats();

  const filtered = (() => {
    if (activeCategory !== "All") {
      return PARTNERS.filter((p) => p.category === activeCategory);
    }
    // Interleave Builder / Ecosystem / Product in round-robin order
    const builders  = PARTNERS.filter((p) => p.category === "Builder");
    const ecosystem = PARTNERS.filter((p) => p.category === "Ecosystem");
    const product   = PARTNERS.filter((p) => p.category === "Product");
    const result: Partner[] = [];
    const maxLen = Math.max(builders.length, ecosystem.length, product.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < builders.length)  result.push(builders[i]);
      if (i < ecosystem.length) result.push(ecosystem[i]);
      if (i < product.length)   result.push(product[i]);
    }
    return result;
  })();

  const pageCount = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const paginatedPartners = filtered.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        width: "100%",
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
      <div style={{ position: "relative", width: "100%", overflow: "visible" }}>
        {/* Desktop + Tablet + Mobile background decorations */}
        <>
          {/* Left group PNG */}
          <img
            src="/images/left.png"
            alt=""
            style={{
              position: "absolute",
              left: isMobile
                ? "-25px"
                : isTablet
                ? "calc(10px + (100vw - 1024px) * 0.08)"
                : "calc(70px + (100vw - 1440px) * 0.3)",
              top: isMobile ? "10px" : isTablet ? "20px" : 0,
              width: isMobile
                ? "clamp(72px, 20vw, 96px)"
                : isTablet
                ? "clamp(104px, 17.6vw, 176px)"
                : "clamp(192px, 21.1vw, 304px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Right group PNG */}
          <img
            src="/images/right.png"
            alt=""
            style={{
              position: "absolute",
              right: isMobile
                ? "-25px"
                : isTablet
                ? "calc(10px + (100vw - 1024px) * 0.08)"
                : "calc(40px + (100vw - 1440px) * 0.3)",
              top: isMobile ? "10px" : isTablet ? "20px" : 0,
              width: isMobile
                ? "clamp(72px, 20vw, 96px)"
                : isTablet
                ? "clamp(104px, 17.6vw, 176px)"
                : "clamp(192px, 21.1vw, 304px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        </>

        <motion.div
          variants={heroContainer}
          initial={false}
          animate="visible"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "860px",
            margin: "0 auto",
            padding: isMobile
              ? "52px 20px 48px"
              : isTablet
              ? "60px 40px 56px"
              : "80px 24px 72px",
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
              fontSize: isMobile ? "28px" : isTablet ? "36px" : "60px",
              color: "white",
              margin: "0 0 24px",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            Explore Orderly's
            <br />
            Unified Ecosystem
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroChild}
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 400",
              fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
              fontSize: isMobile ? "12px" : isTablet ? "10px" : "16.5px",
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
      </div>

      {/* ── Stats ── */}
      <motion.div
        variants={reveal}
        initial={false}
        animate="visible"
        style={{
          maxWidth: isMobile
            ? "calc(100% - 40px)"
            : isTablet
            ? "min(800px, calc(100% - 80px))"
            : "min(1000px, 87%)",
          margin: "0 auto",
          marginBottom: isMobile ? "48px" : "64px",
        }}
      >
        <div
          style={{
            background: "#6700CE",
            borderRadius: "30px",
            padding: isMobile
              ? "32px 24px"
              : isTablet
              ? "36px 32px"
              : "44px 64px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0",
          }}
        >
          {/* Traders */}
          <div
            style={{
              flex: 1,
              textAlign: "center",
              borderRight: !isMobile
                ? "1px solid rgba(255,255,255,0.2)"
                : "none",
            }}
          >
            <p
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: "'wght' 600",
                fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
                fontSize: isMobile ? "24px" : isTablet ? "36px" : "56px",
                color: "white",
                margin: "0 0 8px",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {TRADERS_COUNT}
            </p>
            <p
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: "'wght' 400",
                fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
                fontSize: isMobile ? "11px" : isTablet ? "14px" : "18px",
                color: "rgba(255,255,255,0.7)",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Traders
            </p>
          </div>

          {/* Total Trading Volume */}
          <div
            style={{
              flex: 1,
              textAlign: "center",
              borderRight: !isMobile
                ? "1px solid rgba(255,255,255,0.2)"
                : "none",
            }}
          >
            <p
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: "'wght' 600",
                fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
                fontSize: isMobile ? "24px" : isTablet ? "36px" : "56px",
                color: "white",
                margin: "0 0 8px",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {formatLargeNumber(stats.totalVolume)}
            </p>
            <p
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: "'wght' 400",
                fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
                fontSize: isMobile ? "11px" : isTablet ? "14px" : "18px",
                color: "rgba(255,255,255,0.7)",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Total Trading Volume
            </p>
          </div>

          {/* Supported chains - from API */}
          <div
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: "'wght' 600",
                fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
                fontSize: isMobile ? "24px" : isTablet ? "36px" : "56px",
                color: "white",
                margin: "0 0 8px",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {stats.chains}
            </p>
            <p
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: "'wght' 400",
                fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
                fontSize: isMobile ? "11px" : isTablet ? "14px" : "18px",
                color: "rgba(255,255,255,0.7)",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Supported chains
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Filter tabs ── */}
      <div
        style={{
          maxWidth: isMobile
            ? "calc(100% - 40px)"
            : isTablet
            ? "calc(100% - 80px)"
            : "min(1100px, 87%)",
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
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontVariationSettings: active ? "'wght' 600" : "'wght' 400",
                fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
                fontSize: isMobile ? "13px" : isTablet ? "13px" : "15px",
                padding: isMobile ? "9px 20px" : "11px 28px",
                borderRadius: "100px",
                border: active
                  ? "1.5px solid #6700CE"
                  : "1.5px solid rgba(255,255,255,0.15)",
                background: active ? "#6700CE" : "transparent",
                color: active ? "white" : "rgba(255,255,255,0.65)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}
            >
              {cat}
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "11px",
                  opacity: 0.75,
                }}
              >
                {cat === "Builder"
                  ? stats.liveBuilders
                  : cat === "All"
                  ? stats.liveBuilders + PARTNERS.filter((p) => p.category === "Ecosystem").length + PARTNERS.filter((p) => p.category === "Product").length
                  : PARTNERS.filter((p) => p.category === cat).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Partner grid ── */}
      <motion.div
        key={`${activeCategory}-${currentPage}`}
        variants={gridContainer}
        initial={false}
        animate="visible"
        style={{
          maxWidth: isMobile
            ? "calc(100% - 40px)"
            : isTablet
            ? "calc(100% - 80px)"
            : "min(1100px, 87%)",
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

      {currentPage === pageCount && (activeCategory === "Builder" || activeCategory === "All") && (
        <div style={{ textAlign: "center", marginTop: isMobile ? "4px" : "6px", marginBottom: isMobile ? "16px" : "24px", maxWidth: isMobile ? "calc(100% - 40px)" : isTablet ? "calc(100% - 80px)" : "min(1100px, 87%)", marginLeft: "auto", marginRight: "auto" }}>
          <a
            href="https://dex.orderly.network/board/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 500",
              fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
              fontSize: isMobile ? "14px" : "16px",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "color 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(156,117,255,0.9)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"; }}
          >
            and more...
          </a>
        </div>
      )}

      {/* ── Pagination ── */}
      {pageCount > 1 && (
        <div
          style={{
            maxWidth: isMobile
              ? "calc(100% - 40px)"
              : isTablet
              ? "calc(100% - 80px)"
              : "min(1100px, 87%)",
            margin: "0 auto",
            marginBottom: isMobile ? "24px" : "24px",
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
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
                  border: isActive
                    ? "1.5px solid #6700CE"
                    : "1.5px solid rgba(255,255,255,0.15)",
                  background: isActive ? "#6700CE" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                  fontVariationSettings: isActive ? "'wght' 700" : "'wght' 400",
                  fontFeatureSettings: "'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1",
                  fontSize: isMobile ? "13px" : isTablet ? "13px" : "15px",
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
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* ── Footer ── */}
      <motion.div
        variants={reveal}
        initial="visible"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {isMobile ? (
          <div
            style={{
              padding: "0 20px 32px",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
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
