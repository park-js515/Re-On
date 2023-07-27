import styled, { keyframes } from "styled-components";
import UserInfo from "./UserInfo";
import RecentGameList from "./RecentGameList";

const SslideFromLeft = keyframes`
  from {
    transform: translateX(-150%);
  }
  to {
    transform: translateX(0);
  }
`;

const SLeftLayout = styled.div`
  border: black 1px solid;
  height: 100vh;
  /* width: 60%; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  animation: ${SslideFromLeft} 0.5s ease-in-out;
`;

const LeftSide = () => {
  return (
    <div>
      <SLeftLayout>
        <UserInfo />
        <RecentGameList />
      </SLeftLayout>
    </div>
  );
};

export default LeftSide;
