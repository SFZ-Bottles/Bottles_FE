import { styled } from "styled-components";

interface ProfileProps {
  src: string;
  width?: number;
  height?: number;
}

function Profile({ src, width = 15, height = 15 }: ProfileProps) {
  return <S.UserProfile src={src} width={width} height={height} />;
}

const S = {
  UserProfile: styled.div<{ src: string; width: number; height: number }>`
    width: ${(props) => props.width}rem;
    height: ${(props) => props.height}rem;
    background-size: cover;
    border-radius: 50%;
    background-image: url(${(props) => props.src});
  `,
};

export default Profile;
