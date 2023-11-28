import { styled } from "styled-components";
import { Card } from "../../../contents/Comment/Comment";
import { ProfileProps } from "../MessagePage";
import { useEffect } from "react";

interface UserCardProps {
  data: ProfileProps[];
  setClickIndex: React.Dispatch<React.SetStateAction<number>>;
}

function UserCard({ data, setClickIndex }: UserCardProps) {
  return (
    <S.ItemContainer>
      {data?.map((info: ProfileProps, index: number) => (
        <S.Item key={index}>
          <Card onClick={() => setClickIndex(index)}>
            {info.image && <Card.UserProfile src={info.image || ""} />}
            <Card.UserId>{info?.members[1]}</Card.UserId>
            <Card.UserDescribe>{info.name}</Card.UserDescribe>
            <Card.MessageImg />
          </Card>
        </S.Item>
      ))}
    </S.ItemContainer>
  );
}

const S = {
  ItemContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 450px;
    height: 100%;
    overflow: auto;
  `,

  Item: styled.div`
    display: flex;
    align-items: center;
    width: 370px;
    height: 100px;
    border: 2px solid #d9d9d9;
    border-radius: 2rem;
    justify-content: space-between;
    padding: 0 20px;
    cursor: pointer;
  `,
};

export default UserCard;
