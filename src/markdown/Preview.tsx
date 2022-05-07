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
  useTheme
} from "@mui/material";
import { FunctionComponent } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import typescript from "refractor/lang/typescript";
import { darkThemeStyle } from "./styles/dark";
import { lightThemeStyle } from "./styles/light";
import Link from "next/link";

SyntaxHighlighter.registerLanguage("typescript", typescript);

const Span = styled("span")``;

const SyntaxHighLightedCodeComponent: Components["code"] = ({
  inline,
  className,
  children,
  ...props
}) => {
  const theme = useTheme();
  const style =
    theme.palette.mode == "light" ? lightThemeStyle : darkThemeStyle;
  const match = /language-(\w+)/.exec(className || "");
  return !inline ? (
    <SyntaxHighlighter
      style={style}
      language={match ? match[1] : "javascript"}
      PreTag="div"
      wrapLongLines={true}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <Span
      sx={{
        paddingLeft: 1,
        paddingRight: 1,
        backgroundColor: theme => theme.palette.grey[100],
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
  <Typography {...props} variant="h4" sx={{ marginTop: 2 }} />
);

const H2 = props => (
  <Typography {...props} variant="h5" sx={{ marginTop: 1.5 }} />
);

const H3 = props => (
  <Typography {...props} variant="h6" sx={{ marginTop: 1 }} />
);

const H4 = props => (
  <Typography {...props} variant="subtitle1" sx={{ fontWeight: "bold" }} />
);
const H5 = props => (
  <Typography {...props} variant="subtitle2" sx={{ fontWeight: "bold" }} />
);
const H6 = props => <Typography {...props} variant="subtitle2" />;
const P = props => <Typography {...props} variant="body1" />;
const Blockquote = props => (
  <Alert {...props} icon={false} severity="info" color="info" />
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
      <a {...props} />
    </Link>
  );
};

export const MarkdownPreview: FunctionComponent<{ children: string }> = ({
  children
}) => {
  return (
    <ReactMarkdown
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
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
        a: A
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
};
