import './Profile.css';

const NickName = ({ children }) => {
  return <div className="Profile-NickName">{children}</div>;
};

const StatusText = ({ children }) => {
  return <div className="Profile-StatusText">{children}</div>;
};

const Modify = ({ src, alt, onClick }) => {
  const scrollTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <img
      className="Profile-Modify transition ease-in-out delay-150"
      src={src}
      alt={alt}
      onClick={() => {
        scrollTop();
        onClick();
      }}
    />
  );
};

export { NickName, StatusText, Modify };
