import TokenService from "../utils/tokenService";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PrivateRouter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const access_token = TokenService.getToken();

  useEffect(() => {
    const secret_token = TokenService.getSecretToken();
    
    if (!access_token) {
      navigate("/", {
        state: {
          from: pathname,
        },
      });
    } else if (secret_token) {
      // secrete 토큰이 있으면 홈으로, 없는 상태면 404에러 페이지
      console.log("secr", secret_token);
      navigate("/404error");
    }
  }, []);

  return access_token ? <Outlet /> : <Navigate to={"/"} />;
}
export default PrivateRouter;
