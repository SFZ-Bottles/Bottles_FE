import React, { useEffect, useState } from "react";
import { SignupState, signupPage } from "../../Atom/atom";
import { AvailableBox, C_FlexBox, CheckId, FlexBox, Form, IdLength, Input, InputDiv, IntroLegnth, SignInDiv, LoginInfo, SemiTitle, Span, Title, NextButton, BigInput } from "../../styled-components/styled_LogIn";
import { useRecoilState } from 'recoil';
import { checkDuplicate, signUp } from "../../services/API";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { isValidInput } from "../../context/function";

function GetIntro() {
    const navigate = useNavigate();
    const [signup,setSignup] = useRecoilState(SignupState);
    const [modal,setModal] = useState(false);

    const signupClick = async () => {
        if(isValidInput(signup.intro.length, 150)){
            const result = await signUp(signup);
        }
    };

    return(
        <SignInDiv>
            <SemiTitle>
                Welcome to Bottles!
            </SemiTitle>
            <Form>
                <InputDiv>
                    <Span>About you
                        <LoginInfo>'서론'은 프로필에 표시되는 자신에 대한 소개입니다. 자유롭게 표현해보세요!</LoginInfo>
                    </Span>
                    <C_FlexBox>
                        <BigInput value={signup.intro} onChange={(e: any) => setSignup({...signup, intro: e.target.value})} required/>
                    </C_FlexBox>
                    <IntroLegnth
                    len={signup?.intro.length}
                    >{signup?.intro.length} / 150</IntroLegnth>
                </InputDiv>
            </Form>
            <NextButton onClick={signupClick}>Join Us</NextButton>
            {modal ?
            <Modal>
                <h1>안녕하세요</h1>
            </Modal>
            : null}
        </SignInDiv>
    );
}

export default GetIntro;