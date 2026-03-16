import type { Metadata } from "next";
import Partners from "@/app/pages/Partners";

export const metadata: Metadata = {
  title: "Ecosystem Partners",
  description:
    "Explore Orderly's unified ecosystem — CEXs, DEXs, aggregators, wallets, and blockchain networks all powered by Orderly's shared permissionless liquidity layer.",
  alternates: {
    canonical: "https://orderly.network/partners",
  },
  openGraph: {
    title: "Ecosystem Partners | Orderly Network",
    description:
      "Explore Orderly's unified ecosystem — CEXs, DEXs, aggregators, wallets, and blockchain networks all powered by Orderly's shared permissionless liquidity layer.",
    url: "https://orderly.network/partners",
  },
};

export default function Page() {
  return <Partners />;
}
