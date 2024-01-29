import axiosInstance from "./core";

const ChatApi = {
  RoomHistory(roomId: string) {
    return axiosInstance.get(
      `/api/chatrooms/${roomId}/messages/?order=timestamp&num=30&count=1`
    );
  },

  Rooms(userId: string) {
    return axiosInstance.get(`/api/chatrooms/?target=${userId}&num=0`);
  },

  makeRoom(myId: string, targetId: string) {
    return axiosInstance.post(
      `/api/chatrooms`,
      JSON.stringify({
        name: targetId,
        members: [myId, targetId],
      })
    );
  },
};

export default ChatApi;
