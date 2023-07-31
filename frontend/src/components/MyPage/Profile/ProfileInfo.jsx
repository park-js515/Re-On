const NickName = ({ children }) => {
  const Div = ({ children }) => {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        {children}
      </div>
    );
  };

  return <Div>{children}</Div>;
};

const StatusText = ({ children }) => {
  const Div = ({ children }) => {
    return (
      <div
        style={{
          padding: "10px",
          borderWidth: "1px",
          borderColor: "black",
          wordWrap: "break-word",
          maxWidth: "500px"
        }}
      >
        {children}
      </div>
    );
  };

  return <Div>{children}</Div>;
};

const Modify = ({ src, alt, onClick }) => {
  const Img = ({ src, alt, onClick}) => {
    return (
      <img
        style={{ height: "5vh", aspectRatio: 1, cursor: "pointer" }}
        src={src}
        alt={alt}
        onClick={onClick}
      />
    );
  };

  return <Img src={src} alt={alt} onClick={onClick} />;
};

export { NickName, StatusText, Modify };
