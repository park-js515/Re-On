import React, { useState } from "react";
import styled from "styled-components";
import FAQTitle from "./FAQTitle";
import FAQContent from "./FAQContent";

const SItem = styled.div`
  border-bottom: 1px solid #b9ceac;
`;

const SLeftIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const SRightIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const STitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FAQItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SItem>
      <FAQTitle onClick={() => setIsOpen(!isOpen)}>
        <STitleWrapper>
          <div>
            {isOpen ? (
              <SLeftIcon src="image/FAQ/answer.png" alt="Answer Icon" />
            ) : (
              <SLeftIcon src="image/FAQ/question.png" alt="Question Icon" />
            )}
            {title}
          </div>
          <div>
            {isOpen ? (
              <SRightIcon src="image/FAQ/arrowup.png" alt="Up Arrow Icon" />
            ) : (
              <SRightIcon src="image/FAQ/arrowdown.png" alt="Down Arrow Icon" />
            )}
          </div>
        </STitleWrapper>
      </FAQTitle>
      <FAQContent isOpen={isOpen}>{content}</FAQContent>
    </SItem>
  );
};

export default FAQItem;
