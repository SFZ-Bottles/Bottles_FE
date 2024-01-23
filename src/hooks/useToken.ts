import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { themeState } from "../atom/atom";

const useTokenAndId = () => {
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const theme = useRecoilValue(themeState);

  useEffect(() => {
    if (theme) {
      setToken(localStorage.getItem("token") ?? "");
      setId(localStorage.getItem("id") ?? "");
    } else {
      setToken(localStorage.getItem("secret_token") ?? "");
      setId(localStorage.getItem("token") ?? "");
    }
  }, [theme]);

  return [token, id];
};

export default useTokenAndId;
