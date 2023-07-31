const Row = ({ children, style }) => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        ...style
      }}
    >
      {children}
    </div>
  );
};

const Col = ({ children, style }) => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        ...style
      }}
    >
      {children}
    </div>
  );
};

const RowProfile = ({ children }) => {
  return <Row
    style={{
      height: "100%",
      width: "100%",
    }}
  >
    {children}
  </Row>;
};

const Colw100 = ({ children }) => {
  return <Col
    style={{
      width: "100%",
    }}
  >
    {children}
  </Col>;
};

const RowModify = ({ children }) => {
  return <Row
    style={{
      margin: "10px 0",
      justifyContent: "end",
    }}
  >
    {children}
  </Row>;
};

const RowClose = ({ children }) => {
  return <Row
    style={{
      justifyContent: "end",
    }}
  >
    {children}
  </Row>;
};

const ColProfileImg = ({ children }) => {
  return <Col
  style={{
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
  }}
  >
    {children}
  </Col>;
};

export { Row, Col, RowProfile, RowModify, RowClose, Colw100, ColProfileImg };
