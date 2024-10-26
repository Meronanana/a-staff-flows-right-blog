"use client";

import { useEffect, useState } from "react";
import Jacket from "./Jacket";

export default function Showcase() {
  const [postData, setPostData] = useState<PostData[]>();

  useEffect(() => {
    const showcase = document.getElementById("showcase");

    if (!showcase) return;

    showcase.addEventListener("wheel", (e) => {
      const docElem = document.documentElement;

      if (docElem.clientHeight === docElem.scrollHeight && !e.shiftKey) {
        if (docElem.clientWidth < 1024) showcase.scrollLeft += e.deltaY * 5;
        else showcase.scrollLeft += e.deltaY * 10;
      }
    });

    fetch(`/api/post/data`, {
      method: "POST",
    })
      .then((res) => res.text())
      .then((text) => {
        const datas: PostData[] = JSON.parse(text).datas;
        setPostData(datas);
      });
  }, []);

  return (
    <div
      id="showcase"
      className="flex px-[50%] items-center whitespace-nowrap overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
    >
      <div className="absolute left-0 top-[71vh] w-full h-10 bg-burgundy-900 dark:bg-slate-200"></div>
      <div id="showcase-inside" className="flex space-x-[25vw] pb-3 z-0">
        {postData &&
          postData.map((v, i) => {
            return <Jacket key={i} data={v} />;
          })}
      </div>
    </div>
  );
}
