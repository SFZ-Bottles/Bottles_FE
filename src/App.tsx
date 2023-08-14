import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LogInPage';
import { RecoilRoot } from 'recoil';
import SignUpPage from './pages/SignupPage/SignUpPage';
import MainPage from './pages/MainPage/MainPage';
import SearchPage from './pages/SearchPage/SearchPage';
import MessagePage from './pages/MessagePage/MessagePage';
import MyAlbumsPage from './pages/MyAlbumsPage/MyAlbumsPage';
import SettingPage from './pages/SettingPage/SettingPage';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/home' element={<MainPage/>}>
            <Route path='/home/search' element={<SearchPage/>}/>
            <Route path='/home/message' element={<MessagePage/>}/>
            <Route path='/home/myAlbums' element={<MyAlbumsPage/>}/>
            <Route path='/home/setting' element={<SettingPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
