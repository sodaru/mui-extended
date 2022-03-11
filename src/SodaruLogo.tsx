import { FunctionComponent } from "react";
import LogoImage from "./assets/logo.png";
import { SodaruImage, SodaruImageProps } from "./SodaruImage";

export const SodaruLogo: FunctionComponent<
  Omit<SodaruImageProps, "src">
> = props => {
  return (
    <SodaruImage
      src={LogoImage}
      alt="Sodaru Logo"
      width={100}
      height={100}
      {...props}
    />
  );
};
