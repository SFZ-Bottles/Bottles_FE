import { styled } from "styled-components";
import CommonInput from "../Input/Input";
import { media } from "../../style/theme";

interface IProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ value, onChange, ...rest }: IProps) => {
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

const S = {
  SearchContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: ${(props) => props.theme.color.bgColor};
  `,

  SearchDiv: styled.div`
    display: flex;
    align-items: center;
    min-width: 200px;
    position: relative;
    padding: 0 2rem;
    @media screen and (max-width: ${media.mobile}) {
      width: 100px;
    }
  `,

  SearchIcon: styled.div`
    display: flex;
    position: absolute;
    width: 1rem;
    height: 1rem;
    left: 9%;
    background-size: cover;
    background-image: url("/img/search.svg");

    @media screen and (max-width: ${media.mobile}) {
      left: 0;
    }
  `,
};

export default SearchBar;
