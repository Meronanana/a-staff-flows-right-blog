import Link from "next/link";
import DarkmodeIcon from "./DarkmodeIcon";
import CreditDisplay from "./CreditDisplay";
import StoreProvider from "@/app/StoreProvider";

export default function LayoutHeader() {
  // const [balance, setBalance] = useState<number>(0);
  // useEffect(() => {
  //   fetch(`/api/credit`, {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       if (res.status === 404) return { data: undefined };
  //       else return res.json();
  //     })
  //     .then((body) => setBalance(body.balance));
  // }, []);

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
          <StoreProvider>
            <CreditDisplay />
          </StoreProvider>
        </li>
        <li className="flex items-center ml-8 h-7">
          <Link href="/games/demo_deokguri" title="Game">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 hover:opacity-60 duration-300"
            >
              <line x1="6" y1="11" x2="10" y2="11" />
              <line x1="8" y1="9" x2="8" y2="13" />
              <line x1="15" y1="12" x2="15.01" y2="12" />
              <line x1="18" y1="10" x2="18.01" y2="10" />
              <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
            </svg>
          </Link>
        </li>
        <li className="flex items-center ml-5 h-7">
          <DarkmodeIcon />
        </li>
      </ul>
    </div>
  );
}
