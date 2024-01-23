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

  Rooms(userId: string, token: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(`/api/chatrooms/?target=${userId}&num=0`, {
      headers,
    });
  },

  makeRoom(myId: string, targetId: string, token: string) {
    return axiosInstance.post(
      `/api/chatrooms`,
      JSON.stringify({
        name: targetId,
        members: [myId, targetId],
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
  },
};

export default ChatApi;
