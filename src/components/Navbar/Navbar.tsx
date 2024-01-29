import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/API";
import UserService from "../../utils/userService";
import AuthService from "../../utils/authService";
import SearchModal from "../Modal/SearchModal";
import { pageLocation } from "../../utils/modeUtils";
import { useRecoilState } from "recoil";
import { searchState } from "../../atom/atom";
import * as S from "./Navbar.styles";

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
      <S.HeaderContainer $url={pathname}>
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
          profile
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

export default Navbar;
