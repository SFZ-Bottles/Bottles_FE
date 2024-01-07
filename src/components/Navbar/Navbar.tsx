import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { logout } from "../../services/API";
import { media } from "../../style/theme";
import { FlexCenterCSS, FlexColumnCenterCSS } from "../../style/commonStyle";
import UserService from "../../utils/userService";
import AuthService from "../../utils/authService";
import SearchModal from "../Modal/SearchModal";
import { pageLocation } from "../../utils/modeUtils";
import { useRecoilState } from "recoil";
import { searchState } from "../../atom/atom";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isSecrete = UserService.isSecretMode();
  const [, myId] = AuthService.getTokenAndId();
  const [active, setActive] = useRecoilState(searchState);

  const titleClick = () => {
    navigate("/home/pin");
  };

  const onClick = (path: string) => {
    setActive(false);
    navigate(`/home${isSecrete ? "/annonymous" : ""}/${path}`);
  };

  const onSearchClick = () => {
    setActive((prev: boolean) => !prev);
  };

  const onOverlayClicked = () => {
    setActive(false);
  };

  return (
    <S.Container>
      <S.HeaderContainer>
        <span onClick={titleClick}>BOTTLES</span>
        <S.HeaderItem
          $active={pageLocation(pathname, "feed")}
          onClick={() => onClick("feed")}
        >
          feed
        </S.HeaderItem>
        <S.HeaderItem $active={active} onClick={onSearchClick}>
          search
        </S.HeaderItem>
        <S.HeaderItem
          $active={pageLocation(pathname, "message")}
          onClick={() => onClick("message")}
        >
          message
        </S.HeaderItem>
        <S.HeaderItem
          $active={pageLocation(pathname, `${myId}`)}
          onClick={() => onClick(`album/${myId}`)}
        >
          myAlbum
        </S.HeaderItem>
        <S.HeaderItem
          $active={pageLocation(pathname, "setting")}
          onClick={() => onClick("setting")}
        >
          setting
        </S.HeaderItem>
        <span onClick={logout}>
          <S.StyledLink to="/">Logout</S.StyledLink>
        </span>
      </S.HeaderContainer>

      {active && (
        <>
          <SearchModal />
          <S.ModalOverlay onClick={onOverlayClicked}></S.ModalOverlay>
        </>
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    position: fixed;
    ${FlexColumnCenterCSS};
    width: 100%;
    z-index: 2;
  `,

  ModalContainer: styled.div`
    ${FlexColumnCenterCSS};
    position: absolute;
  `,

  HeaderContainer: styled.div`
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
    border-bottom: 3px solid #d9d9d9;
    border-color: ${(props) => props.theme.color.navBorder};
    z-index: 100;

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

  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.3;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    z-index: 98;
  `,
};

export default Navbar;
