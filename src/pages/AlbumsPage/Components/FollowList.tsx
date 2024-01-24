import { styled } from "styled-components";
import { FlexColumnCenterCSS } from "../../../style/commonStyle";
import { Card } from "../../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoApi from "../../../services/infoApi";
import AuthService from "../../../utils/authService";
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
}

function FollowList({ list, onClose }: Props) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<Info[]>([]);

  const getInfo = async () => {
    
    const [token] = AuthService.getTokenAndId();
    const promises = list.map((user) => InfoApi.getInfo(user, token));
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
      {userInfo?.map((user: Info, index: number) => (
        <S.Item key={index}>
          <Card onClick={() => onCardClicked(`/home/album/${user.id}`)}>
            <Card.UserProfile src={user.avatar} />
            <Card.UserId>{user.id}</Card.UserId>
            <Card.UserDescribe>{subtractString(user.info)}</Card.UserDescribe>
          </Card>
        </S.Item>
      ))}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${FlexColumnCenterCSS}
    align-items: center;
    gap: 20px;
    height: 100%;
    overflow: auto;
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
