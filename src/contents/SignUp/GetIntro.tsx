import React, { useState } from "react";
import { SignupState, signupPage } from "../../Atom/atom";
import { AvailableBox, C_FlexBox, CheckId, FlexBox, Form, IdLength, Input, InputDiv, IntroLegnth, SignInDiv, LoginInfo, SemiTitle, Span, Title, NextButton, BigInput } from "../../styled-components/styled_LogIn";
import { useRecoilState } from 'recoil';
import { checkDuplicate, signUp } from "../../services/API";
import { useNavigate } from "react-router-dom";

function GetIntro() {
    const navigate = useNavigate();
    const [signup,setSignup] = useRecoilState(SignupState);
    const [pageNum,setPageNum] = useRecoilState(signupPage);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const result = await signUp(signup);
        if(result){
            alert("회원가입 성공!");
            navigate("/");
        }
    }

    return(
        <SignInDiv>
            <SemiTitle>
                Welcome to Bottles!
            </SemiTitle>
            <Form onSubmit={onSubmit}>
                <InputDiv>
                    <Span>About you
                        <LoginInfo>'서론'은 프로필에 표시되는 자신에 대한 소개입니다. 자유롭게 표현해보세요!</LoginInfo>
                    </Span>
                    <C_FlexBox>
                        <BigInput value={signup.intro} onChange={(e: any) => setSignup({...signup, intro: e.target.value})} required/>
                    </C_FlexBox>
                    <IntroLegnth
                    length={signup?.intro.length}
                    >{signup?.intro.length} / 150</IntroLegnth>
                </InputDiv>
            </Form>
            <NextButton onClick={() => setPageNum(pageNum + 1)}>Join Us</NextButton>
        </SignInDiv>
    );
}

export default GetIntro;