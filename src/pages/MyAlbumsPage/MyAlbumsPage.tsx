import React from "react";
import {
  HeaderContainer,
  HeaderItem,
  LogoutItem,
  PageContainer,
  ImageContainer,
  GrayCircle,
  UserText,
  Introduction
} from "../../styled-components/styled_Main";
import { Link, useLocation } from "react-router-dom";

const MyAlbumsPage = () => {
  const location = useLocation();

  return (
    <>
      <PageContainer>
        <GrayCircle />
        <UserText>user</UserText>
        <UserText>팔로잉 12  팔로워 14</UserText>
        <Introduction>my happy place, i love this app</Introduction>
      </PageContainer>
    </>
  );
};

export default MyAlbumsPage;
