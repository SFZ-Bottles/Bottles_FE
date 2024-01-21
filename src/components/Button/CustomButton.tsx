import { MouseEventHandler } from "react";
import { styled, CSSProp, css } from "styled-components";

interface Props {
  name?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: number;
  customStyle?: CSSProp;
}

function CustomButton({ name, onClick, size = 15, customStyle }: Props) {
  return (
    <S.Button onClick={onClick} size={size} customStyle={customStyle}>
      {name}
    </S.Button>
  );
}

const S = {
  Button: styled.button<{ customStyle: CSSProp; size: number }>`
    background-color: ${(props) => props.theme.color.bgColor};
    border: none;
    height: 20px;
    font-size: ${(props) => props.size}px;
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
