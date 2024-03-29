import { styled } from "styled-components";
import { Card } from "../../../../components/Card/Card";
import { ProfileProps } from "../..";
import { useNavigate } from "react-router-dom";
import { FlexColumnCenterCSS } from "../../../../style/commonStyle";
import { media } from "../../../../style/theme";

interface UserCardProps {
  data: ProfileProps[];
}

function UserCard({ data }: UserCardProps) {
  const navigate = useNavigate();

  const cardClick = (index: number) => {
    navigate(`/home/message/${data[index].members[0]}`);
  };

  return (
    <S.ItemContainer>
      {data?.map((info: ProfileProps, index: number) => (
        <S.Item key={index}>
          {info.image && <Card.UserProfile src={info.image || ""} />}
          <S.CardContainer>
            <Card onClick={() => cardClick(index)}>
              <Card.UserId>{info?.members[0]}</Card.UserId>
              <Card.UserDescribe>{info.name}</Card.UserDescribe>
              <Card.ButtonImg url="/img/message.svg" size={40} />
            </Card>
          </S.CardContainer>
        </S.Item>
      ))}
    </S.ItemContainer>
  );
}

const S = {
  ItemContainer: styled.div`
    ${FlexColumnCenterCSS}
    gap: 20px;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-top: 100px;
    padding-bottom: 100px;

    &::-webkit-scrollbar {
      width: 0.7rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: ${(props) => props.theme.color.barColor};
    }
  `,

  Item: styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    height: 100px;
    border: 2px solid #d9d9d9;
    border-radius: 2rem;
    justify-content: space-between;
    padding: 0 20px;
    cursor: pointer;

    @media screen and (max-width: ${media.tablet}) {
      width: 90%;
    }
  `,

  CardContainer: styled.div`
    flex-grow: 1;
    @media screen and (max-width: ${media.tablet}) {
      display: none;
    }
    @media screen and (max-width: ${media.mobile}) {
      display: flex;
    }
  `,
};

export default UserCard;
