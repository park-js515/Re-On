import React from "react";
import styled from "styled-components";

const STitle = styled.h2`
  cursor: pointer;
`;

const FAQTitle = ({ children, onClick }) => {
  return <STitle onClick={onClick}>{children}</STitle>;
};

export default FAQTitle;
