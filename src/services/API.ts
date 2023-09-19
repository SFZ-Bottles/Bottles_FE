import { IAlbum } from "../pages/HomeModal/HomeModal";

interface IUserInfo{
  id: string;
  password: string;
  name: string;
  email: string;
  intro: string;
}

export const signIn = async (ID: string, Password: string) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_SERVER}api/auth/login/`, {
            method: 'POST',
            body: JSON.stringify({
              id: ID,
              pw: Password
            }),
            headers: {
              'Content-Type': 'application/json',
              Accept: "application/json",
            }
        }).then((result) => result.json());
        return response.token;
    } catch (error:any) {
        console.log(error.message);
    }
};

export const signUp = async (userInfo: IUserInfo) => {
    try{
        console.log(userInfo);
        const response = await fetch(`${process.env.REACT_APP_SERVER}api/users/`, {
            method: 'POST',
            body: JSON.stringify({
              id: userInfo.id,
              pw: userInfo.password,
              name: userInfo.name,
              email: userInfo.email,
              info: userInfo.intro
            }),
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            }
        })
        return (response.status === 200 ? true : false);
    } catch (error:any) {
        alert(error.message);
    }
};

export const checkDuplicate = async (ID: string) => {
  try{
      const response = await fetch(`${process.env.REACT_APP_SERVER}api/users/check-duplicate-id/${ID}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          }
      })
      console.log(response);
      return (response.status === 200 ? true : false);
  } catch (error:any) {
      alert(error.message);
  }
};

export const registAlbum = async (content: any, album: IAlbum) => {
  const token: any = localStorage.getItem('token');
  const id: any = localStorage.getItem('id');
  try {
    const formData = new FormData();
  console.log(content);
  const boundary = '----WebKitFormBoundary';
  formData.append('is_private', 'FALSE');
  formData.append('num', String(content.pages.length));
  formData.append('user_id', id);
  formData.append('title', album ? album.title : '');
  formData.append('preface', album ? album.preface : '');
  content.pages.forEach((item: any) => {
    formData.append(item.data, item.content);
  });
  formData.append('data', JSON.stringify({
    pages:(content.pages.map((item: any) => ({
      data: item.data,
      species: item.species,
      order: item.order
    })))
  }));
  const headers = {
    Authorization: token,
    'Content-Type': `multipart/form-data; boundary=${boundary}`, 
  };
      await fetch(`${process.env.REACT_APP_SERVER}api/albums/`, {
        method: 'POST',
        headers,
        body: formData,
      }).then((response) => response.json()).then((res) => console.log(res));
    } catch (error: any) {
      alert(error.message);
    }
};

export const getAlbum = async (id: string, token: string) => {
  try{
    const result = await fetch(`${process.env.REACT_APP_SERVER}api/albums/?target=${id}&num=4`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token as string
      },
    }).then(res => res.json());
    return result?.message ? result?.result : [];
  }
  catch (error:any) {
    alert(error.message);
  }
};

export const getDetailAlbum = async (AlbumId: string) => {
  const token: string | null = localStorage.getItem('token');
  
  try{
    const result = await fetch(`${process.env.REACT_APP_SERVER}api/albums/${AlbumId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token as string
      },
    }).then(res => res.json());
    console.log("detail",result);
    return result?.message === "ok" ? result?.result : [];
  }
  catch (error:any) {
    alert(error.message);
  }
};

export const getUserInfo = async (id: string, token: string) => {
  try{
    const response = await fetch(`${process.env.REACT_APP_SERVER}api/users/${id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    }).then((result) => result.json());
    return response ? response : false;
  }
  catch(error:any){
    alert(error);
  }
};

// ------------------------------
export const getMyFollowing = async () => {
  const id = localStorage.getItem('id');
  try{
    const response = await fetch(`${process.env.REACT_APP_SERVER}api/users/${id}/follow/`,{
      method: 'GET',
    }).then((result) => result.json());
    console.log(response);
  }
  catch(error:any){
    alert(error);
  }
};

export const getMyFollower = async () => {
  const id = localStorage.getItem('id');
  try{
    const response = await fetch(`${process.env.REACT_APP_SERVER}api/users/${id}/follower/`,{
      method: 'GET',
    }).then((result) => result.json());
    console.log(response);
  }
  catch(error:any){
    alert(error);
  }
};

export const logout = async () => {
  const id = localStorage.getItem('id');
  try{
    const response = await fetch(`${process.env.REACT_APP_SERVER}api/users/${id}/followers/`,{
      method: 'GET',
    }).then((result) => result.json());
    console.log(response);
  }
  catch(error:any){
    alert(error);
  }
};

export const changeInfo = async () => {
  const id = localStorage.getItem('id');
  const token:any = localStorage.getItem('token');
  try{
    const response = await fetch(`${process.env.REACT_APP_SERVER}api/users/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        id: 'change0202',
        name: 'jun',
        email: 'asd@asfd',
        info: '12341234'
      })
    }).then((result) => result.json()).then((data) => console.log(data));
  }
  catch(error:any){
    alert(error);
  }
};


export const getComments = async (AlbumId: string) => {
  const id = localStorage.getItem('id');
  try{
    const response = await fetch(`${process.env.REACT_APP_SERVER}api/comments/?album_id=${AlbumId}/`,{
      method: 'GET',
    }).then((result) => result.json());
    console.log(response.result);
    return response.message === "ok" && response.result.length ? response.result : [];
  }
  catch(error:any){
    alert(error);
  }
};

export const setComments = async (AlbumId: number, content: string) => {
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  try{
    const response = await fetch(`${process.env.REACT_APP_SERVER}api/users/${id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token as string
      },
      body: JSON.stringify({
        album_id: AlbumId,
        made_by: id,
        content: content,
        mentioned_user_id: null,
        parent_comment_id: null
      })
    }).then((result) => result.json()).then((data) => console.log(data));
    console.log(response);
  }
  catch(error:any){
    alert(error);
  }
  

};