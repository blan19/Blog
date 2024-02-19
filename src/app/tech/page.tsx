import Card from "@/components/ui/card";
// import Tags from "@/components/ui/tags";
import Link from "next/link";
import ViewCounter from "@/components/ui/view-counter";
import { getBlogPosts } from "@/app/db/blog";
import { getViewCount } from "@/app/db/queries";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Posts",
  description:
    "Read my thoughts on the Frontend ecosystem and everyday my life",
};

const View = async ({ slug }: { slug: string }) => {
  const view = await getViewCount(slug);

  return (
    <ViewCounter
      className="text-xs md:text-sm text-greyscale-7 dark:text-greyscale-2"
      view={view?.count ?? 0}
    />
  );
};

const Blog = () => {
  const posts = getBlogPosts("tech");

  return (
    <section>
      <h1 className="font-medium text-2xl mb-4 tracking-tighter">Tech.</h1>
      <p className="w-full prose prose-neutral dark:prose-invert whitespace-pre-line">
        a record of what I studied, learned, and felt
      </p>
      <div className="w-full h-[0.5px] rounded bg-greyscale-3 my-7" />
      {/* <Tags posts={posts} seletedTag={tag} /> */}
      <ul className="flex flex-col gap-8 pt-7">
        {posts.reverse().map(({ metadata, slug }) => (
          <li key={slug}>
            <Link href={`/tech/${slug}`}>
              <Card
                title={metadata.title}
                tags={metadata.tags}
                date={metadata.publishedAt}
              >
                <Suspense
                  fallback={<p className="text-xs md:text-sm">......</p>}
                >
                  <View slug={slug} />
                </Suspense>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Blog;
