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
import { media } from "../../../style/theme";
import { idValidation } from "../../../utils/validation";
import { Button } from "../../../components/Button/Button";

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

  const onSubmit = () => {
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
            <div>아이디를 입력 후, 중복검사를 해주세요!</div>
          </span>
          <S.IdWrapper>
            <Input
              type="text"
              placeholder="ID"
              color={idValue.length > 30 || errors.id ? "red" : "default"}
              {...register("id", {
                ...idValidation(idStatusMessage),
              })}
            />
            <CheckId onClick={checkIdClicked}>check id</CheckId>
          </S.IdWrapper>
          <IdLength len={idValue?.length || 0}>
            {idValue?.length || 0} / 30
          </IdLength>
          {errors.id && <p>{errors.id.message || "ID를 입력해주세요."}</p>}
          {<p style={{ color: "blue" }}>{idStatusMessage}</p>}
        </S.InputContainer>
        <S.InputContainer>
          <span>
            Password
            <div>비밀번호를 입력해주세요!</div>
          </span>
          <S.InputDiv>
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
          </S.InputDiv>
          <S.InputLength len={pwValue?.length || 0}>
            {pwValue?.length || 0} / 30
          </S.InputLength>
          {errors.pw && <p>비밀번호는 8자이상, 30자 이하여야 합니다.</p>}
        </S.InputContainer>
        <S.ButtonDiv>
          <Button>1 / 3 다음단계로</Button>
        </S.ButtonDiv>
      </form>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    ${FlexColumnCenterCSS}
    & > :first-child {
      ${FlexCenterCSS};
      margin: 2rem 0;
      font-size: 6rem;
      font-weight: 500;
      text-align: center;
      @media screen and (max-width: ${media.tablet}) {
        font-size: 4rem;
      }
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
      font-weight: 500;
      padding: 1rem 1rem;
      & > :first-child {
        margin-top: 1rem;
        font-size: 1.5rem;
        color: #888888;
      }
    }

    @media screen and (max-width: ${media.mobile}) {
      padding: 0 1rem;
    }
  `,

  InputDiv: styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
  `,
  IdWrapper: styled.div`
    position: relative;
    padding: 0 1rem;
    & > :last-child {
      position: absolute;
    }
  `,
  InputLength: styled.div<{ len: number }>`
    position: absolute;
    right: 0;
    bottom: -2rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => (props.len < 30 ? "#888888" : "#FC7268")};
  `,
};

export default GetIdPw;
