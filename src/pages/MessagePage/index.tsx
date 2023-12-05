import SideBar from "../../components/SideBar/SideBar";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAvatar, getChatList } from "../../services/API";
import UserCard from "./Components/UserCard/UserCard";
import { getParticipation } from "../../utils/messageUtils";
import { useParams } from "react-router-dom";
import Room from "./Components/Room/Room";
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
  const myId = localStorage.getItem("id") ?? "";
  const { targetId } = useParams();
  const [chatList, setChatList] = useState<ProfileProps[]>();
  const { data } = useQuery<DataProps>(["message", myId as string], () =>
    getChatList(myId as string)
  );

  console.log(data?.result);
  const getProfile = async () => {
    if (data && data.result) {
      const updatedResults = await Promise.all(
        data.result.map(async (user) => {
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
  }, [data]);

  return (
    <S.Container>
      <SideBar>{chatList && <UserCard data={chatList} />}</SideBar>
      {targetId && chatList ? (
        <Room roomList={chatList ?? []} targetId={targetId} />
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
