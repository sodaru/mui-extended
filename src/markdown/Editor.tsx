import {
  Box,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  IconButtonProps,
  Tab,
  Tabs,
  TextareaAutosize,
  TextareaAutosizeProps,
  Theme,
  Tooltip,
  useMediaQuery
} from "@mui/material";
import {
  FunctionComponent,
  ReactNode,
  Fragment,
  SyntheticEvent,
  useState,
  forwardRef,
  createRef,
  FocusEventHandler,
  MouseEventHandler,
  FocusEvent
} from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CodeIcon from "@mui/icons-material/Code";
import TitleIcon from "@mui/icons-material/Title";
import InlineCodeIcon from "./icons/inlineCode";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import LinkIcon from "@mui/icons-material/Link";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { MarkdownPreview } from "./Preview";
import { format } from "prettier";
import markdownParser from "prettier/parser-markdown";

export type MarkdownEditorMenuButtonAction = (
  name: string,
  content: string,
  selectionStart: number,
  selectionEnd: number
) => { content: string; selectionStart: number; selectionEnd: number };

export type MarkdownEditorMenuButtonProps = IconButtonProps;

export const MarkdownEditorMenuButton: FunctionComponent<
  MarkdownEditorMenuButtonProps & {
    title: ReactNode;
  }
> = ({ children, title, ...props }) => {
  return (
    <Tooltip title={title} arrow placement="top">
      <span>
        <IconButton {...props}>{children}</IconButton>
      </span>
    </Tooltip>
  );
};

const defaultMenu: string[][] = [
  ["bold", "italic", "strikethrough"],
  ["title", "quote"],
  ["link", "image"],
  ["code", "inlineCode"],
  ["unorderedList", "orderedList", "taskList"],
  ["indentIncrease", "indentDecrease"],
  ["table"],
  ["format"]
];

const DefaultButtons: Record<
  string,
  FunctionComponent<MarkdownEditorMenuButtonProps>
> = {
  bold: props => (
    <MarkdownEditorMenuButton title="Bold" {...props}>
      <FormatBoldIcon />
    </MarkdownEditorMenuButton>
  ),
  italic: props => (
    <MarkdownEditorMenuButton title="Italic" {...props}>
      <FormatItalicIcon />
    </MarkdownEditorMenuButton>
  ),
  strikethrough: props => (
    <MarkdownEditorMenuButton title="Strikethrough" {...props}>
      <StrikethroughSIcon />
    </MarkdownEditorMenuButton>
  ),
  quote: props => (
    <MarkdownEditorMenuButton title="Quote" {...props}>
      <FormatQuoteIcon />
    </MarkdownEditorMenuButton>
  ),
  link: props => (
    <MarkdownEditorMenuButton title="Link" {...props}>
      <LinkIcon />
    </MarkdownEditorMenuButton>
  ),
  image: props => (
    <MarkdownEditorMenuButton title="Image" {...props}>
      <AddPhotoAlternateIcon />
    </MarkdownEditorMenuButton>
  ),
  code: props => (
    <MarkdownEditorMenuButton title="Code" {...props}>
      <CodeIcon />
    </MarkdownEditorMenuButton>
  ),
  inlineCode: props => (
    <MarkdownEditorMenuButton title="Inline Code" {...props}>
      <InlineCodeIcon />
    </MarkdownEditorMenuButton>
  ),
  title: props => (
    <MarkdownEditorMenuButton title="Title" {...props}>
      <TitleIcon />
    </MarkdownEditorMenuButton>
  ),
  unorderedList: props => (
    <MarkdownEditorMenuButton title="Unordered List" {...props}>
      <FormatListBulletedIcon />
    </MarkdownEditorMenuButton>
  ),
  orderedList: props => (
    <MarkdownEditorMenuButton title="Ordered List" {...props}>
      <FormatListNumberedIcon />
    </MarkdownEditorMenuButton>
  ),
  taskList: props => (
    <MarkdownEditorMenuButton title="Task List" {...props}>
      <PlaylistAddCheckIcon />
    </MarkdownEditorMenuButton>
  ),
  indentIncrease: props => (
    <MarkdownEditorMenuButton title="Increase Indent" {...props}>
      <FormatIndentIncreaseIcon />
    </MarkdownEditorMenuButton>
  ),
  indentDecrease: props => (
    <MarkdownEditorMenuButton title="Decrease Indent" {...props}>
      <FormatIndentDecreaseIcon />
    </MarkdownEditorMenuButton>
  ),
  table: props => (
    <MarkdownEditorMenuButton title="Table" {...props}>
      <CalendarViewMonthIcon />
    </MarkdownEditorMenuButton>
  ),
  format: props => (
    <MarkdownEditorMenuButton title="Format" {...props}>
      <AutoFixHighIcon />
    </MarkdownEditorMenuButton>
  )
};

