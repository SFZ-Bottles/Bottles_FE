import { HTMLAttributes } from "react";
import { styled } from "styled-components";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

export default function AlbumButton({ children, onClick, ...props }: Props) {
  return <S.Button onClick={onClick}>{children}</S.Button>;
}

const S = {
  Button: styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
  `,
};
