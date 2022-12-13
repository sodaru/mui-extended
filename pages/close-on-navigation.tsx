import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import { withCloseOnNavigation } from "../src";
import Link from "next/link";

const CloseOnNavigationDemoComponent: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const BackClosableDialog = withCloseOnNavigation(Dialog);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Modal
      </Button>
      <BackClosableDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          This Dialog can be closed by navigating back/forward
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">
            Dialog can be closed in many ways
          </Typography>
          <List>
            <ListItem>By Clicking Close Button</ListItem>
            <ListItem>By Pressing ESC Key</ListItem>
            <ListItem>By Clicking on the BackDrop</ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>Navigating Back</ListItem>
            <ListItem>
              <ListItemText
                primary="Navigating Forward to another page"
                secondary={
                  <span>
                    example : Click here to go to <Link href="/">Home</Link>
                    <br />
                    <strong>Note: </strong>Navigating back from Home points to
                    this doc page with dialog closed
                  </span>
                }
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </BackClosableDialog>
    </>
  );
};

export default CloseOnNavigationDemoComponent;

export const getStaticProps = getStaticPropsFactory(["close-on-navigation"]);
