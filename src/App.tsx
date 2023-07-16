import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LogInPage';
import HomePage from './pages/Homepage/HomePage';
import { RecoilRoot } from 'recoil';
import SignUpPage from './pages/SignupPage/SignUpPage';
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
