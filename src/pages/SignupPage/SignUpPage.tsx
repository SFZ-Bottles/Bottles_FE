import { signupPage } from "../../Atom/atom";
import GetIdPw from "./SignUp/GetIdPw";
import GetName from "./SignUp/GetName";
import GetIntro from "./SignUp/GetIntro";
import { useRecoilValue } from "recoil";

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

  return <>{getPage()}</>;
}

export default SignUpPage;
