import { Typography } from "@mui/material";
import { getStaticPropsFactory } from "../../demoUtils/staticProps";

const LayoutWithoutMenu = () => {
  return (
    <Typography variant="h6">
      Refer <a href="/mui-extended/layout">Layout</a> for demo
    </Typography>
  );
};

export default LayoutWithoutMenu;

export const getStaticProps = getStaticPropsFactory("layout/without-menu");
