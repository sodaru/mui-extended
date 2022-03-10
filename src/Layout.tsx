import { FunctionComponent, ReactNode } from "react";
import { Box, Grid } from "@mui/material";
import { SplitPane } from "./splitPane/SplitPane";

export type LayoutProps = {
  appBar?: ReactNode;
  menu?: ReactNode;
};

const BaseLayout: FunctionComponent<LayoutProps> = ({
  appBar,
  menu,
  children
}) => {
  return (
    <Grid container flexDirection={"column"} height={"100vh"}>
      <Grid item>{appBar}</Grid>
      <Grid item flexGrow={1}>
        <SplitPane minSize={180} maxSize={500}>
          <Box>{menu}</Box>
          <Box>{children}</Box>
        </SplitPane>
      </Grid>
    </Grid>
  );
};

export const Layout: FunctionComponent<LayoutProps> = ({
  appBar,
  menu,
  children
}) => {
  return (
    <BaseLayout appBar={appBar} menu={menu}>
      {children}
    </BaseLayout>
  );
};
