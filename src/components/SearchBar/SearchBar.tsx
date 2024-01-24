import CommonInput from "../Input/Input";
import * as S from "./SearchBar.styles";
import { Props } from "./SearchBar.types";

const SearchBar = ({ value, onChange, ...rest }: Props) => {
  return (
    <>
      <S.SearchContainer>
        <S.SearchDiv>
          <CommonInput
            type="text"
            value={value}
            name={value}
            onChange={onChange}
            {...rest}
            customStyle={{
              paddingLeft: "50px",
              backgroundColor: "#E8E8E8",
              border: "none",
            }}
          />
          <S.SearchIcon />
        </S.SearchDiv>
      </S.SearchContainer>
    </>
  );
};

export default SearchBar;
