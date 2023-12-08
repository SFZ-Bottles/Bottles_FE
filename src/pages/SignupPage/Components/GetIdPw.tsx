import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { SignupState, signupPage } from "../../../atom/atom";
import LoginApi from "../../../services/loginApi";
import {
  CheckId,
  IdLength,
  Input,
  PasswordLength,
} from "../../../style/styled_LogIn";
import styled from "styled-components";
import { FlexCenterCSS, FlexColumnCenterCSS } from "../../../style/commonStyle";
import React from "react";

function GetIdPw() {
  const setPageNum = useSetRecoilState(signupPage);
  const [signup, setSignup] = useRecoilState(SignupState);
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      pw: "",
    },
  });

  const idValue = watch("id");
  const pwValue = watch("pw");

  const [idStatusMessage, setIdStatusMessage] = useState("");

  const checkIdClicked = async (e: any) => {
    try {
      e.stopPropagation();
      await LoginApi.checkIdDuplicated(idValue);
      setIdStatusMessage("Available!");
      clearErrors("id");
    } catch (error) {
      setError("id", {
        type: "id",
        message: "중복된 ID 입니다.",
      });
      setIdStatusMessage("");
    }
  };

  const idValidator = (value: string) => {
    if (!value) {
      return "ID는 필수 항목입니다.";
    }
    if (value.length > 30) {
      return "ID는 30자 이하여야 합니다.";
    }
    if (idStatusMessage !== "Available!") {
      return "ID가 유효하지 않습니다.";
    }
    return true;
  };
  console.log(errors);

  const onSubmit = (data: any) => {
    if (!Object.keys(errors).length && idStatusMessage) {
      setSignup({ ...signup, id: idValue, pw: pwValue });
      setPageNum(2);
    }
  };

  return (
    <S.Container>
      <span>Welcome to Bottles!</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.InputContainer>
          <span>
            ID
            <div>아이디를 생성해보세요!</div>
          </span>
          <S.InputDiv>
            <Input
              type="text"
              placeholder="ID"
              color={idValue.length > 30 || errors.id ? "red" : "default"}
              {...register("id", {
                required: true,
                maxLength: 30,
                validate: { idValidator },
              })}
            />
            <CheckId onClick={checkIdClicked}>check id</CheckId>
          </S.InputDiv>
          <IdLength len={idValue?.length || 0}>
            {idValue?.length || 0} / 30
          </IdLength>
          {errors.id ? (
            <p>{errors.id.message || "ID를 입력해주세요."}</p>
          ) : (
            <React.Fragment />
          )}
          {<p style={{ color: "blue" }}>{idStatusMessage}</p>}
        </S.InputContainer>
        <S.InputContainer>
          <span>
            Password
            <div>비밀번호를 생성해보세요!</div>
          </span>
          <Input
            type="password"
            placeholder="Password"
            color={pwValue.length > 30 || errors.pw ? "red" : "default"}
            {...register("pw", {
              required: true,
              minLength: 8,
              maxLength: 30,
            })}
          />
          <PasswordLength len={pwValue?.length || 0}>
            {pwValue?.length || 0} / 30
          </PasswordLength>
          {errors.pw ? (
            <p>비밀번호는 8자이상, 30자 이하여야 합니다.</p>
          ) : (
            <React.Fragment />
          )}
        </S.InputContainer>

        <S.ButtonDiv>
          <button type="submit">1 / 3 다음단계로</button>
        </S.ButtonDiv>
      </form>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${FlexColumnCenterCSS}
    & > :first-child {
      margin: 2rem 0;
      font-size: 6rem;
      font-weight: 700;
    }

    p {
      color: red;
      font-size: 2rem;
      padding-left: 1rem;
    }

    & > form {
      gap: 3rem;
    }
  `,

  ButtonDiv: styled.div`
    ${FlexCenterCSS}
    width: 100%;
    & > button {
      height: 4rem;
      padding: 1rem;
      border: none;
      border-radius: 2rem;
      margin-top: 6rem;
      margin-right: 5rem;
      font-size: 1.5rem;
      font-weight: 700;
      cursor: pointer;
    }
  `,

  InputContainer: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & > p {
      font-size: 1.5rem;
    }

    & > span {
      font-size: 4rem;
      font-weight: 700;
      padding: 1rem 1rem;
      & > :first-child {
        margin-top: 1rem;
        font-size: 1.5rem;
        color: #888888;
      }
    }
  `,

  InputDiv: styled.div`
    display: flex;
    justify-content: start;
  `,
};

export default GetIdPw;
