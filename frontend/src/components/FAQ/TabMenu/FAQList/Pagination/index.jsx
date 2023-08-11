import React from "react";
import styled from "styled-components";

const SButton = styled.button`
  margin: 0 5px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => (props.$isActive ? "#b9ceac" : "#f0f0f0")};
  cursor: pointer;
  
  &:hover {
    background-color: #b9ceac;
  }

  &:active {
    background-color: #b9ceac;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Pagenation = ({ totalPages, handleClick, currentPage }) => {
  return (
    <PaginationWrapper>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <SButton
          key={page}
          onClick={(event) => handleClick(event, page)}
          $isActive={page === currentPage}
        >
          {page}
        </SButton>
      ))}
    </PaginationWrapper>
  );
};

export default Pagenation;
