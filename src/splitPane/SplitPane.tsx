import { Box, SxProps } from "@mui/material";
import { SystemCssProperties } from "@mui/system";
import { Children, Component, ReactNode } from "react";
import { Pane } from "./Pane";
import { Resizer } from "./Resizer";

const unFocus = (window: Window) => {
  if (window.document.getSelection) {
    window.document.getSelection().empty();
  } else {
    try {
      window.getSelection().removeAllRanges();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
};

function getDefaultSize(defaultSize, minSize, maxSize, draggedSize) {
  if (typeof draggedSize === "number") {
    const min = typeof minSize === "number" ? minSize : 0;
    const max =
      typeof maxSize === "number" && maxSize >= 0 ? maxSize : Infinity;
    return Math.max(min, Math.min(max, draggedSize));
  }
  if (defaultSize !== undefined) {
    return defaultSize;
  }
  return minSize;
}

function removeNullChildren(children: ReactNode) {
  return Children.toArray(children).filter(c => c);
}

export type SplitPaneProps = {
  allowResize?: boolean;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  size?: number;
  split?: "vertical" | "horizontal";
  onDragStarted?: () => void;
  onDragFinished?: (draggedSize: number) => void;
  onChange?: (size: number) => void;
  onResizerClick?: () => void;
  onResizerDoubleClick?: () => void;
  sx?: SxProps;
  resizerSx?: SxProps;
  step?: number;
  primary?: "first" | "second";
  hidePrimary?: boolean;
};

type SplitPaneState = {
  active?: boolean;
  resized?: boolean;
  primaryPaneSize?: number;
  position?: number;
  draggedSize?: number;
  instanceProps?: { size: number };
};

/**
 * This component is rendered in `absolute` position stretching 100% height and width of the parent `relative` element
 */
export class SplitPane extends Component<SplitPaneProps, SplitPaneState> {
  static defaultProps: Partial<SplitPaneProps> = {
    allowResize: true,
    minSize: 100,
    primary: "first",
    split: "vertical"
  };

  private pane1: HTMLDivElement;
  private pane2: HTMLDivElement;
  private splitPane: HTMLDivElement;

  constructor(props: SplitPaneProps) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    // order of setting panel sizes.
    // 1. size
    // 2. getDefaultSize(defaultSize, minsize, maxSize)

    const { size, defaultSize, minSize, maxSize } = props;

    const initialSize =
      size !== undefined
        ? size
        : getDefaultSize(defaultSize, minSize, maxSize, null);

    this.state = {
      active: false,
      resized: false,
      primaryPaneSize: initialSize,

      // these are props that are needed in static functions. ie: gDSFP
      instanceProps: {
        size
      }
    };
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("touchmove", this.onTouchMove);
    this.setState(SplitPane.getSizeUpdate(this.props, this.state));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return SplitPane.getSizeUpdate(nextProps, prevState);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("touchmove", this.onTouchMove);
  }

  onMouseDown(event: MouseEvent) {
    const eventWithTouches = Object.assign({}, event, {
      touches: [{ clientX: event.clientX, clientY: event.clientY }]
    }) as unknown as TouchEvent;
    this.onTouchStart(eventWithTouches);
  }

  onTouchStart(event: TouchEvent) {
    const { allowResize, onDragStarted, split } = this.props;
    if (allowResize) {
      unFocus(window);
      const position =
        split === "vertical"
          ? event.touches[0].clientX
          : event.touches[0].clientY;

      if (typeof onDragStarted === "function") {
        onDragStarted();
      }
      this.setState({
        active: true,
        position
      });
    }
  }

  onMouseMove(event: MouseEvent) {
    const eventWithTouches = Object.assign({}, event, {
      touches: [{ clientX: event.clientX, clientY: event.clientY }]
    }) as unknown as TouchEvent;
    this.onTouchMove(eventWithTouches);
  }

  onTouchMove(event: TouchEvent) {
    const { allowResize, maxSize, minSize, onChange, split, step } = this.props;
    const { active, position } = this.state;

    if (allowResize && active) {
      unFocus(window);
      const isPrimaryFirst = this.props.primary === "first";
      const ref = isPrimaryFirst ? this.pane1 : this.pane2;
      const ref2 = isPrimaryFirst ? this.pane2 : this.pane1;
      if (ref) {
        const node = ref;
        const node2 = ref2;

        if (node.getBoundingClientRect) {
          const width = node.getBoundingClientRect().width;
          const height = node.getBoundingClientRect().height;
          const current =
            split === "vertical"
              ? event.touches[0].clientX
              : event.touches[0].clientY;
          const size = split === "vertical" ? width : height;
          let positionDelta = position - current;
          if (step) {
            if (Math.abs(positionDelta) < step) {
              return;
            }
            // Integer division
            // eslint-disable-next-line no-bitwise
            positionDelta = ~~(positionDelta / step) * step;
          }
          let sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;

          const pane1Order = parseInt(window.getComputedStyle(node).order);
          const pane2Order = parseInt(window.getComputedStyle(node2).order);
          if (pane1Order > pane2Order) {
            sizeDelta = -sizeDelta;
          }

          let newMaxSize = maxSize;
          if (maxSize !== undefined && maxSize <= 0) {
            const splitPane = this.splitPane;
            if (split === "vertical") {
              newMaxSize = splitPane.getBoundingClientRect().width + maxSize;
            } else {
              newMaxSize = splitPane.getBoundingClientRect().height + maxSize;
            }
          }

          let newSize = size - sizeDelta;
          const newPosition = position - positionDelta;

          if (newSize < minSize) {
            newSize = minSize;
          } else if (maxSize !== undefined && newSize > newMaxSize) {
            newSize = newMaxSize;
          } else {
            this.setState({
              position: newPosition,
              resized: true
            });
          }

          if (onChange) onChange(newSize);

          this.setState({ draggedSize: newSize, primaryPaneSize: newSize });
        }
      }
    }
  }

  onMouseUp() {
    const { allowResize, onDragFinished } = this.props;
    const { active, draggedSize } = this.state;
    if (allowResize && active) {
      if (typeof onDragFinished === "function") {
        onDragFinished(draggedSize);
      }
      this.setState({ active: false });
    }
  }

  // we have to check values since gDSFP is called on every render and more in StrictMode
  static getSizeUpdate(
    props: Readonly<SplitPaneProps>,
    state: Readonly<SplitPaneState>
  ) {
    const newState: Partial<SplitPaneState> = {};
    const { instanceProps } = state;

    if (instanceProps.size === props.size && props.size !== undefined) {
      return {};
    }

    const newSize =
      props.size !== undefined
        ? props.size
        : getDefaultSize(
            props.defaultSize,
            props.minSize,
            props.maxSize,
            state.draggedSize
          );

    if (props.size !== undefined) {
      newState.draggedSize = newSize;
    }

    newState.primaryPaneSize = newSize;

    newState.instanceProps = { size: props.size };

    return newState;
  }

  render() {
    const {
      split,
      onResizerClick,
      onResizerDoubleClick,
      sx,
      resizerSx,
      primary,
      children,
      hidePrimary
    } = this.props;

    const { primaryPaneSize } = this.state;
    const resizerSize = 7;

    const notNullChildren = removeNullChildren(children);

    const style: SxProps = {
      display: "flex",
      flex: 1,
      height: "100%",
      position: "absolute",
      outline: "none",
      overflow: "hidden",
      ...sx
    };

    if (split === "vertical") {
      Object.assign(style, {
        flexDirection: "row",
        left: 0,
        right: 0
      });
    } else {
      Object.assign(style, {
        bottom: 0,
        flexDirection: "column",
        minHeight: "100%",
        top: 0,
        width: "100%"
      });
    }

    const pane1Sx: SystemCssProperties = {
      transition: "margin ease-in-out 500ms"
    };
    const pane2Sx: SystemCssProperties = {
      transition: "margin ease-in-out 500ms"
    };

    const resizerSxForSlide: SystemCssProperties = {
      transition: "margin ease-in-out 500ms"
    };
    if (hidePrimary) {
      const offsetPaneMargin = -1 * primaryPaneSize + "px";
      const offsetResizerMargin = -1 * resizerSize + "px";
      if (split == "vertical") {
        if (primary == "first") {
          pane1Sx.marginLeft = offsetPaneMargin;
          resizerSxForSlide.marginLeft = offsetResizerMargin;
        } else {
          pane2Sx.marginRight = offsetPaneMargin;
          resizerSxForSlide.marginRight = offsetResizerMargin;
        }
      } else {
        if (primary == "first") {
          pane1Sx.marginTop = offsetPaneMargin;
          resizerSxForSlide.marginTop = offsetResizerMargin;
        } else {
          pane2Sx.marginBottom = offsetPaneMargin;
          resizerSxForSlide.marginBottom = offsetResizerMargin;
        }
      }
    }

    return (
      <Box
        id="split-pane-root"
        ref={(node: HTMLDivElement) => {
          this.splitPane = node;
        }}
        sx={style}
      >
        <Pane
          key="pane1"
          ref={node => {
            this.pane1 = node;
          }}
          size={primary == "first" ? primaryPaneSize : undefined}
          split={split}
          sx={pane1Sx}
        >
          {notNullChildren[0]}
        </Pane>
        <Resizer
          onClick={onResizerClick}
          onDoubleClick={onResizerDoubleClick}
          onMouseDown={event => this.onMouseDown(event.nativeEvent)}
          onTouchStart={event => this.onTouchStart(event.nativeEvent)}
          onTouchEnd={this.onMouseUp}
          key="resizer"
          sx={{ ...resizerSx, ...resizerSxForSlide } as SxProps}
          split={split}
          size={resizerSize}
        />
        <Pane
          key="pane2"
          ref={node => {
            this.pane2 = node;
          }}
          size={primary == "second" ? primaryPaneSize : undefined}
          split={split}
          sx={pane2Sx}
        >
          {notNullChildren[1]}
        </Pane>
      </Box>
    );
  }
}
