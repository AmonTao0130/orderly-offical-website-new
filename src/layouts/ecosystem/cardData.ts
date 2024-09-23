import WOOFiPro from "./imgs/WOOFi.png";
import LayerZero from "./imgs/LayerZero.png";
import Optimism from "./imgs/Optimism.png";
import Arbitrum from "./imgs/Arbitrum.png";
import BASE from "./imgs/BASE.png";
import Elixir from "./imgs/Elixir.png";
import RageTrade from "./imgs/RageTrade.png";
import LogX from "./imgs/LogX.png";
import Empyreal from "./imgs/Empyreal.png";
import Polygon from "./imgs/Polygon.png";
import BTSE from "./imgs/BTSE.png";
import Unidex from "./imgs/Unidex.png";
import PrimeProtocol from "./imgs/PrimeProtocol.png";
import TangleSwap from "./imgs/TangleSwap.png";
import Moonpay from "./imgs/Moonpay.png";
import ZkAutomate from "./imgs/ZkAutomate.png";
import GoogleCloud from "./imgs/GoogleCloud.png";
import VOOI from "./imgs/VOOI.png";
import AscendEX from "./imgs/AscendEX.png";
import EMDX from "./imgs/EMDX.png";
import Bitoro from "./imgs/Bitoro.png";
import IBX from "./imgs/IBX.png";
import Dfyn from "./imgs/Dfyn.png";
import SharpeAI from "./imgs/SharpeAI.png";
import SableFinance from "./imgs/SableFinance.png";
import OXMarkets from "./imgs/OXMarkets.png";
import Alertatron from "./imgs/Alertatron.png";
import Unibot from "./imgs/Unibot.png";
import QuickSwap from "./imgs/QuickSwap.png";
import CoolWallet from "./imgs/CoolWallet.png";
import FusionX from "./imgs/FusionX.png";
import Xade from "./imgs/Xade.png";

export type TCardData = {
  icon: string;
  category: string;
  title: string;
  description: string;
  url: string;
};