const getSelectedChunk = (
  content: string,
  selectionStart: number,
  selectionEnd: number
): { start: string; selected: string; end: string } => {
  const start = content.substring(0, selectionStart);
  const selected = content.substring(selectionStart, selectionEnd);
  const end = content.substring(selectionEnd);

  return { start, selected, end };
};

const getSelectedLines = (
  content: string,
  selectionStart: number,
  selectionEnd: number
): { start: string[]; selected: string[]; end: string[] } => {
  const { start, selected, end } = getSelectedChunk(
    content,
    selectionStart,
    selectionEnd
  );

  const startLines = start.split("\n");
  const selectedLines = selected.split("\n");
  const endLines = end.split("\n");

  const unselectedStart = startLines.pop();
  const unselectedEnd = endLines.shift();

  selectedLines[0] = unselectedStart + selectedLines[0];

  const lastSelectedLineIndex = selectedLines.length - 1;

  selectedLines[lastSelectedLineIndex] =
    selectedLines[lastSelectedLineIndex] + unselectedEnd;

  return { start: startLines, selected: selectedLines, end: endLines };
};

const defaultActions: Record<string, MarkdownEditorMenuButtonAction> = {
  bold: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedChunk(
      content,
      selectionStart,
      selectionEnd
    );

    return {
      content: `${start}**${selected}**${end}`,
      selectionStart: selectionStart + 2,
      selectionEnd: selectionEnd + 2
    };
  },
  italic: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedChunk(
      content,
      selectionStart,
      selectionEnd
    );
    return {
      content: `${start}_${selected}_${end}`,
      selectionStart: selectionStart + 1,
      selectionEnd: selectionEnd + 1
    };
  },
  strikethrough: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedChunk(
      content,
      selectionStart,
      selectionEnd
    );

    return {
      content: `${start}~~${selected}~~${end}`,
      selectionStart: selectionStart + 2,
      selectionEnd: selectionEnd + 2
    };
  },
  quote: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedLines(
      content,
      selectionStart,
      selectionEnd
    );

    const newContent = [...start, ...selected.map(l => "> " + l), ...end].join(
      "\n"
    );

    return {
      content: newContent,
      selectionStart: selectionStart + 2,
      selectionEnd: selectionEnd + selected.length * 2
    };
  },
  link: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedChunk(
      content,
      selectionStart,
      selectionEnd
    );

    return {
      content: `${start}[${selected}]()${end}`,
      selectionStart: selectionEnd + 3,
      selectionEnd: selectionEnd + 3
    };
  },
  image: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedChunk(
      content,
      selectionStart,
      selectionEnd
    );

    return {
      content: `${start}![${selected}]()${end}`,
      selectionStart: selectionEnd + 4,
      selectionEnd: selectionEnd + 4
    };
  },
  code: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedLines(
      content,
      selectionStart,
      selectionEnd
    );

    const newContent = [
      ...start,
      "```",
      ...selected.map(l => "  " + l),
      "```",
      ...end
    ].join("\n");

    return {
      content: newContent,
      selectionStart: selectionStart + 6,
      selectionEnd: selectionEnd + selected.length * 2 + 4
    };
  },
  inlineCode: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedChunk(
      content,
      selectionStart,
      selectionEnd
    );

    return {
      content: `${start}\`${selected}\`${end}`,
      selectionStart: selectionStart + 1,
      selectionEnd: selectionEnd + 1
    };
  },
  title: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedLines(
      content,
      selectionStart,
      selectionEnd
    );

    selected[0] = (selected[0].startsWith("#") ? "#" : "# ") + selected[0];

    return {
      content: [...start, ...selected, ...end].join("\n"),
      selectionStart: selectionStart + (selected[0].startsWith("##") ? 1 : 2),
      selectionEnd: selectionEnd + (selected[0].startsWith("##") ? 1 : 2)
    };
  },
  unorderedList: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedLines(
      content,
      selectionStart,
      selectionEnd
    );

    const newContent = [...start, ...selected.map(l => "- " + l), ...end].join(
      "\n"
    );

    return {
      content: newContent,
      selectionStart: selectionStart + 2,
      selectionEnd: selectionEnd + selected.length * 2
    };
  },
  orderedList: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedLines(
      content,
      selectionStart,
      selectionEnd
    );

    const newContent = [
      ...start,
      ...selected.map((l, i) => i + 1 + (". " + l)),
      ...end
    ].join("\n");

    return {
      content: newContent,
      selectionStart: selectionStart + 3,
      selectionEnd: selectionEnd + selected.length * 3
    };
  },
  taskList: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedLines(
      content,
      selectionStart,
      selectionEnd
    );

    const newContent = [
      ...start,
      ...selected.map(l => "- [ ] " + l),
      ...end
    ].join("\n");

    return {
      content: newContent,
      selectionStart: selectionStart + 6,
      selectionEnd: selectionEnd + selected.length * 6
    };
  },
  indentIncrease: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedLines(
      content,
      selectionStart,
      selectionEnd
    );

    const newContent = [...start, ...selected.map(l => "  " + l), ...end].join(
      "\n"
    );

    return {
      content: newContent,
      selectionStart: selectionStart + 2,
      selectionEnd: selectionEnd + selected.length * 2
    };
  },
  indentDecrease: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedLines(
      content,
      selectionStart,
      selectionEnd
    );

    let noOfDeletedSpaces = 0;
    let noOfDeletedSpacesInFirstLine = 0;

    const newContent = [
      ...start,
      ...selected.map((l, i) => {
        if (l.startsWith("  ")) {
          l = l.substring(2);
          noOfDeletedSpaces += 2;
          if (i == 0) {
            noOfDeletedSpacesInFirstLine = 2;
          }
        }
        return l;
      }),
      ...end
    ].join("\n");

    return {
      content: newContent,
      selectionStart: selectionStart + noOfDeletedSpacesInFirstLine,
      selectionEnd: selectionEnd + noOfDeletedSpaces
    };
  },
  table: (name, content, selectionStart, selectionEnd) => {
    const { start, selected, end } = getSelectedLines(
      content,
      selectionStart,
      selectionEnd
    );

    const firstSelectedLine = selected.shift();

    const newContent = [
      ...start,
      firstSelectedLine,
      "| Column1 | Column2 |",
      "| -------------- | -------------- |",
      "| value 1    | value2     |",
      ...selected,

      ...end
    ].join("\n");

    return {
      content: newContent,
      selectionStart: selectionStart,
      selectionEnd: selectionStart
    };
  },
  format: (name, content) => {
    const newContent = format(content, {
      parser: "markdown",
      plugins: [markdownParser],
      arrowParens: "avoid",
      endOfLine: "lf",
      trailingComma: "none",
      tabWidth: 2
    });

    return {
      content: newContent,
      selectionStart: 0,
      selectionEnd: 0
    };
  }
};

