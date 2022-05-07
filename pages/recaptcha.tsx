import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const ReCaptchaDemo = demoPage(undefined, "recaptcha");

export default ReCaptchaDemo;

export const getStaticProps = getStaticPropsFactory(["recaptcha"]);
