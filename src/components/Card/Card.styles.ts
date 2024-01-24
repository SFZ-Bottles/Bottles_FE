import { styled } from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 1rem;
`;

export const UserProfile = styled.img<{ src: string | null }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  src: url(${(props) => props.src});
  background-size: cover;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  width: 100%;
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
  width: 90%;
`;

export const Message = styled.img`
  width: 50px;
  height: 50px;
`;

export const UserDescribe = styled.div`
  font-size: 1rem;
  padding-top: 10px;
  color: #918f8f;
`;
