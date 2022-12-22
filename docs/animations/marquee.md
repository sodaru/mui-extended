```YAML
title: Marquee Animation
meta:
  description:
    Lightweight, performant React component that utilizes the power of CSS animations to create smooth marquees slider
```

# Marquee Animation

---

## Usage

```typescript
import { MarqueeAnimation } from "mui-extended";

const marqueedComponent = (
  <MarqueeAnimation>React node to be Marqueed</MarqueeAnimation>
);
```

## Props

- all props from [`BoxProps`](https://mui.com/material-ui/api/box/#props)
- `children` (_Required_) any react node
- `speed` (_Optional_) number , defaults to 10000 ms
- `repeat` (_Optional_) boolean, animation repeats if `true`, default is `false`
- `reverse` (_Optional_) boolean, moves from left to right ( -> ) if `true`, default is `false`
