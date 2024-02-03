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
  const [input, setInput] = useState("");
  const [filteredInfo, setFilteredInfo] = useState<Info[]>([]);
  const getInfo = async () => {
    const promises = list.map((user) => InfoApi.getInfo(user));
    const results = await Promise.all(promises);
    const info = results.map((result) => result.data);
    setUserInfo(info);
    setFilteredInfo(info);
  };

  const onCardClicked = (path: string) => {
    onClose();
    navigate(path);
  };

  const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const filtered = userInfo.filter((user) =>
      user.id.includes(e.target.value)
    );
    setFilteredInfo(filtered);
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
        <S.InputWrapper>
          <img src="/img/search.svg" alt="검색" />
          <input type="text" value={input} onChange={inputChanged} />
        </S.InputWrapper>

        <S.ContentWrapper>
          {filteredInfo?.map((user: Info, index: number) => (
            <S.Item key={index}>
              <Card onClick={() => onCardClicked(`/home/album/${user.id}`)}>
                <Card.UserProfile src={user.avatar} />
                <Card.UserId>{user.id}</Card.UserId>
                <Card.ButtonImg url="/img/remove.svg" size={20} />
                <Card.UserDescribe>
                  {subtractString(user.info)}
                </Card.UserDescribe>
              </Card>
            </S.Item>
          ))}
        </S.ContentWrapper>
      </S.CardWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 300px;
    height: 100%;
    overflow: auto;
  `,
  InputWrapper: styled.div`
    ${FlexCenterCSS}
    background-color: white;
    position: fixed;
    width: 90%;

    padding-left: 15px;
    & > input {
      width: 100%;
      min-height: 40px;
      padding-left: 15%;
      font-size: 1rem;
      margin-bottom: 10px;
      border: none;
    }

    & > img {
      position: absolute;
      left: 8%;
      top: 10px;
    }
  `,
  CardWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    height: 400px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0.7rem;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: gray;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: ${(props) => props.theme.color.barColor};
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
    justify-content: space-between;
    padding: 0 20px;
    cursor: pointer;

    @media screen and (max-width: ${media.mobile}) {
      width: 300px;
    }
  `,

  ContentWrapper: styled.div`
    display: flex;
    padding-top: 40px;
  `,
};

export default FollowList;
