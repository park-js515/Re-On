const ProfileImg = ({ src, alt }) => {
  const Img = ({ src, alt }) => {
    return (
      <img
        src={src}
        style={{
          boxSizing: "border-box",
          height: "266px",
          aspectRatio: 1,
          // borderRadius: "100%",
        }}
        alt={alt}
      />
    );
  };

  return <Img src={src} alt={alt} />;
};

export {ProfileImg}