import { FC, PropsWithChildren } from "react";
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
  $customStyle,
}) => {
  return (
    <S.InputWrapper>
      <S.StyledInput
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        $customStyle={$customStyle}
      />
      {error && <S.ErrorMsg>{error}</S.ErrorMsg>}
    </S.InputWrapper>
  );
};

export default CommonInput;
