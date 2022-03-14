import { FunctionComponent } from "react";
import LogoImage from "../assets/logo.png";
import { SodaruImage, SodaruImageProps } from "./SodaruImage";

export const SodaruLogo: FunctionComponent<
  Omit<SodaruImageProps, "src" | "alt">
> = props => {
  return (
    <SodaruImage
      src={LogoImage}
      width={100}
      height={100}
      alt="Sodaru Logo"
      {...props}
    />
  );
};
