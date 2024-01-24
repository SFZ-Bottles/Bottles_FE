import React, { FC, HTMLAttributes, PropsWithChildren } from "react";
import * as S from "./Logo.styles";
import { StyleProps } from "./Logo.type";

interface Props extends HTMLAttributes<HTMLSpanElement>, StyleProps {}

export const Logo: FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
  return <S.Title {...props}>{children}</S.Title>;
};

export default Logo;
