
import React from 'react';
import { HeaderContainer, HeaderItem, LogoutItem, PageContainer, ImageContainer } from "../../styled-components/styled_Main"
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../contents/Navbar/Navbar';

const MainPage = () => {
  const location = useLocation();
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
};

export default MainPage;