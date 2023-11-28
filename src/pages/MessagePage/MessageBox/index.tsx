import { styled } from "styled-components";
import { ProfileProps } from "../MessagePage";

interface MessageBoxProps {
  userInfo: ProfileProps[];
  clickIndex: number;
}

function MessageBox({ userInfo, clickIndex }: MessageBoxProps) {
  return (
    <S.ChatProfileDiv>
      <S.Profile src={userInfo[clickIndex]?.image || ""} />
      <S.UserName>{userInfo[clickIndex]?.members[0]}</S.UserName>
    </S.ChatProfileDiv>
  );
}

const S = {
  UserName: styled.div`
    font-size: 1.5rem;
    font-weight: 700;
  `,

  Profile: styled.img<{ src: string }>`
    width: 70px;
    height: 70px;
    border: 2px solid #d9d9d9;
    border-radius: 40px;
    background-image: url(src);
  `,

  ChatProfileDiv: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 160px;
  `,
};

export default MessageBox;
