import { useNavigate } from "react-router-dom";
import {
  Form,
  LogInDiv,
  Title,
  LogInButton,
  UnderLine,
  InvalidBox,
  C_ColFlexBox,
} from "../../style/styled_LogIn";
import { useState } from "react";
import LoginApi from "../../services/loginApi";
import TokenService from "../../utils/tokenService";
import UserService from "../../utils/userService";
import { modeNavigation } from "../../utils/modeUtils";
import CommonInput from "../../components/Input/Input";
import Logo from "../../components/Logo/Logo";

interface ILogin {
  id: string;
  password: string;
}

function LogInPage() {
  const navigate = useNavigate();
  const [identity, setIdentity] = useState(false);
  const [form, setForm] = useState<ILogin>({
    id: "",
    password: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await LoginApi.login(form.id, form.password);
      TokenService.setToken(result.data.token);
      UserService.setUserId(form.id);
      navigate(modeNavigation("/home/feed"));
    } catch (error) {
      setIdentity(true);
    }
  };

  return (
    <LogInDiv>
      <Logo size={7}>Bottles</Logo>
      <Form onSubmit={onSubmit}>
        <CommonInput
          type="text"
          placeholder="ID"
          value={form.id}
          name="text"
          customStyle={{ height: "50px" }}
          onChange={(e: any) => setForm({ ...form, id: e.target.value })}
        />
        <CommonInput
          type="password"
          placeholder="Pasword"
          value={form.password}
          name="text"
          customStyle={{ height: "50px" }}
          onChange={(e: any) => setForm({ ...form, password: e.target.value })}
        />
        <C_ColFlexBox>
          {identity && <InvalidBox>잘못된 회원정보입니다.</InvalidBox>}
          <LogInButton>Login</LogInButton>
          <UnderLine onClick={() => navigate("/signup")}>sign-up</UnderLine>
        </C_ColFlexBox>
      </Form>
    </LogInDiv>
  );
}

export default LogInPage;
