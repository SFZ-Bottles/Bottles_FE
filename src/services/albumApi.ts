import { IAlbum } from "../pages/HomeModal/ModalContent";
import AuthService from "../utils/authService";
import UserService from "../utils/userService";
import axiosInstance from "./core";

const AlbumApi = {
  regist(content: any, album: IAlbum) {
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
    axiosInstance.post("/api/albums/", formData, { headers });
  },

  getFeedAlbum(mode: string, pageParam: number) {
    const [token, id] = AuthService.getTokenAndId();

    const secret_mode = UserService.isSecretMode();
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(
      secret_mode
        ? `/api/albums/?target=${mode}&num=6&counts=${pageParam}&order_by=-created_at&is_private=true`
        : `/api/albums/?target=${mode}&num=4&counts=${2}`,
      {
        headers,
      }
    );
  },

  getUserAlum(targetId: string) {
    const [token, id] = AuthService.getTokenAndId();

    const secret_mode = UserService.isSecretMode();
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(
      secret_mode
        ? `/api/albums/?target=${targetId}&num=4&counts=1`
        : `/api/albums/?target=${targetId}&num=4&counts=1`,
      {
        headers,
      }
    );
  },

  getDetail(albumId: string) {
    const [token, id] = AuthService.getTokenAndId();

    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(`/api/albums/${albumId}`, { headers });
  },

  getFollowing(userId: string, token: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(`/api/users/${userId}/follow/`, { headers });
  },

  getFollower(userId: string, token: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(`/api/users/${userId}/follower/`, { headers });
  },

  getUserInfo(userId: string, token: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.get(`/api/users/${userId}/`, { headers });
  },

  setComment(albumId: string, content: any, id: string, token: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.post(`/api/users`, { headers });
  },

  deleteAlbum(albumId: string, token: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.delete(`/api/albums/${albumId}`, { headers });
  },

  deleteComment(commentId: string, token: string) {
    const headers = {
      Authorization: token,
    };
    return axiosInstance.delete(`/api/comments/${commentId}`, { headers });
  },
};

export default AlbumApi;
