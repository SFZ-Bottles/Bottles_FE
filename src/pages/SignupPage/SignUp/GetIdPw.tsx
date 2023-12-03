import React, { useState } from "react";
import { SignupState, signupPage } from "../../../Atom/atom";
import {
  C_FlexBox,
  CheckId,
  Form,
  IdLength,
  Input,
  InputDiv,
  PasswordLength,
  SignInDiv,
  LoginInfo,
  SemiTitle,
  Span,
  NextButton,
} from "../../../styled-components/styled_LogIn";
import { useRecoilState } from "recoil";
import LoginApi from "../../../services/loginApi";
import useForm from "../../../hook/useForm";
import userValidation from "../../../utils/userValidation";

function GetIdPw() {
  const [pageNum, setPageNum] = useRecoilState(signupPage);
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { id: "", pw: "" },
    onSubmit: () => setPageNum(pageNum + 1),
    validate: userValidation,
  });
  const [idErrorMessage, setIdErrorMessage] = useState("");
  const checkIdClicked = async () => {
    if (!errors.id) {
      try {
        await LoginApi.checkIdDuplicated(values.id ?? "");
        setIdErrorMessage("Available!");
      } catch (error: any) {
        setIdErrorMessage("유효하지 않은 아이디입니다.");
      }
    }
  };

  return (
    <SignInDiv>
      <SemiTitle>Welcome to Bottles!</SemiTitle>
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <Span>
            ID
            <LoginInfo>아이디를 생성해보세요!</LoginInfo>
          </Span>
          <C_FlexBox>
            <Input
              type="text"
              placeholder="ID"
              name="id"
              value={values.id || ""}
              onChange={handleChange}
              required
            />
            <CheckId onClick={checkIdClicked}>check id</CheckId>
          </C_FlexBox>
          {values.id && (
            <IdLength len={values.id.length}>{values.id.length} / 30</IdLength>
          )}
          {idErrorMessage && <p>{idErrorMessage}</p>}
        </InputDiv>
        <InputDiv>
          <Span>
            Password
            <LoginInfo>비밀번호를 생성해보세요!</LoginInfo>
          </Span>
          <Input
            type="password"
            placeholder="Password"
            name="pw"
            value={values.pw || ""}
            onChange={handleChange}
            required
          />
          {errors.pw && <p>{errors.pw}</p>}
          {values.pw && (
            <PasswordLength len={values?.pw.length}>
              {values?.pw.length} / 30
            </PasswordLength>
          )}
        </InputDiv>
        <NextButton onClick={handleSubmit}>1 / 3 다음단계로</NextButton>
      </Form>
    </SignInDiv>
  );
}

export default GetIdPw;
