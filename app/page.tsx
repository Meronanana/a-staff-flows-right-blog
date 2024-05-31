import Showcase from "@/components/root/Showcase";

// SSR 필요해지면 주석 풀어서 적용하기
// import Jacket from "@/components/root/Jacket";
// import dynamic from "next/dynamic";
// const loadingData: PostData = {
//   title: "Loading...",
//   description: "Loading...",
//   coverImage: "/assets/jacket/loading.png",
//   category: "",
//   date: "",
//   path: "",
//   release: true,
// };

// const loadingDatas: PostData[] = [
//   { ...loadingData },
//   { ...loadingData },
//   { ...loadingData },
// ];

// const Showcase = dynamic(() => import("@/components/root/Showcase"), {
//   ssr: false,
//   loading: () => (
//     <div className="flex px-[50%] items-center whitespace-nowrap overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory">
//       <div className="flex space-x-[25vw] pb-3">
//         {loadingDatas.map((v, i) => {
//           return <Jacket key={i} matter={v} />;
//         })}
//       </div>
//     </div>
//   ),
// });

export default function Home() {
  return (
    <main className="flex min-h-96 h-screen flex-col justify-center bg-white dark:bg-gray-800">
      <Showcase />
    </main>
  );
}
