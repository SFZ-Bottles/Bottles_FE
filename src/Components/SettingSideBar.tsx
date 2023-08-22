import {SideBar, SidebarList, SidebarItem, }from "../styled-components/styled_Setting";
import { Link, useLocation } from 'react-router-dom';

const SettingSideBar = () =>{
  const location = useLocation();
  return (
    <SideBar>
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
        </SideBar>
  );
}

export default SettingSideBar;