export const cardData: TCardData[] = [
  {
    icon: WOOFiPro.src,
    category: "Builder",
    title: "WOOFi Pro",
    description: "All the tools you need, in one place.",
    url: "https://dex.woo.org/",
  },
  {
    icon: LayerZero.src,
    category: "Product",
    title: "LayerZero",
    description:
      "LayerZero is an omnichain interoperability protocol designed for lightweight message passing across chains.",
    url: "https://layerzero.network/",
  },
  {
    icon: Optimism.src,
    category: "Ecosystem",
    title: "Optimism",
    description:
      "Leading Ethereum L2 powering the Orderly’s Innovative Settlement Layer via OP Stack.",
    url: "https://www.optimism.io/",
  },
  {
    icon: Arbitrum.src,
    category: "Ecosystem",
    title: "Arbitrum",
    description:
      "Arbitrum is the leading L2 technology empowering builders to explore the largest L1 ecosystem - Ethereum.",
    url: "https://arbitrum.io/",
  },
  {
    icon: BASE.src,
    category: "Ecosystem",
    title: "BASE",
    description:
      "Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.",
    url: "https://www.base.org/",
  },
  {
    icon: Elixir.src,
    category: "Product",
    title: "Elixir",
    description:
      "Elixir Protocol is a high-throughput DPoS consensus network that enables anyone to supply liquidity to orderbooks.",
    url: "https://elixir.finance/",
  },
  {
    icon: RageTrade.src,
    category: "Builder",
    title: "Rage Trade",
    description:
      "Perp Aggregator. Best prices, aggregated liquidity, multichain.",
    url: "https://www.rage.trade/",
  },
  {
    icon: LogX.src,
    category: "Builder",
    title: "LogX",
    description:
      "LogX is a Decentralised Exchange for perps trading with aggregated liquidity.",
    url: "https://www.logx.trade/",
  },
  {
    icon: Empyreal.src,
    category: "Builder",
    title: "Empyreal",
    description:
      "Empyreal is an innovative development toolkit that aims to bridge the gap between the growing Web3 landscape and traditional developers.",
    url: "https://empyrealsdk.com/",
  },
  {
    icon: Polygon.src,
    category: "Ecosystem",
    title: "Polygon",
    description:
      "Polygon is the value layer of the internet that allows anyone to create and exchange value, powered by zero-knowledge technology.",
    url: "https://polygon.technology/",
  },
  {
    icon: BTSE.src,
    category: "Builder",
    title: "BTSE",
    description:
      "BTSE is a crypto exchange, offering simple, secure and efficient cryptocurrency trading.",
    url: "https://dex.btse.com/trade/",
  },
  {
    icon: QuickSwap.src,
    category: "Builder",
    title: "QuickSwap",
    description:
      "QuickSwap is a next-gen DEX offering lightning-fast trades, near-zero gas fees, and perps with up to 50x leverage.",
    url: "https://quickswap.exchange/#/falkor",
  },
  {
    icon: CoolWallet.src,
    category: "Builder",
    title: "CoolWallet",
    description:
      "CoolWallet is a self-custodial, multi-chain supported wallet that seamlessly integrates hardware and software with a mobile-first approach.",
    url: "https://perp.coolwallet.io",
  },
  {
    icon: FusionX.src,
    category: "Builder",
    title: "FusionX",
    description: "FuxionX is the one-stop DeFi ecosystem on Mantle Network.",
    url: "https://pro.fusionx.finance/perp/PERP_BTC_USDC",
  },
  {
    icon: Xade.src,
    category: "Builder",
    title: "Xade",
    description:
      "Xade is the ultimate trading app with over 100k+ spot and futures markets, including stocks, crypto, commodities, and forex.",
    url: "https://trade.xade.finance",
  },
  {
    icon: AscendEX.src,
    category: "Builder",
    title: "AscendEX",
    description:
      "AscendEX is a full-stack crypto platform that offers simple solutions for investing, trading, managing, and earning to help users maximize returns on their portfolio.",
    url: "https://dex.ascendex.com/",
  },
  {
    icon: EMDX.src,
    category: "Builder",
    title: "EMDX",
    description:
      "EMDX is a decentralized derivatives exchange bringing traditional assets into the web3 environment and enhancing cross-fi liquidity.",
    url: "https://emdx.io/",
  },
  {
    icon: Bitoro.src,
    category: "Builder",
    title: "Bitoro",
    description: "The Ultimate Hub for On-Chain Perpetual Futures Trading.",
    url: "https://bitoro.network/",
  },
  {
    icon: IBX.src,
    category: "Builder",
    title: "IBX",
    description:
      "IBX is a decentralized exchange that focuses on orderbook-based trading, offering secure crypto trades powered by Orderly.",
    url: "https://twitter.com/IBXtrade",
  },
  {
    icon: Dfyn.src,
    category: "Builder",
    title: "Dfyn",
    description:
      "Dfyn is the world's first on-chain limit order DEX combining RFQ matching with a concentrated liquidity AMM.",
    url: "https://exchange.dfyn.network/perp",
  },
  {
    icon: SharpeAI.src,
    category: "Builder",
    title: "SharpeAI",
    description:
      "SharpeAI is an AI-powered crypto super-app designed for professional traders, offering a unified platform for intelligence, investing, and automating digital assets.",
    url: "https://trade.sharpe.ai/",
  },
  {
    icon: SableFinance.src,
    category: "Builder",
    title: "Sable Finance",
    description:
      "Sable Finance is a pioneering decentralized multichain stablecoin protocol backed by liquid staking derivatives (LSD).",
    url: "https://trade.sable.finance/",
  },
  {
    icon: OXMarkets.src,
    category: "Builder",
    title: "OX.Markets",
    description:
      "Ox.Markets is a perpetual futures trading platform with the execution of a CEX and self-custody of a DEX.",
    url: "https://ox.markets/perp/PERP_ETH_USDC",
  },
  {
    icon: Alertatron.src,
    category: "Builder",
    title: "Alertatron",
    description:
      "Alertatron is an automated algorithmic trading platform designed for digital asset markets and utilizes user trading strategies.",
    url: "https://alertatron.com/",
  },
  {
    icon: Unibot.src,
    category: "Builder",
    title: "Unibot",
    description:
      "Unibot is the fastest on-chain trading terminal and telegram DEX trading bot.",
    url: "https://perps.unibot.app/",
  },
  {
    icon: Unidex.src,
    category: "Builder",
    title: "UniDex",
    description:
      "UniDex is a DeFi platform that aims to provide a hub for traders to access the best rates for their trades within the ecosystem",
    url: "https://www.unidex.exchange/",
  },
  {
    icon: PrimeProtocol.src,
    category: "Builder",
    title: "Prime Protocol",
    description:
      "Prime Protocol is a one-stop shop where investors can deposit all their digital assets across chains into a single protocol and receive credit anywhere.",
    url: "https://app.primeprotocol.xyz/trading/PERP_ETH_USDC",
  },
  {
    icon: TangleSwap.src,
    category: "Builder",
    title: "TangleSwap",
    description:
      "TangleSwap combines the best DeFi solutions for users to seamlessly manage and grow their digital assets.",
    url: "https://www.tangleswap.exchange/",
  },
  {
    icon: Moonpay.src,
    category: "Product",
    title: "Moonpay",
    description:
      "Moonpay is an all-in-one solution for managing multiple crypto wallets and buying crypto on the go.",
    url: "https://www.moonpay.com/",
  },
  {
    icon: ZkAutomate.src,
    category: "Builder",
    title: "zkAutomate",
    description:
      "zkAutomate is the world’s first automation algo using zero-knowledge proof for trading bots and DeFi management.",
    url: "https://zkautomate.com/",
  },
  {
    icon: GoogleCloud.src,
    category: "Product",
    title: "Google Cloud",
    description:
      "Google Cloud is a giant cloud-service provider enabling simple, secure tools, and infrastructure for Web3 builders.",
    url: "https://cloud.google.com/",
  },
  {
    icon: VOOI.src,
    category: "Builder",
    title: "VOOI",
    description:
      "VOOI is a capital-efficient, low-slippage, and multi-stablecoin liquidity pool designed for various DeFi platforms and individuals.",
    url: "https://vooi.io/",
  },
];
