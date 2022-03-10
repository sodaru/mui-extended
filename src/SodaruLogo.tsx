import Image, { ImageProps } from "next/image";
import { FunctionComponent } from "react";
import LogoImage from "./logo.png";

export const SodaruLogo: FunctionComponent<Omit<ImageProps, "src">> = props => {
  return (
    <Image src={LogoImage} alt="Logo" width={100} height={100} {...props} />
  );
};
