import Image, { ImageLoader, ImageProps } from "next/image";
import { FunctionComponent } from "react";

export type SodaruImageProps = Omit<ImageProps, "loader"> & {
  alt: string; // force `alt` to be mandatory
};

export const SodaruImage: FunctionComponent<SodaruImageProps> = props => {
  const loader: ImageLoader =
    process.env.NEXT_PUBLIC_DISABLE_SODARU_IMAGE_OPTIMIZATION === "true"
      ? ({ src, width, quality }) => {
          return `${src}?w=${width}&q=${quality || 75}`;
        }
      : undefined;
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} loader={loader} />;
};
