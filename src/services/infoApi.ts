import axiosInstance from "./core";

const InfoApi = {
  getInfo(id: string, token: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(`/api/users/${id}`, { headers });
  },
};

export default InfoApi;
