import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LogInPage';
import { RecoilRoot, useRecoilState } from 'recoil';
import SignUpPage from './pages/SignupPage/SignUpPage';
import MainPage from './pages/MainPage/MainPage';
import SearchPage from './pages/SearchPage/SearchPage';
import MessagePage from './pages/MessagePage/MessagePage';
import MyAlbumsPage from './pages/MyAlbumsPage/MyAlbumsPage';
import SettingPage from './pages/SettingPage/SettingPage';
import HomeModal from './pages/HomeModal/HomeModal';
import FeedPage from './pages/FeedPage/FeedPage';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styled-components/theme';
import { themeState } from './atom/atom';


function App() {
  const [themeMode, setThemeMode] = useRecoilState(themeState);
  let theme = themeMode ? lightTheme : darkTheme;
  console.log(theme.color.bgColor);
  
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/home' element={<MainPage/>}>
              <Route path='/home/search' element={<SearchPage/>}/>
              <Route path='/home/message' element={<MessagePage/>}/>
              <Route path='/home/myAlbums' element={<MyAlbumsPage/>}/>
              <Route path='/home/setting' element={<SettingPage/>}/>
              <Route path='/home/modal' element={<HomeModal/>}/>
              <Route path='/home/feed' element={<FeedPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
