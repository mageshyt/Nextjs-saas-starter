
import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";

import { getTableOfContents } from "@/lib/toc";
import { Mdx } from "@/components/content/mdx-components";
import { DocsPageHeader } from "@/components/docs/docs-header";

import "@/styles/mdx.css";

import { Metadata } from "next";

import { constructMetadata, getBlurDataURL } from "@/lib/utils";
import { DashboardTableOfContents } from "@/components/content/toc";

type Params = Promise<{ slug: string[] }>

async function getDocFromParams(params: Params) {
  const { slug } = await params

  const joinedSlug = slug?.join("/") || "";

  const doc = allDocs.find((doc) => doc.slugAsParams === joinedSlug);

  if (!doc) return null;

  return doc;
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const doc = await getDocFromParams(params);

  if (!doc) return {};

  const { title, description } = doc;

  return constructMetadata({
    title: `${title} – SaaS Starter`,
    description: description,
  });
}
 
export default async function DocPage({ params }:{
  params: Params
}) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  const images = await Promise.all(
    doc.images.map(async (src: string) => ({
      src,
      blurDataURL: await getBlurDataURL(src),
    })),
  );

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
      <DocsPageHeader heading={doc.title} text={doc.description} />

      <div className="pb-4 pt-11">
          <Mdx code={doc.body.code} images={images} />
        </div>
        <hr className="my-4 md:my-6" />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-8">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
