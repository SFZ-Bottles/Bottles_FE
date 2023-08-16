
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../contents/Navbar/Navbar';
import { styled } from 'styled-components';

const MainPage = () => {
  const location = useLocation();
  return (
    <S.MainContainer>
      <Navbar/>
      <S.OutletConatiner>
        <Outlet/>
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
    min-height: 80vh;
  `,
  OutletConatiner: styled.div`
    padding-top: 100px;
  `
}

export default MainPage;