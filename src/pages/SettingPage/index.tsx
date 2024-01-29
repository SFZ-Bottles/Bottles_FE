import { styled } from "styled-components";
import { useState } from "react";
import EditContent from "./Components/EditContent";
import IntroContent from "./Components/IntroContent";
import SideBar from "../../components/SideBar/SideBar";
import { media } from "../../style/theme";
import ToggleButton from "../../components/Button/ToggleButton";

const SettingPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [sideBarShow, setSideBarShow] = useState(false);
  const setContent = () => {
    if (pageNum === 1) {
      return <EditContent />;
    } else if (pageNum === 2) {
      return <IntroContent />;
    }
  };

  const onMenuClick = () => {
    setSideBarShow((prev: boolean) => !prev);
  };

  return (
    <S.SettingContainer>
      <S.SideBarWrapper $show={sideBarShow}>
        <SideBar>
          <S.MenuBar>
            <S.Content $active={pageNum === 1} onClick={() => setPageNum(1)}>
              개인정보 <br />
              편집
            </S.Content>
            <S.Content $active={pageNum === 2} onClick={() => setPageNum(2)}>
              Bottles란?
            </S.Content>
            <S.Content $active={pageNum === 3} onClick={() => setPageNum(3)}>
              SFZ란?
            </S.Content>
            <S.Content $active={pageNum === 4} onClick={() => setPageNum(4)}>
              회원탈퇴
            </S.Content>
          </S.MenuBar>
        </SideBar>
      </S.SideBarWrapper>
      <S.ContentContainer>
        <S.ToggleWrapper onClick={onMenuClick}>
          <ToggleButton />
        </S.ToggleWrapper>
        {setContent()}
      </S.ContentContainer>
    </S.SettingContainer>
  );
};

const S = {
  SettingContainer: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
  `,

  ContentContainer: styled.div`
    display: flex;
    position: relative;
    padding-top: 20px;
    padding-left: 20px;
    flex-grow: 1;
    @media screen and (max-width: ${media.mobile}) {
      min-height: 110vh;
    }
  `,

  SideBarWrapper: styled.div<{ $show: boolean }>`
    display: flex;
    width: 20%;
    position: relative;
    font-size: 2rem;
    @media screen and (max-width: ${media.mobile}) {
      width: 130px;
      font-size: 20px;
      display: ${(props) => (props.$show ? "flex" : "none")};
    }
  `,

  MenuBar: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  `,

  Content: styled.div<{ $active: boolean }>`
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: center;
    font-weight: ${(props) => (props.$active ? "600" : "400")};
    cursor: pointer;
  `,

  ToggleWrapper: styled.div`
    display: flex;
    position: fixed;
    right: 5%;
    bottom: 5%;
    @media screen and (min-width: ${media.mobile}) {
      display: none;
    }
  `,
};

export default SettingPage;
