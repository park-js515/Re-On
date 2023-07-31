import {
  SText,
  SInfoDetail,
  SNickname,
  SImgInfo,
  SImgModify,
} from "./style";

const Nickname = ({ children }) => {
  return <SNickname>{children}</SNickname>;
};

const StatusText = ({ children }) => {
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

export { Nickname, StatusText, ImgInfo, InfoDetail, ImgModify };
