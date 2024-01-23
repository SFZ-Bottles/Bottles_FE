import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { userFollow, makeChatRoom } from "../../services/API";
import { useNavigate, useParams } from "react-router-dom";
import HomePage from "../HomeModal/HomeModal";
import Modal from "../../components/Modal/Modal";
import FollowList from "./Components/FollowList";
import AuthService from "../../utils/authService";
import { useRecoilValue } from "recoil";
import { themeState } from "../../atom/atom";
import AlbumApi from "../../services/albumApi";
import Feed from "../../components/Feed/Feed";
import { modeNavigation } from "../../utils/modeUtils";
import Profile from "../../components/Profile/Profile";
import { useInView } from "react-intersection-observer";

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
  result: string[];
}

const AlbumPage = () => {
  const params = useParams();
  const id = params.id ?? "";
  const [token, myId] = AuthService.getTokenAndId();
  const navigate = useNavigate();
  const [isMyAlbum, setIsMyAlbum] = useState<boolean>();
  const [userBasicInfo, setUserBasicInfo] = useState<MyInfoProps>();
  const [userFollower, setUserFollower] = useState<FollowProps>();
  const [userFollowing, setUserFollowing] = useState<FollowProps>();
  const [albumModalAcivity, setAlbumModalActivity] = useState(false);
  const [followModal, setFollowModal] = useState({
    open: false,
    content: [] as string[],
  });
  const [ref, inView] = useInView();
  const [idx, setIdx] = useState(1);
  const [albums, setAlbums] = useState<any>([]);

  console.log(albums);

  const getFeed = async () => {
    const result = await AlbumApi.getFeedAlbum(id, 6, idx);
    setAlbums([...albums, ...result?.data?.result]);
    setIdx((prev: number) => prev + 1);
  };

  const fetchData = async () => {
    if (!id) return;
    const follower = await AlbumApi.getFollower(id, token);
    const userInfo = await AlbumApi.getUserInfo(id, token);
    const following = await AlbumApi.getFollowing(id, token);
    setUserFollower(follower.data);
    setUserBasicInfo(userInfo.data);
    setUserFollowing(following.data);
  };

  const followClick = async () => {
    await userFollow(myId, id);
    setIsMyAlbum(false);
  };

  const messageClick = async () => {
    await makeChatRoom(myId, id, token);
    navigate(modeNavigation("/home/message"));
  };

  const followListClick = (list: string[]) => {
    setFollowModal({ open: true, content: list });
  };

  useEffect(() => {
    fetchData();
    setIsMyAlbum(id === myId);
  }, [id]);

  useEffect(() => {
    if (inView) {
      getFeed();
    }
  }, [inView]);

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
        {userBasicInfo && <Profile src={userBasicInfo.avatar} />}
        <S.UserText>{userBasicInfo?.name || myId}</S.UserText>
        <S.UserText>
          <div onClick={() => followListClick(userFollowing?.result ?? [])}>
            팔로잉 {userFollowing?.num}
          </div>
          <div onClick={() => followListClick(userFollower?.result ?? [])}>
            팔로워 {userFollower?.num}
          </div>
        </S.UserText>
        <S.Introduction>{userBasicInfo?.info}</S.Introduction>
        <div>
          <React.Fragment>
            <Feed data={albums} />
          </React.Fragment>
          <div style={{ width: "100%", height: "20px" }} ref={ref} />
        </div>
      </S.Container>

      {albumModalAcivity && <HomePage setState={setAlbumModalActivity} />}

      {followModal.open && (
        <Modal onClose={() => setFollowModal({ ...followModal, open: false })}>
          <FollowList
            onClose={() => setFollowModal({ ...followModal, open: false })}
            list={followModal.content}
          />
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
  Introduction: styled.span`
    font-size: 35px;
    font-weight: bold;
    color: lightgray;
  `,
};

export default AlbumPage;
