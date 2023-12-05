import TokenService from "./tokenService";
import UserService from "./userService";

const AuthService = {
  getAuthrization() {
    return TokenService.getToken() && UserService.getUserId();
  },

  getTokenAndId() {
    return [TokenService.getToken(), UserService.getUserId()];
  },
};

export default AuthService;
