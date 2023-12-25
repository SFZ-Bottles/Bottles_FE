import TokenService from "../utils/tokenService";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function PrivateRouterAnonymous() {
  const access_token = TokenService.getToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!access_token) {
      // 토큰이 없으면 로그인 페이지로 리디렉션
      navigate("/", {
        state: {
          from: pathname,
        },
      });
    } else {
      // 토큰에서 사용자의 모드 확인
      const userMode = TokenService.getSecretToken();
      if (!userMode) {
        // 익명 모드가 아니면 다른 경로로 리디렉션
        navigate("/home/feed");
      }
    }
  }, [access_token, navigate, pathname]);

  return access_token && TokenService.getSecretToken() ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
}

export default PrivateRouterAnonymous;
