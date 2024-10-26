"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { getDegreeFromCoordinate } from "@/lib/util";

export default function JacketInteraction({ data }: { data: PostData }) {
  const jacketPackageRef = useRef<HTMLDivElement>(null);
  const showcase = document.getElementById("showcase");

  // Add jacket mouse hover event
  useEffect(() => {
    const jacketPackage = jacketPackageRef.current;
    const jacketOverText = document.getElementById(
      `jacket-over-text-${data.path}`
    );
    const jacketAboveText = document.getElementById(
      `jacket-above-text-${data.path}`
    );
    const leftSideShadow = document.getElementById(
      `jacket-left-side-shadow-${data.path}`
    ) as HTMLElement;
    const rightSideShadow = document.getElementById(
      `jacket-right-side-shadow-${data.path}`
    ) as HTMLElement;

    jacketPackage &&
      jacketPackage.addEventListener("mouseover", () => {
        jacketOverText && jacketOverText.classList.add("opacity-100");
        jacketAboveText && jacketAboveText.classList.add("opacity-100");
        leftSideShadow && leftSideShadow.classList.add("opacity-80");
        rightSideShadow && rightSideShadow.classList.add("opacity-80");
      });

    jacketPackage &&
      jacketPackage.addEventListener("mouseleave", () => {
        jacketOverText && jacketOverText.classList.remove("opacity-100");
        jacketAboveText && jacketAboveText.classList.remove("opacity-100");
        leftSideShadow && leftSideShadow.classList.remove("opacity-80");
        rightSideShadow && rightSideShadow.classList.remove("opacity-80");
      });

    jacketPackage &&
      jacketPackage.addEventListener("touchstart", () => {
        jacketOverText && jacketOverText.classList.add("opacity-100");
        jacketAboveText && jacketAboveText.classList.add("opacity-100");
        leftSideShadow && leftSideShadow.classList.add("opacity-80");
        rightSideShadow && rightSideShadow.classList.add("opacity-80");
      });

    jacketPackage &&
      jacketPackage.addEventListener("touchend", () => {
        jacketOverText && jacketOverText.classList.remove("opacity-100");
        jacketAboveText && jacketAboveText.classList.remove("opacity-100");
        leftSideShadow && leftSideShadow.classList.remove("opacity-80");
        rightSideShadow && rightSideShadow.classList.remove("opacity-80");
      });
  }, [data.path]);

  // Jacket side rotation change when jacket position moves
  useEffect(() => {
    const jacketLeftSide = document.getElementById(
      `jacket-left-side-${data.path}`
    );
    const jacketRightSide = document.getElementById(
      `jacket-right-side-${data.path}`
    );

    jacketLeftSide && (jacketLeftSide.style.transform = `rotateY(-90deg)`);
    jacketRightSide && (jacketRightSide.style.transform = `rotateY(90deg)`);

    showcase?.addEventListener("scroll", (e) => {
      const target = e.target as HTMLElement;
      const jacket = document.getElementById(
        `jacket-${data.path}`
      ) as HTMLElement;

      const windowWidth = window.innerWidth;
      const scrollPos = target.scrollLeft;
      const jacketPos = jacket.offsetLeft;
      const jacketWidth = jacket.offsetWidth;
      const jacketInterval = windowWidth * 0.7;
      const prspctvDist = jacketInterval + jacketWidth;

      const leftSideAngle =
        scrollPos - (jacketPos - windowWidth / 2) < 0
          ? -getDegreeFromCoordinate(
              jacketPos - windowWidth / 2 - scrollPos,
              prspctvDist
            )
          : -90;
      const rightSideAngle =
        scrollPos - (jacketPos - windowWidth / 2 + jacketWidth) > 0
          ? 180 -
            getDegreeFromCoordinate(
              jacketPos - windowWidth / 2 + jacketWidth - scrollPos,
              prspctvDist
            )
          : 90;

      if (jacketLeftSide && jacketRightSide) {
        jacketLeftSide.style.transform = `perspective(${prspctvDist}px) rotateY(${leftSideAngle}deg)`;
        jacketRightSide.style.transform = `perspective(${prspctvDist}px) rotateY(${rightSideAngle}deg)`;
      }
    });
  }, []);

  return (
    <div className="relative top-[-100%] w-full h-full select-none">
      <Link href={`posts/${data.path}`}>
        <div
          id={`jacket-package-${data.path}`}
          ref={jacketPackageRef}
          className="relative top-0 left-0 w-full h-full duration-200 hover:bg-burgundy-800/70 shadow-white-lg dark:shadow-lg"
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
        <p className="font-serif font-bold italic text-3xl">{data.title}</p>
      </div>
      <div
        id={`jacket-left-side-${data.path}`}
        className="absolute w-[4vw] h-[45vw] min-h-32 landscape:w-[4vh] landscape:h-[45vh] top-0 left-[-4vw] landscape:left-[-4vh] origin-bottom-right overflow-hidden bg-black shadow-white-lg dark:shadow-lg"
      >
        <div
          id={`jacket-left-side-shadow-${data.path}`}
          className="absolute w-full h-full bg-burgundy-800 opacity-30 duration-200 z-10 "
        ></div>
        <Image
          className="w-full h-full"
          src={data.coverImage}
          alt={data.path}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            position: "absolute",
            objectFit: "cover",
            objectPosition: "left",
            transform: "scaleX(-1)",
          }}
        />
      </div>
      <div
        id={`jacket-right-side-${data.path}`}
        className="absolute w-[4vw] h-[45vw] min-h-32 landscape:w-[4vh] landscape:h-[45vh] top-0 right-[-4vw] landscape:right-[-4vh] origin-bottom-left bg-black shadow-white-lg dark:shadow-lg"
      >
        <div
          id={`jacket-right-side-shadow-${data.path}`}
          className="absolute w-full h-full bg-burgundy-800 opacity-30 duration-200 z-10"
        ></div>
        <Image
          className="w-full h-full"
          src={data.coverImage}
          alt={data.path}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            position: "absolute",
            objectFit: "cover",
            objectPosition: "right",
            transform: "scaleX(-1)",
          }}
        />
      </div>
    </div>
  );
}
