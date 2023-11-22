import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  getMyFollowing,
  getUserInfo,
  getMyFollower,
  userFollow,
} from "../../services/API";
import { useParams } from "react-router-dom";
import FeedPage from "../FeedPage/FeedPage";

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
  const { id } = params;
  const myId = localStorage.getItem("id");
  const [isMyAlbum, setIsMyAlbum] = useState(id === myId);
  const [userData, setUserData] = useState<IEdit>();
  const [userData2, setUserData2] = useState<IEdit2>();
  const [userData3, setUserData3] = useState<IEdit3>();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (id && token) {
      const result = await getMyFollowing();
      const result2 = await getUserInfo(id, token);
      const result3 = await getMyFollower();

      setUserData({ ...result });
      setUserData2({ ...result2 });
      setUserData3({ ...result3 });
    }
  };

  const followClick = async () => {
    await userFollow(myId, id);
    setIsMyAlbum(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <S.Container>
        {!isMyAlbum && (
          <S.FollowButton onClick={followClick}>팔로우</S.FollowButton>
        )}
        {userData2 && <S.UserProfile src={userData2.avatar} />}
        <S.UserText>{userData2?.name}</S.UserText>
        <S.UserText>
          팔로잉 {userData?.num} 팔로워 {userData3?.num}
        </S.UserText>
        <S.Introduction>{userData2?.info}</S.Introduction>
        <FeedPage />
      </S.Container>
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
    font-size: 35px;
    font-weight: bold;
    color: black;
  `,
  UserProfile: styled.div<{ src: string }>`
    width: 100px;
    height: 100px;
    background-size: cover;
    border-radius: 3rem;
    background-image: url(${(props) => props.src});
  `,
  Introduction: styled.span`
    font-size: 35px;
    font-weight: bold;
    color: lightgray;
  `,
  FollowButton: styled.span`
    font-size: 1.5rem;
    cursor: pointer;
    font-weight: 700;
  `,
};

export default AlbumPage;
