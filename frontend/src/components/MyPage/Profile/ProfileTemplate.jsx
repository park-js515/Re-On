const ProfileOuter = ({ children }) => {
  const Div = ({ children }) => {
    return (
      <div
        style={{
          boxSizing: "border-box",
          minHeight: "300px",
          width: "100%",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        {children}
      </div>
    );
  };

  return <Div>{children}</Div>;
};

const ProfileInner = ({ children }) => {
  const Div = ({ children }) => {
    return <div
      className="bg-white"
      style={{
        borderRadius: "15px",
        maxWidth: "800px",
        minHeight: "300px",
        padding: "5px",
      }}>
      {children}
    </div>
  }

  return <Div>{children}</Div>
}

export { ProfileOuter, ProfileInner };