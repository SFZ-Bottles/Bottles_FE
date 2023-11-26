import { useEffect, useState } from "react";
import ChatApi from "../../../services/chatApi";
import { ProfileProps } from "../MessagePage";
import TokenService from "../../../utils/tokenService";

export interface Chat {
  message: string;
  num: number;
  result: Content[];
}

interface Content {
  id: number;
  user_id: number;
  content: string;
  timestamp: string;
}

function ChatBox({ chatList }: { chatList: ProfileProps[] }) {
  const token = TokenService.getToken();
  const id = localStorage.getItem("id") ?? "";
  const [allChat, setAllChat] = useState<Chat[]>();
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>("");
  const [ws, setWs] = useState<any>(null);

  const getRoomHistory = async () => {
    const history = await ChatApi.RoomHistory(chatList[0].id);
    if (history) {
      console.log(history);
    }
  };

  const sendMessage = () => {
    if (ws && newMessage) {
      ws.send(
        JSON.stringify({
          user: id,
          message: newMessage,
          created_at: new Date().toISOString(),
        })
      );
      setNewMessage(""); // 메시지 전송 후 입력 필드 초기화
    }
  };

  // 메시지 입력 핸들러
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    // WebSocket 연결 설정
    if (!chatList[0]?.id) return;

    const webSocket = new WebSocket(
      `ws://14.4.145.80:8000/ws/chat/${chatList[0].id}/?token=${token}`
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
    webSocket.onclose = () => {
      console.log("WebSocket Disconnected. Attempting to Reconnect...");
      setTimeout(() => {
        console.log("re");
        setWs(null);
      }, 3000); // 3초 후 재연결 시도
    };

    setWs(webSocket);

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      webSocket.close();
    };
  }, [chatList, token]);

  return (
    <>
      <button onClick={getRoomHistory}>Load History</button>
      <input
        type="text"
        placeholder="메세지"
        value={newMessage}
        onChange={handleMessageChange}
      />
      <button onClick={sendMessage}>Send</button> {/* 전송 버튼 */}
    </>
  );
}

export default ChatBox;
