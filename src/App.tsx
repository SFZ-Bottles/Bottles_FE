import { RouterProvider } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styled-components/theme";
import { themeState } from "./atom/atom";
import GlobalStyle from "./styled-components/global";
import { router } from "./router/router";

function App() {
  const themeMode = useRecoilValue(themeState);
  let theme = themeMode ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
