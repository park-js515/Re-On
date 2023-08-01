const NickName = ({ children }) => {
  const Div = ({ children }) => {
    return (
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bolder",
          fontSize: "1.75rem",
          height: "3rem",

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
          width: "500px",
          borderRadius: "5px",
        }}
      >
        {children}
      </div>
    );
  };

  return <Div>{children}</Div>;
};

const Modify = ({ src, alt, onClick }) => {
  const Img = ({ src, alt, onClick }) => {
    const scrollTop = () => {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    };

    return (
      <img
        className="hover:bg-gray-300 transition ease-in-out delay-150"
        style={{ height: "5vh", aspectRatio: 1, cursor: "pointer", borderRadius: "5px" }}
        src={src}
        alt={alt}
        onClick={() => { scrollTop(); onClick(); }}
      />
    );
  };

  return <Img src={src} alt={alt} onClick={onClick} />;
};

export { NickName, StatusText, Modify };
