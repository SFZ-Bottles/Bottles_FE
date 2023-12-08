import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { styled } from "styled-components";

const MainPage = () => {
  return (
    <S.MainContainer>
      <Navbar />
      <S.OutletConatiner>
        <Outlet />
      </S.OutletConatiner>
    </S.MainContainer>
  );
};

const S = {
  MainContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.theme.color.bgColor};
    color: ${(props) => props.theme.color.fontColor};
  `,
  OutletConatiner: styled.div`
    padding-top: 5rem;
  `,
};

export default MainPage;
