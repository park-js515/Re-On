import styled, { keyframes } from "styled-components";

import PlayButton from "./PlayButton";
import RankerList from "./RankerList";

const SslideFromLeft = keyframes`
  from {
    transform: translateX(150%);
  }
  to {
    transform: translateX(0);
  }
`;

const SRighttLayout = styled.div`
  border: black 1px solid;
  height: 100vh;
  /* width: 60%; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  animation: ${SslideFromLeft} 1s ease-out;
`;

const RightSide = () => {
  return (
    <div>
      <SRighttLayout>
        <RankerList />
        <PlayButton />
      </SRighttLayout>
    </div>
  );
};

export default RightSide;
