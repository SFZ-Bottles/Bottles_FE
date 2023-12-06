import { styled } from "styled-components";
import CommonInput from "../Input/Input";

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
              paddingLeft: "2.5rem",
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
    width: 40%;
    position: relative;
  `,

  SearchIcon: styled.div`
    display: flex;
    position: absolute;
    width: 1rem;
    height: 1rem;
    left: 2rem;
    background-size: cover;
    background-image: url("/img/search.svg");
  `,

  InputDiv: styled.input`
    display: flex;
    width: 100%;
    height: 40px;
    border: none;
    background-color: #e8e8e8;
    border-radius: 1rem;
    padding-left: 40px;
  `,
};

export default SearchBar;
