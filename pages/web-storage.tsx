import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const WebStorageDemo = demoPage(undefined, "web-storage");

export default WebStorageDemo;

export const getStaticProps = getStaticPropsFactory(["web-storage"]);
