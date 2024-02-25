import { SignupState, signupPage } from "../../../atom/atom";
import { Input } from "../../../style/styled_LogIn";
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
          <S.InputWrapper>
            <span>
              Name
              <div>
                이름 정보는 프로필 상단에 표시되며 이를 통해 친구와 연결될 수
                있습니다.
              </div>
            </span>
            <S.InputDiv>
              <Input
                type="text"
                color={nameValue.length > 30 || errors.name ? "red" : "default"}
                placeholder="Name"
                {...register("name", {
                  ...nameValidation(),
                })}
              />
            </S.InputDiv>
            <S.InputLength len={nameValue.length || 0}>
              {nameValue.length || 0} / 30
            </S.InputLength>
            <p>{errors?.name?.message}</p>
          </S.InputWrapper>
        </S.InputContainer>
        <S.InputContainer>
          <S.InputWrapper>
            <span>
              E-mail
              <div>
                이메일 정보는 계정정보 분실시 이용됩니다.
                <br /> 정확한 주소를 입력해 주세요.
              </div>
            </span>

            <S.InputDiv>
              <Input
                type="text"
                color={
                  emailValue.length > 30 || errors.email ? "red" : "default"
                }
                placeholder="E-mail"
                {...register("email", {
                  ...emailValidation(),
                })}
              />
            </S.InputDiv>
            <S.InputLength len={emailValue.length || 0}>
              {emailValue.length || 0} / 30
            </S.InputLength>
            <p>{errors?.email?.message}</p>
          </S.InputWrapper>
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
    width: 100dvw;
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
      width: 100%;
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
      font-size: 1.5rem;
      font-weight: 700;
      cursor: pointer;
    }
  `,

  InputWrapper: styled.div`
    position: relative;
    display: flex;
    width: 40rem;
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
  InputContainer: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
  `,

  InputLength: styled.div<{ len: number }>`
    position: absolute;
    right: 1rem;
    bottom: -1rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => (props.len < 30 ? "#888888" : "#FC7268")};
  `,

  InputDiv: styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
  `,
};

export default GetName;
