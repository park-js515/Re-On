import React from "react";
import styled from "styled-components";
import TabMenu from "./TabMenu";
import Banner from "./Banner";
import Banner2 from "./Banner2";
import { Container } from '@mui/system';

const FAQLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FAQ = () => {
  return (
    <div>
      {/* <Banner /> */}
      <Container>
      
      </Container>
        <Banner2/>
      <FAQLayout>
        <TabMenu />
      </FAQLayout>
    </div>
  );
};

export default FAQ;
