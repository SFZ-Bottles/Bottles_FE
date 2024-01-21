import { Children, ReactNode, isValidElement } from "react";
import { styled } from "styled-components";
import CustomButton from "../Button/CustomButton";
import { FlexCenterCSS } from "../../style/commonStyle";

interface IUserCardProps {
  children?: ReactNode;
}

interface IMainProps {
  children?: ReactNode;
  onClick?: () => void;
}

const UserProfile = ({ src }: { src: string | null }) => {
  return <S.UserProfile src={src} />;
};

const UserId = ({ children }: IUserCardProps) => {
  return <S.UserId>{children}</S.UserId>;
};

const UserDescribe = ({ children }: IUserCardProps) => {
  return <S.UserDescribe>{children}</S.UserDescribe>;
};

const UserComment = ({ children }: IUserCardProps) => {
  return <S.Comment>{children}</S.Comment>;
};

const CreatedTime = ({ children }: IUserCardProps) => {
  return <S.CommentTime>{children}</S.CommentTime>;
};

const MessageImg = () => {
  return <S.Message src="/img/message.svg" />;
};

const ButtonTypes = (<CustomButton />).type;
const ProfileTypes = (<UserProfile src={null} />).type;
const UserIdTypes = (<UserId />).type;
const UserDescribeTypes = (<UserDescribe />).type;
const UserCommentTypes = (<UserComment />).type;
const CreatedTimeTypes = (<CreatedTime />).type;
const MessageImgTypes = (<MessageImg />).type;

const getUserId = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter((child) => isValidElement(child) && child.type === UserIdTypes)
    .slice(0);
};

const getUserDescribe = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter(
      (child) => isValidElement(child) && child.type === UserDescribeTypes
    )
    .slice(0);
};

const getButtons = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter((child) => isValidElement(child) && child.type === ButtonTypes)
    .slice(0);
};

const getProfile = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter((child) => isValidElement(child) && child.type === ProfileTypes)
    .slice(0, 1);
};

const getComments = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter((child) => isValidElement(child) && child.type === UserCommentTypes)
    .slice(0, 1);
};

const getCreatedTime = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter((child) => isValidElement(child) && child.type === CreatedTimeTypes)
    .slice(0, 1);
};

const getMessageImg = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter((child) => isValidElement(child) && child.type === MessageImgTypes)
    .slice(0, 1);
};

function CardMain({ children, onClick }: IMainProps) {
  const buttonContents = getButtons(children);
  const profileContents = getProfile(children);
  const userIdContents = getUserId(children);
  const userDescribeContents = getUserDescribe(children);
  const userComments = getComments(children);
  const createdTime = getCreatedTime(children);
  const messageContents = getMessageImg(children);

  return (
    <S.CardContainer onClick={onClick}>
      {profileContents}
      <S.UserInfo>
        <S.UserId>
          {userIdContents}
          <div style={{ width: "100%" }}>
            {buttonContents && (
              <S.ButtonWrapper>{buttonContents.slice(0, 2)}</S.ButtonWrapper>
            )}
          </div>
        </S.UserId>
        {userDescribeContents && userDescribeContents}
        {userComments && userComments}
        {createdTime && createdTime}
        {buttonContents && <div>{buttonContents.slice(2)}</div>}
      </S.UserInfo>

      {messageContents && messageContents}
    </S.CardContainer>
  );
}

const S = {
  CardContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 1rem;
  `,
  UserProfile: styled.img<{ src: string | null }>`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    src: url(${(props) => props.src});
    background-size: cover;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    gap: 10px;
    padding-left: 20px;
  `,
  UserInfo: styled.div`
    display: flex;
    width: 100%;
    padding-left: 1rem;
    flex-direction: column;
    color: black;
    font-size: 1rem;
    font-weight: 700;
  `,
  CommentTime: styled.div`
    display: flex;
    color: gray;
    font-size: 0.8rem;
  `,
  UserId: styled.div`
    display: flex;
    color: ${(props) => props.theme.color.fontColor};
    font-size: 1.2rem;
  `,
  Comment: styled.div`
    width: 90%;
  `,
  Message: styled.img`
    width: 50px;
    height: 50px;
  `,
  UserDescribe: styled.div`
    font-size: 1rem;
    padding-top: 10px;
    color: #918f8f;
  `,
};

export const Card = Object.assign(CardMain, {
  UserProfile,
  UserId,
  UserDescribe,
  UserComment,
  CreatedTime,
  MessageImg,
});
