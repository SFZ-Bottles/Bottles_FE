import { ProfileProps } from "../pages/MessagePage/MessagePage";

export const getParticipation = (myId: string, members: string[]) => {
  return members.filter((member) => myId !== member);
};

export const filterChatList = (roomList: ProfileProps[], targetId: string) => {
  return roomList.filter((room) => room.members[0] === targetId);
};
