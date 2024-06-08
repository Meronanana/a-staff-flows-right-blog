"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";

interface Props {
  params: { slug: string };
}

const MARKDOWN_404 = JSON.stringify({
  content: ["# 404 Page Error", "Check post name on your URL"],
});

const markdownComponents = {
  a: ({ ...props }) => {
    return (
      <a href={props.href} target="_blank" className="text-blue-500">
        {props.children}
      </a>
    );
  },
  blockquote: ({ ...props }) => {
    return (
      <blockquote className="p-2 pl-4 border-l-4 rounded-ee-lg bg-gray-200 border-gray-400 dark:bg-gray-600">
        {props.children}
      </blockquote>
    );
  },
  code: ({ ...props }) => {
    return (
      <code className="font-sans rounded-sm px-1 bg-gray-200 dark:bg-gray-600">
        {props.children}
      </code>
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
  p: ({ ...props }) => {
    return <div className="whitespace-normal break-keep">{props.children}</div>;
  },
};

export default function Post({ params }: Props) {
  const [title, setTitle] = useState<PostData>();
  const [articles, setArticles] = useState<PostContent>();

  useEffect(() => {
    const postWrapper = document.getElementById("post-wrapper");

    if (!postWrapper) return;

    postWrapper.addEventListener("wheel", (e) => {
      const docElem = document.documentElement;

      if (docElem.clientHeight === docElem.scrollHeight && !e.shiftKey) {
        postWrapper.scrollLeft += e.deltaY;
      }
    });

    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ slug: params.slug }),
    })
      .then((res) => {
        if (res.status === 404) return Promise.resolve(MARKDOWN_404);
        else return res.json();
      })
      .then((body) => {
        setTitle(body.data);
        setArticles(body.content);
      });
  }, []);

  return (
    <div
      id="post-wrapper"
      className="flex px-[10vw] items-center whitespace-nowrap overflow-x-auto"
    >
      <div className="flex space-x-4 py-2 border-t-2 border-gray-400 dark:border-gray-600">
        {
          /* Title 부분 */
          title && (
            <div className="w-[22em] space-y-2 p-2">
              <Image
                className="w-full"
                src={title.coverImage}
                alt={title.path}
                width={0}
                height={0}
                sizes="100vw"
              />
              <h1 className="pt-2 font-bold text-2xl">{title.title}</h1>
              <p className="text-gray-400">{title.date}</p>
            </div>
          )
        }
        {articles &&
          articles.map((v, i) => {
            return (
              <div key={i} className="w-[22em] space-y-2 p-2">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {v}
                </ReactMarkdown>
              </div>
            );
          })}
      </div>
    </div>
  );
}
