import { Link, useLocation } from "react-router-dom";
import { HeaderContainer, HeaderItem, LogoutItem } from "../../styled-components/styled_Main";
import { themeState } from "../../Atom/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

function Navbar() {
    const location = useLocation();
    const setTheme = useSetRecoilState(themeState);

    const titleClick = () => {
    };
        setTheme((prev:boolean) => !prev);
    return(
        <HeaderContainer>
            <HeaderItem title={true} active={false} onClick={titleClick}>BOTTLES</HeaderItem>
            <HeaderItem title={false} active={location.pathname === "/home/feed"}><S.StyledLink to="/home/feed">Home</S.StyledLink></HeaderItem>
            <HeaderItem title={false} active={location.pathname === "/home/search"}><S.StyledLink to="/home/search">Search</S.StyledLink></HeaderItem>
            <HeaderItem title={false} active={location.pathname === "/home/message"}><S.StyledLink to="/home/message">Message</S.StyledLink></HeaderItem>
            <HeaderItem title={false} active={location.pathname === "/home/myalbums"}><S.StyledLink to="/home/myalbums">My Albums</S.StyledLink></HeaderItem>
            <HeaderItem title={false} active={location.pathname === "/home/setting"}><S.StyledLink to="/home/setting">Setting</S.StyledLink></HeaderItem>
            <LogoutItem>Logout</LogoutItem>
      </HeaderContainer>
    );
}

const S = {
    StyledLink: styled(Link)`
        text-decoration: none;
        color: black;
        color: ${props => props.theme.color.fontColor};
        text-decoration: none; 
        transition: font-weight 0.2s; 
        &:hover {
        font-weight: bold;
        }
    `
}

export default Navbar;