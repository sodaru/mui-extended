import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const SodaruDocumentDemo = demoPage(undefined, "sodaru-document");

export default SodaruDocumentDemo;

export const getStaticProps = getStaticPropsFactory(["sodaru-document"]);
