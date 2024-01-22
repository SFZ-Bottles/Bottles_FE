import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import {
  ChoiceBox,
  Phrase,
  Template,
  TemplateContainer,
} from "../../style/styled_Home";
import { useRecoilState } from "recoil";
import { templateState } from "../../atom/atom";
import ModalContent from "./ModalContent";
import ListContent from "./ListContent";
import { C_FlexBox } from "../../style/styled_LogIn";
import { AddButton } from "../../style/styled_Modal";

function HomePage({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [modalState, setModalState] = useState<any>(null);
  const [listNum, setListNum] = useState(0);
  const [template, setTemplate] = useRecoilState(templateState);
  useEffect(() => {
    setListNum(template.length);
  }, []);

  return (
    <React.Fragment>
      <Modal onClose={() => setState(false)}>
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
      </Modal>
    </React.Fragment>
  );
}

export default HomePage;
