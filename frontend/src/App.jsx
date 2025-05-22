import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Heatmap from './components/Heatmap';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login setToken={setToken} />} />
        <Route path='/dashboard' element={<Dashboard token={token} />} />
        <Route path='/activity' element={<Heatmap token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;