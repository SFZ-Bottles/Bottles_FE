import { styled } from "styled-components";
import { FlexCenterCSS, FlexColumnCenterCSS } from "../../../style/commonStyle";
import { Card } from "../../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoApi from "../../../services/infoApi";
import { subtractString } from "../../../utils/basicUtills";
import { media } from "../../../style/theme";

interface Info {
  avatar: string;
  created_at: string;
  email: string;
  id: string;
  info: string;
  name: string;
}

interface Props {
  list: string[];
  onClose: () => void;
  type: string;
}

function FollowList({ list, onClose, type }: Props) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<Info[]>([]);

  const getInfo = async () => {
    const promises = list.map((user) => InfoApi.getInfo(user));
    const results = await Promise.all(promises);
    setUserInfo(results.map((result) => result.data));
  };

  const onCardClicked = (path: string) => {
    onClose();
    navigate(path);
  };

  useEffect(() => {
    if (list.length) {
      getInfo();
    }
  }, [list]);

  return (
    <S.Container>
      <S.Nav>{type}</S.Nav>
      <S.CardWrapper>
        {userInfo?.map((user: Info, index: number) => (
          <S.Item key={index}>
            <Card onClick={() => onCardClicked(`/home/album/${user.id}`)}>
              <Card.UserProfile src={user.avatar} />
              <Card.UserId>{user.id}</Card.UserId>
              <Card.UserDescribe>{subtractString(user.info)}</Card.UserDescribe>
            </Card>
          </S.Item>
        ))}
      </S.CardWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${FlexColumnCenterCSS}
    align-items: center;
    gap: 20px;
    min-width: 300px;
    height: 100%;
    overflow: auto;
  `,
  CardWrapper: styled.div`
    ${FlexColumnCenterCSS};
    gap: 5px;
    padding: 10px;
    padding-top: 60px;
    height: 400px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0.7rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: ${(props) => props.theme.color.barColor};
    }
  `,
  Nav: styled.div`
    ${FlexCenterCSS};
    font-size: 2rem;
    width: 100%;
    height: 10dvh;
    font-weight: 700;
    border-bottom: 2px solid black;
  `,

  Item: styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    width: 400px;
    border: 2px solid #d9d9d9;
    border-radius: 2rem;
    justify-content: space-between;
    padding: 0 20px;
    cursor: pointer;

    @media screen and (max-width: ${media.mobile}) {
      width: 300px;
    }
  `,
};

export default FollowList;
