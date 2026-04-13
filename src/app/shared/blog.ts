/**
 * Blog – single source of truth for blog post data.
 *
 * Static data is used for now. When Strapi credentials are available,
 * replace BLOG_POSTS with a server-side fetch:
 *
 *   const res = await fetch(`${STRAPI_URL}/api/posts?populate=*&sort=publishedAt:desc`, {
 *     headers: { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` },
 *     next: { revalidate: 3600 },
 *   });
 *   const { data } = await res.json();
 *
 * The BlogPost interface maps to Strapi's response shape.
 */

export type BlogCategory =
  | "Announcements"
  | "Product"
  | "Ecosystem Spotlight"
  | "Thought-Leadership"
  | "Educational"
  | "Research";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Announcements",
  "Product",
  "Ecosystem Spotlight",
  "Thought-Leadership",
  "Educational",
  "Research",
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Trusted HTML string for article body */
  content: string;
  /** Human-readable date, e.g. "Apr 09, 2026" */
  date: string;
  /** ISO date for sorting & schema markup, e.g. "2026-04-09" */
  isoDate: string;
  category: BlogCategory;
  author: string;
  /** Absolute URL or root-relative path */
  coverImage?: string;
  /** Estimated read time in minutes */
  readTime: number;
  /** Pin this post to the featured slot on the list page */
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "permissionless-listings-are-live-on-orderly",
    title: "Permissionless Listings are LIVE on Orderly!",
    excerpt:
      "Any perp DEX can now list and manage their own assets without waiting for manual approval.",
    date: "Apr 09, 2026",
    isoDate: "2026-04-09",
    category: "Announcements",
    author: "Orderly Network",
    coverImage:
      "https://exuberant-sparkle-dc686d5c20.media.strapiapp.com/small_HE_59_s_Oao_AA_Elbq_8b6f6dcc06.jpeg",
    readTime: 5,
    featured: true,
    content: `
<p>Today we're excited to announce the launch of <strong>Permissionless Listings</strong> on Orderly — a major milestone that puts asset listing power directly in the hands of every DEX builder on our network.</p>

<h2>What Changes Today</h2>
<p>Previously, listing a new perpetual futures market on Orderly required a manual approval process. Starting now, any DEX builder operating on Orderly can list and manage their own perpetual futures markets autonomously — as long as the underlying asset has a supported price oracle.</p>

<h2>How It Works</h2>
<p>The new self-listing flow is a four-step process:</p>
<ol>
  <li><strong>Account Setup</strong> — Connect your broker account and verify Diamond Tier status.</li>
  <li><strong>Market Configuration</strong> — Choose your asset, set leverage limits, and configure fee tiers.</li>
  <li><strong>Preview &amp; Schedule</strong> — Review parameters and set a go-live time.</li>
  <li><strong>Liquidity Proof</strong> — Markets go live automatically once the $50,000 USDC insurance fund is deposited and sufficient liquidity depth is confirmed.</li>
</ol>

<h2>Revenue Sharing for Market Creators</h2>
<p>Builders who list markets don't just unlock new assets for their traders — they earn from them too:</p>
<ul>
  <li><strong>50% of trading fees</strong> from all volume on their listed markets</li>
  <li><strong>100% of liquidation fees</strong> generated on those markets</li>
</ul>

<h2>Safety by Design</h2>
<p>All permissionlessly listed markets use <strong>isolated margin</strong>, ensuring that any risk is contained to the individual market and doesn't affect the broader Orderly liquidity pool. Supported oracle sources include Binance, Coinbase, Bybit, and more.</p>

<p>This upgrade is available to all 200+ DEXs across 18+ blockchain networks building on Orderly. <a href="https://orderly.network/docs" target="_blank" rel="noopener noreferrer">Read the full documentation →</a></p>
    `,
  },
  {
    slug: "the-orderly-i-perps-trading-competition-is-live",
    title: "The Orderly I 💜 Perps Trading Competition is Live!",
    excerpt: "Trade for your shot at $35,000+ in rewards across all Orderly-powered DEXs.",
    date: "Apr 08, 2026",
    isoDate: "2026-04-08",
    category: "Announcements",
    author: "Orderly Network",
    readTime: 3,
    content: `
<p>The <strong>Orderly I 💜 Perps Trading Competition</strong> is officially live. Compete across any Orderly-powered DEX for your share of <strong>$35,000+ in USDC rewards</strong>.</p>

<h2>Competition Details</h2>
<ul>
  <li><strong>Prize Pool:</strong> $35,000+ USDC</li>
  <li><strong>Duration:</strong> April 8 – April 30, 2026</li>
  <li><strong>Eligible Platforms:</strong> All Orderly-powered DEXs</li>
  <li><strong>Ranking Metric:</strong> Total trading volume in perpetual futures markets</li>
</ul>

<h2>How to Participate</h2>
<p>Connect your wallet to any Orderly-powered DEX, start trading perps, and your volume counts. Rankings are updated in real time on the competition leaderboard.</p>

<p>Top traders by cumulative volume at the end of the competition period will receive USDC prizes distributed directly to their wallets within 7 business days.</p>

<h2>Why We're Running This</h2>
<p>This competition is part of our ongoing effort to drive deep liquidity across all Orderly-powered markets and reward the traders who make that possible. Deep liquidity means tighter spreads, better fills, and a better experience for everyone.</p>

<p><a href="https://app.orderly.network/campaigns" target="_blank" rel="noopener noreferrer">View the leaderboard and join now →</a></p>
    `,
  },
  {
    slug: "human-ux-and-agent-native-infrastructure",
    title: "Human UX and Agent-Native Infrastructure",
    excerpt:
      "The future of perp infrastructure is agent-native. Here's how Orderly is designed for both humans and autonomous agents.",
    date: "Mar 11, 2026",
    isoDate: "2026-03-11",
    category: "Thought-Leadership",
    author: "Orderly Network",
    readTime: 7,
    content: `
<p>As AI agents become more capable of executing complex financial strategies autonomously, the infrastructure they rely on needs to be redesigned — not retrofitted — for agent-native access.</p>

<h2>Two Audiences, One Infrastructure</h2>
<p>Orderly was built from day one around a shared orderbook accessible via API. Human traders interact through the polished UX of Orderly-powered DEXs. Agents interact through the same underlying infrastructure directly — with no UI layer in the way.</p>
<p>This is a key architectural advantage: we don't need to build separate "agent APIs" because the entire protocol is already programmatic.</p>

<h2>What Agent-Native Means in Practice</h2>
<p>For an infrastructure layer to be truly agent-native, it needs:</p>
<ul>
  <li><strong>Deterministic execution</strong> — agents cannot afford ambiguity in order outcomes.</li>
  <li><strong>Low latency</strong> — sub-second response times for order placement and cancellation.</li>
  <li><strong>Composable primitives</strong> — agents need to combine limit orders, reduce-only flags, and leverage controls without hitting frontend abstractions.</li>
  <li><strong>Cross-chain reach</strong> — agents operating on Solana should access the same liquidity as agents on Arbitrum.</li>
</ul>
<p>Orderly provides all of these through its REST and WebSocket APIs, which are already used by sophisticated market-makers operating on the network today.</p>

<h2>The MCP Layer</h2>
<p>We recently released the Orderly MCP (Model Context Protocol) server, which allows AI assistants and autonomous agents to interact with the protocol using natural language queries. This is the bridge between the "human UX" world and the "agent-native" world.</p>
<p>A developer can describe a hedging strategy in plain English; the MCP server translates that into the appropriate sequence of API calls against the Orderly orderbook.</p>

<h2>Looking Ahead</h2>
<p>We believe the next generation of perp DEX volume will be driven significantly by autonomous agents. Infrastructure that isn't designed for this reality will struggle to compete. We're building for both audiences simultaneously — and the architecture is already there.</p>
    `,
  },
  {
    slug: "orderly-integrates-with-ceffu",
    title: "Orderly Integrates with Ceffu",
    excerpt:
      "Institutional traders can now access Orderly's omnichain orderbook through Ceffu's MPC custody infrastructure.",
    date: "Dec 02, 2025",
    isoDate: "2025-12-02",
    category: "Ecosystem Spotlight",
    author: "Orderly Network",
    readTime: 4,
    content: `
<p>We're pleased to announce a new integration between <strong>Orderly Network</strong> and <strong>Ceffu</strong>, the institutional digital asset custody platform. This partnership brings regulated, MPC-secured custody infrastructure to Orderly's omnichain perpetual futures orderbook.</p>

<h2>About Ceffu</h2>
<p>Ceffu (formerly Binance Custody) is a leading institutional digital asset platform offering qualified custodian services with MPC (Multi-Party Computation) wallet technology. Their infrastructure is used by hedge funds, family offices, and trading firms that require institutional-grade security and compliance.</p>

<h2>What This Integration Enables</h2>
<p>Through this integration:</p>
<ul>
  <li>Institutional traders using Ceffu can now access Orderly's deep perpetual futures liquidity without moving assets off-custody.</li>
  <li>MPC signatures ensure that order signing happens securely within the Ceffu environment.</li>
  <li>Institutions gain access to 140+ trading pairs across 18+ chains through a single integration point.</li>
</ul>

<h2>Why Institutional Access Matters</h2>
<p>Institutional participation is critical for deep, sustainable liquidity in decentralized markets. By integrating with Ceffu, Orderly makes it significantly easier for institutional capital to participate in the on-chain perp ecosystem without compromising on security or regulatory requirements.</p>

<p>This is part of Orderly's broader push to become the institutional-grade backbone for decentralized perpetual futures trading.</p>
    `,
  },
  {
    slug: "buybacks",
    title: "Buy Backs are LIVE",
    excerpt:
      "The next phase of Orderly's token economy is officially live. Here's how the buyback program works and what it means for ORDER holders.",
    date: "Nov 04, 2025",
    isoDate: "2025-11-04",
    category: "Announcements",
    author: "Orderly Network",
    readTime: 4,
    content: `
<p>Today we're activating the <strong>ORDER buyback program</strong> — the next phase of Orderly's token economy. Starting immediately, a portion of protocol revenue will be used to buy ORDER tokens from the open market.</p>

<h2>How the Buyback Works</h2>
<p>A percentage of net protocol fees collected by the Orderly treasury will be automatically allocated to market-buying ORDER. Purchased tokens will be burned, permanently reducing the total supply.</p>
<p>The exact allocation percentage is determined by governance vote and can be adjusted over time by ORDER holders.</p>

<h2>Why Buybacks Now</h2>
<p>With protocol revenue now consistently positive and growing, the DAO has voted to activate the buyback mechanism as the next step in distributing value back to the ecosystem. This complements the existing staking rewards program.</p>

<h2>What This Means for Holders</h2>
<ul>
  <li><strong>Stakers</strong> continue to earn their share of protocol revenue through the staking rewards pool.</li>
  <li><strong>All holders</strong> benefit from the deflationary pressure created by on-market buybacks and burns.</li>
  <li>The combined mechanism creates multiple vectors of value accrual for the ORDER token.</li>
</ul>

<p>Track buyback activity in real time on the <a href="https://dune.com/orderly_network/orderly-dashboard" target="_blank" rel="noopener noreferrer">Orderly Dune dashboard →</a></p>
    `,
  },
  {
    slug: "CQ3",
    title: "Community Call Q3: Presentation Slides",
    excerpt:
      "Slides and key takeaways from the Q3 2025 community call covering protocol growth, roadmap updates, and ecosystem highlights.",
    date: "Oct 23, 2025",
    isoDate: "2025-10-23",
    category: "Product",
    author: "Orderly Network",
    readTime: 3,
    content: `
<p>Thank you to everyone who joined the Q3 2025 Orderly Community Call. We covered a lot of ground — here's a summary of the key highlights and the presentation slides for those who missed it.</p>

<h2>Protocol Growth Highlights</h2>
<ul>
  <li>Cumulative trading volume surpassed <strong>$5B</strong> during Q3</li>
  <li>Active builders on the network grew to <strong>200+</strong></li>
  <li>18 chains now supported with Solana volume growing fastest QoQ</li>
  <li>140+ trading pairs available across all Orderly-powered DEXs</li>
</ul>

<h2>Roadmap Updates</h2>
<p>Key items discussed for Q4 2025 and early 2026:</p>
<ul>
  <li><strong>Permissionless Listings</strong> — Now live as of April 2026</li>
  <li><strong>Institutional custody integrations</strong> — Ceffu partnership announced in December</li>
  <li><strong>Enhanced analytics</strong> — New builder dashboard with per-market revenue tracking</li>
  <li><strong>Agent-native documentation</strong> — Dedicated guides for AI agents and bots</li>
</ul>

<h2>Ecosystem Spotlights</h2>
<p>The call featured demos from three builders in the ecosystem showing innovative use cases built on Orderly's shared orderbook, including a cross-chain arbitrage bot and a copy-trading platform.</p>

<h2>Download the Slides</h2>
<p>The full presentation deck is available on our <a href="https://governance.orderly.network" target="_blank" rel="noopener noreferrer">governance forum →</a></p>
    `,
  },
  {
    slug: "understanding-orderly-fee-model",
    title: "Understanding the Orderly Fee Model",
    excerpt:
      "A deep dive into how trading fees work on Orderly — from maker/taker rates to how builders set their own revenue tiers.",
    date: "Sep 15, 2025",
    isoDate: "2025-09-15",
    category: "Educational",
    author: "Orderly Network",
    readTime: 6,
    content: `
<p>One of the most important aspects of building or trading on any DEX is understanding how fees work. Orderly's fee model is designed to be flexible for builders while remaining transparent for traders. Here's a complete breakdown.</p>

<h2>The Two-Layer Fee Structure</h2>
<p>Orderly operates a two-layer fee structure:</p>
<ol>
  <li><strong>Protocol fee</strong> — a small base fee collected by the Orderly treasury on every trade.</li>
  <li><strong>Broker fee</strong> — an additional fee set by each individual DEX builder (broker) on top of the protocol fee.</li>
</ol>
<p>Traders always pay the combined total. Builders keep their broker fee in full.</p>

<h2>Maker vs. Taker Rates</h2>
<p>Like most orderbook-based exchanges, Orderly distinguishes between makers (who add liquidity) and takers (who remove it):</p>
<ul>
  <li><strong>Makers</strong> — post limit orders that sit in the orderbook. Typically charged lower fees or even receive rebates.</li>
  <li><strong>Takers</strong> — execute market orders or fill existing limit orders. Charged the standard taker rate.</li>
</ul>

<h2>How Builders Set Their Fees</h2>
<p>Every builder who launches a DEX on Orderly can configure their own fee tiers via the broker dashboard. This means you can:</p>
<ul>
  <li>Run a <strong>zero-fee promotion</strong> by setting your broker fee to 0.</li>
  <li>Offer <strong>tiered fees</strong> based on user volume or stake.</li>
  <li>Set <strong>different rates</strong> for different trading pairs.</li>
</ul>

<h2>Where Do Fees Go?</h2>
<p>Protocol fees flow to the Orderly treasury and are distributed to ORDER stakers as protocol revenue. Broker fees flow directly to the builder's designated wallet. This alignment ensures both the protocol and its builders are incentivized to grow volume.</p>
    `,
  },
  {
    slug: "orderly-liquidity-architecture",
    title: "Orderly's Shared Liquidity Architecture Explained",
    excerpt:
      "How does a single orderbook serve 200+ DEXs across 18 chains without fragmenting liquidity? A technical overview.",
    date: "Aug 20, 2025",
    isoDate: "2025-08-20",
    category: "Research",
    author: "Orderly Network",
    readTime: 8,
    content: `
<p>Fragmented liquidity is one of the biggest unsolved problems in DeFi. Most multi-chain protocols end up with separate liquidity pools on each chain, leading to poor price discovery, wide spreads, and shallow depth. Orderly takes a fundamentally different approach.</p>

<h2>One Orderbook, Many Frontends</h2>
<p>At the core of Orderly's architecture is a <strong>single shared orderbook</strong>. Every DEX built on Orderly — regardless of which chain they're deployed on — routes orders into and out of this central book. The result: 200+ DEXs and thousands of traders all contributing to and drawing from the same pool of liquidity.</p>

<h2>How Cross-Chain Settlement Works</h2>
<p>When a trader on Arbitrum opens a position, the following happens:</p>
<ol>
  <li>The DEX frontend (on any chain) signs the order with the user's trading key.</li>
  <li>The signed order is submitted to Orderly's off-chain matching engine.</li>
  <li>The engine matches the order against the global orderbook.</li>
  <li>Settlement proofs are submitted to the Orderly settlement layer, which verifies signatures and updates balances.</li>
  <li>Users can withdraw back to any supported chain at any time.</li>
</ol>

<h2>The Role of Vaults</h2>
<p>Each supported chain has an Orderly Vault contract that holds user collateral. Deposits flow in from any chain; withdrawals flow out to any chain. The Vault doesn't hold positions — it's purely a collateral custodian, with the matching engine handling all position logic off-chain.</p>

<h2>Why This Matters for Liquidity Depth</h2>
<p>Because all liquidity is unified, market-makers only need to quote once to serve all 200+ DEXs simultaneously. This creates a positive flywheel: more DEXs → more volume → better spreads → more traders → more DEXs. Traditional siloed architectures cannot replicate this effect without fragmenting their maker incentives.</p>

<h2>Security Model</h2>
<p>All orders must be signed with users' private trading keys. Even if the off-chain engine were compromised, it cannot execute unsigned orders. Settlement proofs are verified on-chain, maintaining the trustless guarantee that defines DeFi.</p>
    `,
  },
  {
    slug: "introducing-orderlyai",
    title: "Introducing Orderly AI: Trade and Build with Natural Language",
    excerpt:
      "We've launched an MCP server and AI tools that let you interact with the Orderly protocol using plain English commands.",
    date: "Jul 10, 2025",
    isoDate: "2025-07-10",
    category: "Product",
    author: "Orderly Network",
    readTime: 5,
    content: `
<p>Today we're introducing the <strong>Orderly MCP Server</strong> — a Model Context Protocol integration that lets AI assistants and autonomous agents interact with the Orderly protocol using natural language.</p>

<h2>What Is MCP?</h2>
<p>Model Context Protocol (MCP) is an open standard for connecting AI models to external tools and services. By implementing an MCP server, we allow any compatible AI assistant — including Claude, GPT-4, and others — to query balances, place orders, and monitor positions on Orderly through conversational commands.</p>

<h2>What You Can Do</h2>
<p>With the Orderly MCP server, you can:</p>
<ul>
  <li>Ask "What's my current ETH-PERP position?" and get a real-time answer.</li>
  <li>Instruct an agent to "Set a limit buy for 0.5 BTC at $80,000" and have it execute.</li>
  <li>Request a summary of your PnL over the past week.</li>
  <li>Build automated strategies that self-describe in natural language for easier debugging and auditing.</li>
</ul>

<h2>Getting Started</h2>
<p>Install the MCP server with a single command:</p>
<pre><code>npx @orderly.network/mcp-server init</code></pre>
<p>Full documentation is available at <a href="https://orderly.network/docs" target="_blank" rel="noopener noreferrer">orderly.network/docs →</a></p>

<h2>Why This Matters</h2>
<p>We're entering an era where AI agents execute significant portions of trading volume. Infrastructure that isn't designed for agent-native access will be left behind. The Orderly MCP server is our commitment to being first-class infrastructure for the agentic trading era.</p>
    `,
  },
  {
    slug: "solana-expansion",
    title: "Orderly Expands to Solana",
    excerpt:
      "Solana traders can now access Orderly's shared orderbook and 140+ perpetual futures markets. Here's what that means for the ecosystem.",
    date: "May 28, 2025",
    isoDate: "2025-05-28",
    category: "Announcements",
    author: "Orderly Network",
    readTime: 4,
    content: `
<p>Orderly Network is now live on <strong>Solana</strong>. This marks a major expansion of our omnichain footprint, bringing Solana's high-throughput ecosystem into the same unified orderbook as our EVM chains.</p>

<h2>What's Available on Solana</h2>
<ul>
  <li>Access to all <strong>140+ perpetual futures markets</strong> on the shared Orderly orderbook</li>
  <li>Deposit and withdraw USDC natively on Solana</li>
  <li>Sub-second order execution via Orderly's matching engine</li>
  <li>Full API support — all existing REST and WebSocket endpoints work for Solana wallets</li>
</ul>

<h2>For DEX Builders</h2>
<p>Builders on Solana can now deploy Orderly-powered perp DEXs using our Solana SDK. The integration process mirrors the EVM flow — connect your program to the Orderly Vault on Solana, configure your broker settings, and you're live with deep liquidity from day one.</p>

<h2>Liquidity Impact</h2>
<p>Solana's addition doesn't create a separate Solana liquidity pool — it contributes to the same global orderbook. Volume from Solana traders deepens liquidity for all Orderly-powered DEXs simultaneously, regardless of chain.</p>

<p>This is the value of shared infrastructure: every new chain added benefits the entire ecosystem.</p>

<p><a href="https://orderly.network/docs" target="_blank" rel="noopener noreferrer">Start building on Solana →</a></p>
    `,
  },
  {
    slug: "orderly-q1-2025-recap",
    title: "Orderly Q1 2025: Growth, Milestones & What's Next",
    excerpt:
      "A look back at Q1 2025 — record trading volumes, new chain integrations, and the ecosystem builders driving Orderly forward.",
    date: "Apr 10, 2025",
    isoDate: "2025-04-10",
    category: "Announcements",
    author: "Orderly Network",
    readTime: 5,
    content: `<p>Q1 2025 was Orderly's strongest quarter to date. Here's a recap of what we shipped and where we're headed.</p>`,
  },
  {
    slug: "what-is-a-shared-orderbook",
    title: "What Is a Shared Orderbook and Why Does It Matter?",
    excerpt:
      "Most DEXs operate with isolated liquidity. A shared orderbook changes that entirely — here's the primer every DeFi builder should read.",
    date: "Mar 25, 2025",
    isoDate: "2025-03-25",
    category: "Educational",
    author: "Orderly Network",
    readTime: 6,
    content: `<p>A shared orderbook is the core innovation behind Orderly's liquidity model. Instead of each DEX maintaining its own pool, every platform built on Orderly routes into a single, unified book.</p>`,
  },
  {
    slug: "builder-spotlight-woofi-pro",
    title: "Builder Spotlight: WOOFi Pro",
    excerpt:
      "How WOOFi Pro built a professional-grade perpetuals trading experience on top of Orderly's omnichain infrastructure.",
    date: "Mar 05, 2025",
    isoDate: "2025-03-05",
    category: "Ecosystem Spotlight",
    author: "Orderly Network",
    readTime: 4,
    content: `<p>WOOFi Pro launched as one of the earliest builders on Orderly and has grown into one of the highest-volume DEXs in the ecosystem.</p>`,
  },
  {
    slug: "orderly-chain-deep-dive",
    title: "Inside the Orderly Chain: Settlement, Security, and Speed",
    excerpt:
      "A technical deep dive into the Orderly settlement layer — how it processes thousands of trades per second while maintaining trustless guarantees.",
    date: "Feb 18, 2025",
    isoDate: "2025-02-18",
    category: "Research",
    author: "Orderly Network",
    readTime: 9,
    content: `<p>The Orderly Chain is purpose-built for high-throughput perpetual futures settlement. It is not a general-purpose EVM chain — every design decision optimizes for trade processing speed and finality guarantees.</p>`,
  },
  {
    slug: "perp-dex-builder-guide",
    title: "The Complete Guide to Launching a Perp DEX on Orderly",
    excerpt:
      "From API key to live trading: a step-by-step walkthrough of everything you need to build a production-ready perpetual futures DEX.",
    date: "Jan 30, 2025",
    isoDate: "2025-01-30",
    category: "Educational",
    author: "Orderly Network",
    readTime: 10,
    content: `<p>Building a perp DEX from scratch is hard. Building on Orderly means you skip the hardest parts: matching engine, order routing, and liquidity bootstrapping.</p>`,
  },
  {
    slug: "order-staking-explainer",
    title: "ORDER Staking Explained: Rewards, Tiers, and Strategy",
    excerpt:
      "Everything you need to know about staking ORDER — how reward rates are calculated, what tier benefits unlock, and how to maximize your yield.",
    date: "Jan 14, 2025",
    isoDate: "2025-01-14",
    category: "Educational",
    author: "Orderly Network",
    readTime: 6,
    content: `<p>ORDER staking is the primary mechanism through which token holders participate in protocol revenue. This guide explains exactly how it works.</p>`,
  },
  {
    slug: "2024-year-in-review",
    title: "2024 Year in Review: Orderly's Breakout Year",
    excerpt:
      "From 3 chains to 18, from dozens of builders to 200+. A look at how Orderly grew in 2024 and what we're building toward in 2025.",
    date: "Dec 30, 2024",
    isoDate: "2024-12-30",
    category: "Announcements",
    author: "Orderly Network",
    readTime: 7,
    content: `<p>2024 was the year Orderly proved the shared orderbook model at scale. Here's the full story.</p>`,
  },
  {
    slug: "omnichain-perps-thesis",
    title: "The Omnichain Perps Thesis",
    excerpt:
      "Why we believe omnichain perpetual futures infrastructure will become the most important layer in DeFi over the next three years.",
    date: "Nov 20, 2024",
    isoDate: "2024-11-20",
    category: "Thought-Leadership",
    author: "Orderly Network",
    readTime: 8,
    content: `<p>Perpetual futures are already the dominant product in crypto. The question isn't whether perps will dominate DeFi — it's which infrastructure layer will win.</p>`,
  },
  {
    slug: "market-making-on-orderly",
    title: "How Market Making Works on Orderly",
    excerpt:
      "A technical guide to market making on the Orderly orderbook — from API access and quoting strategies to maker rebates and risk management.",
    date: "Oct 08, 2024",
    isoDate: "2024-10-08",
    category: "Research",
    author: "Orderly Network",
    readTime: 7,
    content: `<p>Market makers are the backbone of any healthy orderbook. On Orderly, maker activity is incentivized through rebates and benefits from the unified liquidity across 200+ DEX frontends.</p>`,
  },
  {
    slug: "builder-spotlight-raydium",
    title: "Builder Spotlight: Raydium Brings Perps to Solana",
    excerpt:
      "How Raydium integrated Orderly's shared orderbook to add perpetual futures to the largest DEX on Solana.",
    date: "Sep 12, 2024",
    isoDate: "2024-09-12",
    category: "Ecosystem Spotlight",
    author: "Orderly Network",
    readTime: 4,
    content: `<p>When Raydium decided to add perpetual futures, they chose Orderly's shared orderbook as the infrastructure layer. Here's how that integration came together.</p>`,
  },
  {
    slug: "cross-chain-margin-explained",
    title: "Cross-Chain Margin: Deposit on Any Chain, Trade on All",
    excerpt:
      "One of Orderly's most powerful features lets traders deposit USDC on any supported chain and trade across all markets instantly. Here's how it works.",
    date: "Aug 05, 2024",
    isoDate: "2024-08-05",
    category: "Educational",
    author: "Orderly Network",
    readTime: 5,
    content: `<p>Cross-chain margin is a feature unique to Orderly's omnichain architecture. Unlike siloed DEXs where your Arbitrum USDC can only trade Arbitrum markets, Orderly unifies your margin across all supported chains.</p>`,
  },
];
