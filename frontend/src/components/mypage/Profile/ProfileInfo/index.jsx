import {
  SText,
  SInfoDetail,
  SNickname,
  SImgInfo,
  SImgModify,
} from "./style.js";

const Nickname = ({ children }) => {
  return <SNickname>{children}</SNickname>;
};

const Text = ({ children }) => {
  return <SText>{children}</SText>;
};

const ImgInfo = ({ src }) => {
  return <SImgInfo src={src}></SImgInfo>;
};

const InfoDetail = ({ children }) => {
  return <SInfoDetail>{children}</SInfoDetail>;
};

const ImgModify = ({ src, onClick }) => {
  return <SImgModify src={src} onClick={() => {onClick()}}></SImgModify>;
};

export { Nickname, Text, ImgInfo, InfoDetail, ImgModify };
