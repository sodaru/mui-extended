import Link from "next/link";
import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const LayoutWithoutMenuDemo = demoPage(() => {
  return (
    <>
      This is a page using (Layout with out menu)
      <br />
      <Link href="/">Go Back to Home</Link>
      <br />
      <Link href="/sodaru-theme">Go Back to Sodaru Theme</Link>
    </>
  );
}, true);

export default LayoutWithoutMenuDemo;

export const getStaticProps = getStaticPropsFactory();
