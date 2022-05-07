# Page Component in _Sodaru App_

---

[`SodaruApp`](../sodaru-app) extends `NextComponentType` to use with in the `SodaruApp`

## Usage

```typescript
import { SodaruPageComponentType } from "@solib/ui-components";

const MyPage: SodaruPageComponentType = () => {
  // page content
};

MyPage.layout = layoutForThisPage;
MyPage.layoutProps = propsForLayoutComponent;
MyPage.pageProps = propsForPageComponent;

export default MyPage;
```

`SodaruPageComponentType` extends `NextComponentType` with 3 additional properties

- **layout**_(Optional)_ A `FunctionComponent` to be used as a layout for this page
- **layoutProps**_(Optional)_ A list of prop keys to apply props fetched from nextJs [`Data Fetching methods`](https://nextjs.org/docs/basic-features/data-fetching/overview) to layout
  - if not specified, all props are applied to layout
- **pageProps**_(Optional)_ A list of prop keys to apply props fetched from nextJs [`Data Fetching methods`](https://nextjs.org/docs/basic-features/data-fetching/overview) to page
  - if not specified, all props are applied to layout

_This Demo uses [`Layout`](../layout) component as `layout` property for all the demo pages_
