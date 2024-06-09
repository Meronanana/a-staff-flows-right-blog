"use client";

import { useEffect, useRef } from "react";

export default function Article({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const articleWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const articleWrapper = articleWrapperRef.current;

    if (!articleWrapper) return;

    articleWrapper.addEventListener("wheel", (e) => {
      const target = e.currentTarget as HTMLElement;

      const isScrollable = target.scrollHeight > target.clientHeight;
      const isAtTop = target.scrollTop === 0;
      const isAtBottom =
        target.scrollHeight - target.scrollTop === target.clientHeight;

      if (isScrollable && isAtTop && e.deltaY > 0) e.stopPropagation();
      if (isScrollable && isAtBottom && e.deltaY < 0) e.stopPropagation();
      if (isScrollable && !isAtTop && !isAtBottom) e.stopPropagation();
    });
  }, []);

  return (
    <div
      ref={articleWrapperRef}
      className="article-wrapper w-[22rem] max-h-[calc(100vh-10rem)] p-2 overflow-y-auto"
    >
      <div className="max-h-[52rem] space-y-2 overflow-y-hidden">
        {children}
      </div>
    </div>
  );
}
