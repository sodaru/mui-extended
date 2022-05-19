# Text Typing Animation

---

## Usage

```typescript
import { TextTypingAnimation } from "@solib/ui-components";

const typedComponent = (
  <TextTypingAnimation>String to Type</TextTypingAnimation>
);
```

## Props

- `children` (_Required_) string, text to type
- `speed` (_Optional_) number , defaults to 200 ms
- `repeat` (_Optional_) boolean, animation repeats if `true`, default is `false`
- `repeatInterval` (_Optional_) number, number of ms before repeating the next round of animation, defaults to 2000 ms
- `reverse` (_Optional_) boolean, letters are deleted from right to left ( <- ) if set to `true`, default is `false`
- `onComplete` (_Optional_) callback of type `() => void`, called after completion of the animation. ignored if `repeat` is true
