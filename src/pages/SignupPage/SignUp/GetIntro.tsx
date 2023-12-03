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
} from "../../../styled-components/styled_LogIn";
import { useNavigate } from "react-router-dom";
import LoginApi from "../../../services/loginApi";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SignupState } from "../../../Atom/atom";

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
    <SignInDiv>
      <SemiTitle>Welcome to Bottles!</SemiTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputDiv>
          <Span>
            About you
            <LoginInfo>
              '서론'은 프로필에 표시되는 자신에 대한 소개입니다. 자유롭게
              표현해보세요!
            </LoginInfo>
          </Span>
          <C_FlexBox>
            <BigInput
              placeholder="소개 입력"
              {...register("intro", {
                required: true,
                minLength: 1,
                maxLength: 150,
              })}
            />
            {errors.intro && <p>최대 150자 까지입니다.</p>}
          </C_FlexBox>
          <IntroLegnth len={introValue.length}>
            {introValue.length} / 150
          </IntroLegnth>
        </InputDiv>
        <NextButton>Join Us</NextButton>
      </Form>
    </SignInDiv>
  );
}

export default GetIntro;
