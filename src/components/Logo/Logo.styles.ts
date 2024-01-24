import { styled } from "styled-components";
import { media } from "../../style/theme";
import { StyleProps } from "./Logo.type";

export const Title = styled.h1<StyleProps>`
  font-size: ${({ size = 6 }) => size}rem;
  font-weight: 700;
  margin-bottom: 5rem;

  @media screen and (max-width: ${media.mobile}) {
    font-size: 5rem;
  }
`;
