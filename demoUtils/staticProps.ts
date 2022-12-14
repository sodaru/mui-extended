import { existsSync } from "fs";
import { readdir, readFile, stat } from "fs/promises";
import { join, relative } from "path";

const getNextJsRootDir = (): string => {
  let dir = process.cwd();
  while (!existsSync(join(dir, "package.json"))) {
    const parentDir = join(dir, "..");
    if (dir == parentDir) {
      throw new Error("No NextJs Package found");
    }
    dir = parentDir;
  }
  return dir;
};

/**
 * Return the list of pages in pages directory.
 * Required for the use in Menu of the Demo Pages
 */
export const listDemoPages = async () => {
  const dir = getNextJsRootDir();
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

/**
 * Reads the documents from `docs` directory
 */
const loadDoc = async (path: string): Promise<string> => {
  const dir = getNextJsRootDir();
  const absPath = join(dir, "docs", path + ".md");
  const docContent = await readFile(absPath, { encoding: "utf8" });
  return docContent;
};

export const getStaticPropsFactory = (
  docPath?: string
): (() => Promise<Record<string, unknown>>) => {
  return async () => {
    const pages = await listDemoPages();
    const doc = await loadDoc(docPath);
    return { props: { pages, doc } };
  };
};
