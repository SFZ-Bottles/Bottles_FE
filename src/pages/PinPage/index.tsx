import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { themeState } from "../../atom/atom";
import { useEffect, useState } from "react";
import CommonInput from "../../components/Input/Input";
import { FlexColumnCenterCSS } from "../../style/commonStyle";
import LoginApi from "../../services/loginApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Pinpage() {
  const naviagte = useNavigate();
  const [password, setPassword] = useState("");
  const setTheme = useSetRecoilState(themeState);
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pw: "",
    },
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await LoginApi.loginSecretMode(password);
      console.log(response.data);
      localStorage.setItem("secret_token", response.data.token);
      localStorage.setItem("secret_id", response.data.id);
      setTheme(false);
      naviagte("/home/feed");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const secretToken = localStorage.getItem("secret_token");
    if (secretToken) {
      localStorage.removeItem("secret_token");
      localStorage.removeItem("secret_id");
      setTheme(true);
      naviagte("/home/feed", { replace: true });
      return;
    } else {
      setTheme(false);
      localStorage.setItem("theme", "public");
    }
  }, []);

  return (
    <S.Container>
      <span>Welcome, Here is the other side</span>
      <form onSubmit={onSubmit}>
        <CommonInput
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          customStyle={{
            width: "20rem",
          }}
        />
      </form>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${FlexColumnCenterCSS}
    padding-top: 5rem;
    color: ${(props) => props.theme.color.fontColor};
    font-size: 2rem;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.bgColor};
    gap: 5rem;
  `,
};

export default Pinpage;
