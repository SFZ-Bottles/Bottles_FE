import { useRecoilValue } from "recoil";
import TokenService from "./tokenService";
import UserService from "./userService";
import { themeState } from "../atom/atom";

const AuthService = {
  getAuthrization() {
    if (UserService.isSecretMode()) {
      return TokenService.getSecretToken() && UserService.getSecretId();
    }
    return TokenService.getToken() && UserService.getUserId();
  },

  getTokenAndId() {
    if (UserService.isSecretMode()) {
      return [TokenService.getSecretToken(), UserService.getSecretId()];
    }
    return [TokenService.getToken(), UserService.getUserId()];
  },
};

export default AuthService;
