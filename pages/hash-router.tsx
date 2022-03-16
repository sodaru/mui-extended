import { SodaruPageComponentType, withSizeAndVariantFromTheme } from "../src";
import { Button, List, ListItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useHashRouter } from "../src/utils";
import { listDemoPages } from "../src/demo-utils/listDemoPages";
import { getDemoLayout } from "../src/demo-utils/demoLayout";

const SoTextField = withSizeAndVariantFromTheme(TextField);

const RouterDemo: SodaruPageComponentType = () => {
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
};

RouterDemo.layout = getDemoLayout();

export default RouterDemo;

export async function getStaticProps() {
  const pages = await listDemoPages();
  return { props: { pages } };
}
