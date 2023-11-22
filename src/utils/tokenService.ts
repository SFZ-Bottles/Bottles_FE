const TokenService = {
  getToken() {
    return localStorage.getItem("token");
  },

  setToken(newToken: string) {
    return localStorage.setItem("token", newToken);
  },
};

export default TokenService;
