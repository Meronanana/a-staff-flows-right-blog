"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function JacketInteraction({ data }: { data: PostData }) {
  useEffect(() => {
    const jacketPackage = document.getElementById(
      `jacket-package-${data.path}`
    );
    const jacketOverText = document.getElementById(
      `jacket-over-text-${data.path}`
    );
    const jacketAboveText = document.getElementById(
      `jacket-above-text-${data.path}`
    );

    jacketPackage &&
      jacketPackage.addEventListener("mouseover", () => {
        jacketOverText && jacketOverText.classList.add("opacity-100");
        jacketAboveText && jacketAboveText.classList.add("opacity-100");
      });

    jacketPackage &&
      jacketPackage.addEventListener("mouseleave", () => {
        jacketOverText && jacketOverText.classList.remove("opacity-100");
        jacketAboveText && jacketAboveText.classList.remove("opacity-100");
      });
  }, []);

  return (
    <div className="relative top-[-100%] w-full h-full select-none">
      <Link href={`posts/${data.path}`}>
        <div
          id={`jacket-package-${data.path}`}
          className="relative top-0 left-0 w-full h-full duration-200 hover:bg-deep-burgundy/70"
        >
          <div
            id={`jacket-over-text-${data.path}`}
            className="w-full px-3 py-2 text-white whitespace-normal break-words font-bold text-xl opacity-0 duration-500"
          >
            {data.description}
          </div>
        </div>
      </Link>
      <div
        id={`jacket-above-text-${data.path}`}
        className="relative translate-y-[-100%] top-[-100%] left-0 w-full px-3 py-2 opacity-0 duration-500"
      >
        <p className="font-bold italic text-3xl">{data.title}</p>
      </div>
    </div>
  );
}
