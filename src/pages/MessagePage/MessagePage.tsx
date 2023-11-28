import SideBar from "../../components/SideBar/SideBar";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAvatar, getChatList } from "../../services/API";
import UserCard from "./UserCard";
import MessageBox from "./MessageBox";
import ChatBox from "./ChatBox";
import { getParticipation } from "../../utils/messageUtils";

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
  const id = localStorage.getItem("id") ?? "";
  const [userInfo, setUserInfo] = useState<ProfileProps[]>();
  const [clickIndex, setClickIndex] = useState(0);
  const { data } = useQuery<DataProps>(["message", id as string], () =>
    getChatList(id as string)
  );

  console.log(data);
  const getProfile = async () => {
    if (data && data.result) {
      const updatedResults = await Promise.all(
        data.result.map(async (user) => {
          const otherUser = getParticipation(id, user.members);
          const avatarUrl = await getAvatar(otherUser[0]);
          return { ...user, members: otherUser, image: avatarUrl };
        })
      );
      setUserInfo(updatedResults);
    }
  };

  useEffect(() => {
    getProfile();
  }, [data]);

  return (
    <S.Container>
      <SideBar>
        {data?.result && (
          <UserCard data={userInfo ?? []} setClickIndex={setClickIndex} />
        )}
      </SideBar>
      <div style={{ paddingLeft: "470px" }}>
        <S.ContentContainer>
          <MessageBox userInfo={userInfo ?? []} clickIndex={clickIndex} />
        </S.ContentContainer>
        <ChatBox chatList={userInfo ?? []} index={clickIndex} />
      </div>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
  `,

  UserContainer: styled.div`
    display: flex;
  `,

  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 20px;
    border-bottom: 2px solid #d9d9d9;
    border-color: ${(props) => props.theme.color.chatBorder};
  `,
};

export default MessagePage;
