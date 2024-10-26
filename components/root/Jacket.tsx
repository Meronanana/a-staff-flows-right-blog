import Image from "next/image";
import JacketInteraction from "./JacketInteraction";

export default function Jacket({ data }: { data: PostData }) {
  return (
    <div id={`jacket-${data.path}`} className="h-full snap-normal snap-center">
      <figure className="w-[45vw] h-[45vw] min-w-32 min-h-32 mt-14 snap-normal snap-center landscape:w-[45vh] landscape:h-[45vh]">
        <Image
          className="w-full h-full"
          src={data.coverImage}
          alt={data.path}
          width={0}
          height={0}
          sizes="100vw"
        />
        {data.path !== "" && <JacketInteraction data={data} />}
      </figure>
    </div>
  );
}
