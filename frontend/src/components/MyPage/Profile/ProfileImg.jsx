import './Profile.css';

const ProfileImg = ({ src, alt }) => {
  return <img className="Profile-ProfileImg" src={src} alt={alt} />;
};

const ProfiletierImg = ({src, alt}) => {
  return <img className="Profile-ProfileTierImg" src={src} alt={alt}></img>
}

export { ProfileImg, ProfiletierImg };
