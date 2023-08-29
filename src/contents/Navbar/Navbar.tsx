import { Link, useLocation } from "react-router-dom";
import { HeaderContainer, HeaderItem, LogoutItem } from "../../styled-components/styled_Main";
import { themeState } from "../../Atom/atom";
import { useRecoilState, useSetRecoilState } from "recoil";

function Navbar() {
    const location = useLocation();
    const setTheme = useSetRecoilState(themeState);

    const titleClick = () => {
        setTheme((prev:boolean) => !prev);
    };
    return(
        <HeaderContainer>
            <HeaderItem isTitle onClick={titleClick}>BOTTLES</HeaderItem>
            <HeaderItem isActive={location.pathname === "/home/feed"}><Link to="/home/feed">Home</Link></HeaderItem>
            <HeaderItem isActive={location.pathname === "/home/search"}><Link to="/home/search">Search</Link></HeaderItem>
            <HeaderItem isActive={location.pathname === "/home/message"}><Link to="/home/message">Message</Link></HeaderItem>
            <HeaderItem isActive={location.pathname === "/home/myalbums"}><Link to="/home/myalbums">My Albums</Link></HeaderItem>
            <HeaderItem isActive={location.pathname === "/home/setting"}><Link to="/home/setting">Setting</Link></HeaderItem>
            <LogoutItem>Logout</LogoutItem>
      </HeaderContainer>
    );
}

export default Navbar;