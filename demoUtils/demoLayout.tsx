import { PropsWithChildren } from "react";
import { HideMenuProvider, Layout } from "../src";
import { DemoAppBar } from "./demoAppBar";
import { DemoMenu } from "./demoMenu";

type DemoLayoutProps = PropsWithChildren<{
  pages: string[];
}>;

export const DemoLayout = (props: DemoLayoutProps) => {
  return (
    <HideMenuProvider>
      <Layout
        menu={<DemoMenu pages={props.pages} />}
        appBar={<DemoAppBar />}
        splitPaneProps={{ minSize: 250 }}
      >
        {props.children}
      </Layout>
    </HideMenuProvider>
  );
};
