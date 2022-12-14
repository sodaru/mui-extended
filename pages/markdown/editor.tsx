import { TextField, FormControlLabel, Switch } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { MarkdownEditor } from "../../src";
import { getStaticPropsFactory } from "../../demoUtils/staticProps";

const MarkdownEditorDemoComponent: FunctionComponent = () => {
  const [value, setValue] = useState<string>("## Welcome");
  const [inlinePreview, setInlinePreview] = useState<boolean>(false);
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            value={inlinePreview}
            onChange={event => {
              setInlinePreview(event.target.checked);
            }}
          />
        }
        label="Inline Preview"
      />
      <TextField
        label="Markdown Editor"
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        placeholder="Write Markdown here"
        InputProps={{
          inputComponent: MarkdownEditor,
          inputProps: { inlinePreview }
        }}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </>
  );
};

export default MarkdownEditorDemoComponent;

export const getStaticProps = getStaticPropsFactory("markdown/editor");
