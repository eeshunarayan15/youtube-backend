import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home.jsx'
import Login from '../Login.jsx'
import Dashboard from '../Dashboard.jsx'
import Registration from '../Registration.jsx'
import CreateProduct from '../CreateProduct.jsx'
import Product from '../../Products/Product.jsx'
import CategoryForm from '../CategoryForm.jsx'
import UserProfile from '../UserProfile.jsx'
import AuthForm from '../AuthForm.jsx'
import UserProfileUpdate from '../UserProfileUpdate.jsx' 

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthForm/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<AuthForm />} />
      <Route path="/createproduct" element={<CreateProduct />} />
      <Route path="/products" element={<Product />} />
      <Route path='/createcategory' element={<CategoryForm />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path='/profileupdate' element={<UserProfileUpdate />} />
    </Routes>
  );
}

export default Routing