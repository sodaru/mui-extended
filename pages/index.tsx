import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const Index = () => {
  return <h1>I am index</h1>;
};

export default Index;

export const getStaticProps = getStaticPropsFactory(["home"]);
