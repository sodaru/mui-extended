import { existsSync } from "fs";
import { readdir, readFile, stat } from "fs/promises";
import { join, relative } from "path";
import { GetStaticProps } from "next";
import { load } from "js-yaml";

export type DocMeta = {
  title?: string;
  meta?: Record<string, string>;
  structuredData?: Record<string, unknown>; // https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
};

export type StaticProps = {
  pages: string[];
  doc: {
    meta: DocMeta;
    content: string;
    title: string;
  };
};

/**
 * Return the list of pages in pages directory.
 * Required for the use in Menu of the Demo Pages
 */
export const listDemoPages = async () => {
  const dir = process.cwd();
  const pagesDir = join(dir, "pages");
  const pages = [];
  if (existsSync(pagesDir)) {
    const dirsToParse = [pagesDir];
    while (dirsToParse.length > 0) {
      const dirToParse = dirsToParse.shift();
      const files = await readdir(dirToParse);
      const normalFiles = files.filter(f => !f.startsWith("_"));
      await Promise.all(
        normalFiles.map(async f => {
          const absolutePath = join(dirToParse, f);
          const stats = await stat(absolutePath);
          if (stats.isDirectory()) {
            dirsToParse.push(absolutePath);
          } else {
            const relativePath = relative(pagesDir, absolutePath).replaceAll(
              "\\",
              "/"
            );
            const page = relativePath.substring(
              0,
              relativePath.lastIndexOf(".")
            );
            pages.push(page);
          }
        })
      );
    }
  }
  return pages;
};

const extractDetailsFromDocContent = (docContent: string) => {
  const META_START = "```YAML\n";
  const META_END = "\n```\n";
  const TITLE_END = "\n---\n";

  let meta: DocMeta = { title: "", meta: {} };
  let content = docContent.trim();
  let title = "";

  if (content.startsWith(META_START)) {
    // meta detected
    const endOfMeta = content.indexOf(META_END);
    const metaStr = content.substring(META_START.length, endOfMeta);
    meta = load(metaStr);

    content = content.substring(endOfMeta + META_END.length);

    //seperate title and content
    const titleEndIndex = content.indexOf(TITLE_END);
    title = content.substring(0, titleEndIndex).replace("#", "").trim();
    content = content.substring(titleEndIndex + TITLE_END.length);
  }

  return { meta, title, content };
};

/**
 * Reads the documents from `docs` directory
 */
const loadDoc = async (path: string) => {
  const dir = process.cwd();
  const absPath = join(dir, "docs", path + ".md");
  const docContent = existsSync(absPath)
    ? await readFile(absPath, { encoding: "utf8" })
    : "";
  return extractDetailsFromDocContent(docContent);
};

export const getStaticPropsFactory = (
  docPath?: string
): GetStaticProps<StaticProps> => {
  return async () => {
    const pages = await listDemoPages();
    const doc = await loadDoc(docPath);
    return { props: { pages, doc } };
  };
};
