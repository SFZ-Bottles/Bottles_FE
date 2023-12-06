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
import FeedPage from "../FeedPage";
import TokenService from "../../utils/tokenService";
import HomePage from "../HomeModal/HomeModal";
import Modal from "../../components/Modal/Modal";
import FollowList from "./Components/FollowList";

export interface MyInfoProps {
  id: string;
  info: string;
  email: string;
  name: string;
  avatar: string;
}

export interface FollowProps {
  message: string;
  num: number;
  result: FollowId[];
}

export interface FollowId {
  id: string;
}

const AlbumPage = () => {
  const params = useParams();
  const id = params.id ?? "";
  const myId = localStorage.getItem("id") ?? "";
  const navigate = useNavigate();
  const [isMyAlbum, setIsMyAlbum] = useState(id === myId);
  const [userBasicInfo, setUserBasicInfo] = useState<MyInfoProps>();
  const [userFollower, setUserFollower] = useState<FollowProps>();
  const [userFollowing, setUserFollowing] = useState<FollowProps>();
  const [albummodalAcivity, setAlbumModalActivity] = useState(false);
  const [followModal, setFollowModal] = useState({
    open: false,
    content: [] as FollowId[],
  });

  console.log(userFollowing);

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

  const followListClick = (list: FollowId[]) => {
    console.log(list, "처음 리스트");
    setFollowModal({ open: true, content: list });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <S.Container>
        {isMyAlbum ? (
          <>
            <button onClick={() => setAlbumModalActivity(true)}>
              new Album
            </button>
          </>
        ) : (
          <>
            <button onClick={followClick}>팔로우</button>
            <button onClick={messageClick}>메세지</button>
          </>
        )}
        {userBasicInfo && <S.UserProfile src={userBasicInfo.avatar} />}
        <S.UserText>{userBasicInfo?.name}</S.UserText>
        <S.UserText>
          <div onClick={() => followListClick(userFollowing?.result ?? [])}>
            팔로잉 {userFollowing?.num}
          </div>
          <div onClick={() => followListClick(userFollower?.result ?? [])}>
            팔로워 {userFollower?.num}
          </div>
        </S.UserText>
        <S.Introduction>{userBasicInfo?.info}</S.Introduction>
        <FeedPage />
      </S.Container>
      {albummodalAcivity && <HomePage />}
      {followModal.open && (
        <Modal onClose={() => setFollowModal({ ...followModal, open: false })}>
          <FollowList list={followModal.content} />
        </Modal>
      )}
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

    button {
      font-size: 1.5rem;
      cursor: pointer;
      font-weight: 700;
    }
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
};

export default AlbumPage;
