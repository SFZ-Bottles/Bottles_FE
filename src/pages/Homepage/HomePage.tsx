import React, { useState } from "react";
import Modal from "../../contents/Modal/Modal";
import { ChoiceBox, Phrase, Template, TemplateContainer } from "../../styled-components/styled_Home";
import { useRecoilState } from "recoil";
import { templateState } from "../../atom/atom";
import ModalContent from "./ModalContent";
import ListContent from "./ListContent";
import { C_FlexBox } from "../../styled-components/styled_LogIn";
import { AddButton } from "../../styled-components/styled_Modal";
function HomePage() {
    const [modalState, setModalState] = useState<any>(null);

    return(
        <React.Fragment>
            <Modal>
                <ChoiceBox>
                    <Phrase>
                        템플릿
                    </Phrase>
                    <TemplateContainer>
                        <Template onClick={() => setModalState("text")}>
                            <AddButton>+</AddButton>
                            <img src="/img/text.svg" alt="img" style={{width:"100%", height:"150px"}}/>
                        </Template>
                        <Template onClick={() => setModalState("image")}>
                            <AddButton>+</AddButton>
                            <img src="/img/image.svg" alt="img" style={{width:"100%", height:"150px"}}/>
                        </Template>
                        <Template onClick={() => setModalState("video")}>
                            <AddButton>+</AddButton>
                            <img src="/img/image.svg" alt="img" style={{width:"100%", height:"150px"}}/>
                        </Template>
                    </TemplateContainer>
                    {modalState ?
                    <Modal onClose={() => setModalState(null)}>
                        <ModalContent onClose={setModalState} modalType={modalState}/>
                    </Modal>
                    :
                    null}
                </ChoiceBox>
                <C_FlexBox>
                    <ListContent/>
                </C_FlexBox>
            </Modal>
        </React.Fragment>
    );
}

export default HomePage;