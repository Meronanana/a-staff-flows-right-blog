export default function LayoutFooter() {
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
}
