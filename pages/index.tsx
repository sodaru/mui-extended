import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Layout from "../src/Layout";
import { SimpleMenuWithNextLinks } from "../src/SimpleMenuWithNextLinks";
import { SodaruPageComponentType } from "../src/SodaruApp";

export const ComposedLayout: FunctionComponent = ({ children }) => {
  return (
    <Layout
      menu={
        <SimpleMenuWithNextLinks
          pages={[{ link: "/", label: "Home" }, "textfield"]}
        />
      }
    >
      {children}
    </Layout>
  );
};

const Index: SodaruPageComponentType = () => {
  return (
    <Box>
      <Typography variant="h2">Welcome</Typography>
      <Typography variant="h3" fontFamily="sans-serif">
        This is a showcase of Common UI Components
      </Typography>
    </Box>
  );
};

Index.layout = ComposedLayout;

export default Index;
