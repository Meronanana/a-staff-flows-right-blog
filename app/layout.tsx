import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import DarkmodeIcon from "@/components/root/DarkmodeIcon";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A Staff Flows Right",
  description: "음악 이야기를 써요",
  openGraph: {
    title: "A Staff Flows Right (블로그!)",
    description: "음악 이야기를 써요",
    url: "https://asfr.vercel.app/",
    siteName: "A Staff Flows Right",
    images: [],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-kr">
      <body
        className={`${inter.className} flex flex-col font-sans text-black dark:text-white`}
      >
        <LayoutHeader />
        {children}
        <LayoutFooter />
        <Analytics />
      </body>
    </html>
  );
}

const LayoutHeader = (): React.ReactNode => {
  return (
    <div
      id="layout-header"
      className="fixed flex flex-row justify-between items-center top-0 w-full px-10 py-5 z-[999] duration-300 bg-white/50 text-black dark:bg-black/50 dark:text-white"
    >
      <Link href="/" className="font-serif text-sm italic hover:underline">
        <b className="text-2xl">A</b> <b className="text-2xl">S</b>taff{" "}
        <b className="text-2xl">F</b>lows <b className="text-2xl">R</b>ight
      </Link>
      <ul className="flex flex-row ">
        <li className="flex items-center ml-5 h-7">
          <DarkmodeIcon />
        </li>
      </ul>
    </div>
  );
};

const LayoutFooter = (): React.ReactNode => {
  return (
    <div
      id="layout-footer"
      className="fixed bottom-0 w-full p-4 z-[999] text-center text-xs duration-300 bg-gray-100/50  text-gray-800 dark:bg-gray-900/50 dark:text-gray-200"
    >
      © 2024 <b className="dark:text-white">A Staff Flows Right</b> Made by{" "}
      <b className="dark:text-white">Jaeseong Jeong</b> Powered by{" "}
      <b className="dark:text-white">Next.js</b>
    </div>
  );
};
