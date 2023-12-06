export type Article = {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        id: string;
        attributes: {
          name: string;
          url: string;
          formats: {
            small: {
              ext: string;
              url: string;
              name: string;
            };
            medium: {
              ext: string;
              url: string;
              name: string;
            };
            thumbnail: {
              ext: string;
              url: string;
              name: string;
            };
          };
        };
      };
    };
    category: {
      data: {
        id: number;
        attributes: {
          name: string;
          slug: string;
          description: string;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
    blocks: { id: number; body?: string }[];
  };
};

export type Categorg = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type TPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Meta = {
  pagination: TPagination;
};
