import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const gamesDir = path.join(process.cwd(), "public", "games");
  if (!fs.existsSync(gamesDir)) return [];

  return fs
    .readdirSync(gamesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => ({ slug: d.name }));
}

export default function GamePage({ params }: Props) {
  const gameDir = path.join(process.cwd(), "public", "games", params.slug);

  if (!fs.existsSync(gameDir)) {
    notFound();
  }

  const files = fs.readdirSync(gameDir);
  const htmlFile = files.find((f) => f.endsWith(".html"));

  if (!htmlFile) {
    notFound();
  }

  return (
    <iframe
      src={`/games/${params.slug}/${htmlFile}`}
      className="w-full h-full border-none"
      allowFullScreen
    />
  );
}
