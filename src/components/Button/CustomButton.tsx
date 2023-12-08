import { MouseEventHandler } from "react";
import { styled, CSSProp, css } from "styled-components";

interface Props {
  name?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  customStyle?: CSSProp;
}

function CustomButton({ name, onClick, customStyle }: Props) {
  return (
    <S.Button onClick={onClick} customStyle={customStyle}>
      {name}
    </S.Button>
  );
}

const S = {
  Button: styled.button<{ customStyle: CSSProp }>`
    height: 20px;
    background-color: ${(props) => props.theme.color.bgColor};
    border: none;
    font-size: 1rem;
    text-decoration: underline;
    cursor: pointer;

    ${(props) =>
      props.customStyle &&
      css`
        ${props.customStyle}
      `}
  `,
};

export default CustomButton;
