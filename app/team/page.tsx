import type { Metadata } from "next";
import Team from "@/app/pages/Team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the visionaries behind Orderly Network — co-founders Ran Yi and Terence Ng, and the world-class investors backing institutional-grade DeFi infrastructure.",
  alternates: {
    canonical: "https://orderly.network/team",
  },
  openGraph: {
    title: "Team | Orderly Network",
    description:
      "Meet the visionaries behind Orderly Network — co-founders Ran Yi and Terence Ng, and the world-class investors backing institutional-grade DeFi infrastructure.",
    url: "https://orderly.network/team",
  },
};

export default function Page() {
  return <Team />;
}
