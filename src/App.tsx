import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogInPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
