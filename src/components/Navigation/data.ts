import type { HTMLAttributeAnchorTarget } from "react";

export default [
  {
    title: "Developers",
    children: [
      {
        title: "Documentation",
        url: "https://orderly.network/docs/getting-started/what-is-orderly-network",
        target: "_blank",
        showArrow: true,
      },
      {
        title: "GitHub",
        url: "https://github.com/OrderlyNetwork",
        target: "_blank",
        showArrow: true,
      },
      {
        title: "Orderly SDK",
        url: "https://sdk.orderly.network/docs/hooks/overview",
        target: "_blank",
        isNew: true,
        showArrow: true,
      },
    ],
  },
  {
    title: "Traders",
    children: [
      {
        title: "Trading dApps",
        url: "/docs/trade-on-orderly/trading-guis",
      },
      {
        title: "API Trading",
        url: "https://orderly.network/docs/trade-on-orderly/trade-on-orderly",
        target: "_blank",
        showArrow: true,
      },
    ],
  },
  {
    title: "Ecosystem",
    children: [
      {
        title: "Partners",
        url: "/partners",
      },
      {
        title: "Blog",
        url: "/blog",
      },
      {
        title: "Radiance Ventures",
        url: "https://radianceventures.io/",
        target: "_blank",
        showArrow: true,
      },
    ],
  },
  {
    title: "About",
    children: [
      {
        title: "Team",
        url: "/team",
      },
      {
        title: "Press Kit",
        url: "https://drive.google.com/drive/u/0/folders/1Nn3iwYqYxqIFGZbnu-mfUvaTVHrY5G1T",
        target: "_blank",
        showArrow: true,
      },
      {
        title: "Careers",
        url: "https://boards.greenhouse.io/orderlynetwork",
        target: "_blank",
        showArrow: true,
      },
    ],
  },
  {
    title: "Social Carnival",
    url: "/carnival",
    showHot: true,
    children: [
      {
        title: "Social Quest",
        url: "https://orderly.network/carnival",
      },
      {
        title: "Lottery",
        url: "https://lottery.orderly.network",
      },
      {
        title: "Referral",
        url: "https://referral.orderly.network",
      },
    ],
  },
] as {
  title: string;
  showHot?: boolean;
  children: {
    title: string;
    url: string;
    isNew?: boolean;
    showArrow?: boolean;
    target?: HTMLAttributeAnchorTarget;
  }[];
}[];
