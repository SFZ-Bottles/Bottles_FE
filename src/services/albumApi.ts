import { IAlbum } from "../pages/HomeModal/ModalContent";
import TokenService from "../utils/tokenService";
import axiosInstance from "./core";

const token = TokenService.getToken();

const AlbumApi = {
  regist(content: any, album: IAlbum) {
    const id = localStorage.getItem("id") ?? "";
    const token = localStorage.getItem("token");
    const formData = new FormData();
    const boundary = "----WebKitFormBoundary";
    formData.append("is_private", "FALSE");
    formData.append("num", String(content.pages.length));
    formData.append("user_id", id);
    formData.append("title", album ? album.title : "");
    formData.append("preface", album ? album.preface : "");
    content.pages.forEach((item: any) => {
      formData.append(item.data, item.content);
    });
    formData.append(
      "data",
      JSON.stringify({
        pages: content.pages.map((item: any) => ({
          data: item.data,
          species: item.species,
          order: item.order,
        })),
      })
    );
    const headers = {
      Authorization: token,
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
    };
    axiosInstance.post("/api/albums/", formData, { headers });
  },

  get(id: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(`/api/albums/?target=${id}&num=4`, { headers });
  },

  getDetail(albumId: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(`/api/albums/${albumId}`, { headers });
  },
};

export default AlbumApi;
