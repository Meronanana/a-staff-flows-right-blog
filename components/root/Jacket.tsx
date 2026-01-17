import Image from "next/image";
import JacketInteraction from "./JacketInteraction";

interface JacketProps {
  data: PostData;
  width?: string;
  height?: string;
}

export default function Jacket({ data, width, height }: JacketProps) {
  const defaultSize = "size-[45vw] min-w-32 min-h-32 landscape:size-[45vh]";

  // If width and height are provided, use the smaller value for square image
  const imageSize = width && height ? `min(${width}, ${height})` : undefined;

  return (
    <div className="h-full snap-normal snap-center">
      {/* Square image container */}
      <figure
        id={data.path ? `jacket-figure-${data.path}` : undefined}
        className={`${!width || !height ? defaultSize : ""} snap-normal snap-center relative duration-200 group`}
        style={
          imageSize
            ? {
                width: imageSize,
                height: imageSize,
              }
            : undefined
        }
      >
        <Image
          className="w-full h-full object-cover"
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
