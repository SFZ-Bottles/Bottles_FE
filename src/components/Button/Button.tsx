import type { FC, HTMLAttributes, PropsWithChildren } from "react";
import * as S from "./Button.styles";
import type { StyleProps } from "./Button.types";

interface Props extends HTMLAttributes<HTMLButtonElement>, StyleProps {}

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  return <S.Button {...props}>{children}</S.Button>;
};
