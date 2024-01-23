import SideBar from "../../components/SideBar/SideBar";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAvatar } from "../../services/API";
import UserCard from "./Components/UserCard/UserCard";
import { getParticipation } from "../../utils/messageUtils";
import { useParams } from "react-router-dom";
import EmptySpace from "../../components/Empty/EmptySpace";
import Room from "./Components/Room/Room";
import AuthService from "../../utils/authService";
import ChatApi from "../../services/chatApi";
import useToken from "../../hooks/useToken";
import { media } from "../../style/theme";

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
      <S.SideBarWrapper show={targetId ?? ""}>
        <SideBar>{chatList && <UserCard data={chatList} />}</SideBar>
      </S.SideBarWrapper>
      <S.RightWraaper show={targetId ?? ""}>
        {targetId && chatList ? (
          <Room roomList={chatList} targetId={targetId} />
        ) : (
          <EmptySpace
            title="내 메시지"
            text="친구나 그룹에 비공개 사진과 메시지를 보내보세요"
          />
        )}
      </S.RightWraaper>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
  `,
  SideBarWrapper: styled.div<{ show: string }>`
    width: 30%;
    @media screen and (max-width: ${media.mobile}) {
      display: ${(props) => (props.show ? "none" : "flex")};
      width: 100%;
    }
  `,
  RightWraaper: styled.div<{ show: string }>`
    display: flex;
    flex-grow: 1;

    @media screen and (max-width: ${media.mobile}) {
      display: ${(props) => (props.show ? "flex" : "none")};
    }
  `,
};

export default MessagePage;
