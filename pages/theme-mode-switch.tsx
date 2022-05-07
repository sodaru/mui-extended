import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { ThemeModeSwitch } from "../src/ThemeModeSwitch";

const ThemeModeSwitchDemoComponent = () => {
  return <ThemeModeSwitch />;
};

const ThemeModeSwitchDemo = demoPage(
  ThemeModeSwitchDemoComponent,
  "theme-mode-switch"
);

export default ThemeModeSwitchDemo;

export const getStaticProps = getStaticPropsFactory(["theme-mode-switch"]);
