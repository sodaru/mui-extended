import { demoPage } from "../../../utils/demoPage";
import { getStaticPropsFactory } from "../../../src/demo-utils/staticProps";

export default demoPage(undefined);

export const getStaticProps = getStaticPropsFactory([
  "form/date-time-pickers/date-time-picker"
]);
