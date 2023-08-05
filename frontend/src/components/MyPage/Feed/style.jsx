import styled from 'styled-components';

const Roww100 = styled.div`
  display: flex;
  width: 100%;
`;

const ColTab = styled.div`
  width: 10%;
`;

const Bottom = styled.div`
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

const ColFeedList = styled.div`
  width: 90%;
  margin: 15px;
`;

const RowJscEnd = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

const RowJscCenter = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const RowTrimmed = styled.div`
  width: 640px;
`;

export {
  Roww100,
  ColTab,
  Bottom,
  ColFeedList,
  RowJscEnd,
  RowJscCenter,
  RowTrimmed,
};
