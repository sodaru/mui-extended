# Resizable Box

---

Extends [Box](https://mui.com/material-ui/react-box/) with `onResize` callback

Implemented using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) webapi

## Usage

```typescript
import { ResizableBox } from "mui-extended";

const resizableBox = (
  <ResizableBox onResize={(width: number, height: number) => {}}>
    {children}
  </ResizableBox>
);
```

## Props

- props are same as [Box](https://mui.com/material-ui/react-box/)
- `onResize` - a function callback to be fired when Box is resized
- `boxRef` - a ref to Box's div
