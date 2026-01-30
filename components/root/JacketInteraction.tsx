"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function JacketInteraction({ data }: { data: PostData }) {
  const overTextRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-adjust font size for title text based on image size
    const adjustTitleFontSize = () => {
      if (!titleRef.current || !packageRef.current) return;

      const titleElement = titleRef.current;
      const container = packageRef.current;
      const containerWidth = container.offsetWidth - 24; // Subtract padding (px-3 = 12px * 2)
      const containerHeight = container.offsetHeight * 0.4; // Use 40% of height for title

      // Start with a large font size and reduce until it fits
      let fontSize = Math.min(containerWidth / 8, containerHeight * 0.8); // Roughly 8 chars per line
      fontSize = Math.max(16, Math.min(64, fontSize)); // Clamp between 16px and 64px

      titleElement.style.fontSize = `${fontSize}px`;

      // Fine-tune: reduce if text overflows
      while (
        (titleElement.scrollWidth > containerWidth || titleElement.scrollHeight > containerHeight) &&
        fontSize > 16
      ) {
        fontSize -= 2;
        titleElement.style.fontSize = `${fontSize}px`;
      }
    };

    // Auto-adjust font size for description text based on image size
    const adjustDescriptionFontSize = () => {
      if (!overTextRef.current || !packageRef.current) return;

      const textElement = overTextRef.current;
      const container = packageRef.current;
      const containerWidth = container.offsetWidth - 24; // Subtract padding (px-3 = 12px * 2)
      const containerHeight = container.offsetHeight * 0.6 - 16; // Use remaining 60% minus padding

      // Calculate font size to fit approximately 10 Korean characters
      // Korean character width is roughly equal to font size
      const targetChars = 10;
      const baseFontSize = Math.floor(containerWidth / targetChars);

      // Start with calculated size and adjust if needed
      let fontSize = Math.min(baseFontSize, containerHeight * 0.8); // Don't exceed 80% of height
      fontSize = Math.max(12, Math.min(48, fontSize)); // Clamp between 12px and 48px

      textElement.style.fontSize = `${fontSize}px`;

      // Fine-tune: reduce if text overflows
      while (
        (textElement.scrollWidth > containerWidth || textElement.scrollHeight > containerHeight) &&
        fontSize > 12
      ) {
        fontSize -= 1;
        textElement.style.fontSize = `${fontSize}px`;
      }
    };

    const figureElement = document.getElementById(`jacket-figure-${data.path}`);
    const jacketOverText = document.getElementById(`jacket-over-text-${data.path}`);
    const jacketTitleText = document.getElementById(`jacket-title-text-${data.path}`);
    const jacketDateText = document.getElementById(`jacket-date-text-${data.path}`);

    // Adjust font size when component mounts and on resize
    const timeoutId = setTimeout(() => {
      adjustTitleFontSize();
      adjustDescriptionFontSize();
    }, 0);
    window.addEventListener("resize", () => {
      adjustTitleFontSize();
      adjustDescriptionFontSize();
    });

    // Handle hover events on figure element
    const handleMouseEnter = () => {
      figureElement?.classList.add("bg-deep-burgundy/70");
      jacketOverText?.classList.add("opacity-100");
      jacketTitleText?.classList.add("opacity-100");
      jacketDateText?.classList.add("opacity-100");
    };

    const handleMouseLeave = () => {
      figureElement?.classList.remove("bg-deep-burgundy/70");
      jacketOverText?.classList.remove("opacity-100");
      jacketTitleText?.classList.remove("opacity-100");
      jacketDateText?.classList.remove("opacity-100");
    };

    const handleTouchStart = () => {
      figureElement?.classList.add("bg-deep-burgundy/70");
      jacketOverText?.classList.add("opacity-100");
      jacketTitleText?.classList.add("opacity-100");
      jacketDateText?.classList.add("opacity-100");
    };

    const handleTouchEnd = () => {
      figureElement?.classList.remove("bg-deep-burgundy/70");
      jacketOverText?.classList.remove("opacity-100");
      jacketTitleText?.classList.remove("opacity-100");
      jacketDateText?.classList.remove("opacity-100");
    };

    figureElement?.addEventListener("mouseenter", handleMouseEnter);
    figureElement?.addEventListener("mouseleave", handleMouseLeave);
    figureElement?.addEventListener("touchstart", handleTouchStart);
    figureElement?.addEventListener("touchend", handleTouchEnd);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", adjustTitleFontSize);
      window.removeEventListener("resize", adjustDescriptionFontSize);
      figureElement?.removeEventListener("mouseenter", handleMouseEnter);
      figureElement?.removeEventListener("mouseleave", handleMouseLeave);
      figureElement?.removeEventListener("touchstart", handleTouchStart);
      figureElement?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [data.path, data.description, data.title, data.date]);

  return (
    <div className="absolute inset-0 w-full h-full select-none flex flex-col pointer-events-none">
      <Link href={`posts/${data.path}`} className="w-full h-full pointer-events-auto">
        <div
          ref={packageRef}
          id={`jacket-package-${data.path}`}
          className="relative top-0 left-0 gap-1 w-full h-full duration-200 hover:bg-deep-burgundy/70 flex flex-col justify-start"
        >
          {/* Title at the top */}
          <div
            ref={titleRef}
            id={`jacket-title-text-${data.path}`}
            className="w-full px-3 pt-2 text-white whitespace-nowrap overflow-hidden text-ellipsis font-serif font-bold italic opacity-0 duration-500"
            style={{ fontSize: "2rem" }}
          >
            {data.title}
          </div>

          {/* Date below title */}
          <div
            ref={dateRef}
            id={`jacket-date-text-${data.path}`}
            className="w-full px-3 text-white/80 whitespace-nowrap overflow-hidden text-ellipsis text-sm opacity-0 duration-500"
          >
            {data.date}
          </div>

          {/* Description at the bottom */}
          <div
            ref={overTextRef}
            id={`jacket-over-text-${data.path}`}
            className="w-full px-3 pb-2 text-white whitespace-normal break-words font-bold opacity-0 duration-500"
            style={{ fontSize: "1.25rem" }}
          >
            {data.description}
          </div>
        </div>
      </Link>
    </div>
  );
}
