import { getStaticPropsFactory } from "../demoUtils/staticProps";
import {
  Typography,
  Button,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogProps,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Dialog
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import { withResponsiveDialog } from "../src";

const ResponsiveDialogDemoComponent: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState<"responsive" | "true" | "false">(
    "responsive"
  );

  const fullScreenProps: Partial<DialogProps> = {};
  if (fullScreen == "true") {
    fullScreenProps.fullScreen = true;
  } else if (fullScreen == "false") {
    fullScreenProps.fullScreen = false;
  }

  const ResponsiveDialog = withResponsiveDialog(Dialog);

  return (
    <>
      <RadioGroup
        value={fullScreen}
        onChange={e => {
          setFullScreen(e.target.value as typeof fullScreen);
        }}
      >
        <FormLabel>fullScreen Prop</FormLabel>
        <FormControlLabel
          control={<Radio value="responsive" />}
          label="responsive - fullScreen in mobile only"
        />
        <FormControlLabel
          control={<Radio value="true" />}
          label="true - fullScreen on all screen sizes"
        />
        <FormControlLabel
          control={<Radio value="false" />}
          label="false - No fullScreen on all screen sizes"
        />
      </RadioGroup>

      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Modal
      </Button>
      <ResponsiveDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        {...fullScreenProps}
      >
        <DialogTitle>This dialog goes full screen in mobile</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">
            This Dialog can also be closed by navigating back/forward
          </Typography>
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
      </ResponsiveDialog>
    </>
  );
};

export default ResponsiveDialogDemoComponent;

export const getStaticProps = getStaticPropsFactory("responsive-dialog");
