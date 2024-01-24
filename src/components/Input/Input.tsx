import { FC, HTMLAttributes, PropsWithChildren } from "react";
import * as S from "./Input.styles";
import { StylesProps } from "./Input.types";

interface Props extends StylesProps {}

const CommonInput: FC<PropsWithChildren<Props>> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  customStyle,
}: Props) => {
  return (
    <S.InputWrapper>
      <S.StyledInput
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "error" : ""}
        customStyle={customStyle}
      />
      {error && <S.ErrorMsg>{error}</S.ErrorMsg>}
    </S.InputWrapper>
  );
};

export default CommonInput;
