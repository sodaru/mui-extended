# Aspect Ratio Container

---

Creates a Container component whose height is always relative to its width

## Usage

```typescript
import { AspectRatioContainer } from "mui-extended";

const container = (
  <AspectRatioContainer ratio={[16, 9]} width="100%" maxWidth={800}>
    <Paper sx={{ width: "100%", height: "100%" }} elevation={4} />
  </AspectRatioContainer>
);
```

## Features

- props are same as [Box](https://mui.com/material-ui/react-box/)
  - hight props `height` & `maxHeight` & `minHeight`, may break the layout , use it carefully
- `ratio` - array of 2 numbers representing width to height ratio
