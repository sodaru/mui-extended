import { List, ListItem, Typography } from "@mui/material";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";
import { TextTypingAnimation } from "../../src/animations/TextTypingAnimation";
import { useState } from "react";

const TextTypingAnimationDemoComponent = (): JSX.Element => {
  const messageList = [
    "Another Message is displayed after this",
    "previous message repeates after this"
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  const handleCompletion1 = () => {
    setMessageIndex(messageIndex == 0 ? 1 : 0);
  };

  const handleCompletion2 = () => {
    setTimeout(() => {
      setReverse(!reverse);
    }, 1000);
  };

  return (
    <List>
      <ListItem>
        <TextTypingAnimation>Text With Default Props</TextTypingAnimation>
      </ListItem>
      <ListItem>
        <TextTypingAnimation speed={500}>
          Text With Slow speed
        </TextTypingAnimation>
      </ListItem>
      <ListItem>
        <TextTypingAnimation repeat={true}>
          Text With Repeating Text
        </TextTypingAnimation>
        &nbsp;
      </ListItem>

      <ListItem>
        <TextTypingAnimation repeat={true} repeatInterval={5000}>
          Text which repeats after 5 seconds
        </TextTypingAnimation>
        &nbsp;
      </ListItem>

      <ListItem>
        <TextTypingAnimation repeat={true} reverse={true}>
          Text With reverse typing
        </TextTypingAnimation>
        &nbsp;
      </ListItem>

      <ListItem>
        <Typography color="primary" variant="h3">
          <TextTypingAnimation repeat={true}>
            Formatted Text
          </TextTypingAnimation>
          &nbsp;
        </Typography>
      </ListItem>

      <ListItem>
        <Typography variant="h4" color="secondary">
          <TextTypingAnimation onComplete={handleCompletion1}>
            {messageList[messageIndex]}
          </TextTypingAnimation>
          &nbsp;
        </Typography>
      </ListItem>

      <ListItem>
        <Typography variant="subtitle1" color="primary">
          <TextTypingAnimation onComplete={handleCompletion2} reverse={reverse}>
            This message is typed and deleted in loop
          </TextTypingAnimation>
          &nbsp;
        </Typography>
      </ListItem>
    </List>
  );
};

export default TextTypingAnimationDemoComponent;

export const getStaticProps = getStaticPropsFactory(["animations/text-typing"]);
