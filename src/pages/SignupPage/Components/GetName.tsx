import { SignupState, signupPage } from "../../../atom/atom";
import { Input, PasswordLength } from "../../../style/styled_LogIn";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { FlexCenterCSS, FlexColumnCenterCSS } from "../../../style/commonStyle";
import { emailValidation, nameValidation } from "../../../utils/validation";
import { media } from "../../../style/theme";
import { Button } from "../../../components/Button/Button";

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
              ...nameValidation(),
            })}
          />
          <p>{errors?.name?.message}</p>
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
              ...emailValidation(),
            })}
          />
          <PasswordLength len={emailValue.length || 0}>
            {emailValue.length || 0} / 30
          </PasswordLength>
          <p>{errors?.email?.message}</p>
        </S.InputContainer>
        <S.ButtonDiv>
          <Button>(2 / 3) 다음단계로</Button>
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
  `,
};

export default GetName;
