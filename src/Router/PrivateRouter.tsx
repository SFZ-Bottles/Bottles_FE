import TokenService from "../utils/tokenService";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PrivateRouter() {
  const access_token = TokenService.getToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!access_token) {
      navigate("/", {
        state: {
          from: pathname,
        },
      });
    }
  }, []);

  return access_token ? <Outlet /> : <Navigate to={"/"} />;
}
export default PrivateRouter;
