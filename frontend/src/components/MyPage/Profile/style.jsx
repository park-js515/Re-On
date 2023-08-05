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
      // width: "100%",
      maxWidth: "520px"
    }}
  >
    {children}
  </Col>;
};

const DivModify = ({ children }) => {
  return <div
    style={{
      margin: "10px 0",
      height: "100%",
      position: "relative"
    }}
  >
    {children}
  </div>;
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
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    width: "280px", 
    margin: "10px",
  }}
  >
    {children}
  </Col>;
};

const Rolw100CC = ({children}) => {
  return <Row
  style={{
    justifyContent: "center",
    alignItems: "center"
  }}
  >{children}</Row>
}

const DivAbs0 = ({children, style}) => {
  return <div style={{
    position: "absolute",
    bottom: 0,
  }}>{children}</div>
}

export { Row, Col, RowProfile, DivModify, RowClose, Colw100, Rolw100CC, ColProfileImg, DivAbs0 };
