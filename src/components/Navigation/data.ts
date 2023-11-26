export default [
  {
    title: "Developers",
    children: [
      {
        title: "Documentation",
        url: "",
        showArrow: true,
      },
      {
        title: "GitHub",
        url: "",
        showArrow: true,
      },
      {
        title: "Orderly SDK",
        url: "",
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
        url: "",
      },
      {
        title: "API Trading",
        url: "",
        showArrow: true,
      },
    ],
  },
  {
    title: "Ecosystem",
    children: [
      {
        title: "Partners",
        url: "",
      },
      {
        title: "Blog",
        url: "",
      },
      {
        title: "Radiance Ventures",
        url: "",
        showArrow: true,
      },
    ],
  },
  {
    title: "About",
    children: [
      {
        title: "Team",
        url: "",
      },
      {
        title: "Press Kit",
        url: "",
        showArrow: true,
      },
      {
        title: "Careers",
        url: "",
        showArrow: true,
      },
    ],
  },
  {
    title: "Social Carnival",
    url: "",
  },
] as {
  title: string;
  children: {
    title: string;
    url: string;
    isNew?: boolean;
    showArrow?: boolean;
  }[];
}[];
