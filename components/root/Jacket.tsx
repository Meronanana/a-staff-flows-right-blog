import Image from "next/image";
import JacketInteraction from "./JacketInteraction";

export default function Jacket({ data }: { data: PostData }) {
  return (
    <div className="h-full snap-normal snap-center">
      <figure className="size-[45vw] min-w-32 min-h-32 mt-10 snap-normal snap-center landscape:size-[45vh]">
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
