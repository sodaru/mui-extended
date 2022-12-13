import { Box, Tooltip } from "@mui/material";
import { CookiePreference } from "../src";

import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CookiePreferenceDemoComponent = () => {
  return (
    <Box>
      Find the Cookie Fab Down Right there
      <ArrowForwardIcon sx={{ transform: "rotate(45deg) scale(2)", ml: 2 }} />
      <Tooltip title="Cookie Preferences">
        <CookiePreference sx={{ position: "fixed", bottom: 25, right: 25 }} />
      </Tooltip>
    </Box>
  );
};

export default CookiePreferenceDemoComponent;

export const getStaticProps = getStaticPropsFactory(["cookie-preference"]);
