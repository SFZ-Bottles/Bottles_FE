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
  console.log(signup);
  const onSubmit = (data: any) => {
    if (!Object.keys(errors).length) {
      setSignup({ ...signup, name: nameValue, email: emailValue });
      setPageNum(3);
    }
  };

  return (
    <SignInDiv>
      <SemiTitle>Welcome to Bottles!</SemiTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputDiv>
          <Span>
            Name
            <LoginInfo>
              이름 정보는 프로필 상단에 표시되며 이를 통해 친구와 연결될 수
              있습니다.
            </LoginInfo>
          </Span>
          <Input
            type="text"
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
        </InputDiv>
        <InputDiv>
          <Span>
            E-mail
            <LoginInfo>
              이메일 정보는 계정정보 분실시 이용됩니다. 정확한 주소를 입력해
              주세요.
            </LoginInfo>
          </Span>
          <Input
            type="text"
            placeholder="E-mail"
            {...register("email", {
              required: true,
              maxLength: 30,
              minLength: 2,
            })}
          />
          {errors.email && <p>정확한 형식에 맞춰주세요</p>}
          <PasswordLength len={emailValue.length || 0}>
            {emailValue.length || 0} / 30
          </PasswordLength>
        </InputDiv>
        <NextButton>(2 / 3) 다음단계로</NextButton>
      </Form>
    </SignInDiv>
  );
}

export default GetName;
