import { env } from "@/env";
import { SiteConfig } from "@/types";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "NextJs SaaS Starter",
  description:
    "Kickstart your web development with our Next.js Starter Kit. Optimized for performance and scalability, it features pre-configured setups, best practices, and reusable components to streamline your workflow.",
  url: site_url,
  ogImage: `${site_url}/_static/og.png`,
  links: {
    twitter: "https://twitter.com/mageshyt",
    github: "https://github.com/mageshyt/next-saas-starter",
  },
  mailSupport: "support@next-saas-starter.com",
};

