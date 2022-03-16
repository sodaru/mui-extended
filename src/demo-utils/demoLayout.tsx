import { FunctionComponent } from "react";
import { HideMenuProvider, Layout, SodaruAppBar } from "../layout";
import { SimpleMenuWithNextLinks } from "../SimpleMenuWithNextLinks";

const demoLayouts: FunctionComponent[] = [];

export const getDemoLayout = (noMenu = false, noAppBar = false) => {
  const index = (noMenu ? 2 : 0) + (noAppBar ? 1 : 0);
  if (!demoLayouts[index]) {
    const DemoLayout: FunctionComponent<{ pages?: string[] }> = ({
      children,
      pages
    }) => {
      const menu = noMenu ? undefined : (
        <SimpleMenuWithNextLinks pages={pages} />
      );
      const appBar = noAppBar ? undefined : (
        <SodaruAppBar hideMenuBtn={noMenu} />
      );
      return (
        <HideMenuProvider>
          <Layout menu={menu} appBar={appBar}>
            {children}
          </Layout>
        </HideMenuProvider>
      );
    };
    demoLayouts[index] = DemoLayout;
  }
  return demoLayouts[index];
};
