import { useEffect, useRef, useState } from "react";
import ChatBubble from "./Bubble";
import { styled } from "styled-components";
import TokenService from "../../../../../utils/tokenService";
import CommonInput from "../../../../../components/Input/Input";
import ChatApi from "../../../../../services/chatApi";
import { FlexColumnCenterCSS } from "../../../../../style/commonStyle";
import { media } from "../../../../../style/theme";
import { Button } from "../../../../../components/Button/Button";

export interface Chat {
  message: string;
  num: number;
  result: Content[];
}

export interface Content {
  id?: number;
  user_id: number;
  content: string;
  timestamp: string;
}

function ChatBox({ roomId }: { roomId: string }) {
  const token = TokenService.getToken();
  const id = localStorage.getItem("id") ?? "";
  const [messages, setMessages] = useState<Content[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const getRoomHistory = async () => {
    const history = await ChatApi.RoomHistory(roomId);
    if (history) {
      setMessages(history.data.result);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (ws && newMessage) {
      ws.send(
        JSON.stringify({
          user_id: id,
          content: newMessage,
          timestamp: new Date().toISOString(),
        })
      );
      setNewMessage("");
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    if (!roomId) return;

    getRoomHistory();

    const webSocket = new WebSocket(
      `wss://${process.env.REACT_APP_SERVER}ws/chat/${roomId}/?token=${token}`
    );

    webSocket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessages((prevMessages: any) => [...prevMessages, messageData]);
    };

    webSocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    setWs(webSocket);

    return () => {
      webSocket.close();
    };
  }, [roomId]);

  useEffect(() => {
    if (messageContainerRef.current) {
      const scrollHeight = messageContainerRef.current.scrollHeight;
      messageContainerRef.current.scrollTop = scrollHeight;
    }
  }, [messages]);

  return (
    <S.Container>
      <S.MessageContainer ref={messageContainerRef}>
        {messages.map((item: any, index: number) => (
          <ChatBubble
            key={index}
            content={item}
            $isOwnContent={id === item.user_id}
          ></ChatBubble>
        ))}
      </S.MessageContainer>

      <S.Form onSubmit={onSubmit}>
        <CommonInput
          type="text"
          name="message"
          placeholder="메세지"
          value={newMessage}
          onChange={handleMessageChange}
          $customStyle={{
            width: "80%",
            height: "3rem",
          }}
        ></CommonInput>
        <Button variant="outlined">send</Button>
      </S.Form>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    padding: 0 1rem;
    ${FlexColumnCenterCSS}
    & > div {
      width: 100%;

      @media screen and (max-width: ${media.mobile}) {
        height: 45vh;
      }
    }
    & > form {
      width: 100%;
      height: 100%;
      ${FlexColumnCenterCSS}
      padding: 1rem 0;

      @media screen and (max-width: ${media.mobile}) {
        height: 10vh;
      }
    }
  `,

  MessageContainer: styled.div`
    display: flex;
    flex-direction: column;
    height: 60vh;
    overflow: auto;
    overflow-x: hidden;
    border-bottom: 2px solid #d9d9d9;

    &::-webkit-scrollbar {
      width: 0.7rem;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: gray;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: ${(props) => props.theme.color.barColor};
    }
  `,

  Form: styled.form`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.color.bgColor};
    height: 10%;
    border-top: 1px solid ${(props) => props.theme.color.navBorder};

    & > button {
      position: absolute;
      right: 13%;
    }
  `,
};

export default ChatBox;
