import axiosInstance from "./core";

export interface UserValueProps {
  id: string;
  pw: string;
  name: string;
  email: string;
  info: string;
}

const LoginApi = {
  login(id: string, pw: string) {
    return axiosInstance.post("/api/auth/login/", {
      id,
      pw,
    });
  },

  signUp({ id, pw, name, email, info }: UserValueProps) {
    return axiosInstance.post("/api/users/", {
      id,
      pw,
      name,
      email,
      info,
    });
  },

  checkIdDuplicated(id: string) {
    return axiosInstance.get(`/api/users/check-duplicate-id/${id}/`);
  },

  loginSecretMode(pw: string) {
    return axiosInstance.post(`/api/secret_mode/auth/login/`, {
      pw,
    });
  },
};

export default LoginApi;
