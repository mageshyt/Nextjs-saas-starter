
import type {  LucideIcon } from "lucide-react";

export enum ProductStatus {
  todo = 'todo',
  inProgress = 'inProgress',
  done = 'done',
  canceled = 'canceled',
}

export enum ProductLabel {
  bug = 'bug',
  feature = 'feature',
  documentation = 'documentation',
  enhancement = 'enhancement',
}

export enum ProductPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export type Product = {
  id: string;
  code: string;
  title: string;
  status: ProductStatus;
  label: ProductLabel;
  priority: ProductPriority;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};


export type NavItem = {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SidebarNavItem = {
  title: string;
  items: NavItem[];
  disabled?: boolean;
  icon?: LucideIcon;
};
export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};
