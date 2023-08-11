
import React from 'react';
import { HeaderContainer, HeaderItem, LogoutItem, PageContainer, ImageContainer } from "../../styled-components/styled_Home"
import { Link, useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  return (
    <HeaderContainer>
        <HeaderItem isTitle>BOTTLES</HeaderItem>
        <HeaderItem isActive={location.pathname === "/home"}><Link to="/home">Home</Link></HeaderItem>
        <HeaderItem isActive={location.pathname === "/search"}><Link to="/search">Search</Link></HeaderItem>
        <HeaderItem isActive={location.pathname === "/message"}><Link to="/message">Message</Link></HeaderItem>
        <HeaderItem isActive={location.pathname === "/myalbums"}><Link to="/myalbums">My Albums</Link></HeaderItem>
        <HeaderItem isActive={location.pathname === "/setting"}><Link to="/setting">Setting</Link></HeaderItem>
        <LogoutItem>Logout</LogoutItem>
      </HeaderContainer>
  );
};

export default SearchPage;