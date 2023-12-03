import React from "react";
import styled, { CSSProp, css } from "styled-components";
import { FlexCenterCSS } from "../../styled-components/commonStyle";

const InputWrapper = styled.div`
  width: 100%;
  ${FlexCenterCSS}
`;

const StyledInput = styled.input<{ customStyle?: CSSProp }>`
  border-radius: 2rem;
  font-size: 1rem;
  width: 40rem;
  padding-left: 2rem;
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
