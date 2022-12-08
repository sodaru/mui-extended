import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { ThemeModeSwitch } from "../src/ThemeModeSwitch";

export default ThemeModeSwitch;

export const getStaticProps = getStaticPropsFactory(["theme-mode-switch"]);
