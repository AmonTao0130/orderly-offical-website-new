import type { Metadata } from "next";
import FAQ from "@/app/pages/FAQ";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Orderly Network — learn about our omnichain orderbook, trading fees, supported chains, ORDER token, and how to get started.",
  alternates: {
    canonical: "https://orderly.network/faq",
  },
  openGraph: {
    title: "FAQ | Orderly Network",
    description:
      "Frequently asked questions about Orderly Network — learn about our omnichain orderbook, trading fees, supported chains, ORDER token, and how to get started.",
    url: "https://orderly.network/faq",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Orderly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Orderly is a combination of an orderbook-based trading infrastructure and a robust liquidity layer offering perpetual futures orderbooks. Unlike traditional platforms, Orderly doesn't have a front end; instead, it operates at the core of the ecosystem, providing essential services to projects built on top of it. Our DEX white-label solution is carefully crafted to save builders time and capital while granting access to bootstrapped liquidity.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started as a trader?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traders can start using any interface built on Orderly listed on the Live DEX Board at https://dex.orderly.network. Simply connect your wallet to any Orderly-powered DEX, deposit collateral from 17+ chains, and begin trading perpetual futures with deep liquidity across 140+ assets.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started as a developer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Orderly lets you launch a fully branded perp DEX in minutes with OrderlyOne, or integrate deeply using the SDK and API. Developers can build customizable trading interfaces, aggregators, and bots on top of the shared orderbook. Check out our documentation to get started.",
      },
    },
    {
      "@type": "Question",
      name: "What can I build on Orderly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Orderly lets you easily build a fully customizable perp DEX with additional features such as cross-chain swaps, points programs, trading competitions, leaderboards, referral systems, and more. You can also build aggregators, trading bots, and hedging solutions on top of the orderbook infrastructure.",
      },
    },
    {
      "@type": "Question",
      name: "How are trading fees calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fees are added to the cost position for perpetual futures (denominated in USDC). Each broker/builder sets their own fee rates, giving builders full control over their revenue model.",
      },
    },
    {
      "@type": "Question",
      name: "Can I list my token on Orderly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Orderly is always looking to list more tokens. Visit the Listing page or reach out directly. There are no listing fees for qualifying projects, and your token will be accessible from 17+ chains across all Orderly-powered DEXs simultaneously.",
      },
    },
    {
      "@type": "Question",
      name: "What order types are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Orderly supports MARKET orders (execute at best available price), LIMIT orders (execute at a specified price or better), IOC (Immediate or Cancel), FOK (Fill or Kill), POST ONLY (maker-only, canceled if it would take liquidity), and REDUCE ONLY (only reduces an existing position).",
      },
    },
    {
      "@type": "Question",
      name: "How does Orderly ensure security?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All orders are signed by users' private trading keys and settled on-chain with those signatures. Public keys are stored on the contract and signatures are verified, ensuring that even if the operator is compromised, no fake orders can be executed and all user funds remain safe. The protocol has undergone multiple security audits.",
      },
    },
    {
      "@type": "Question",
      name: "Is Orderly omnichain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Orderly supports 17+ major blockchains including both EVM chains and Solana. All chains share the same unified orderbook, meaning liquidity is not fragmented. Traders on any supported chain access identical depth and pricing.",
      },
    },
    {
      "@type": "Question",
      name: "What is the ORDER token?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ORDER is Orderly Network's governance and utility token. Holders can stake ORDER to earn protocol revenue sharing, participate in governance votes via Snapshot, and access exclusive ecosystem benefits. The token was launched in August 2024.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQ />
    </>
  );
}
