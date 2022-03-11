import Image, { ImageLoader, ImageProps } from "next/image";
import { FunctionComponent } from "react";
import LogoImage from "./assets/logo.png";

export const SodaruLogo: FunctionComponent<Omit<ImageProps, "src">> = props => {
  const loader: ImageLoader =
    process.env.NEXT_PUBLIC_DISABLE_IMAGE_OPTIMIZATION === "true"
      ? ({ src, width, quality }) => {
          return `${src}?w=${width}&q=${quality || 75}`;
        }
      : undefined;
  return (
    <Image
      src={LogoImage}
      alt="Logo"
      width={100}
      height={100}
      {...props}
      loader={loader}
    />
  );
};