export type MarkdownEditorMenuProps = {
  onClick: (name: string) => void;
  menu?: string[][];
  menuButtons?: Record<
    string,
    FunctionComponent<MarkdownEditorMenuButtonProps>
  >;
  disabled?: boolean;
};

export const MarkdownEditorMenu: FunctionComponent<MarkdownEditorMenuProps> = ({
  onClick,
  menu,
  menuButtons,
  disabled
}) => {
  const _menu = menu || defaultMenu;
  const _menuButtons = { ...DefaultButtons, ...menuButtons };
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      {_menu.map((menuGroup, i) => (
        <Fragment key={i}>
          {i != 0 ? (
            <Divider orientation="vertical" flexItem variant="middle" />
          ) : null}
          <ButtonGroup>
            {menuGroup.map((menuItem, j) => {
              const MenuItemComponent = _menuButtons[menuItem];
              const _onClick = () => {
                if (!disabled) {
                  onClick(menuItem);
                }
              };
              return (
                <MenuItemComponent
                  key={j}
                  onClick={_onClick}
                  disabled={disabled}
                />
              );
            })}
          </ButtonGroup>
        </Fragment>
      ))}
    </Box>
  );
};

export type MarkdownEditorViewType = "write" | "preview";

export type MarkdownEditorHeaderProps = MarkdownEditorMenuProps & {
  hideTabs: boolean;
  selectedView: MarkdownEditorViewType;
  onViewChange: (selected: MarkdownEditorViewType) => void;
};

