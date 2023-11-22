const UserService = {
  setUserId(userId: string) {
    localStorage.setItem("id", userId);
  },
};

export default UserService;
