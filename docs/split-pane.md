# Split Pane

---

Splits a container into 2 parts with resizable divider

## Usage

```typescript
import { SplitPane, SplitPaneProps } from "@solib/ui-components";

const props: SplitPaneProps = {
  minSize: 180;
  maxSize: 500;
}

const splitPaneComponent = (
  <SplitPane {...props}>
    <Child1 />
    <child2 />
  </SplitPane>
);
```

#### Usage Notes

- Must exactly have 2 child components
- Rewritten from a open-source package [react-split-pane
  ](https://www.npmjs.com/package/react-split-pane)

_[Layout](../layout) component uses `SplitPane` in desktop mode_

## Features

- `horizontal` and `verticle` split
- turn on / off resizing
- min and max size for resizing
- all sizes are appplied on primary child , can be `first` or `second`
- controlled sizes
- hide only primary

Check `SplitPaneProps` type for all available props
