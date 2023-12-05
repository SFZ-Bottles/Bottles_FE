const UserService = {
  setUserId(userId: string) {
    localStorage.setItem("id", userId);
  },
  getUserId() {
    return localStorage.getItem("id");
  },
};

export default UserService;
