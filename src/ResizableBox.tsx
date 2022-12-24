import { Box, BoxProps } from "@mui/material";
import { Component, createRef, RefObject } from "react";

export type ResizableBoxProps = Omit<BoxProps, "onResize"> & {
  onResize: (width: number, height: number) => void;
  boxRef?: RefObject<HTMLDivElement>;
};

export class ResizableBox extends Component<ResizableBoxProps> {
  private privateRef: RefObject<HTMLDivElement>;
  private resizeObserver: ResizeObserver;

  private jobId: ReturnType<typeof setTimeout>;
  private width: number;
  private height: number;

  constructor(props: ResizableBoxProps) {
    super(props);
    this.privateRef = createRef();
    this.resizeJob = this.resizeJob.bind(this);
    this.resizeAction = this.resizeAction.bind(this);
  }

  resizeAction() {
    this.jobId = undefined;
    this.props.onResize(this.width, this.height);
  }

  resizeJob(width: number, height: number) {
    if (this.jobId !== undefined) {
      clearTimeout(this.jobId);
    }
    this.width = width;
    this.height = height;
    this.jobId = setTimeout(this.resizeAction, 100);
  }

  componentDidMount(): void {
    const ref = this.props.boxRef || this.privateRef;
    if (ref.current) {
      this.resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          this.resizeJob(entry.contentRect.width, entry.contentRect.height);
        }
      });
      this.resizeObserver.observe(ref.current);
    }
  }

  componentWillUnmount(): void {
    this.resizeObserver?.disconnect();
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onResize, children, ...boxProps } = this.props;
    return (
      <Box {...boxProps} ref={this.props.boxRef || this.privateRef}>
        {children}
      </Box>
    );
  }
}
