import { IComment } from "../components/Comment/CommentModal";
import { IAlbum } from "../pages/HomeModal/ModalContent";
import AuthService from "../utils/authService";

const [token, id] = AuthService.getTokenAndId();

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

export const changeInfo = async (editData: any) => {
  try {
    const formData = new FormData();
    const boundary = "----WebKitFormBoundary";
    formData.append("id", editData.id);
    formData.append("name", editData.name);
    formData.append("email", editData.email);
    formData.append("info", editData.info);
    formData.append("created_at", editData.created_at);
    formData.append("avatar", editData.avatar);

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
    console.log(response);
  } catch (error: any) {
    alert(error);
  }
};

export const getComments = async (AlbumId: string) => {
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
    console.log(response);
  } catch (error: any) {
    alert(error);
  }
};

export const setComments = async (AlbumId: any, content: IComment) => {
  const [id, token] = AuthService.getTokenAndId();
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

export const getChatList = async (id: string) => {
  try {
    const response = fetch(
      `${process.env.REACT_APP_SERVER}api/chatrooms/?target=${id}&num=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token as string,
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (error: any) {
    alert(error);
  }
};

export const getAvatar = async (user_id: string) => {
  try {
    const response = fetch(
      `${process.env.REACT_APP_SERVER}api/image/avatar/${user_id}/?resizing=True&width=124&height=124`,
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

export const makeChatRoom = async (
  myId: string,
  targetId: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}api/chatrooms/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token as string,
        },
        body: JSON.stringify({
          name: "테스트용 채팅방",
          members: [myId, targetId],
        }),
      }
    ).then((result) => result.json());
    console.log(response);
    return response;
  } catch (error: any) {
    alert(error);
  }
};

export const userFollow = async (userId: any, tagetId: any) => {
  console.log(userId, tagetId);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}api/users/${userId}/follow/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          target_user_id: tagetId,
        }),
      }
    ).then((result) => result.json());
    console.log(response);
    return response;
  } catch (error: any) {
    alert(error);
  }
};
