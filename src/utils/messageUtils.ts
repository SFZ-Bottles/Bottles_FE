import { ProfileProps } from "../pages/MessagePage";

export const getParticipation = (myId: string, members: string[]) => {
  return members.filter((member) => myId !== member);
};

export const filterChatList = (roomList: ProfileProps[], targetId: string) => {
  return roomList.filter((room) => room.members[0] === targetId);
};

export const isThereRoom = (roomList: any, userId: string) => {
  const members = roomList.map((room: any) => room.members[1]);
  console.log(members.includes(userId));
  return members.includes(userId);
};
