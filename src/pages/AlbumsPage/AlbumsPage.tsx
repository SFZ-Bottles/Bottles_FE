import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  getMyFollowing,
  getUserInfo,
  getMyFollower,
  userFollow,
  makeChatRoom,
} from "../../services/API";
import { useNavigate, useParams } from "react-router-dom";
import FeedPage from "../FeedPage/FeedPage";
import TokenService from "../../utils/tokenService";

export interface IEdit {
  message: string;
  num: number;
  followList: any;
}

export interface IEdit2 {
  id: string;
  info: string;
  email: string;
  name: string;
  avatar: string;
}

export interface IEdit3 {
  message: string;
  num: number;
  followList: any;
}

const AlbumPage = () => {
  const params = useParams();
  const id = params.id ?? "";
  const myId = localStorage.getItem("id") ?? "";
  const navigate = useNavigate();
  const [isMyAlbum, setIsMyAlbum] = useState(id === myId);
  const [userFollower, setUserFollower] = useState<IEdit>();
  const [userBasicInfo, setUserBasicInfo] = useState<IEdit2>();
  const [userFollowing, setUserFollowing] = useState<IEdit3>();

  const fetchData = async () => {
    if (!id) return;
    const token = TokenService.getToken() ?? "";
    const follower = await getMyFollowing(id);
    const userInfo = await getUserInfo(id, token);
    const following = await getMyFollower(id);
    setUserFollower(follower);

    setUserBasicInfo(userInfo);
    setUserFollowing(following);
  };

  const followClick = async () => {
    await userFollow(myId, id);
    setIsMyAlbum(false);
  };

  const messageClick = async () => {
    await makeChatRoom(myId, id);
    navigate("/home/message");
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <S.Container>
        {!isMyAlbum && (
          <>
            <S.AlbumButton onClick={followClick}>팔로우</S.AlbumButton>
            <S.AlbumButton onClick={messageClick}>메세지</S.AlbumButton>
          </>
        )}
        {userBasicInfo && <S.UserProfile src={userBasicInfo.avatar} />}
        <S.UserText>{userBasicInfo?.name}</S.UserText>
        <S.UserText>
          <div>팔로잉 {userFollowing?.num}</div>
          <div>팔로워 {userFollower?.num}</div>
        </S.UserText>
        <S.Introduction>{userBasicInfo?.info}</S.Introduction>
        <FeedPage />
      </S.Container>
      {}
    </>
  );
};

const S = {
  Container: styled.div`
    padding-top: 130px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  `,
  UserText: styled.span`
    display: flex;
    gap: 1rem;
    font-size: 35px;
    font-weight: bold;
    color: black;
    & div {
      cursor: pointer;
    }
  `,
  UserProfile: styled.div<{ src: string }>`
    width: 20rem;
    height: 20rem;
    background-size: cover;
    border-radius: 3rem;
    background-image: url(${(props) => props.src});
  `,
  Introduction: styled.span`
    font-size: 35px;
    font-weight: bold;
    color: lightgray;
  `,
  AlbumButton: styled.span`
    font-size: 1.5rem;
    cursor: pointer;
    font-weight: 700;
  `,
};

export default AlbumPage;
