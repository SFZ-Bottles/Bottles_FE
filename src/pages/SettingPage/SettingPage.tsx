import { styled } from "styled-components";
import SideBar from "./SideBar";
import { useState } from "react";
import EditContent from "./SettingContent/EditContent";
import IntroContent from "./SettingContent/IntroContent";

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
      <SideBar pageNum={pageNum} setPageNum={setPageNum}/>
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
  `
};

export default SettingPage;