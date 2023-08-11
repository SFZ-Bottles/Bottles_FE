
import React from 'react';
import { HeaderContainer, HeaderItem, LogoutItem, PageContainer, ImageContainer } from "../../styled-components/styled_Main"
import { Link, useLocation } from 'react-router-dom';

const MainPage = () => {
  const location = useLocation();
  return (
    <>
      <HeaderContainer>
        <HeaderItem isTitle>BOTTLES</HeaderItem>
        <HeaderItem isActive={location.pathname === "/home"}><Link to="/home">Home</Link></HeaderItem>
        <HeaderItem isActive={location.pathname === "/search"}><Link to="/search">Search</Link></HeaderItem>
        <HeaderItem isActive={location.pathname === "/message"}><Link to="/message">Message</Link></HeaderItem>
        <HeaderItem isActive={location.pathname === "/myalbums"}><Link to="/myalbums">My Albums</Link></HeaderItem>
        <HeaderItem isActive={location.pathname === "/setting"}><Link to="/setting">Setting</Link></HeaderItem>
        <LogoutItem>Logout</LogoutItem>
      </HeaderContainer>
      <PageContainer>
        <ImageContainer>
          <img src="image1jpg" alt="Image 5" width="150" height="150" />
        </ImageContainer>
        <ImageContainer>
          <img src="image2.jpg" alt="Image 2" width="150" height="150" />
        </ImageContainer>
        <ImageContainer>
          <img src="image3.jpg" alt="Image 3" width="150" height="150" />
        </ImageContainer>
        <ImageContainer>
          <img src="image4.jpg" alt="Image 4" width="150" height="150" />
        </ImageContainer>
      </PageContainer>
    </>
  );
};

export default MainPage;