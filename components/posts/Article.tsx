export default function Article({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className="w-[22em] max-h-[826px] space-y-2 p-2 overflow-y-auto">
      {children}
    </div>
  );
}
