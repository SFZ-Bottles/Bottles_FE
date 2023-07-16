import React, { useState } from "react";
import { SignupState, signupPage } from "../../Atom/atom";
import { AvailableBox, C_FlexBox, CheckId, FlexBox, Form, IdLength, Input, InputDiv, PasswordLength, SignInDiv, LoginInfo, SemiTitle, Span, Title, NextButton } from "../../styled-components/styled_LogIn";
import { useRecoilState } from 'recoil';
import { checkDuplicate } from "../../services/API";
import { useNavigate } from "react-router-dom";

function GetName() {
    const [signup,setSignup] = useRecoilState(SignupState);
    const [pageNum,setPageNum] = useRecoilState(signupPage);

    return(
        <SignInDiv>
            <SemiTitle>
                Welcome to Bottles!
            </SemiTitle>
            <Form>
                <InputDiv>
                    <Span>Name
                        <LoginInfo>이름 정보는 프로필 상단에 표시되며 이를 통해 친구와 연결될 수 있습니다.</LoginInfo>
                    </Span>
                    <C_FlexBox>
                        <Input type="text" placeholder="Name" value={signup.name} onChange={(e: any) => setSignup({...signup, name: e.target.value})} required/>
                    </C_FlexBox>
                    <PasswordLength
                    length={signup?.id.length}
                    >{signup?.name.length} / 30</PasswordLength>
                </InputDiv>
                <InputDiv>
                    <Span>E-mail
                        <LoginInfo>이메일 정보는 계정정보 분실시 이용됩니다. 정확한 주소를 입력해 주세요.</LoginInfo>
                    </Span>
                    <Input type="password" placeholder="E-mail" value={signup.email} onChange={(e: any) => setSignup({...signup, email: e.target.value})} required/>
                    <PasswordLength
                    length={signup?.password.length}
                    >{signup?.email.length} / 30</PasswordLength>
                </InputDiv>
            </Form>
            <NextButton onClick={() => setPageNum(pageNum + 1)}>({pageNum} / 3) 다음단계로</NextButton>
        </SignInDiv>
    )
}

export default GetName;