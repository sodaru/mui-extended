import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const SodaruAppPageComponentDemo = demoPage(
  undefined,
  "sodaru-app/page-component"
);

export default SodaruAppPageComponentDemo;

export const getStaticProps = getStaticPropsFactory([
  "sodaru-app/page-component"
]);
