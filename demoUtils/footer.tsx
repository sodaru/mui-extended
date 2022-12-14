import { Box, Button, Grid, Link, Paper, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useRouter } from "next/router";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const Footer = () => {
  const router = useRouter();
  return (
    <>
      <Paper variant="outlined" sx={{ my: 2 }}>
        <Box p={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" py={1}>
                Does this page need improvements?
              </Typography>
              <Link
                href={
                  "https://github.com/sodaru/mui-extended/blob/main/docs/" +
                  router.asPath +
                  ".md"
                }
                display="flex"
                alignItems="center"
                target="_blank"
              >
                Edit This Page in GitHub <LaunchIcon />
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" py={1}>
                Did this page help you?
              </Typography>
              <Button variant="outlined" endIcon={<ThumbUpAltIcon />}>
                Yes
              </Button>{" "}
              <Button variant="outlined" endIcon={<ThumbDownAltIcon />}>
                No
              </Button>
              <Link
                href={"https://github.com/sodaru/mui-extended/discussions/2"}
                display="flex"
                alignItems="center"
                target="_blank"
              >
                Provide feedback in the GitHub Discussion Page
                <LaunchIcon />
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" py={1}>
                Need More help?
              </Typography>
              <Typography variant="body1">
                Write an email to{" "}
                <Link href="mailto:opensource@sodaru.com">
                  opensource@sodaru.com
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default Footer;
