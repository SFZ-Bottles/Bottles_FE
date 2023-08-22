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
  console.log(ID);
  try{
      const response = await fetch(`${process.env.REACT_APP_SERVER}api/users/check-duplicate-id/${ID}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          }
      })
      return (response.status === 200 ? true : false);
  } catch (error:any) {
      alert(error.message);
  }
};

export const registAlbum = async(content: any, album: IAlbum) => {
  try{
    const formData = new FormData();
    formData.append(`${album.data}`, content);
    formData.append('is_private', "False");
    formData.append('num', content.size());
    formData.append('user_id', "jun");
    formData.append('title', album?.title);
    formData.append('preface', album?.preface);

    formData.append('data', JSON.stringify(content));
    
    await fetch(`${process.env.REACT_APP_SERVER}api/albums/`, {
      method: 'POST',
      headers: {

      },
    })
  }
  catch (error:any) {
    alert(error.message);
  }
}

export const regist = async (fileInfo: any, id: string, token: string) => {
  try{
    await fetch(`${process.env.REACT_APP_SERVER}api/albums/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token
      },
      body: JSON.stringify({
        is_private: fileInfo?.is_private,
        num: fileInfo.num,
        user_id: fileInfo.user_id,
        title: fileInfo?.title,
        preface: fileInfo?.preface,
        data: fileInfo.data
      })
    })
  }
  catch (error:any) {
    alert(error.message);
  }
}

export const getAlbum = async (fileInfo: any, id: string, token: string) => {
  try{
    await fetch(`${process.env.REACT_APP_SERVER}api/albums/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token
      }
    })
  }
  catch (error:any) {
    alert(error.message);
  }
};

export const getUserInfo = async (id: string, token: string) => {
  try{
    await fetch(`${process.env.REACT_APP_SERVER}api/users/${id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token      
      }
    })
  }
  catch(error:any){
    alert(error);
  }
};