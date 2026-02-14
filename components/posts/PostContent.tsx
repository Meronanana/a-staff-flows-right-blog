import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Article from "@/components/posts/Article";

interface PostContentProps {
  title: PostData;
  articles: PostContent;
}

// Extract YouTube video ID from various URL formats
const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/live\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

const markdownComponents = {
  a: ({ ...props }) => {
    const href = props.href as string;
    const videoId = getYouTubeVideoId(href);

    if (videoId) {
      return (
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={props.children as string}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <a href={href} target="_blank" className="text-blue-500">
        {props.children}
      </a>
    );
  },
  blockquote: ({ ...props }) => {
    return (
      <blockquote className="p-2 pl-4 space-y-2 border-l-4 rounded-ee-lg bg-gray-200 border-gray-400 dark:bg-gray-700">
        {props.children}
      </blockquote>
    );
  },
  code: ({ ...props }) => {
    return (
      <code className="font-sans rounded-sm px-1 bg-gray-200 dark:bg-gray-700">
        {props.children}
      </code>
    );
  },
  h1: ({ ...props }) => {
    return <h1 className="font-bold text-xl">{props.children}</h1>;
  },
  h2: ({ ...props }) => {
    return <h2 className="font-bold text-xl">{props.children}</h2>;
  },
  h3: ({ ...props }) => {
    return <h3 className="font-bold text-xl">{props.children}</h3>;
  },
  hr: ({ ...props }) => {
    return (
      <div className="py-2">
        <hr className="dark:border-gray-700" />
      </div>
    );
  },
  img: ({ ...props }) => {
    return (
      <>
        <Image
          className="w-full"
          src={(props.src as string).replace("/public", "")}
          alt={props.alt as string}
          width={0}
          height={0}
          sizes="100vw"
        />
        <p className="font-sans mt-1 text-xs text-gray-400">{props.alt}</p>
      </>
    );
  },
  ol: ({ ...props }) => {
    return <ol className="list-decimal pl-6 break-words whitespace-normal">{props.children}</ol>;
  },
  ul: ({ ...props }) => {
    return <ul className="list-disc pl-6 break-words whitespace-normal">{props.children}</ul>;
  },
  li: ({ ...props }) => {
    return <li className="break-words whitespace-normal">{props.children}</li>;
  },
  p: ({ ...props }) => {
    return <div className="whitespace-normal break-keep">{props.children}</div>;
  },
};

export default function PostContent({ title, articles }: PostContentProps) {
  return (
    <div
      id="post-wrapper"
      className="flex px-[10vw] items-center whitespace-nowrap overflow-x-auto"
    >
      <div className="flex space-x-4 py-2 border-t-2 border-gray-400 dark:border-gray-600">
        <Article>
          <Image
            className="w-full"
            src={title.coverImage}
            alt={title.path}
            width={0}
            height={0}
            sizes="100vw"
          />
          <h1 className="pt-2 font-bold text-2xl break-words whitespace-normal">{title.title}</h1>
          <p className="text-gray-400">{title.date}</p>
        </Article>
        {articles.map((v, i) => {
          return (
            <Article key={i}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {v}
              </ReactMarkdown>
            </Article>
          );
        })}
      </div>
    </div>
  );
}
