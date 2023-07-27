import React from "react";
import styled from "styled-components";

const SContent = styled.p`
  color: #505050;
  padding: 10px 0;
`;

const FAQContent = ({ children, isOpen }) => {
  const style = {
    display: isOpen ? "block" : "none",
  };

  return <SContent style={style}>{children}</SContent>;
};

export default FAQContent;
