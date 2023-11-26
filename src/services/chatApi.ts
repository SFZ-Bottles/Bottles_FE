import { Chat } from "../pages/MessagePage/ChatBox";
import TokenService from "../utils/tokenService";
import axiosInstance from "./core";

const token = TokenService.getToken();

const ChatApi = {
  RoomHistory(roomId: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(`/api/chatrooms/${roomId}/messages/`, {
      headers,
    });
  },
};

export default ChatApi;
