import matter from "gray-matter";
import { Metadata, ResolvingMetadata } from "next";
import fs from "fs";
import path from "path";

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMetadata = await parent;
  let markdown = fs.readFileSync(
    path.join(process.cwd(), `/public/assets/posts/${params.slug}.md`),
    "utf8"
  );

  const data = matter(markdown).data as PostData;

  return {
    title: `${data.title} - ${parentMetadata.title?.absolute}`,
    description: data.description,
    openGraph: {
      title: `${data.title} - ${parentMetadata.title?.absolute}`,
      description: data.description,
      url: `https://asfr.vercel.app/posts/${params.slug}`,
      siteName: "A Staff Flows Right",
      images: [data.coverImage],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default function PostSlugLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
