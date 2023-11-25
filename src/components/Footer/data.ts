export default [
  {
    title: "Developers",
    children: [
      {
        title: "Documentation",
        url: "",
      },
      {
        title: "GitHub",
        url: "",
      },
      {
        title: "Orderly SDK",
        url: "",
        isNew: true,
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
      },
    ],
  },
  {
    title: "Ecosystem",
    children: [
      {
        title: "Ecosystem Partners",
        url: "",
      },
      {
        title: "Blog",
        url: "",
      },
      {
        title: "Radiance Ventures",
        url: "",
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
        title: "Careers",
        url: "",
      },
      {
        title: "Contact",
        url: "",
      },
    ],
  },
  {
    title: "Legal",
    children: [
      {
        title: "Privacy Policy",
        url: "",
      },
      {
        title: "Terms of Service",
        url: "",
      },
    ],
  },
] as {
  title: string;
  children: { title: string; url: string; isNew?: boolean }[];
}[];
