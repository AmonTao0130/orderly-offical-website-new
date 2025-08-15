import { Hyperlink } from "@/utils/constant";
import type { HTMLAttributeAnchorTarget, ReactNode } from "react";
import dune from "./img/dune.svg";

const data = [
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
        title: "Orderly SDKs",
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
        title: "Trade on Builders",
        url: Hyperlink.Traders.Builders,
      },
      {
        title: "Orderly Explorer",
        url: Hyperlink.Traders.OderlyExplorer,
        target: "_blank",
        showArrow: true,
      },
      {
        title: "Orderly Dashboard",
        url: Hyperlink.Traders.OrderlyDashboard,
        target: "_blank",
        showArrow: true,
      },
      {
        title: "API Docs",
        url: Hyperlink.Traders.APIDocs,
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
        title: "Listing",
        url: Hyperlink.Ecosystem.ListingApplication,
      },
    ],
  },
  {
    title: "Governance",
    url: Hyperlink.Governance,
    target: "_blank",
  },
  {
    title: "About",
    children: [
      {
        title: "Team",
        url: Hyperlink.About.Team,
      },
      {
        title: "Analytics",
        component: (
          <div className="flex justify-center items-center gap-x-1">
            Analytics <img src={dune.src} width="16px" height="16px" />
          </div>
        ),
        url: Hyperlink.About.Analytics,
        target: "_blank",
        showArrow: true,
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
  // {
  //   title: "Social Carnival",
  //   url: "/carnival",
  //   showHot: true,
  //   children: [
  //     {
  //       title: "Social Quest",
  //       url: Hyperlink.SocialCarnival.SocialQuest,
  //     },
  //     {
  //       title: "Lottery",
  //       url: Hyperlink.SocialCarnival.Lottery,
  //     },
  //     {
  //       title: "Referral",
  //       url: Hyperlink.SocialCarnival.Referral,
  //     },
  //   ],
  // },
] as {
  title: string;
  url?: string;
  target?: HTMLAttributeAnchorTarget;
  component?: ReactNode;
  showHot?: boolean;
  children: {
    title: string;
    component?: ReactNode;
    url: string;
    isNew?: boolean;
    showArrow?: boolean;
    target?: HTMLAttributeAnchorTarget;
  }[];
}[];

export default data;
