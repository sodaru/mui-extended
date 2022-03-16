import Link from "next/link";
import { SodaruPageComponentType } from "../src";
import { listDemoPages } from "../src/demo-utils/listDemoPages";
import { getDemoLayout } from "../src/demo-utils/demoLayout";

const LayoutWithoutMenuDemo: SodaruPageComponentType = () => {
  return (
    <>
      This is a page using (Layout with out menu)
      <br />
      <Link href="/">Go Back to Home</Link>
      <br />
      <Link href="/sodaru-theme">Go Back to Sodaru Theme</Link>
    </>
  );
};

LayoutWithoutMenuDemo.layout = getDemoLayout(true);

export default LayoutWithoutMenuDemo;

export async function getStaticProps() {
  const pages = await listDemoPages();
  return { props: { pages } };
}
