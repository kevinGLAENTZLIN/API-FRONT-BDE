import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/login.js';
import Navbar from './component/navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Navbar/>} />
        <Route path="/dashboard/admin" element={<Navbar/>} />
        <Route path="/dashboard/inventaire" element={<Navbar/>} />
        <Route path="/dashboard/documents" element={<Navbar/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;