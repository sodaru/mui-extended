# Sodaru Image

---

Wraps the [`next/image`][nextimagelink] with support for static site generation

## Usage

```typescript
import { SodaruImage } from "@solib/ui-components";

const img = <SodaruImage src={imgSource} alt="My Image">
```

[`next/image`][nextimagelink] supports **Image Optimization** by Default.

For static site generation **Image Optimization** must be disabled. [Read More](https://nextjs.org/docs/messages/export-image-api)

Setting next environmental variable `NEXT_PUBLIC_DISABLE_SODARU_IMAGE_OPTIMIZATION` to **`true`** will disable the Image Optimization in `SodaruImage`.

### Steps for Static Site Genaration

- set the environmental variable `echo "NEXT_PUBLIC_DISABLE_SODARU_IMAGE_OPTIMIZATION=true" >> .env.local`
- make sure `images.loader=custom` in `next.config.js`

  ```js
  const images = {};
  if (process.env.NEXT_PUBLIC_DISABLE_SODARU_IMAGE_OPTIMIZATION === "true") {
    images.loader = "custom";
  }
  module.exports = {
    images: images
  };
  ```

- run `npx next build && npx next export`

[nextimagelink]: https://nextjs.org/docs/api-reference/next/image
