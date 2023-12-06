import { useEffect, useRef, useState } from "react";
import ChatBubble from "./Bubble";
import { styled } from "styled-components";
import TokenService from "../../../../../utils/tokenService";
import CommonInput from "../../../../../components/Input/Input";
import ChatApi from "../../../../../services/chatApi";
import {
  FlexCenterCSS,
  FlexColumnCenterCSS,
} from "../../../../../styled-components/commonStyle";

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
      console.log(history.data.result);
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
      `ws://14.4.145.80:8000/ws/chat/${roomId}/?token=${token}`
    );

    // 서버로부터 메시지 수신
    webSocket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessages((prevMessages: any) => [...prevMessages, messageData]);
    };

    // 연결 오류 처리
    webSocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    // 연결이 끊어졌을 때 재연결 로직
    // webSocket.onclose = () => {
    //   console.log("WebSocket Disconnected. Attempting to Reconnect...");
    //   setTimeout(() => {
    //     console.log("re");
    //     setWs(null);
    //   }, 3000); // 3초 후 재연결
    // };

    setWs(webSocket);

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      webSocket.close();
    };
  }, [roomId]);

  // 초기 스크롤 위치를 맨 밑으로 이동 하기 위한 useEffect
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
            isOwnContent={id === item.user_id}
          ></ChatBubble>
        ))}
      </S.MessageContainer>

      <form onSubmit={onSubmit}>
        <CommonInput
          type="text"
          name="message"
          placeholder="메세지"
          value={newMessage}
          onChange={handleMessageChange}
          customStyle={{
            width: "80%",
            height: "3rem",
          }}
        />
      </form>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    ${FlexColumnCenterCSS}
    & > div {
      width: 100%;
    }
    & > form {
      width: 100%;
      height: 100%;
      ${FlexCenterCSS}
      padding-top: 1rem;
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
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: ${(props) => props.theme.color.barColor};
    }
  `,
};

export default ChatBox;
