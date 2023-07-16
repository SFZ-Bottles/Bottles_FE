import React, { useState } from "react";
import { SignupState, signupPage } from "../../Atom/atom";
import { AvailableBox, C_FlexBox, CheckId, FlexBox, Form, IdLength, Input, InputDiv, PasswordLength, SignInDiv, LoginInfo, SemiTitle, Span, Title, NextButton } from "../../styled-components/styled_LogIn";
import { useRecoilState } from 'recoil';
import { checkDuplicate } from "../../services/API";
import { useNavigate } from "react-router-dom";

function GetIdPw() {
    const [signup,setSignup] = useRecoilState(SignupState);
    const [pageNum,setPageNum] = useRecoilState(signupPage);
    const [checkId, setCheckId] = useState({
        check: true,
        available: false,
        mention: ''
    });

    const clickIdCheck = async () => {
        const result = await checkDuplicate(signup.id);
        if(result){     // check -> User가 아이디 중복 체크를 하였냐? available: true면 중복검사 통과
            setCheckId({check: true, available: true, mention: 'available!'});
        }
        else{
            setCheckId({check: true, available: false, mention: 'not available!'});
        }
    };

    const onSubmit = () => {
        // if(!checkId.check || !checkId.available){    // 조건 충족시 페이지 전환
        //     setPageNum(pageNum + 1);
        // }
    }

    return(
        <SignInDiv>
            <SemiTitle>
                Welcome to Bottles!
            </SemiTitle>
            <Form onSubmit={onSubmit}>
                <InputDiv>
                    <Span>ID
                        <LoginInfo>아이디를 생성해보세요!</LoginInfo>
                    </Span>
                    <C_FlexBox>
                        <Input type="text" placeholder="ID" value={signup.id} onChange={(e: any) => setSignup({...signup, id: e.target.value})} required/>
                        <CheckId onClick={clickIdCheck}>check id</CheckId>
                    </C_FlexBox>
                    <IdLength
                    length={signup?.id.length}
                    >{signup?.id.length} / 30</IdLength>
                    {checkId?.check ?
                    <AvailableBox available={checkId.available}>
                        {checkId.mention}
                    </AvailableBox>
                    : <React.Fragment/>}
                </InputDiv>
                <InputDiv>
                    <Span>Password
                        <LoginInfo>비밀번호를 생성해보세요!</LoginInfo>
                    </Span>
                    <Input type="password" placeholder="Password" value={signup.password} onChange={(e: any) => setSignup({...signup, password: e.target.value})} required/>
                    <PasswordLength
                    length={signup?.password.length}
                    >{signup?.password.length} / 30</PasswordLength>
                </InputDiv>
            </Form>
            <NextButton onClick={() => setPageNum(2)}>({pageNum} / 3) 다음단계로</NextButton>
        </SignInDiv>
    )
}

export default GetIdPw;