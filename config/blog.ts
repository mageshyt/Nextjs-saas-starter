export const BLOG_CATEGORIES: {
  title: string;
  slug: "news" | "education";
  description: string;
}[] = [
  {
    title: "News",
    slug: "news",
    description: "Updates and announcements from Next SaaS Starter.",
  },
  {
    title: "Education",
    slug: "education",
    description: "Educational content about SaaS management.",
  },
];

export const BLOG_AUTHORS = {
  magesh: {
    name: "mageshyt",
    image: "/_static/avatars/magesh.jpeg",
    twitter: "mageshyt",
  },
  shadcn: {
    name: "shadcn",
    image: "/_static/avatars/shadcn.jpeg",
    twitter: "shadcn",
  },
};

export type BlogAuthors = typeof BLOG_AUTHORS[keyof typeof BLOG_AUTHORS];
