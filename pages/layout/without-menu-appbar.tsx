import Typography from "@mui/material/Typography";
import { getStaticPropsFactory } from "../../demoUtils/staticProps";

const LayoutWithoutMenuAndAppBar = () => {
  return (
    <Typography variant="h6">
      Refer <a href="/mui-extended/layout">Layout</a> for demo
    </Typography>
  );
};

export default LayoutWithoutMenuAndAppBar;

export const getStaticProps = getStaticPropsFactory(
  "layout/without-menu-appbar"
);
