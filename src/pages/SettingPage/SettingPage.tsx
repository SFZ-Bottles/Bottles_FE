import { styled } from "styled-components";
import { useState } from "react";
import EditContent from "./SettingContent/EditContent";
import IntroContent from "./SettingContent/IntroContent";
import SideBar from "../../components/SideBar/SideBar";

const SettingPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const setContent = () => {
    if(pageNum === 1){
      return <EditContent/>
    }
    else if(pageNum === 2){
      return <IntroContent/>
    }
  }

  return (
    <S.SettingContainer>
      <SideBar>
        <S.MenuBar>
          <S.Content
          active={pageNum === 1}
          onClick={() => setPageNum(1)}>
            개인정보 편집
          </S.Content>
          <S.Content
          active={pageNum === 2}
          onClick={() => setPageNum(2)}>
             Bottles란?
          </S.Content>
          <S.Content
          active={pageNum === 3}
          onClick={() => setPageNum(3)}>
            SFZ란?
          </S.Content>
          <S.Content
          active={pageNum === 4}
          onClick={() => setPageNum(4)}>
            회원탈퇴
          </S.Content>
          </S.MenuBar>
      </SideBar>
      <S.ContentContainer>
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
    padding-top: 20px;
    padding-left: 300px;
  `,
  
  MenuBar: styled.div`
        display: flex;
        width: 270px;
        flex-direction: column;
        align-items: center;
    `,

    Content: styled.div<{active: boolean}>`
        display: flex;
        width: 100%;
        font-size: 2rem;
        height: 100px;
        justify-content: center;
        font-weight: ${(props) => props.active ? "600" : "400"};
        cursor: pointer;
    `
};

export default SettingPage;