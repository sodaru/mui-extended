import { FunctionComponent, ReactNode } from "react";
import { Box, Grid } from "@mui/material";
import { SplitPane } from "../splitPane/SplitPane";
import { useHideMenu } from "./HideMenu";

type BaseLayoutProps = {
  appBar: ReactNode;
  menu: ReactNode;
};

const BaseLayout: FunctionComponent<BaseLayoutProps> = ({
  appBar,
  menu,
  children
}) => {
  const hideMenu = useHideMenu();
  return (
    <Grid container flexDirection={"column"} height={"100vh"}>
      <Grid item sx={{ "& .MuiAppBar-root": { position: "static" } }}>
        {appBar}
      </Grid>
      <Grid item flexGrow={1} sx={{ position: "relative" }}>
        <SplitPane
          minSize={180}
          maxSize={500}
          hidePrimary={hideMenu.hide || !menu}
        >
          <Box>{menu}</Box>
          <Box>{children}</Box>
        </SplitPane>
      </Grid>
    </Grid>
  );
};

export type LayoutProps = {
  appBar?: ReactNode;
  menu?: ReactNode;
};

export const Layout: FunctionComponent<LayoutProps> = ({
  appBar,
  menu,
  children
}) => {
  const _menu = menu || "";
  const _appBar = appBar || "";

  return (
    <BaseLayout appBar={_appBar} menu={_menu}>
      {children}
    </BaseLayout>
  );
};
