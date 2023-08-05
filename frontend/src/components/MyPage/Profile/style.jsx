import styled from 'styled-components';

const Row = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const RowProfile = styled(Row)`
  height: 100%;
  width: 100%;
`;

const Colw100 = styled(Col)`
  width: 100%;
  max-width: 520px;
`;

const DivModify = styled.div`
  margin: 10px 0;
  height: 100%;
  position: relative;
`;

const RowClose = styled(Row)`
  justify-content: end;
`;

const ColProfileImg = styled(Col)`
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: 280px;
  margin: 10px;
`;

const Roww100CC = styled(Row)`
  justify-content: center;
  align-items: center;
`;

const DivAbs0 = styled.div`
  position: absolute;
  bottom: 0;
`;

const ImgWrapper = styled.div`
  position: relative;
`

export {
  Row,
  Col,
  RowProfile,
  DivModify,
  RowClose,
  Colw100,
  Roww100CC,
  ColProfileImg,
  DivAbs0,
  ImgWrapper
};
