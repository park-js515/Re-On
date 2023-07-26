import React from "react";
import styled from "styled-components";
import TabMenu from "./TabMenu";
import Banner from "./Banner";

const FAQLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FAQ = () => {
  return (
    <div>
      <Banner />
      <FAQLayout>
        <TabMenu />
      </FAQLayout>
    </div>
  );
};

export default FAQ;
