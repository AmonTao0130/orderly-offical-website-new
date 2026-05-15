import type { Metadata } from "next";
import Listing from "@/app/pages/Listing";

export const metadata: Metadata = {
  title: "Permissionless Listing",
  description:
    "List perpetual markets on Orderly's matching and liquidation infrastructure — no manual queue, no bottleneck. Requires a $50K USDT Insurance Fund and a valid price feed.",
  alternates: {
    canonical: "https://orderly.network/listing",
  },
  openGraph: {
    title: "Permissionless Listing | Orderly Network",
    description:
      "List perpetual markets on Orderly's matching and liquidation infrastructure — no manual queue, no bottleneck. Requires a $50K USDT Insurance Fund and a valid price feed.",
    url: "https://orderly.network/listing",
  },
};

export default function Page() {
  return <Listing />;
}
