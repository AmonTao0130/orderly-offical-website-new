import type { HTMLAttributeAnchorTarget } from "react";

export default [
  {
    title: "Developers",
    children: [
      {
        title: "Documentation",
        url: "https://orderly.network/docs/getting-started/what-is-orderly-network",
        target: "_blank",
      },
      {
        title: "GitHub",
        url: "https://github.com/OrderlyNetwork",
        target: "_blank",
      },
      {
        title: "Orderly SDK",
        url: "https://sdk.orderly.network/docs/hooks/overview",
        target: "_blank",
        isNew: true,
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
      },
    ],
  },
  {
    title: "Ecosystem",
    children: [
      {
        title: "Ecosystem Partners",
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
        title: "Careers",
        url: "https://drive.google.com/drive/u/0/folders/1Nn3iwYqYxqIFGZbnu-mfUvaTVHrY5G1T",
        target: "_blank",
      },
      {
        title: "Contact",
        url: "mailto:hello@orderly.network",
      },
    ],
  },
  {
    title: "Legal",
    children: [
      {
        title: "Privacy Policy",
        url: "/docs/privacy-policy",
      },
      {
        title: "Terms of Service",
        url: "/docs/terms-of-service",
      },
    ],
  },
] as {
  title: string;
  children: {
    title: string;
    url: string;
    isNew?: boolean;
    target?: HTMLAttributeAnchorTarget;
  }[];
}[];
