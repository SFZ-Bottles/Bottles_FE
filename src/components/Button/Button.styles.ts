import { COLOR } from "./../../style/themes/color";
import styled, { css } from "styled-components";
import type { StyleProps } from "./Button.types";
import { FlexCenterCSS } from "../../style/commonStyle";
import { FONT_SIZE } from "../../style/themes/font.size";

export const variantCSS = {
  default: css``,
  outlined: css`
    text-decoration: underline;
  `,
  shape: css`
    border: 2px solid ${COLOR.common.gray.middle};
  `,
};
export const sizeCSS = {
  default: css`
    font-size: 15px;
    width: fit-content;
    height: fit-content;
  `,
  standard: css`
    min-width: 6rem;
    min-height: 2rem;
    font-size: 25px;
  `,
  full: css`
    width: 100%;
  `,
};
export const roundCSS = {
  default: css``,
  slightly: css`
    border-radius: 15px;
  `,
  uniform: css`
    width: 60px;
    height: 60px;
    border-radius: 50%;
  `,
  very: css`
    border-radius: 30px;
  `,
};
export const skinCSS = {
  default: css`
    color: ${COLOR.common.black};
    background-color: none;
  `,
  red: css`
    color: ${COLOR.common.white};
    background-color: ${COLOR.common.red.light};
    &:hover {
      background-color: ${COLOR.common.red.dark};
    }
  `,
  blue: css`
    color: ${COLOR.common.white};
    background-color: ${COLOR.common.blue.light};
    &:hover {
      background-color: ${COLOR.common.blue.dark};
    }
  `,
  gray: css`
    color: ${COLOR.common.white};
    background-color: ${COLOR.common.gray.light};
    &:hover {
      background-color: ${COLOR.common.gray.middle};
    }
  `,
  white2gray: css`
    background-color: ${COLOR.common.white};
    &:hover {
      background-color: ${COLOR.common.gray.light};
    }
  `,
};

export const Button = styled.button<StyleProps>`
  ${FlexCenterCSS}
  gap: 1rem;
  font-size: ${FONT_SIZE.small};
  /* padding: 0.5rem 1rem; */

  ${({ variant = "default" }) => variantCSS[variant]}
  ${({ size = "default" }) => sizeCSS[size]}
  ${({ round = "default" }) => roundCSS[round]}
  ${({ skin = "default" }) => skinCSS[skin]}

  transition: color 0.1s ease, background-color 0.2s ease,
    border-color 0.3s ease;

  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
`;
