import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { userFollow, makeChatRoom } from "../../services/API";
import { useNavigate, useParams } from "react-router-dom";
import HomePage from "../HomeModal/HomeModal";
import Modal from "../../components/Modal/Modal";
import FollowList from "./Components/FollowList";
import AuthService from "../../utils/authService";
import AlbumApi from "../../services/albumApi";
import { modeNavigation } from "../../utils/modeUtils";
import Profile from "../../components/Profile/Profile";
import { useInView } from "react-intersection-observer";
import AlbumButton from "./Components/AlbumButton/AlbumButton";
import { FlexCenterCSS } from "../../style/commonStyle";
import UserService from "../../utils/userService";
import { Feed } from "../../components/Feed/Feed";
import Loading from "../../components/Loading/Loading";

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
  const isSecreteMode = UserService.isSecretMode();
  const [isMyAlbum, setIsMyAlbum] = useState<boolean>();
  const [userBasicInfo, setUserBasicInfo] = useState<MyInfoProps>();
  const [userFollower, setUserFollower] = useState<FollowProps>();
  const [userFollowing, setUserFollowing] = useState<FollowProps>();
  const [albumModalAcivity, setAlbumModalActivity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [followModal, setFollowModal] = useState({
    type: "",
    content: [] as string[],
  });

  const [ref, inView] = useInView();
  const [idx, setIdx] = useState(1);
  const [albums, setAlbums] = useState<any>([]);

  const getFeed = async () => {
    setIsLoading(true);
    try {
      const result = await AlbumApi.getFeedAlbum(id, 6, idx);
      setAlbums([...albums, ...result?.data?.result]);
      setIdx((prev: number) => prev + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(isLoading);
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

  const followListClick = (list: string[], type: string) => {
    setFollowModal({ type: type, content: list });
  };

  useEffect(() => {
    fetchData();
    setIsMyAlbum(id === myId);
  }, [id]);

  useEffect(() => {
    if (inView && !isLoading) {
      getFeed();
    }
  }, [inView]);

  return (
    <>
      <S.Container>
        {isMyAlbum ? (
          <>
            <AlbumButton onClick={() => setAlbumModalActivity(true)}>
              new Album
            </AlbumButton>
          </>
        ) : (
          <S.FollowWrapper>
            <AlbumButton onClick={followClick}>팔로우</AlbumButton>
            <AlbumButton onClick={messageClick}>메세지</AlbumButton>
          </S.FollowWrapper>
        )}

        {userBasicInfo && <Profile src={userBasicInfo.avatar} />}
        <S.UserText>{userBasicInfo?.name || myId}</S.UserText>

        {!isSecreteMode && (
          <S.FollowWrapper>
            <AlbumButton
              onClick={() =>
                followListClick(userFollowing?.result ?? [], "Following")
              }
            >
              팔로잉 {userFollowing?.num}
            </AlbumButton>
            <AlbumButton
              onClick={() =>
                followListClick(userFollower?.result ?? [], "Follower")
              }
            >
              팔로워 {userFollower?.num}
            </AlbumButton>
          </S.FollowWrapper>
        )}

        <S.Introduction>{userBasicInfo?.info}</S.Introduction>

        {isLoading && <Loading />}
        <div>
          <Feed data={albums} />
          <div style={{ width: "100%", height: "20px" }} ref={ref} />
        </div>
      </S.Container>

      {albumModalAcivity && <HomePage setState={setAlbumModalActivity} />}

      {followModal.type && (
        <Modal
          onClose={() => setFollowModal({ ...followModal, type: "" })}
          padding={0}
        >
          <FollowList
            onClose={() => setFollowModal({ ...followModal, type: "" })}
            list={followModal.content}
            type={followModal?.type}
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

  FollowWrapper: styled.div`
    ${FlexCenterCSS}
    gap: 2rem;
  `,
};

export default AlbumPage;
