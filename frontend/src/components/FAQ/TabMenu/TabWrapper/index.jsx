import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const SButton = styled.button`
  padding: 30px;
  border: white 1px solid;
  border-radius: 5px;
  background-color: #b9ceac;
  background-color: ${(props) => (props.selected ? "#9aac8f" : "#b9ceac")};
  color: white;
  cursor: pointer;
  font-size: 30px;
  width: 200px;

  &:hover {
    background-color: #9aac8f;
  }
`;

const TabWrapper = ({ setSelectedTab, faqData, selectedTab }) => {
  const tabs = [...new Set(faqData.map((item) => item.category))];
  tabs.unshift("전체");

  return (
    <Wrapper>
      {tabs.map((tab, index) => (
        <SButton
          key={index}
          onClick={() => setSelectedTab(tab)}
          selected={selectedTab === tab}
        >
          {tab}
        </SButton>
      ))}
    </Wrapper>
  );
};

export default TabWrapper;
