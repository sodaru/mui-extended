import { Box, BoxProps } from "@mui/material";
import { Component, createRef, ReactNode } from "react";

export type MarqueeAnimationProps = {
  children: ReactNode;
  speed?: number;
  repeat?: boolean;
  reverse?: boolean;
} & BoxProps;

export class MarqueeAnimation extends Component<
  MarqueeAnimationProps,
  { sx: { marginLeft?: string; transition?: string } }
> {
  private isComponentMounted = false;

  private ref = createRef<HTMLDivElement>();

  constructor(props: MarqueeAnimationProps) {
    super(props);
    this.state = { sx: {} };
    this.wait = this.wait.bind(this);
    this.resetMargin = this.resetMargin.bind(this);
    this.marquee = this.marquee.bind(this);
  }

  componentDidMount() {
    this.isComponentMounted = true;
    this.marquee();
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  render() {
    return (
      <Box {...this.props} overflow="hidden">
        <Box
          whiteSpace="nowrap"
          display="inline"
          sx={{ ...this.state.sx, "& > *": { display: "inline" } }}
          ref={this.ref}
        >
          {this.props.children}
        </Box>
      </Box>
    );
  }

  wait(ms: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.isComponentMounted) {
          resolve();
        } else {
          reject();
        }
      }, ms);
    });
  }

  async resetMargin() {
    this.setState({
      sx: {
        marginLeft: this.props.reverse
          ? "-" + this.ref.current?.getBoundingClientRect().width + "px"
          : "100%"
      }
    });
    await this.wait(10);
    this.setState({
      sx: {
        transition: `margin-left ${this.props.speed || 10000}ms linear`,
        marginLeft: this.props.reverse
          ? "100%"
          : "-" + this.ref.current?.getBoundingClientRect().width + "px"
      }
    });
    await this.wait(this.props.speed || 10000);
    if (!this.props.repeat) {
      throw new Error("No Repeat");
    }
  }

  async marquee() {
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await this.resetMargin();
      }
    } catch (e) {
      // dont do anything
    }
  }
}
