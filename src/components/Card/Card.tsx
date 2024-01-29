import { Children, ReactNode, isValidElement } from "react";
import CustomButton from "../Button/CustomButton";
import * as S from "./Card.styles";
import { IUserCardProps, ImageProps } from "./Card.types";

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

const ButtonImg = ({ url, size = 30 }: ImageProps) => {
  return <S.ButtonImg src={url} size={size} />;
};

const ButtonTypes = (<CustomButton />).type;
const ProfileTypes = (<UserProfile src={null} />).type;
const UserIdTypes = (<UserId />).type;
const UserDescribeTypes = (<UserDescribe />).type;
const UserCommentTypes = (<UserComment />).type;
const CreatedTimeTypes = (<CreatedTime />).type;
const MessageImgTypes = (<ButtonImg url={""} size={10} />).type;

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

function CardMain({ children, onClick }: IUserCardProps) {
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

export const Card = Object.assign(CardMain, {
  UserProfile,
  UserId,
  UserDescribe,
  UserComment,
  CreatedTime,
  ButtonImg,
});
