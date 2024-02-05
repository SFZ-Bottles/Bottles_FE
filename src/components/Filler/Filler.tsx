import { FC, HTMLAttributes, PropsWithChildren } from "react";
import * as S from "./Filler.styles";
import { StyleProps } from "./Filler.types";

interface Props extends HTMLAttributes<HTMLDivElement>, StyleProps {
  title: string;
  text: string;
}

export const EmptySpace: FC<PropsWithChildren<Props>> = ({
  children,
  width = 300,
  height = 300,
  ...props
}) => {
  return (
    <S.Wrapper>
      <S.MyText>{props.title}</S.MyText>
      <S.Text>{props.text}</S.Text>
    </S.Wrapper>
  );
};

export default EmptySpace;
