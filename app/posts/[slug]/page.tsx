import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import PostContent from "@/components/posts/PostContent";
import PostClient from "@/components/posts/PostClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const { getAllPostSlugs } = await import("@/lib/posts");
  const slugs = await getAllPostSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function Post({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PostContent title={post.data} articles={post.content} />
      <PostClient slug={params.slug} />
    </>
  );
}
