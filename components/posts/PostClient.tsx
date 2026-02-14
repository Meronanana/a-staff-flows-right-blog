"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { increment } from "@/lib/features/creditSlice";

interface PostClientProps {
  slug: string;
}

export default function PostClient({ slug }: PostClientProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const postWrapper = document.getElementById("post-wrapper");

    if (!postWrapper) return;

    const handleWheel = (e: WheelEvent) => {
      const docElem = document.documentElement;

      if (docElem.clientHeight === docElem.scrollHeight && !e.shiftKey) {
        postWrapper.scrollLeft += e.deltaY / 2;
      }
    };

    postWrapper.addEventListener("wheel", handleWheel);

    // Add 1 credit when user read a post
    fetch(`/api/credit`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: process.env.NODE_ENV === "production" ? 1 : 2,
      }),
    }).then(() => {
      dispatch(increment());
    });

    return () => {
      postWrapper.removeEventListener("wheel", handleWheel);
    };
  }, [slug, dispatch]);

  return null;
}
