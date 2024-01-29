import { styled } from "styled-components";
import { FlexCenterCSS } from "../../style/commonStyle";

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const UserProfile = styled.img<{ src: string | null }>`
  ${FlexCenterCSS}
  width: 80px;
  height: 80px;
  border: 1px solid #b5b2b2;
  overflow: hidden;
  border-radius: 50%;
  background-size: cover;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex: 1;
  padding-left: 1rem;
  flex-direction: column;
  color: black;
  font-size: 1rem;
  font-weight: 700;
`;

export const CommentTime = styled.div`
  display: flex;
  color: gray;
  font-size: 0.8rem;
`;

export const UserId = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.fontColor};
  font-size: 1.2rem;
`;

export const Comment = styled.div`
  max-width: 300px;
`;

export const ButtonImg = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export const UserDescribe = styled.div`
  font-size: 1rem;
  padding-top: 10px;
  color: #918f8f;
`;
