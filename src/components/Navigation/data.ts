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
        showArrow: true,
      },
      {
        title: "GitHub",
        url: Hyperlink.Developers.GitHub,
        target: "_blank",
        showArrow: true,
      },
      {
        title: "Orderly SDK",
        url: Hyperlink.Developers.OrderlySDK,
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
        url: Hyperlink.Traders.TradingdApps,
      },
      {
        title: "API Docs",
        url: Hyperlink.Traders.APITrading,
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
        url: Hyperlink.Ecosystem.Partners,
      },
      {
        title: "Blog",
        url: Hyperlink.Ecosystem.Blog,
      },
      {
        title: "Radiance Ventures",
        url: Hyperlink.Ecosystem.RadianceVentures,
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
        url: Hyperlink.SocialCarnival.SocialQuest,
      },
      {
        title: "Lottery",
        url: Hyperlink.SocialCarnival.Lottery,
      },
      {
        title: "Referral",
        url: Hyperlink.SocialCarnival.Referral,
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
