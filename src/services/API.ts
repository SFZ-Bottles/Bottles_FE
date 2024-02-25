import { IComment } from "../components/Comment/CommentModal";
import { IAlbum } from "../pages/HomeModal/ModalContent";
import AuthService from "../utils/authService";
import axios from "axios";

const [token, id] = AuthService.getTokenAndId();

export const deleteUserAccount = async (id: string, password: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER}api/users/${id}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token as string,
        },
        data: {
          pw: password,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
export const registAlbum = async (content: any, album: IAlbum) => {
  try {
    const formData = new FormData();
    console.log(content);
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
    await fetch(`${process.env.REACT_APP_SERVER}api/albums/`, {
      method: "POST",
      headers,
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => console.log(res));
  } catch (error: any) {
    alert(error.message);
  }
};

export const regist = async (fileInfo: any) => {
  try {
    await fetch(`${process.env.REACT_APP_SERVER}api/albums/`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
      body: JSON.stringify({
        is_private: fileInfo?.is_private,
        num: fileInfo.num,
        user_id: fileInfo.user_id,
        title: fileInfo?.title,
        preface: fileInfo?.preface,
        data: fileInfo.data,
      }),
    })
      .then((response) => response.json())
      .then((res) => console.log(res));
  } catch (error: any) {
    alert(error.message);
  }
};

export const getAlbum = async (id: string | undefined) => {
  try {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER}api/albums/?target=${id}&num=4`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token as string,
        },
      }
    ).then((res) => res.json());
    return result?.message ? result?.result : [];
  } catch (error: any) {
    alert(error.message);
  }
};

export const getDetailAlbum = async (AlbumId: string) => {
  try {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER}api/albums/${AlbumId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token as string,
        },
      }
    ).then((res) => res.json());
    console.log("detail", result);
    return result?.message === "ok" ? result : null;
  } catch (error: any) {
    alert(error.message);
  }
};

export const getUserInfo = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}api/users/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    ).then((result) => result.json());
    return response ? response : false;
  } catch (error: any) {
    alert(error);
  }
};

// ------------------------------
export const getMyFollowing = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}api/users/${userId}/follow/`,
      {
        method: "GET",
      }
    ).then((result) => result.json());
    return response ? response : false;
  } catch (error: any) {
    alert(error);
  }
};

export const getMyFollower = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}api/users/${userId}/follower/`,
      {
        method: "GET",
      }
    ).then((result) => result.json());
    return response ? response : false;
  } catch (error: any) {
    alert(error);
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");

    const response = await fetch(
      `${process.env.REACT_APP_SERVER}api/auth/logout/`,
      {
        method: "POST",
      }
    ).then((result) => result.json());
    console.log(response);
  } catch (error: any) {
    alert(error);
  }
};

export const changeInfo = async (field: string, value: any) => {
  const [token, id] = AuthService.getTokenAndId();
  try {
    const formData = new FormData();
    const boundary = "----WebKitFormBoundary";
    formData.append(`${field}`, value);

    const response = await fetch(
      `${process.env.REACT_APP_SERVER}api/users/${id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
        },
        body: formData,
      }
    ).then((result) => result.json());

    return response;
  } catch (error: any) {
    alert(error);
  }
};

export const getComments = async (AlbumId: string) => {
  const [token, id] = AuthService.getTokenAndId();
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}api/comments/?album_id=${AlbumId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token as string,
        },
      }
    ).then((result) => result.json());
    return response.message === "ok" && response.result.length ? response : [];
  } catch (error: any) {
    alert(error);
  }
};

export const setComments = async (AlbumId: any, content: IComment) => {
  const [token, id] = AuthService.getTokenAndId();
  console.log(id);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}api/comments/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token as string,
        },
        body: JSON.stringify({
          album_id: AlbumId,
          made_by: id,
          content: content.content,
          mentioned_user_id: content.mentioned_user_id,
          parent_comment_id: content.commentId,
        }),
      }
    ).then((result) => result.json());
    console.log(response);
    return response;
  } catch (error: any) {
    alert(error);
  }
};

export const loginSecretMode = async (pw: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}api/secret_mode/auth/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token as string,
        },
        body: JSON.stringify({
          pw,
        }),
      }
    ).then((result) => result.json());
    console.log(response);
    return response;
  } catch (error: any) {
    alert(error);
  }
};

export const getUserList = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER}api/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token as string,
      },
    }).then((res) => res.json());
    return response ? response : [];
  } catch (error: any) {
    alert(error);
  }
};

export const getSearchedUsers = async (id: string) => {
  console.log("token", token);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}api/search/user/?q=${id}&num=5`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token as string,
        },
      }
    ).then((res) => res.json());
    console.log(response);
    return response ? response : [];
  } catch (error: any) {
    alert(error);
  }
};

export const getAvatar = async (user_id: string) => {
  try {
    const response = fetch(
      `${process.env.REACT_APP_SERVER}api/image/avatar/${user_id}/?resizing=True&width=100&height=100`,
      {
        method: "GET",
        headers: {
          "Content-Type": "image/jpeg",
          Authorization: token as string,
        },
      }
    )
      .then((result) => result.blob())
      .then((blob) => URL.createObjectURL(blob));
    return response;
  } catch (error: any) {
    alert(error);
  }
};
