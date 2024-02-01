const UserService = {
  setUserId(userId: string) {
    localStorage.setItem("id", userId);
  },
  setSecretId(userId: string) {
    localStorage.setItem("secret_id", userId);
  },
  getUserId() {
    return localStorage.getItem("id") ?? "";
  },
  getSecretId() {
    return localStorage.getItem("secret_id") ?? "";
  },
  isSecretMode() {
    return localStorage.getItem("secret_token") ? true : false;
  },
};

export default UserService;
