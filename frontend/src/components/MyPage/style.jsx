const Row = ({ children, style }) => {
  return (
    <div
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Roww100 = ({ children, style }) => {
  return <Row style={{ ...style }}>{children}</Row>;
};

const SSticky = ({ children, style }) => {
  return (
    <Roww100
      style={{
        overflowY: "scroll",
        height: "100vh",
        ...style,
      }}
    >
      {children}
    </Roww100>
  );
};

export { Row, Roww100, SSticky };
