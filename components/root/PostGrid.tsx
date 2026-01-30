"use client";

import { useEffect, useState } from "react";
import Jacket from "./Jacket";

export default function PostGrid() {
  const [postData, setPostData] = useState<PostData[]>();
  const [columns, setColumns] = useState(10); // FHD default: 10 columns
  const [rows, setRows] = useState(4); // FHD default: 4 rows
  const [headerHeight, setHeaderHeight] = useState(80);
  const [footerHeight, setFooterHeight] = useState(64);

  useEffect(() => {
    // Calculate header and footer heights
    const updateHeaderFooterHeights = () => {
      const header = document.getElementById("layout-header");
      const footer = document.getElementById("layout-footer");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
      if (footer) {
        setFooterHeight(footer.offsetHeight);
      }
    };

    // Calculate grid size based on viewport
    const updateGridSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Mobile devices (iPhone, etc.)
      if (width < 768) {
        // For mobile, calculate rows based on available height
        // Account for header, footer, padding, and gaps
        const header = document.getElementById("layout-header");
        const footer = document.getElementById("layout-footer");
        const headerH = header?.offsetHeight || 80;
        const footerH = footer?.offsetHeight || 64;
        const equalSpacing = 40;
        const paddingTop = headerH + equalSpacing;
        const paddingBottom = footerH + equalSpacing;
        const availableHeight = height - paddingTop - paddingBottom;
        // Use smaller item size for mobile (around 120-140px per item with gap)
        const itemSizeWithGap = 140; // item size + gap
        const calculatedRows = Math.max(3, Math.floor(availableHeight / itemSizeWithGap));
        const calculatedColumns = Math.max(2, Math.floor(width / 160));
        setColumns(calculatedColumns);
        setRows(calculatedRows);
      }
      // iPad Air Landscape: 1180x820 (approximately)
      else if (width >= 1180 && width < 1920) {
        setColumns(6);
        setRows(3);
      }
      // FHD and above: 1920x1080
      else if (width >= 1920) {
        setColumns(7);
        setRows(4);
      }
      // Smaller screens: responsive
      else {
        // Calculate based on available space
        const calculatedColumns = Math.max(3, Math.floor(width / 200));
        const calculatedRows = Math.max(2, Math.floor(height / 250));
        setColumns(calculatedColumns);
        setRows(calculatedRows);
      }
    };

    updateHeaderFooterHeights();
    updateGridSize();
    window.addEventListener("resize", () => {
      updateHeaderFooterHeights();
      updateGridSize();
    });

    fetch(`/api/post/data`, {
      method: "POST",
    })
      .then((res) => res.text())
      .then((text) => {
        const datas: PostData[] = JSON.parse(text).datas;
        setPostData([...datas]);
      });

    return () => {
      window.removeEventListener("resize", updateGridSize);
    };
  }, []);

  // Calculate equal spacing below header and above footer
  // The goal: space below header = space above footer
  // This means: (paddingTop - headerHeight) = (paddingBottom - footerHeight)
  // Use a fixed spacing value to ensure they are exactly equal
  const equalSpacing = 40; // Fixed spacing value in pixels
  const paddingTop = headerHeight + equalSpacing;
  const paddingBottom = footerHeight + equalSpacing;

  // Calculate item size based on grid
  // Important: availableHeight must account for paddingTop and paddingBottom
  // to ensure Grid doesn't exceed (100vh - headerHeight - footerHeight)
  const availableWidth = `calc((100vw - 2rem - ${columns - 1} * 1.5rem) / ${columns})`;
  const availableHeight = `calc((100vh - ${paddingTop}px - ${paddingBottom}px - 2rem - ${
    rows - 1
  } * 1.5rem) / ${rows})`;
  // Use minimum of width and height for square image
  const imageSize = `min(${availableWidth}, ${availableHeight})`;
  const itemWidth = imageSize;
  const itemHeight = imageSize;

  return (
    <div
      id="post-grid-wrapper"
      className="h-full overflow-x-auto overflow-y-hidden"
      style={{
        height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`,
        width: "100%",
      }}
    >
      <div
        id="post-grid"
        className="px-8"
        style={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: itemWidth,
          gridTemplateRows: `repeat(${rows}, ${itemHeight})`,
          gridAutoFlow: "column",
          gap: "1.5rem",
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          gridAutoColumns: itemWidth,
          width: "max-content",
          minWidth: "100%",
          alignContent: "start",
        }}
      >
        {postData &&
          postData.map((v, i) => {
            return <Jacket key={i} data={v} width={itemWidth} height={itemHeight} />;
          })}
      </div>
    </div>
  );
}
