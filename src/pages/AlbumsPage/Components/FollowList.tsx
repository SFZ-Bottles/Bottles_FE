import { styled } from "styled-components";
import { FlexColumnCenterCSS } from "../../../styled-components/commonStyle";
import { Card } from "../../../components/Comment/Comment";
import { FollowId } from "..";
import { useNavigate } from "react-router-dom";

function FollowList({ list }: { list: FollowId[] }) {
  const navigate = useNavigate();

  return (
    <S.Container>
      {list?.map((user: FollowId, index: number) => (
        <S.Item key={index}>
          <Card onClick={() => navigate(`/home/album/${user.id}`)}></Card>
          <Card.UserId>{user.id}</Card.UserId>
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

export default FollowList;
