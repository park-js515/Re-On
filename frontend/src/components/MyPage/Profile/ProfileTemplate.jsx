import './Profile.css';

const ProfileOuter = ({ children }) => {
  return <div className="Profile-ProfileOuter">{children}</div>;
};

const ProfileInner = ({ children }) => {
  return <div className="Profile-ProfileInner">{children}</div>;
};

export { ProfileOuter, ProfileInner };