export const MarkdownEditorHeader: FunctionComponent<
  MarkdownEditorHeaderProps
> = ({ hideTabs, selectedView, onViewChange, ...menuProps }) => {
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    onViewChange(newValue == 0 ? "write" : "preview");
  };
  // TODO: create Tabs with a themable size
  return (
    <Grid container>
      {!hideTabs ? (
        <Grid item flexGrow={1}>
          <Tabs
            value={selectedView == "write" ? 0 : 1}
            onChange={handleChange}
            sx={{ minHeight: 36 }}
          >
            <Tab label="Write" sx={{ minHeight: 36, p: 1 }} />
            <Tab label="Preview" sx={{ minHeight: 36, p: 1 }} />
          </Tabs>
        </Grid>
      ) : null}
      {hideTabs || selectedView == "write" ? (
        <Grid item>
          <MarkdownEditorMenu {...menuProps} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export type MarkdownEditorContentProps = TextareaAutosizeProps & {
  write: boolean;
  preview: boolean;
};

export const MarkdownEditorContent = forwardRef<
  HTMLTextAreaElement,
  MarkdownEditorContentProps
>(function MarkdownEditorContent({ write, preview, value, ...props }, ref) {
  const style = {
    ...props.style,
    width: "100%",
    resize: "none",
    boxSizing: "border-box"
  } as TextareaAutosizeProps["style"];
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: write ? "initial" : "none" }}>
        <TextareaAutosize
          minRows={10}
          maxRows={20}
          {...props}
          value={value}
          style={style}
          ref={ref}
        />
      </Grid>
      {preview ? (
        <Grid item xs={12}>
          <MarkdownPreview>{value}</MarkdownPreview>
        </Grid>
      ) : null}
    </Grid>
  );
});

const createSyntheticEvent = <T extends Element, E extends Event>(
  event: E
): React.SyntheticEvent<T, E> => {
  let isDefaultPrevented = false;
  let isPropagationStopped = false;
  const preventDefault = () => {
    isDefaultPrevented = true;
    event.preventDefault();
  };
  const stopPropagation = () => {
    isPropagationStopped = true;
    event.stopPropagation();
  };
  return {
    nativeEvent: event,
    currentTarget: event.currentTarget as EventTarget & T,
    target: event.target as EventTarget & T,
    bubbles: event.bubbles,
    cancelable: event.cancelable,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    preventDefault,
    isDefaultPrevented: () => isDefaultPrevented,
    stopPropagation,
    isPropagationStopped: () => isPropagationStopped,
    persist: () => {
      // don't do anythiung
    },
    timeStamp: event.timeStamp,
    type: event.type
  };
};

