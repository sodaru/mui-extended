import { Button, List, ListItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { withSizeAndVariantFromTheme } from "../src";
import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { useHashRouter } from "../src/utils";

const SoTextField = withSizeAndVariantFromTheme(TextField);

const RouterDemo = demoPage(() => {
  const [hashState, setHashState] = useHashRouter<string>("");
  const [hashTempState, setHashTempState] = useState("");
  const [nonHashState, setNonHashState] = useState("");

  useEffect(() => {
    setHashTempState(hashState);
  }, [hashState]);

  return (
    <List>
      <ListItem>
        <SoTextField
          label="Non Hash State"
          value={nonHashState}
          onChange={event => {
            setNonHashState(event.target.value);
          }}
        />
      </ListItem>
      <ListItem>
        <SoTextField
          label="Hash State"
          value={hashTempState}
          onChange={event => {
            setHashTempState(event.target.value);
          }}
        />
      </ListItem>
      <ListItem>
        <Button
          onClick={() => {
            setHashState(hashTempState);
          }}
        >
          Change Hash
        </Button>
      </ListItem>
    </List>
  );
});

export default RouterDemo;

export const getStaticProps = getStaticPropsFactory();
