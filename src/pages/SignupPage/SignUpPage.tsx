import { signupPage } from "../../Atom/atom";
import GetIdPw from "../../contents/SignUp/GetIdPw";
import GetName from "../../contents/SignUp/GetName";
import GetIntro from "../../contents/SignUp/GetIntro";
import { useRecoilValue } from "recoil";

function SignUpPage() {
    const pageNumber = useRecoilValue(signupPage);

    const getPage = () => {
        switch(pageNumber){
            case 1:
                return <GetIdPw/>;
            case 2:
                return <GetName/>;
            case 3:
                return <GetIntro/>;
            default:
                break;
        }
    }

    return(
        <>
        {getPage()}
        </>
    );
}

export default SignUpPage;