import { isEqualWith } from "lodash";
import { Component } from "react";

export type TextTypingAnimationProps = {
  children: string;
  speed?: number;
  repeat?: boolean;
  repeatInterval?: number;
  reverse?: boolean;
  onComplete?: () => void;
};

type TextTypingAnimationState = {
  text: string;
  originalText: string;
};

export class TextTypingAnimation extends Component<
  TextTypingAnimationProps,
  TextTypingAnimationState
> {
  private stopCurrentLoop = true;
  private currentLoop: Promise<void>;

  constructor(props: TextTypingAnimationProps) {
    super(props);
    this.state = {
      text: props.reverse ? props.children : "",
      originalText: this.props.children
    };
    this.wait = this.wait.bind(this);
    this.startTyping = this.startTyping.bind(this);
    this.typeNext = this.typeNext.bind(this);
  }

  componentDidMount() {
    this.stopCurrentLoop = false;
    this.currentLoop = this.startTyping();
  }

  componentWillUnmount() {
    this.stopCurrentLoop = true;
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqualWith(this.props, prevProps, (value, other, key) => {
        if (key == "onComplete") {
          return true;
        }
      })
    ) {
      this.stopCurrentLoop = true;
      this.currentLoop.then(() => {
        this.setState({
          text: this.props.reverse ? this.props.children : "",
          originalText: this.props.children
        });
        this.stopCurrentLoop = false;
        this.currentLoop = this.startTyping();
      });
    }
  }

  render() {
    return this.state.text;
  }

  wait(ms: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.stopCurrentLoop) {
          resolve();
        } else {
          reject();
        }
      }, ms);
    });
  }

  async startTyping() {
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await this.typeNext();
      }
    } catch (e) {
      // don't do anything
    }
  }

  async typeNext() {
    let completed = false;
    if (this.props.reverse) {
      const nextText =
        this.state.text == ""
          ? this.state.originalText
          : this.state.originalText.substring(0, this.state.text.length - 1);
      this.setState({ text: nextText });
      if (nextText.length > 0) {
        await this.wait(this.props.speed || 200);
      } else {
        completed = true;
      }
    } else {
      const nextText =
        this.state.text == this.state.originalText
          ? ""
          : this.state.originalText.substring(0, this.state.text.length + 1);
      this.setState({ text: nextText });
      if (nextText.length < this.state.originalText.length) {
        await this.wait(this.props.speed || 200);
      } else {
        completed = true;
      }
    }
    if (completed) {
      if (this.props.repeat) {
        await this.wait(this.props.repeatInterval || 2000);
      } else {
        if (this.props.onComplete) {
          this.props.onComplete();
        }
        throw new Error("Repeatation not allowed");
      }
    }
  }
}
