import AuthService from "../utils/authService";
import axiosInstance from "./core";

const InfoApi = {
  getInfo(id: string) {
    return axiosInstance.get(`/api/users/${id}`);
  },

  changeInfo(editData: any) {
    const [token, id] = AuthService.getTokenAndId();

    const formData = new FormData();
    const boundary = "----WebKitFormBoundary";
    formData.append("id", editData.id);
    formData.append("name", editData.name);
    formData.append("email", editData.email);
    formData.append("info", editData.info);
    formData.append("created_at", editData.created_at);
    formData.append("avatar", editData.avatar);
    const headers = {
      Authorization: token,
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
    };

    return axiosInstance.put(`/api/users/${id}`, formData, { headers });
  },
};

export default InfoApi;
