import { useNavigate } from "react-router-dom";
import {
  Form,
  LogInDiv,
  Input,
  Title,
  LogInButton,
  UnderLine,
  InvalidBox,
  C_ColFlexBox,
} from "../../styled-components/styled_LogIn";
import { useEffect, useState } from "react";
import LoginApi from "../../services/loginApi";
import TokenService from "../../utils/tokenService";
import UserService from "../../utils/userService";

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
      navigate("/home/feed");
    } catch (error) {
      setIdentity(true);
    }
  };

  useEffect(() => {
    // checkToken({navigate});
  }, []);

  return (
    <LogInDiv>
      <Title>Bottles</Title>
      <Form onSubmit={onSubmit}>
        <Input
          color="default"
          type="text"
          placeholder="ID"
          value={form.id}
          onChange={(e: any) => setForm({ ...form, id: e.target.value })}
          required
        ></Input>
        <Input
          color="default"
          type="password"
          placeholder="Pasword"
          value={form.password}
          onChange={(e: any) => setForm({ ...form, password: e.target.value })}
          required
        ></Input>
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
