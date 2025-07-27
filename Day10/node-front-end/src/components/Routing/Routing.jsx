import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home.jsx'
import Login from '../Login.jsx'
import Dashboard from '../Dashboard.jsx'
import Registration from '../Registration.jsx'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Registration/>} />
    </Routes>
  );
}

export default Routing