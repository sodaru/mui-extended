import { List, ListItem, Paper, Typography } from "@mui/material";
import { getStaticPropsFactory } from "../../demoUtils/staticProps";
import { MarqueeAnimation } from "../../src/animations/MarqueeAnimation";

const MarqueeAnimationDemoComponent = (): JSX.Element => {
  return (
    <List sx={{ maxWidth: "300px" }}>
      <Paper>
        <ListItem>
          <MarqueeAnimation width="100%">
            Text With Default Props
          </MarqueeAnimation>
        </ListItem>
        <ListItem>
          <MarqueeAnimation width="100%" speed={20000} repeat>
            Text With Slow speed
          </MarqueeAnimation>
        </ListItem>
        <ListItem>
          <MarqueeAnimation width="100%" repeat={true}>
            Text With Repeating Text
          </MarqueeAnimation>
          &nbsp;
        </ListItem>

        <ListItem>
          <MarqueeAnimation width="100%" repeat={true} reverse={true}>
            Text With reverse marquee
          </MarqueeAnimation>
          &nbsp;
        </ListItem>

        <ListItem>
          <MarqueeAnimation repeat={true} width="100%">
            <Typography color="primary" variant="h3">
              Formatted Text Format&nbsp;
            </Typography>
          </MarqueeAnimation>
        </ListItem>
      </Paper>
    </List>
  );
};

export default MarqueeAnimationDemoComponent;

export const getStaticProps = getStaticPropsFactory("animations/marquee");
