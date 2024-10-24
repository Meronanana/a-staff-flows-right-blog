import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import LayoutHeader from "@/components/root/header/LayoutHeader";
import LayoutFooter from "@/components/root/LayoutFooter";

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
