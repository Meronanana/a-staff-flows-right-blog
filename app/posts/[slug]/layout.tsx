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
  // let markdown = fs.readFileSync(
  //   path.join(process.cwd(), `public/assets/posts/${params.slug}.md`),
  //   "utf8"
  // );

  // const data = matter(markdown).data as PostData;

  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post`, {
    method: "POST",
    body: JSON.stringify({ slug: params.slug }),
  })
    .then((res) => {
      if (res.status === 404) return { data: undefined };
      else return res.json();
    })
    .then((body) => body.data as PostData);

  return {
    title: `${data.title} - ${parentMetadata.title?.absolute}`,
    description: data.description,
    openGraph: {
      title: `${data.title} - ${parentMetadata.title?.absolute}`,
      description: data.description,
      url: `${process.env.NEXT_PUBLIC_URL}/${params.slug}`,
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
