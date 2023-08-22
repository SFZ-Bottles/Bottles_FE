import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LogInPage';
import MainPage from './pages/MainPage/MainPage';
import SearchPage from './pages/SearchPage/SearchPage';
import MessagePage from './pages/MessagePage/MessagePage';
import MyAlbumsPage from './pages/MyAlbumsPage/MyAlbumsPage';
import SettingPage from './pages/SettingPage/SettingPage';

import { RecoilRoot } from 'recoil';
import SignUpPage from './pages/SignupPage/SignUpPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/home' element={<MainPage/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/message' element={<MessagePage/>}/>
          <Route path='/myAlbums' element={<MyAlbumsPage/>}/>
          <Route path='/setting' element={<SettingPage/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
