import { Link, useLocation } from "react-router-dom";
import { HeaderContainer, HeaderItem, LogoutItem } from "../../styled-components/styled_Main";

function Navbar() {
    const location = useLocation();
    return(
        <HeaderContainer>
            <HeaderItem isTitle>BOTTLES</HeaderItem>
            <HeaderItem isActive={location.pathname === "/home"}><Link to="/home">Home</Link></HeaderItem>
            <HeaderItem isActive={location.pathname === "/home/search"}><Link to="/home/search">Search</Link></HeaderItem>
            <HeaderItem isActive={location.pathname === "/home/message"}><Link to="/home/message">Message</Link></HeaderItem>
            <HeaderItem isActive={location.pathname === "/home/myalbums"}><Link to="/home/myalbums">My Albums</Link></HeaderItem>
            <HeaderItem isActive={location.pathname === "/home/setting"}><Link to="/home/setting">Setting</Link></HeaderItem>
            <LogoutItem>Logout</LogoutItem>
      </HeaderContainer>
    );
}

export default Navbar;