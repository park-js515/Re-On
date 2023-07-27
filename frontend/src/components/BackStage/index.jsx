import styled from "styled-components";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const SLayout = styled.div`
  border: 5px violet dotted;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const SWrapper = styled.div`
  border: 1px red solid;
  display: flex;
  justify-content: space-around;
  width: 80%;
`;

const BackStage = () => {
  return (
    <div>
      <SLayout>
        <SWrapper>
          <LeftSide />
          <RightSide />
        </SWrapper>
      </SLayout>
    </div>
  );
};

export default BackStage;
