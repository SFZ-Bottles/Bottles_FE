import styled from "styled-components";
import { Content } from "../ChatBox";
import { timeAgo } from "../../../../../../utils/timeUtils";

interface Bubble {
  content: Content;
  isOwnContent: boolean;
}

function ChatBubble({ content, isOwnContent }: Bubble) {
  return (
    <S.BubbleContainer isOwnContent={isOwnContent}>
      <S.Bubble isOwnContent={isOwnContent}>
        <S.Content>{content.content}</S.Content>
        <S.Timestamp>{timeAgo(content.timestamp)}</S.Timestamp>
      </S.Bubble>
    </S.BubbleContainer>
  );
}

const S = {
  BubbleContainer: styled.div<{ isOwnContent: boolean }>`
    display: flex;
    justify-content: ${(props) =>
      props.isOwnContent ? "flex-end" : "flex-start"};
    margin: 10px 0;
  `,

  Bubble: styled.div<{ isOwnContent: boolean }>`
    max-width: 60%;
    padding: 10px 14px;
    border-radius: 18px;
    background-color: ${(props) =>
      props.isOwnContent ? "#E8E8E8" : "#FFFFFF"};
    border: ${(props) => (props.isOwnContent ? "none" : "2px solid black")};
    color: ${(props) => (props.isOwnContent ? "#000" : "#000")};
    font-weight: bold;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    margin: 0 10px;
    border-top-${(props) => (props.isOwnContent ? "right" : "left")}-radius: 0;
  `,

  Content: styled.span`
    word-wrap: break-word;
  `,

  Timestamp: styled.span`
    font-size: 0.75em;
    color: #999;
    padding-left: 10px;
    display: flex;
    align-items: center;
    padding-top: 10px;
  `,
};

export default ChatBubble;
