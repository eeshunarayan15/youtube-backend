import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../Home';
import About from '../About';
import MyForm from '../MyForm';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<MyForm />} />
    </Routes>
  );
}

export default Routing