import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? "text-red-500" : "text-green-500"}`
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? "text-red-500" : "text-green-500"}`
        }
        to="/about"
      >
        About
      </NavLink>
    </div>
  );
};

export default Navigation;
