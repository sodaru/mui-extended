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
  Typography
} from "@mui/material";
import { FunctionComponent } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import typescript from "refractor/lang/typescript";
import { VsCodeDarkThemeStyle } from "./vsc-dark-theme";

SyntaxHighlighter.registerLanguage("typescript", typescript);

const Span = styled("span")``;

const SyntaxHighLightedCodeComponent: Components["code"] = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline ? (
    <SyntaxHighlighter
      style={VsCodeDarkThemeStyle}
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

export const MarkdownPreview: FunctionComponent = ({ children }) => {
  return (
    <ReactMarkdown
      components={{
        h1: props => <Typography {...props} variant="h4" />,
        h2: props => <Typography {...props} variant="h5" />,
        h3: props => <Typography {...props} variant="h6" />,
        h4: props => <Typography {...props} variant="subtitle1" />,
        h5: props => <Typography {...props} variant="subtitle2" />,
        h6: props => <Typography {...props} variant="body1" />,
        p: props => <Typography {...props} variant="body2" />,
        blockquote: props => (
          <Alert {...props} icon={false} severity="info" color="info" />
        ),
        table: props => (
          <TableContainer component={Paper}>
            <Table {...props} size="small" />
          </TableContainer>
        ),
        thead: TableHead,
        tbody: TableBody,
        th: TableCell as unknown as Components["th"],
        tr: TableRow,
        td: TableCell as unknown as Components["td"],
        code: SyntaxHighLightedCodeComponent
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children as string}
    </ReactMarkdown>
  );
};
