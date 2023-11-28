export const getParticipation = (myId: string, members: string[]) => {
  return members.filter((member) => myId !== member);
};
