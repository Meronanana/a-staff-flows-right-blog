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
        <li className="flex items-center ml-5 h-7">
          <DarkmodeIcon />
        </li>
      </ul>
    </div>
  );
}
