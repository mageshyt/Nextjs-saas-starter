import React from "react"

import { MaxWidthWrapper } from "@/components/global/max-width-wrapper"
import { BlogHeader } from "./components/blog-header"

const BlogLayout = ({
  children
}: { children: React.ReactNode }) => {
  return (
    <>
      <BlogHeader />
      <MaxWidthWrapper className="pb-16">{children}</MaxWidthWrapper>

    </>
  )
}

export default BlogLayout
