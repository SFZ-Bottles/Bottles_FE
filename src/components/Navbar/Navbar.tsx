import { Link, useLocation, useNavigate } from "react-router-dom";
import { themeState } from "../../atom/atom";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { logout } from "../../services/API";
import { media } from "../../style/theme";
import { FlexCenterCSS } from "../../style/commonStyle";
import UserService from "../../utils/userService";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const myId = localStorage.getItem("id");
  const mySecretId = localStorage.getItem("secret_id");
  const titleClick = () => {
    navigate("/home/pin");
  };

  return (
    <S.HeaderContainer>
      <span onClick={titleClick}>BOTTLES</span>
      <S.HeaderItem $active={location.pathname === "/home/feed"}>
        <S.StyledLink to="/home/feed">Home</S.StyledLink>
      </S.HeaderItem>
      <S.HeaderItem $active={location.pathname === "/home/search"}>
        <S.StyledLink to="/home/search">Search</S.StyledLink>
      </S.HeaderItem>
      <S.HeaderItem $active={location.pathname === "/home/message"}>
        <S.StyledLink to="/home/message">Message</S.StyledLink>
      </S.HeaderItem>
      <S.HeaderItem $active={location.pathname === `/home/album/${myId}`}>
        <S.StyledLink
          to={`/home/album/${UserService.isSecretMode() ? mySecretId : myId}`}
        >
          My Albums
        </S.StyledLink>
      </S.HeaderItem>
      <S.HeaderItem $active={location.pathname === "/home/setting"}>
        <S.StyledLink to="/home/setting">Setting</S.StyledLink>
      </S.HeaderItem>
      <span onClick={logout}>
        <S.StyledLink to="/">Logout</S.StyledLink>
      </span>
    </S.HeaderContainer>
  );
}

const S = {
  HeaderContainer: styled.div`
    position: fixed;
    ${FlexCenterCSS}
    justify-content: start;
    font-size: 1.3rem;
    background-color: ${(props) => props.theme.color.bgColor};
    height: 6rem;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    gap: 3rem;
    z-index: 2;
    border-bottom: 3px solid #d9d9d9;
    border-color: ${(props) => props.theme.color.navBorder};

    & > :first-child {
      font-size: 2em;
      letter-spacing: 0.2em;
      font-weight: bold;
      cursor: pointer;
      padding-left: 1rem;

      @media screen and (max-width: 478px) {
        font-size: 1rem;
        gap: 1px;
        letter-spacing: 2px;
      }
    }

    & > :last-child {
      font-size: 1em;
      justify-content: flex-end;
      cursor: pointer;
      margin-left: auto;
      margin-right: 1em;
      margin-top: 30px;
      opacity: 0.5;

      @media screen and (max-width: ${media.tablet}) and (min-width: ${media.mobile}) {
        display: none;
      }
    }

    @media screen and (max-width: ${media.tablet}) {
      gap: 1.5rem;
      font-size: 1rem;
    }

    @media screen and (max-width: 478px) {
      gap: 10px;
    }
  `,

  StyledLink: styled(Link)`
    text-decoration: none;
    color: black;
    color: ${(props) => props.theme.color.fontColor};
    text-decoration: none;
    transition: font-weight 0.2s;
    &:hover {
      font-weight: bold;
    }
  `,

  HeaderItem: styled.div<{ $active: boolean }>`
    ${FlexCenterCSS};
    padding-top: 15px;
    font-size: 0.8em;
    cursor: pointer;
    font-weight: ${(props) => (props.$active ? "bold" : "400")};
  `,
};

export default Navbar;
