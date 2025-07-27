import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="bg-zinc-800 p-4 flex justify-between items-center">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/login"}>Login</NavLink>
      <NavLink to={"/register"}>Register</NavLink>
      <NavLink to={"/dashboard"}>Dashboard</NavLink>
    </div>
  );
}

export default Navigation