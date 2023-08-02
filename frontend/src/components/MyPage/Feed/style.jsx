const Roww100 = ({ children, style }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const ColTab = ({ children, style }) => {
  return (
    <div
      style={{
        // display: "flex",
        width: '10%',
        // flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Bottom = ({ children, style }) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        left: 0,
        bottom: 0,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const ColFeedList = ({ children, style }) => {
  return (
    <div
      style={{
        width: '90%',
        margin: '15px',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const RowJscEnd = ({ children, style }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'end',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const RowJscCenter = ({ children, style }) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const RowTrimmed = ({ children, style }) => {
  return (
    <div
      style={{
        width: "640px",
        ...style,
      }}  
    >
      <div style={{}}>{children}</div>
    </div>
  );
};

export {
  Roww100,
  ColTab,
  Bottom,
  ColFeedList,
  RowJscEnd,
  RowJscCenter,
  RowTrimmed,
};
