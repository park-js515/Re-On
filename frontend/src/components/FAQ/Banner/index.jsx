import React from "react";
import styled from "styled-components";

const SBanner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #b9ceac;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100px;
  font-size: 50px;
  color: white;
`;

const SLine = styled.hr`
  width: 90%;
  margin: 30px auto;
  border: none;
  border-top: 2px solid lightgray;
`;

const SImage = styled.img`
  height: 80px; // 원하는 크기로 설정
`;

const Banner = () => {
  return (
    <div>
      <SBanner>
        FAQ
        <SImage src="image/character/Towa.png" alt="towa" />
      </SBanner>
      <SLine />
    </div>
  );
};

export default Banner;
