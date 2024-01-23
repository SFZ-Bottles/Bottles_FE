import axiosInstance from "./core";

export const SearchApi = {
  SearchUsers(id: string, token: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(`/api/search/user/?q=${id}&num=5`, {
      headers,
    });
  },
};
