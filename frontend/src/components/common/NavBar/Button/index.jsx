import React from "react";
import { SButton } from "./style";
import { useNavigate, useLocation } from "react-router-dom";

const Button = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <SButton onClick={handleClick} className={isActive ? "active" : ""}>
      {children}
    </SButton>
  );
};

export default Button;
