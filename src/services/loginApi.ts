import { UserValueProps } from "./../hook/useForm";
import axios from "axios";
import axiosInstance from "./core";

const LoginApi = {
  login(id: string, pw: string) {
    return axiosInstance.post("/api/auth/login/", {
      id,
      pw,
    });
  },

  signUp({ id, pw, name, email, intro }: UserValueProps) {
    return axiosInstance.post("/api/users/", {
      id,
      pw,
      name,
      email,
      intro,
    });
  },

  checkIdDuplicated(id: string) {
    console.log(id);
    return axiosInstance.get(`/api/users/check-duplicate-id/${id}/`);
  },
};

export default LoginApi;
