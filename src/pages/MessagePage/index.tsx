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
  const [chatList, setChatList] = useState<ProfileProps[]>([]);
  const { data } = useQuery<DataProps>(["message", myId as string], () =>
    getChatList(myId as string)
  );

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
        <Room roomList={chatList} targetId={targetId} />
      ) : <S.EmptySpace>
        <S.ImageContainer>
          <img width="600px" src="/img/bottle.png" alt="bottle"/>
        </S.ImageContainer>
        <S.MyText>내 메시지</S.MyText>
        <S.Text>친구나 그룹에 비공개 사진과 메시지를 보내보세요</S.Text>
        </S.EmptySpace>
        }
        
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
  `,
  EmptySpace: styled.div`
    text-align: center;
    padding: 20px;
    `,
    ImageContainer: styled.div`
      margin-top: 100px;
    `,
    MyText: styled.p`
      font-size: 40px;
      padding-bottom:20px;
      color: #333;
    `,
    Text: styled.p`
      font-size: 25px;
      padding:10px;
      color: grey;
    `,
  // EmptySpace: styled.div`
  //   margin-left: 300px;
  //   height: 100vh;
  //   background: url("/img/bottle.png") no-repeat center center;
  // `,
};

export default MessagePage;