const createChangeEvent = (
  target: HTMLTextAreaElement
): React.ChangeEvent<HTMLTextAreaElement> => {
  let event: Event;
  if (typeof InputEvent == "function") {
    event = new InputEvent("change", { bubbles: true });
  } else {
    event = document.createEvent("InputEvent");
    event.initEvent("change", true, true);
  }
  Object.defineProperty(event, "target", { writable: false, value: target });
  const syntheticEvent = createSyntheticEvent(
    event
  ) as React.ChangeEvent<HTMLTextAreaElement>;
  return syntheticEvent;
};

export type MarkdownEditorProps = TextareaAutosizeProps & {
  inlinePreview?: boolean;
  menuActions?: Record<string, MarkdownEditorMenuButtonAction>;
} & Pick<MarkdownEditorHeaderProps, "menu" | "menuButtons">;

/**
 * RTE editor for markdown content
 *
 * can be used safely within the TextField
 *   - set `fullWidth` TextField to true
 *   - `shrink` label in TextField
 *   - inputRef points to Grid
 *
 * ```
 * <TextField
 *   InputProps={{ inputComponent: MarkdownEditor }}
 *   InputLabelProps={{ shrink: true }}
 *   fullWidth
 * />
 * ```
 *
 */
export const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
  function MarkdownEditor(
    {
      menu,
      menuButtons,
      menuActions,
      inlinePreview: alwaysPreview,
      onBlur,
      ...props
    },
    ref
  ) {
    const [selectedView, setSelectedView] =
      useState<MarkdownEditorViewType>("write");

    const textareaRef = createRef<HTMLTextAreaElement>();

    const isMobile = useMediaQuery<Theme>(theme =>
      theme.breakpoints.down("sm")
    );

    const _menuActions = { ...defaultActions, ...menuActions };

    const onMenuButtonClick = (name: string) => {
      if (textareaRef.current) {
        const action = _menuActions[name];
        const { content, selectionStart, selectionEnd } = action(
          name,
          textareaRef.current.value,
          textareaRef.current.selectionStart,
          textareaRef.current.selectionEnd
        );

        textareaRef.current.value = content;
        textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
        if (props.onChange) {
          const changeEvent = createChangeEvent(textareaRef.current);
          props.onChange(changeEvent);
        }
      }
    };

    const _onBlur: FocusEventHandler<
      HTMLDivElement | HTMLTextAreaElement
    > = event => {
      if (!props.disabled) {
        let propagate = true;
        let relatedTarget = event.relatedTarget;
        if (relatedTarget) {
          while (relatedTarget.tagName != "BODY") {
            relatedTarget = relatedTarget.parentElement;
            if (relatedTarget == event.currentTarget) {
              propagate = false; // don't propagate blur event , if clicked within the editor widget
              break;
            }
          }
        }

        if (propagate) {
          if (event.target != textareaRef.current) {
            event.target = textareaRef.current;
          }
          onMenuButtonClick("format");
          onBlur(event as FocusEvent<HTMLTextAreaElement>);
        }
      }
    };

    const _onClick: MouseEventHandler<HTMLDivElement> = event => {
      event.preventDefault();
      event.stopPropagation();
      if (!props.disabled) {
        textareaRef.current?.focus(); // keep textarea focused , when clicked within markdown widget
      }
    };

    return (
      <Grid
        container
        sx={{ p: 1 }}
        ref={ref}
        onBlur={_onBlur}
        onClick={_onClick}
      >
        <Grid item xs={12}>
          <MarkdownEditorHeader
            onClick={onMenuButtonClick}
            hideTabs={isMobile || alwaysPreview}
            selectedView={selectedView}
            onViewChange={setSelectedView}
            menu={menu}
            menuButtons={menuButtons}
            disabled={props.disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <MarkdownEditorContent
            {...props}
            write={isMobile || alwaysPreview || selectedView == "write"}
            preview={isMobile || alwaysPreview || selectedView == "preview"}
            ref={textareaRef}
          />
        </Grid>
      </Grid>
    );
  }
);
