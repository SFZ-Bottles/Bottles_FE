interface IUserInfo{
  id: string;
  password: string;
  email: string;
  intro: string;
}

export const signIn = async (ID: string, Password: string) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/auth/login/`, {
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
        return response;
    } catch (error:any) {
        console.log(error.message);
    }
};

export const signUp = async (userInfo: IUserInfo) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/auth/login/`, {
            method: 'POST',
            body: JSON.stringify({
              id: userInfo.id,
              pw: userInfo.password,
              email: userInfo.email,
              intro: userInfo.intro
            }),
            headers: {
              'Content-Type': 'application/json',
              Accept: "application/json",
            }
        })
        return (response.status === 200 ? true : false);
    } catch (error:any) {
        alert(error.message);
    }
};

export const checkDuplicate = async (ID: string) => {
  try{
      const response = await fetch(`${process.env.REACT_APP_SERVER}/api/users/check-duplicate-id/${ID}`, {
          method: 'POST',
          body: JSON.stringify({
            id: ID
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
          }
      })
      return (response.status === 200 ? true : false);
  } catch (error:any) {
      alert(error.message);
  }
};