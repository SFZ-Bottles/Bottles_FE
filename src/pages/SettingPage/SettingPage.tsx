import React from 'react';
import SettingSideBar from '../../Components/SettingSideBar';
import PersonalInformation from "../../Components/PersonalInformation"
import AboutBottles from '../../Components/AboutBottles'
import AboutSFZ from '../../Components/AboutSFZ';
import Resign from '../../Components/Resign';
import { HeaderContainer, HeaderItem, LogoutItem, PageContainer, ImageContainer } from "../../styled-components/styled_Main"
import { Link, useLocation } from 'react-router-dom';
import {Nav} from "react-bootstrap";


const SettingPage = () => {
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
        <SettingSideBar/>
        {/* <SideBar>
          <SidebarList>
            <SidebarItem isActive={location.pathname === "/setting"}>
              <Link to="/setting">개인정보 편집</Link>
            </SidebarItem>
            <SidebarItem isActive={location.pathname === "/deletion"}>
              <Link to="/deletion">Bottles란?</Link>
            </SidebarItem>
            <SidebarItem isActive={location.pathname === "/registration"}>
              <Link to="/registration">SFZ란?</Link>
            </SidebarItem>
            <SidebarItem isActive={location.pathname === "/registration"}>
              <Link to="/registration">회원탈퇴</Link>
            </SidebarItem>
          </SidebarList>
        </SideBar> */}
        <PersonalInformation/>

    </>
  );
};

export default SettingPage;