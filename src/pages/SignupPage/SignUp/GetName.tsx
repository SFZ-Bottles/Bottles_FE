import { SignupState, signupPage } from "../../../Atom/atom";
import {
  Form,
  Input,
  InputDiv,
  PasswordLength,
  SignInDiv,
  LoginInfo,
  SemiTitle,
  Span,
  NextButton,
} from "../../../styled-components/styled_LogIn";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import {
  FlexCenterCSS,
  FlexColumnCenterCSS,
} from "../../../styled-components/commonStyle";

function GetName() {
  const setPageNum = useSetRecoilState(signupPage);
  const [signup, setSignup] = useRecoilState(SignupState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const nameValue = watch("name");
  const emailValue = watch("email");

  const onSubmit = (data: any) => {
    if (!Object.keys(errors).length) {
      setSignup({ ...signup, name: nameValue, email: emailValue });
      setPageNum(3);
    }
  };

  return (
    <S.Container>
      <span>Welcome to Bottles!</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.InputContainer>
          <span>
            Name
            <div>
              이름 정보는 프로필 상단에 표시되며 이를 통해 친구와 연결될 수
              있습니다.
            </div>
          </span>
          <Input
            type="text"
            color={nameValue.length > 30 || errors.name ? "red" : "default"}
            placeholder="Name"
            {...register("name", {
              required: true,
              maxLength: 30,
              minLength: 2,
            })}
          />
          {errors.name && <p>이름은 2글자 이상, 30글자 이하입니다.</p>}
          <PasswordLength len={nameValue.length || 0}>
            {nameValue.length || 0} / 30
          </PasswordLength>
        </S.InputContainer>
        <S.InputContainer>
          <span>
            E-mail
            <div>
              이메일 정보는 계정정보 분실시 이용됩니다. 정확한 주소를 입력해
              주세요.
            </div>
          </span>
          <Input
            type="text"
            color={emailValue.length > 30 || errors.email ? "red" : "default"}
            placeholder="E-mail"
            {...register("email", {
              required: true,
              maxLength: 30,
              minLength: 2,
            })}
          />
          <PasswordLength len={emailValue.length || 0}>
            {emailValue.length || 0} / 30
          </PasswordLength>
          {errors.email && <p>정확한 형식에 맞춰주세요</p>}
        </S.InputContainer>
      </form>
      <S.ButtonDiv>
        <button type="submit">(2 / 3) 다음단계로</button>
      </S.ButtonDiv>
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
      margin-top: 5rem;
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

    & > p {
      font-size: 1.5rem;
    }

    & > span {
      font-size: 4rem;
      font-weight: 700;
      padding: 1rem 1rem;
      & > :first-child {
        font-size: 1.5rem;
        color: #888888;
      }
    }
  `,
};

export default GetName;
