"use client"

import Link from "next/link";
import { useParams } from 'next/navigation';

import { Check } from "lucide-react";

import { BLOG_CATEGORIES } from '@/config/blog';
import { cn } from "@/lib/utils";

import { MaxWidthWrapper } from '@/components/global/max-width-wrapper'
import MobileDrawer from "./mobile-drawer";


export const BlogHeader = () => {
  const { slug } = useParams() as { slug?: string };

  const data = BLOG_CATEGORIES.find((category) => category.slug === slug);

  return (
    <>

      <MaxWidthWrapper className="py-6 md:pb-8 pt-10">
        <div className="max-w-screen-sm">
          <h1 className="font-heading text-3xl md:text-4xl">
            {data?.title || "Blog"}
          </h1>
          <p className="mt-3.5 text-base text-muted-foreground md:text-lg">
            {data?.description ||
              "Latest news and updates from Next SaaS Starter."}
          </p>
        </div>

        <nav className="mt-8 hidden w-full md:flex">
          <ul
            role="list"
            className="flex w-full flex-1 gap-x-2 border-b text-[15px] text-muted-foreground"
          >
            <CategoryLink title="All" href="/blog" active={!slug} />
            {BLOG_CATEGORIES.map((category) => (
              <CategoryLink
                key={category.slug}
                title={category.title}
                href={`/blog/category/${category.slug}`}
                active={category.slug === slug}
              />
            ))}
            <CategoryLink title="Guides" href="/guides" active={false} />
          </ul>
        </nav>
      </MaxWidthWrapper>
      <MobileDrawer slug={slug ?? ""} />
    </>
  )
}




export const CategoryLink = ({
  title,
  href,
  active,
  mobile = false,
  clickAction,
}: {
  title: string;
  href: string;
  active: boolean;
  mobile?: boolean;
  clickAction?: () => void;
}) => {
  return (
    <Link href={href} onClick={clickAction}>
      {mobile ? (
        <li className="rounded-lg text-foreground hover:bg-muted">
          <div className="flex items-center justify-between px-3 py-2 text-sm">
            <span>{title}</span>
            {active && <Check className="size-4" />}
          </div>
        </li>
      ) : (
        <li
          className={cn(
            "-mb-px border-b-2 border-transparent font-medium text-muted-foreground hover:text-foreground",
            {
              "border-primary text-foreground dark:border-primary/80":
                active,
            },
          )}
        >
          <div className="px-3 pb-3">{title}</div>
        </li>
      )}
    </Link>
  );
};
