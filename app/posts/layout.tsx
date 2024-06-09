export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-column items-center justify-center pt-[9vh] pb-[6vh] min-h-screen font-sans bg-white dark:bg-gray-800 text-black dark:text-white">
      {children}
    </main>
  );
}
