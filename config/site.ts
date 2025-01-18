import { env } from "@/env";
import { SiteConfig } from "@/types";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "NextJs SaaS Starter",
  description:
    "Kickstart your web development with our Next.js Starter Kit. Optimized for performance and scalability, it features pre-configured setups, best practices, and reusable components to streamline your workflow.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/miickasmt",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "support@next-saas-starter.com",
};

