import styled from "styled-components";

const SRanker = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RankerItem = ({ result }) => {
  return (
    <div>
      <SRanker>
        <div>{result.tier}</div>
        <div>{result.name}</div>
      </SRanker>
    </div>
  );
};

export default RankerItem;
