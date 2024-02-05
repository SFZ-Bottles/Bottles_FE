import { signupPage } from "../../atom/atom";
import { useRecoilValue } from "recoil";
import GetIdPw from "./Components/GetIdPw";
import GetName from "./Components/GetName";
import GetIntro from "./Components/GetIntro";
import { styled } from "styled-components";
import { FlexColumnCenterCSS } from "../../style/commonStyle";

function SignUpPage() {
  const pageNumber = useRecoilValue(signupPage);

  const getPage = () => {
    switch (pageNumber) {
      case 1:
        return <GetIdPw />;
      case 2:
        return <GetName />;
      case 3:
        return <GetIntro />;
      default:
        break;
    }
  };

  return <S.Container>{getPage()}</S.Container>;
}

const S = {
  Container: styled.div`
    ${FlexColumnCenterCSS}
    width: 100%;
    min-height: 100vh;
  `,
};

export default SignUpPage;
