export default function Article({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div
      id="article-wrapper"
      className="w-[22rem] max-h-[calc(100vh-10rem)] p-2 overflow-y-auto"
    >
      <div className="max-h-[52rem] space-y-2 overflow-y-hidden">
        {children}
      </div>
    </div>
  );
}
