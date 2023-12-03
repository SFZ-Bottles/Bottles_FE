import React from "react";
import styled, { CSSProp, css } from "styled-components";

// Styled Components 정의
const InputWrapper = styled.div`
  /* 여기에 InputWrapper 스타일 정의 */
`;

const StyledInput = styled.input<{ customStyle?: CSSProp }>`
  border-radius: 2rem;
  font-size: 1rem;
  padding-left: 2rem;
  width: 40rem;
  height: 2.5rem;

  &.error {
    border-color: red;
  }

  ${(props) =>
    props.customStyle &&
    css`
      ${props.customStyle}
    `}
`;

const ErrorMsg = styled.div`
  color: red;
`;

interface CommonInputProps {
  type: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  customStyle?: CSSProp;
}

function CommonInput({
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  customStyle,
}: CommonInputProps) {
  return (
    <InputWrapper>
      <StyledInput
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "error" : ""}
        customStyle={customStyle}
      />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </InputWrapper>
  );
}

export default CommonInput;
