"use client";

import { useEffect } from "react";

import "@/components/component.css";

export default function DarkmodeIcon() {
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");

    if (!localTheme) {
      changeColorMode(
        !window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } else {
      changeColorMode(localTheme !== "dark");
    }

    const icon = document.getElementById("darkmode-icon-text");
    if (!icon) return;

    // 미리 LayoutHeader만 다크모드/라이트모드로 변경
    icon.addEventListener("mouseover", () => {
      const darkmode = document.body.classList.contains("dark");
      const layoutHeader = document.getElementById("layout-header");

      if (!layoutHeader) return;

      if (darkmode) {
        icon.classList.add("animate-[darkmode-icon-mts_0.3s_forwards]");
        icon.classList.remove("animate-[darkmode-icon-stm_0.3s_forwards]");

        // 이래하면 안대...
        layoutHeader.classList.add("dark:bg-white/50", "dark:text-black");
        layoutHeader.classList.remove("dark:text-white");
      } else {
        icon.classList.add("animate-[darkmode-icon-stm_0.3s_forwards]");
        icon.classList.remove("animate-[darkmode-icon-mts_0.3s_forwards]");

        layoutHeader.classList.add("dark");
      }
    });

    icon.addEventListener("mouseleave", () => {
      const darkmode = document.body.classList.contains("dark");
      const layoutHeader = document.getElementById("layout-header");

      if (!layoutHeader) return;

      if (darkmode) {
        icon.classList.remove("animate-[darkmode-icon-mts_0.3s_forwards]");
        icon.classList.add("animate-[darkmode-icon-stm_0.3s_forwards]");

        layoutHeader.classList.remove("dark:bg-white/50", "dark:text-black");
        layoutHeader.classList.add("dark:text-white");
      } else {
        icon.classList.remove("animate-[darkmode-icon-stm_0.3s_forwards]");
        icon.classList.add("animate-[darkmode-icon-mts_0.3s_forwards]");

        layoutHeader.classList.remove("dark");
      }
    });

    icon.addEventListener("click", () => {
      const darkmode = document.body.classList.contains("dark");
      changeColorMode(darkmode);
    });
  }, []);

  // 현재 모드를 입력. 반대 모드로 변경됨
  const changeColorMode = (darkmode: boolean) => {
    const layoutHeader = document.getElementById("layout-header");

    if (!layoutHeader) return;

    if (darkmode) {
      document.body.classList.remove("dark");
      layoutHeader.classList.remove("dark:bg-white/50", "dark:text-black");
      layoutHeader.classList.add("dark:text-white");

      window.localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      layoutHeader.classList.remove("dark");

      window.localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button className="font-serif overflow-hidden whitespace-break-spaces h-[1.5em] rounded hover:bg-gray-300/50 ">
      <ul id="darkmode-icon-text" className="relative px-2">
        <li className="h-[1.5em]">{"sunrise"}</li>
        <li className="h-[1.5em]">{"moonlight"}</li>
      </ul>
    </button>
  );
}
