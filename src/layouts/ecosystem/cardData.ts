import WOOFiPro from "./imgs/WOOFiPro.png";
import LayerZero from "./imgs/LayerZero.png";
import NEARProtocol from "./imgs/NEARProtocol.png";
import Optimism from "./imgs/Optimism.png";
import Arbitrum from "./imgs/Arbitrum.png";
import BTSE from "./imgs/BTSE.png";
import Elixir from "./imgs/Elixir.png";
import RageTrade from "./imgs/RageTrade.png";
import LogX from "./imgs/LogX.png";
import Empyreal from "./imgs/Empyreal.png";
import Polygon from "./imgs/Polygon.png";
import Unidex from "./imgs/Unidex.png";
import PrimeProtocol from "./imgs/PrimeProtocol.png";
import SWEAT from "./imgs/SWEAT.png";
import REFFinance from "./imgs/REFFinance.png";
import TangleSwap from "./imgs/TangleSwap.png";
import JUMPDeFi from "./imgs/JUMPDeFi.png";
import Moonpay from "./imgs/Moonpay.png";
import ZkAutomate from "./imgs/ZkAutomate.png";
import HereWallet from "./imgs/HereWallet.png";
import GoogleCloud from "./imgs/GoogleCloud.png";
import Avalanche from "./imgs/Avalanche.png";
import VOOI from "./imgs/VOOI.png";
import Sender from "./imgs/Sender.png";
import Scroll from "./imgs/Scroll.png";
import Linea from "./imgs/Linea.png";

export type TCardData = {
  icon: string;
  category: string;
  title: string;
  description: string;
  url: string;
};
const titles = ["All", "Builder", "Product", "Ecosystem"];

export const cardData: TCardData[] = [
  {
    icon: WOOFiPro.src,
    category: "Builder",
    title: "WOOFi Pro",
    description:
      "Delivering best liquidity, low fees, and superior execution to boost DeFi trading experiences.",
    url: "https://dex.woo.org/",
  },
  {
    icon: LayerZero.src,
    category: "Product",
    title: "LayerZero",
    description: "Trustless, omnichain interoperability protocol.",
    url: "https://layerzero.network/",
  },
  {
    icon: NEARProtocol.src,
    category: "Ecosystem",
    title: "NEAR Protocol",
    description:
      "Robust ecosystem of developers, founders, and contributors of innovative DeFi protocols building the open web together.",
    url: "https://near.org/",
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
      "EVM L2 scaling solution with a vibrant ecosystem of dApps, wallets, tools, and developers.",
    url: "https://arbitrum.io/",
  },
  {
    icon: BTSE.src,
    category: "Builder",
    title: "BTSE",
    description:
      "BTSE is a leading digital asset exchange that offers a simple and secure way to trade cryptocurrencies.",
    url: "https://dex.btse.com/trade/",
  },
  {
    icon: Elixir.src,
    category: "Product",
    title: "Elixir",
    description:
      "Innovative decentralized DPoS network enabling liquid markets for orderbook-based crypto exchanges.",
    url: "https://elixir.finance/",
  },
  {
    icon: RageTrade.src,
    category: "Builder",
    title: "Rage Trade",
    description: "Prime brokerage for perps.",
    url: "https://www.rage.trade/",
  },
  {
    icon: LogX.src,
    category: "Builder",
    title: "LogX",
    description: "Perps aggregator with cross-chain routing.",
    url: "https://www.logx.trade/",
  },
  {
    icon: Empyreal.src,
    category: "Builder",
    title: "Empyreal",
    description:
      "Simplifying Web3 development to amplify your creative vision.",
    url: "https://empyrealsdk.com/",
  },
  {
    icon: Polygon.src,
    category: "Ecosystem",
    title: "Polygon",
    description:
      "Robust multi-chain protocol for building and connecting EVM-compatible blockchain networks.",
    url: "https://polygon.technology/",
  },
  {
    icon: Unidex.src,
    category: "Builder",
    title: "Unidex",
    description:
      "Swaps & Perps aggregator dedicated to connecting all things trading into one place.",
    url: "https://www.unidex.exchange/",
  },
  {
    icon: PrimeProtocol.src,
    category: "Builder",
    title: "Prime Protocol",
    description: "Prime is the first natively cross-chain prime brokerage.",
    url: "https://app.primeprotocol.xyz/",
  },
  {
    icon: SWEAT.src,
    category: "Builder",
    title: "SWEAT",
    description:
      "Sweat is building an open economy of movement where people earn cryptos for physical activity.",
    url: "https://sweateconomy.com/",
  },
  {
    icon: REFFinance.src,
    category: "Builder",
    title: "REF Finance",
    description:
      "Open-source, community-led, and multi-purpose DeFi protocol built on the NEAR network.",
    url: "https://app.ref.finance/orderbook/perps",
  },
  {
    icon: TangleSwap.src,
    category: "Builder",
    title: "TangleSwap",
    description:
      "Multi-chain DeFi with seven integrated applications in one platform.",
    url: "https://www.tangleswap.exchange/",
  },
  {
    icon: JUMPDeFi.src,
    category: "Builder",
    title: "JUMP DeFi",
    description:
      "Lowering the barrier of entry to DeFi for users and developers.",
    url: "https://swap.jumpdefi.xyz/",
  },
  {
    icon: Moonpay.src,
    category: "Product",
    title: "Moonpay",
    description:
      "All-in-one solution for managing multiple crypto wallets and buying crypto on the go.",
    url: "https://www.moonpay.com/",
  },
  {
    icon: ZkAutomate.src,
    category: "Builder",
    title: "ZkAutomate",
    description:
      "No-code Automated Trading Bot & Smart Contract Automation platform for EVM & Non-EVM Developers.",
    url: "https://zkautomate.com/",
  },
  {
    icon: HereWallet.src,
    category: "Builder",
    title: "Here Wallet",
    description:
      "User-friendly and multifunctional mobile wallet for NEAR Protocol.",
    url: "https://www.herewallet.app/",
  },
  {
    icon: GoogleCloud.src,
    category: "Product",
    title: "Google Cloud",
    description:
      "Build and scale faster with simple, secure tools and infrastructure for Web3.",
    url: "https://cloud.google.com/",
  },
  {
    icon: Avalanche.src,
    category: "Ecosystem",
    title: "Avalanche",
    description:
      "Developer-friendly L1 Smart contracts platform that scales infinitely and regularly finalizes transactions in less than one second.",
    url: "https://www.avax.network/",
  },
  {
    icon: VOOI.src,
    category: "Builder",
    title: "VOOI",
    description:
      "EVM-based protocol facilitating capital efficient stableswaps for L2s.",
    url: "https://vooi.io/",
  },
  {
    icon: Sender.src,
    category: "Builder",
    title: "Sender",
    description:
      "Multi-chain digital asset management platform providing a one-stop solution for secure and convenient asset management.",
    url: "https://sender.org/",
  },
  {
    icon: Scroll.src,
    category: "Ecosystem",
    title: "Scroll",
    description: "Native zkEVM powering the scaling of EVM-based dApps. ",
    url: "https://scroll.io/",
  },
  {
    icon: Linea.src,
    category: "Ecosystem",
    title: "Linea",
    description:
      "zkEVM protocol enabling the next generation of Ethereum builders.",
    url: "https://linea.build/",
  },
];
