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
MyPage.propsDistribution = {
  page: propsForPageComponent,
  layout: propsForLayerComponent
};

export default MyPage;
```

`SodaruPageComponentType` extends `NextComponentType` with 2 additional properties

- **layout**_(Optional)_ A `FunctionComponent` to be used as a layout for this page
- **propsDistribution**_(Optional)_ A map of prop keys to distribute props fetched from nextJs [`Data Fetching methods`](https://nextjs.org/docs/basic-features/data-fetching/overview) among the layout and page components

_This Demo uses [`Layout`](../layout) component as `layout` property for all the demo pages_
