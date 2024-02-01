import { useNavigate } from "react-router-dom";
import { Form, LogInDiv, InvalidBox } from "../../style/styled_LogIn";
import { useEffect, useState } from "react";
import LoginApi from "../../services/loginApi";
import TokenService from "../../utils/tokenService";
import UserService from "../../utils/userService";
import { modeNavigation } from "../../utils/modeUtils";
import CommonInput from "../../components/Input/Input";
import Logo from "../../components/Logo/Logo";
import AuthService from "../../utils/authService";
import { Button } from "../../components/Button/Button";

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

  useEffect(() => {
    if (AuthService.getAuthrization()) {
      navigate(-1);
    }
  }, []);

  return (
    <LogInDiv>
      <Logo size={7}>Bottles</Logo>
      <Form onSubmit={onSubmit}>
        <CommonInput
          type="text"
          placeholder="ID"
          value={form.id}
          name="text"
          $customStyle={{ width: "40rem", height: "50px" }}
          onChange={(e: any) => setForm({ ...form, id: e.target.value })}
        />
        <CommonInput
          type="password"
          placeholder="Pasword"
          value={form.password}
          name="text"
          $customStyle={{ width: "40rem", height: "50px" }}
          onChange={(e: any) => setForm({ ...form, password: e.target.value })}
        />
        <div>
          {identity && <InvalidBox>잘못된 회원정보입니다.</InvalidBox>}
          <Button size="standard">Login</Button>
          <Button
            variant="outlined"
            size="standard"
            onClick={() => navigate("/signup")}
          >
            sign-up
          </Button>
        </div>
      </Form>
    </LogInDiv>
  );
}

export default LogInPage;
