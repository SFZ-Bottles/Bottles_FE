import { IAlbum } from "../pages/HomeModal/ModalContent";
import AuthService from "../utils/authService";
import UserService from "../utils/userService";
import axiosInstance from "./core";

const AlbumApi = {
  async regist(content: any, album: IAlbum) {
    const [token, id] = AuthService.getTokenAndId();

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
    await axiosInstance.post("/api/albums/", formData, { headers });
  },

  getFeedAlbum(mode: string, view: number, pageParam: number) {
    console.log(mode);
    const secret_mode = UserService.isSecretMode();
    return axiosInstance.get(
      secret_mode
        ? `/api/albums/?target=${mode}&num=6&counts=${pageParam}&order_by=-created_at&is_private=true`
        : `/api/albums/?target=${mode}&num=${view}&counts=${pageParam}`
    );
  },

  getUserAlum(targetId: string) {
    const secret_mode = UserService.isSecretMode();
    return axiosInstance.get(
      secret_mode
        ? `/api/albums/?target=${targetId}&num=4&counts=1`
        : `/api/albums/?target=${targetId}&num=4&counts=1`
    );
  },

  getDetail(albumId: string) {
    return axiosInstance.get(`/api/albums/${albumId}`);
  },

  getFollowing(userId: string) {
    return axiosInstance.get(`/api/users/${userId}/follow/`);
  },

  getFollower(userId: string) {
    return axiosInstance.get(`/api/users/${userId}/follower/`);
  },

  startFollow(userId: string, targetId: string) {
    return axiosInstance.post(`/api/users/${userId}/follow/`, {
      target_user_id: targetId,
    });
  },

  getUserInfo(userId: string) {
    return axiosInstance.get(`/api/users/${userId}/`);
  },

  setComment(albumId: string, content: any, id: string) {
    return axiosInstance.post(`/api/users`);
  },

  deleteAlbum(albumId: string) {
    return axiosInstance.delete(`/api/albums/${albumId}`);
  },

  deleteComment(commentId: string) {
    return axiosInstance.delete(`/api/comments/${commentId}`);
  },
};

export default AlbumApi;
