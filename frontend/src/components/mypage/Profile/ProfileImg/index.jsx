import { SImgProfile, SImgTier } from "./style";

const ProfileImg = ({ src }) => {
  return <SImgProfile src={src}></SImgProfile>;
};

const ProfileTier = ({ src }) => {
  return <SImgTier src={src}></SImgTier>;
};

export { ProfileImg, ProfileTier };
