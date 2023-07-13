import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import HomePage from './pages/Homepage/HomePage';
import { RecoilRoot } from 'recoil';
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogInPage/>}/>
          <Route path='/Home' element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
