import {
  C_FlexBox,
  Form,
  InputDiv,
  IntroLegnth,
  SignInDiv,
  LoginInfo,
  SemiTitle,
  Span,
  NextButton,
  BigInput,
} from "../../../style/styled_LogIn";
import { useNavigate } from "react-router-dom";
import LoginApi from "../../../services/loginApi";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SignupState } from "../../../atom/atom";
import { styled } from "styled-components";
import { FlexCenterCSS, FlexColumnCenterCSS } from "../../../style/commonStyle";

function GetIntro() {
  const navigate = useNavigate();
  const [signup, setSignup] = useRecoilState(SignupState);
  console.log(signup);
  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
  } = useForm({
    defaultValues: {
      intro: "",
    },
  });
  const introValue = watch("intro");

  const onSubmit = async () => {
    if (!errors.intro) {
      console.log({ ...signup, intro: introValue });
      await LoginApi.signUp({ ...signup, info: introValue });
      navigate("/");
    }
  };

  return (
    <S.Container>
      <span>Welcome to Bottles!</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.InputContainer>
          <span>
            About you
            <div>
              '서론'은 프로필에 표시되는 자신에 대한 소개입니다. 자유롭게
              표현해보세요!
            </div>
          </span>
          <S.InputDiv>
            <BigInput
              placeholder="소개 입력"
              {...register("intro", {
                required: true,
                minLength: 1,
                maxLength: 150,
              })}
            ></BigInput>
          </S.InputDiv>
          {errors.intro && <p>최소 1자, 최대 150자 까지입니다.</p>}
          <IntroLegnth len={introValue.length}>
            {introValue.length} / 150
          </IntroLegnth>
        </S.InputContainer>
        <S.ButtonDiv>
          <button type="submit">Join Us</button>
        </S.ButtonDiv>
      </form>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${FlexColumnCenterCSS}

    p {
      color: red;
      font-size: 2rem;
    }

    & > :first-child {
      font-size: 6rem;
      font-weight: 700;
      margin: 2rem 0;
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

export default GetIntro;
