import TokenService from "./tokenService";
import UserService from "./userService";

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
  setTokenAndId(token: string, id: string) {
    if (UserService.isSecretMode()) {
      UserService.setSecretId(id);
      TokenService.setSecretToken(token);
    } else {
      UserService.setUserId(id);
      TokenService.setToken(token);
    }
  },
};

export default AuthService;
