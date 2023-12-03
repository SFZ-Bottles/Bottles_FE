import TokenService from "../utils/tokenService";
import axiosInstance from "./core";

const token = TokenService.getToken();

const ChatApi = {
  RoomHistory(roomId: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(
      `/api/chatrooms/${roomId}/messages/?order=timestamp&num=30&count=1`,
      {
        headers,
      }
    );
  },
};

export default ChatApi;
