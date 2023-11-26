const TokenService = {
  getToken() {
    return localStorage.getItem("token");
  },

  setToken(newToken: string) {
    console.log(newToken);
    return localStorage.setItem("token", newToken);
  },
};

export default TokenService;
