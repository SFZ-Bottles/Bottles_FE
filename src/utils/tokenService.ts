const TokenService = {
  getToken() {
    return localStorage.getItem("token") ?? "";
  },

  setToken(newToken: string) {
    return localStorage.setItem("token", newToken);
  },

  setSecretToken(newToken: string) {
    return localStorage.setItem("secret_token", newToken);
  },

  getSecretToken() {
    return localStorage.getItem("secret_token") ?? "";
  },
};

export default TokenService;
