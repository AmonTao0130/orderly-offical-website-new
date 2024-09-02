export default {
  "/api/categories?sort=id": {
    data: [
      {
        id: 5,
        attributes: {
          name: "Announcements",
          slug: "Announcements",
          description: "Orderly Network Campaigns, Events, etc announcements",
          createdAt: "2023-11-28T09:30:12.716Z",
          updatedAt: "2023-12-01T08:08:05.544Z",
        },
      },
      {
        id: 3,
        attributes: {
          name: "Product",
          slug: "Product",
          description:
            "Orderly Network product-related blogs (deep-dives, tutorials, articles, etc.)",
          createdAt: "2023-11-28T09:30:12.700Z",
          updatedAt: "2024-03-11T11:08:49.824Z",
        },
      },
      {
        id: 7,
        attributes: {
          name: "Ecosystem Spotlight",
          slug: "Ecosytem-Spotlight",
          description:
            "All Orderly Network publications/profiles/interviews on people, partners, and (or) affiliated projects",
          createdAt: "2024-03-11T08:20:24.767Z",
          updatedAt: "2024-03-11T10:52:12.066Z",
        },
      },

      {
        id: 4,
        attributes: {
          name: "Thought-Leadership",
          slug: "Thought-Leadership",
          description:
            "Industry Opinions, Thought-Leadership, C-suite Keynotes, Panel Discussions, etc. ",
          createdAt: "2023-11-28T09:30:12.709Z",
          updatedAt: "2023-12-01T08:16:22.867Z",
        },
      },
      {
        id: 2,
        attributes: {
          name: "Educational",
          slug: "Educational",
          description: "Generic SEO-optimized educational content",
          createdAt: "2023-11-28T09:30:12.672Z",
          updatedAt: "2023-12-01T08:09:31.020Z",
        },
      },
      {
        id: 1,
        attributes: {
          name: "Research",
          slug: "Research",
          description:
            "All Orderly Network (or affiliated projects) research publications",
          createdAt: "2023-11-28T09:30:12.663Z",
          updatedAt: "2023-12-01T08:14:03.871Z",
        },
      },
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: 6,
      },
    },
  },
} as any;
