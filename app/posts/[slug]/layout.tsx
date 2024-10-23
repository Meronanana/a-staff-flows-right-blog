import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMetadata = await parent;

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
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}${data.coverImage}`,
        },
      ],
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
