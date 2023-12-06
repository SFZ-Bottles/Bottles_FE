import { signupPage } from "../../atom/atom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import GetIdPw from "./Components/GetIdPw";
import GetName from "./Components/GetName";
import GetIntro from "./Components/GetIntro";

function SignUpPage() {
  const [pageNumber, setPageNumber] = useRecoilState(signupPage);

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

  return <>{getPage()}</>;
}

export default SignUpPage;
