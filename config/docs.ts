
import { Book, Code, CreditCard, Database, FolderCode, Globe, Home,  Lock, NotebookPen, Settings, TestTube } from "lucide-react";
import { DocsConfig } from "types";

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          icon: Home
        },
        {
          title: "Installation",
          href: "/docs/installation",
          icon: FolderCode
        },
      ],
    },
    {
      title: "Configuration",
      items: [
        {
          title: "Authentification",
          href: "/docs/configuration/authentification",
          icon: Lock
        },
        {
          title: "Blog",
          href: "/docs/configuration/blog",
          icon: Book
        },
        {
          title: "Blog Components",
          href: "/docs/configuration/blog-components",
          icon: Code

        },
        {
          title: "Components",
          href: "/docs/configuration/components",
          icon: Code

        },
        {
          title: "Config files",
          href: "/docs/configuration/config-files",
          icon: Settings
        },
        {
          title: "SEO",
          href: "/docs/configuration/seo",
          icon: Globe
        },
        {
          title: "Database",
          href: "/docs/configuration/database",
          icon: Database
        },
        {
          title: "Markdown files",
          href: "/docs/configuration/markdown-files",
          icon: NotebookPen
        },
        {
          title: "Subscriptions",
          href: "/docs/configuration/subscriptions",
          icon: CreditCard
        }, {
          title: "Testing",
          href: "/docs/configuration/testing",
          icon: TestTube
        }
      ],
    },
  ],
};
