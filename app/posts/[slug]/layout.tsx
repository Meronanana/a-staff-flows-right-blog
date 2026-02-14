import StoreProvider from "@/app/StoreProvider";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMetadata = await parent;
  const { getPost } = await import("@/lib/posts");
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  const data = post.data;
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  return {
    title: `${data.title} - ${parentMetadata.title?.absolute}`,
    description: data.description,
    openGraph: {
      title: `${data.title} - ${parentMetadata.title?.absolute}`,
      description: data.description,
      url: `${baseUrl}/posts/${params.slug}`,
      siteName: "A Staff Flows Right",
      images: [
        {
          url: `${baseUrl}${data.coverImage}`,
        },
      ],
      locale: "ko_KR",
      type: "article",
    },
  };
}

export default function PostSlugLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreProvider>{children}</StoreProvider>;
}
