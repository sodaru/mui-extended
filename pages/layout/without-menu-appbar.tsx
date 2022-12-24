import Typography from "@mui/material/Typography";
import Link from "next/link";
import { getStaticPropsFactory } from "../../demoUtils/staticProps";

const LayoutWithoutMenuAndAppBar = () => {
  return (
    <Typography variant="h6">
      {"Refer "}
      <Link href={"/layout"}>
        <a>Layout</a>
      </Link>
      {" for demo"}
    </Typography>
  );
};

export default LayoutWithoutMenuAndAppBar;

export const getStaticProps = getStaticPropsFactory(
  "layout/without-menu-appbar"
);
