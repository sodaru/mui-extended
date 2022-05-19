import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const GoogleAnalyticsDemo = demoPage(undefined, "google-analytics");

export default GoogleAnalyticsDemo;

export const getStaticProps = getStaticPropsFactory(["google-analytics"]);
