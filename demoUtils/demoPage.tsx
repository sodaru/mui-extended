import { ReactNode } from "react";

export const demoPage = (node: ReactNode) => {
  const Page = () => {
    return node;
  };
  return Page;
};
