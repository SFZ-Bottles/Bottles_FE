import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { themeState } from "../../atom/atom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonInput from "../../components/Input/Input";
import { FlexColumnCenterCSS } from "../../styled-components/commonStyle";

function Pinpage() {
  const [password, setPassword] = useState("");
  const setTheme = useSetRecoilState(themeState);
  const navigate = useNavigate();

  useEffect(() => {
    setTheme(false);

    return () => {
      setTheme(true);
    };
  }, [setTheme]);

  return (
    <S.Container>
      <span>Welcome, Here is the other side</span>
      <CommonInput
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        customStyle={{
          width: "20rem",
        }}
      />
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
