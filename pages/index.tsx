import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import Layout from "../src/Layout";
import SimpleMenuWithNextLinks from "../src/SimpleMenuWithNextLinks";
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
      Welcome <div style={{ fontFamily: "sans-serif" }}>Welcome</div>
    </Box>
  );
};

Index.layout = ComposedLayout;

export default Index;
