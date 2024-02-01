import { CSSProp, css, styled } from "styled-components";
import { FlexCenterCSS } from "../../style/commonStyle";

export const InputWrapper = styled.div`
  width: 100%;
  ${FlexCenterCSS}
`;

export const StyledInput = styled.input<{ $customStyle?: CSSProp }>`
  border-radius: 2rem;
  font-size: 1rem;
  width: 40rem;
  padding-left: 2rem;
  height: 2.5rem;

  &.error {
    border-color: red;
  }

  ${(props) =>
    props.$customStyle &&
    css`
      ${props.$customStyle}
    `}
`;

export const ErrorMsg = styled.div`
  color: red;
`;
