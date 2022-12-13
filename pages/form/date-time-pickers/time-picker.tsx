import { demoPage } from "../../../demoUtils/demoPage";
import { getStaticPropsFactory } from "../../../src/demo-utils/staticProps";

export default demoPage(undefined);

export const getStaticProps = getStaticPropsFactory([
  "form/date-time-pickers/time-picker"
]);
