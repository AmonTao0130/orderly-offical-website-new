import { Hyperlink } from "@/utils/constant";
import type { HTMLAttributeAnchorTarget } from "react";

export default [
  {
    title: "Developers",
    children: [
      {
        title: "Documentation",
        url: Hyperlink.Developers.Documentation,
        target: "_blank",
      },
      {
        title: "GitHub",
        url: Hyperlink.Developers.GitHub,
        target: "_blank",
      },
      {
        title: "Orderly SDKs",
        url: Hyperlink.Developers.OrderlySDK,
        target: "_blank",
        isNew: true,
      },
    ],
  },
  {
    title: "Traders",
    children: [
      {
        title: "Trade on Builders",
        url: Hyperlink.Traders.Builders,
      },
      {
        title: "Orderly Explorer",
        url: Hyperlink.Traders.OderlyExplorer,
        target: "_blank",
      },
      {
        title: "API Docs",
        url: Hyperlink.Traders.APIDocs,
        target: "_blank",
      },
    ],
  },
  {
    title: "Ecosystem",
    children: [
      {
        title: "Partners",
        url: Hyperlink.Ecosystem.Partners,
      },
      {
        title: "Blog",
        url: Hyperlink.Ecosystem.Blog,
      },
      {
        title: "Listing application",
        url: Hyperlink.Ecosystem.ListingApplication,
        target: "_blank",
      },
    ],
  },
  {
    title: "About",
    children: [
      {
        title: "Team",
        url: Hyperlink.About.Team,
      },
      {
        title: "Press Kit",
        url: Hyperlink.About.PressKit,
        target: "_blank",
        showArrow: true,
      },
      {
        title: "Careers",
        url: Hyperlink.About.Careers,
        target: "_blank",
      },
    ],
  },
  {
    title: "Legal",
    children: [
      {
        title: "Privacy Policy",
        url: Hyperlink.Legal.PrivacyPolicy,
      },
      {
        title: "Terms of Service",
        url: Hyperlink.Legal.TermsOfService,
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
