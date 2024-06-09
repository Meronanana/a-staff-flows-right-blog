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
        showcase.scrollLeft += e.deltaY * 5;
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
      <div id="showcase-inside" className="flex space-x-[25vw] pb-3">
        {postData &&
          postData.map((v, i) => {
            return <Jacket key={i} data={v} />;
          })}
      </div>
    </div>
  );
}
