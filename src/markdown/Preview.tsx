import {
  Alert,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  Link as MuiLink,
  Box,
  IconButton,
  Tooltip
} from "@mui/material";
import { createContext, FunctionComponent, ReactNode, useContext } from "react";
import ReactMarkdown, { Components, Options } from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import typescript from "refractor/lang/typescript";
import { darkThemeStyle } from "./styles/dark";
import { lightThemeStyle } from "./styles/light";
import Link from "next/link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

SyntaxHighlighter.registerLanguage("typescript", typescript);

const Span = styled("span")``;

type CodeComponentContextType = { enableCopy?: boolean; maxHeight?: string };
const CodeComponentContext = createContext<CodeComponentContextType>({});

export const CodeComponentContextProvider = CodeComponentContext.Provider;

const getNodeText = (node: ReactNode) => {
  if (["string", "number"].includes(typeof node)) {
    return node;
  } else if (node instanceof Array) {
    return node.map(getNodeText).join("");
  } else if (typeof node === "object" && node) {
    //@ts-expect-error props may not be in node
    return getNodeText(node?.props?.children);
  } else {
    return "";
  }
};

export const generateAnchorLink = (linkTitle: ReactNode) => {
  return (
    getNodeText(linkTitle)
      .toLocaleLowerCase()
      // eslint-disable-next-line no-control-regex
      .replace(/[\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]/g, "_")
  );
};

export type TypeMarkdownPreviewProps = {
  anchorLink?: boolean;
  includeHierarchyInAnchorLink?: boolean;
};
const MarkdownPreviewContext = createContext<TypeMarkdownPreviewProps>({});

export const markdownAnchorLinkHOC = function <T = Record<string, unknown>>(
  HeaderComponent: FunctionComponent<T>
) {
  return function HeaderComponentWithAnchorLink(props: T) {
    const context = useContext(MarkdownPreviewContext);
    let elem = <HeaderComponent {...props} />;
    if (context.anchorLink) {
      elem = (
        <a
          href={"#" + generateAnchorLink(props["children"] || "")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {elem}
        </a>
      );
    }
    return elem;
  };
};

const SyntaxHighLightedCodeComponent: Components["code"] = ({
  inline,
  className,
  children,
  ...props
}) => {
  const theme = useTheme();
  const codeComponentContext = useContext(CodeComponentContext);
  const style =
    theme.palette.mode == "light" ? lightThemeStyle : darkThemeStyle;
  const match = /language-(\w+)/.exec(className || "");
  return !inline ? (
    <Box
      position="relative"
      sx={{
        "& > div": {
          maxHeight: codeComponentContext.maxHeight,
          overflow: "auto"
        }
      }}
    >
      <SyntaxHighlighter
        style={style}
        language={match ? match[1] : "javascript"}
        PreTag="div"
        wrapLongLines={true}
        {...props}
      >
        {children}
      </SyntaxHighlighter>
      {codeComponentContext.enableCopy ? (
        <Tooltip title="Copy Contents">
          <IconButton
            sx={{ position: "absolute", top: 8, right: 16 }}
            onClick={() => {
              navigator.clipboard.writeText(children as string);
            }}
          >
            <ContentCopyIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  ) : (
    <Span
      sx={{
        paddingLeft: 1,
        paddingRight: 1,
        color: "primary.main"
      }}
    >
      <code className={className} {...props}>
        {children}
      </code>
    </Span>
  );
};

const H1 = props => (
  <Typography
    {...props}
    variant="h4"
    variantMapping={{ h4: "h1" }}
    sx={{ marginTop: 2 }}
  />
);

const H2 = props => (
  <Typography
    {...props}
    variant="h5"
    variantMapping={{ h5: "h2" }}
    sx={{ marginTop: 2 }}
  />
);

const H3 = props => (
  <Typography
    {...props}
    variant="h6"
    variantMapping={{ h6: "h3" }}
    sx={{ marginTop: 1 }}
  />
);

const H4 = props => (
  <Typography
    {...props}
    variant="subtitle1"
    variantMapping={{ subtitle1: "h4" }}
    sx={{ marginTop: 0.5, fontWeight: "bold" }}
  />
);

const H5 = props => (
  <Typography
    {...props}
    variant="subtitle2"
    variantMapping={{ subtitle2: "h5" }}
    sx={{ marginTop: 0.5, fontWeight: "bold" }}
  />
);
const H6 = props => (
  <Typography
    {...props}
    variant="subtitle2"
    variantMapping={{ subtitle2: "h6" }}
  />
);
const P = props => <Typography {...props} variant="body1" py={1} />;
const Blockquote = ({ children, ...props }) => (
  <blockquote {...props} style={{ margin: "16px 0 16px 0" }}>
    <Alert icon={false} severity="info" color="info" sx={{ my: 1, py: 0 }}>
      {children}
    </Alert>
  </blockquote>
);
const TableComponent = props => (
  <TableContainer component={Paper}>
    <Table {...props} size="small" />
  </TableContainer>
);
const Img = props => {
  const propsFromTitle = {};
  if (props.title) {
    const [title, attrs] = props.title.split("?", 2);
    propsFromTitle["title"] = title;
    Object.assign(
      propsFromTitle,
      Object.fromEntries(new URLSearchParams(attrs).entries())
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} {...propsFromTitle} alt={props.alt} />;
};

const A = props => {
  return (
    <Link href={props.href}>
      <MuiLink {...props} />
    </Link>
  );
};

export const MarkdownPreview: FunctionComponent<
  {
    children: string;
    components?: Options["components"];
  } & TypeMarkdownPreviewProps
> = ({ children, components = {}, ...props }) => {
  const _components: Options["components"] = {
    h1: markdownAnchorLinkHOC(H1),
    h2: markdownAnchorLinkHOC(H2),
    h3: markdownAnchorLinkHOC(H3),
    h4: markdownAnchorLinkHOC(H4),
    h5: markdownAnchorLinkHOC(H5),
    h6: markdownAnchorLinkHOC(H6),
    p: P,
    blockquote: Blockquote,
    table: TableComponent,
    img: Img,
    thead: TableHead,
    tbody: TableBody,
    th: TableCell as unknown as Components["th"],
    tr: TableRow,
    td: TableCell as unknown as Components["td"],
    code: SyntaxHighLightedCodeComponent,
    a: A,
    ...components
  };

  return (
    <MarkdownPreviewContext.Provider value={props}>
      <ReactMarkdown components={_components} remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </MarkdownPreviewContext.Provider>
  );
};
