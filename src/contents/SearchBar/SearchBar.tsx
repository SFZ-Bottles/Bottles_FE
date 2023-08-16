import { useEffect } from "react";
import { styled } from "styled-components";

interface IProps{
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({input,setInput}: IProps) => {
  
  useEffect(() => {
    
  },[]);
  return (
      <>
        <S.SearchContainer>
          <S.SearchDiv>
            <S.InputDiv value={input} onChange={(e) => setInput(e.target.value)}/>
            <S.SearchIcon/>
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
      background-color: white;
    `,
  
    SearchDiv : styled.div`
      display: flex;
      align-items: center;
      width: 40%;
      position: relative;
    `,
  
    SearchIcon: styled.div`
      display: flex;
      position: absolute;
      width: 20px;
      height: 20px;
      margin-left: 10px;
      background-size: cover;
      background-image: url('/img/search.svg');
    `,
  
    InputDiv: styled.input`
      display: flex;
      width: 100%;
      height: 40px;
      border: none;
      background-color: #E8E8E8;
      border-radius: 1rem;
      padding-left: 40px;
    `,
  }
  
  export default SearchBar;