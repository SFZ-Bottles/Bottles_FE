import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import {
  ChoiceBox,
  Phrase,
  Template,
  TemplateContainer,
} from "../../style/styled_Home";
import { useRecoilState } from "recoil";
import { albumState, templateState } from "../../atom/atom";
import ModalContent, { IAlbum } from "./ModalContent";
import ListContent from "./ListContent";
import { C_FlexBox } from "../../style/styled_LogIn";
import {
  AddButton,
  CustomButton,
  UploadButton,
} from "../../style/styled_Modal";
import AlbumApi from "../../services/albumApi";
import styled from "styled-components";
import { FlexColumnCenterCSS } from "../../style/commonStyle";
import { media } from "../../style/theme";

function HomePage({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [board, setBoard] = useRecoilState<IAlbum>(albumState);
  const [modalState, setModalState] = useState<any>(null);
  const [listNum, setListNum] = useState(0);
  const [template, setTemplate] = useRecoilState(templateState);
  useEffect(() => {
    setListNum(template.length);
  }, []);

  const uploadClick = async () => {
    const data = await AlbumApi.regist(
      { pages: template },
      { ...board, num: template.length }
    );
  };

  return (
    <Modal onClose={() => setState(false)}>
      <S.Container>
        <ChoiceBox>
          <Phrase>템플릿</Phrase>
          <TemplateContainer>
            <Template onClick={() => setModalState("cover")}>
              <AddButton>+</AddButton>
              <img
                src="/img/cover.svg"
                alt="img"
                style={{ width: "80px", height: "100px" }}
              />
            </Template>
            <Template onClick={() => setModalState("text")}>
              <AddButton>+</AddButton>
              <img
                src="/img/text.svg"
                alt="img"
                style={{ width: "80px", height: "80px" }}
              />
            </Template>
            <Template onClick={() => setModalState("image")}>
              <AddButton>+</AddButton>
              <img
                src="/img/image.svg"
                alt="img"
                style={{ width: "100px", height: "100px" }}
              />
            </Template>
            <Template onClick={() => setModalState("video")}>
              <AddButton>+</AddButton>
              <img
                src="/img/video.svg"
                alt="img"
                style={{ width: "100px", height: "100px" }}
              />
            </Template>
          </TemplateContainer>
          {modalState ? (
            <Modal onClose={() => setModalState(null)}>
              <ModalContent
                onClose={setModalState}
                modalType={modalState}
                setListNum={setListNum}
                listNum={listNum}
              />
            </Modal>
          ) : null}
        </ChoiceBox>
        <C_FlexBox>
          <ListContent />
        </C_FlexBox>
      </S.Container>
      <S.ButtonWrapper>
        <CustomButton onClick={uploadClick}>제출</CustomButton>
      </S.ButtonWrapper>
    </Modal>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    @media screen and (max-width: ${media.mobile}) {
      overflow-y: scroll;
      width: 300px;
      height: 500px;
    }
  `,
  ButtonWrapper: styled.div`
    position: absolute;
    left: 35%;
    z-index: 2;
  `,
};

export default HomePage;
