import {
  PageContainer,
  GrayCircle,
  UserText,
  Introduction
} from "../../styled-components/styled_Main";

import { useEffect, useState } from "react";
import { getMyFollowing, getUserInfo, getMyFollower } from "../../services/API";

export interface IEdit{
  message: string;
  num: number;
  followList: any;
}

export interface IEdit2{
  id: string;
  info: string;
  email: string;
  name: string;
}

export interface IEdit3{
  message: string;
  num: number;
  followList: any;
}

const MyAlbumsPage = () => {

  const [userData, setUserData] = useState<IEdit>();
  const [userData2, setUserData2] = useState<IEdit2>();
  const [userData3, setUserData3] = useState<IEdit3>();


  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if(id && token){
        const result = await getMyFollowing();
        const result2 = await getUserInfo(id, token);
        const result3 = await getMyFollower();
      
          setUserData({...result});
          setUserData2({...result2});
          setUserData3({...result3});
          

    }
  }

useEffect(() => {
    fetchData();
},[]);

  return (
    <>
      <PageContainer>
        <GrayCircle />
        <UserText>{userData2?.name}</UserText>
        <UserText>팔로잉 {userData?.num}  팔로워 {userData3?.num}</UserText>
        <Introduction>{userData2?.info}</Introduction>
      </PageContainer>
      
    </>
  );
};

export default MyAlbumsPage;
