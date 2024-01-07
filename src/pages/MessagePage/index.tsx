import SideBar from "../../components/SideBar/SideBar";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAvatar } from "../../services/API";
import UserCard from "./Components/UserCard/UserCard";
import { getParticipation } from "../../utils/messageUtils";
import { useParams } from "react-router-dom";
import Room from "./Components/Room/Room";
import AuthService from "../../utils/authService";
import ChatApi from "../../services/chatApi";
import useToken from "../../hooks/useToken";

export interface DataProps {
  num: number;
  result: ProfileProps[];
}

export interface ProfileProps {
  created_at: string;
  id: string;
  name: string;
  members: string[];
  image?: string;
}

const MessagePage = () => {
  const [token] = useToken();
  const [, myId] = AuthService.getTokenAndId();
  const { targetId } = useParams();
  const [chatList, setChatList] = useState<ProfileProps[]>([]);
  const { data: rooms } = useQuery(["message", myId as string], () =>
    ChatApi.Rooms(myId as string, token)
  );

  const getProfile = async () => {
    if (rooms && rooms.data.result) {
      const updatedResults = await Promise.all(
        rooms.data.result.map(async (user: ProfileProps) => {
          const otherUser = getParticipation(myId, user.members);
          const avatarUrl = await getAvatar(otherUser[0]);
          return { ...user, members: otherUser, image: avatarUrl };
        })
      );
      setChatList(updatedResults);
    }
  };

  useEffect(() => {
    getProfile();
  }, [rooms]);

  return (
    <S.Container>
      <SideBar>{chatList && <UserCard data={chatList} />}</SideBar>
      {targetId && chatList ? (
        <Room roomList={chatList} targetId={targetId} />
      ) : null}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
  `,
};

export default MessagePage;
