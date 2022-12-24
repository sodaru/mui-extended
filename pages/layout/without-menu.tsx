import { Typography } from "@mui/material";
import Link from "next/link";
import { getStaticPropsFactory } from "../../demoUtils/staticProps";

const LayoutWithoutMenu = () => {
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

export default LayoutWithoutMenu;

export const getStaticProps = getStaticPropsFactory("layout/without-menu");
