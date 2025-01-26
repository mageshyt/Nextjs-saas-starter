import { env } from "@/env"
import { allDocs } from "contentlayer/generated"

type SitemapEntry = {
  url: string
  lastModified: string
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}

export default async function sitemap(): Promise<SitemapEntry[]> {
  const baseUrl = env.NEXT_PUBLIC_APP_URL

  // Static pages
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]

  // Dynamic blog posts
  const blogPosts: SitemapEntry[] = allDocs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticPages, ...blogPosts]
}