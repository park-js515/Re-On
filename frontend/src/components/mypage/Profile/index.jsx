import { useEffect, useState, useRef } from "react";
import { Box1, Box2 } from "./ProfileTemplete";
import { ProfileImg, ProfileTier } from "./ProfileImg/index";
import { Nickname, Text, ImgInfo, InfoDetail, ImgModify } from "./ProfileInfo";
import { Button, ModalOverlay, ModalContent } from "./ProfileModify/index";
import {
  SRowProfileImg,
  SColProfileImg,
  SRowInfo,
  SRowModify,
  SRowClose,
  SCol,
} from "./style";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeOpen = () => {
    setIsOpen((current) => !current);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return { isOpen, changeOpen };
};

const useInput = (initialValue) => {
  const [input, setInput] = useState({
    src: initialValue,
  });

  const handleInput = (event) => {
    const file = event.target.files[0];
    setInput((current) => {return {...current, src: URL.createObjectURL(file)}})
    console.log(URL.createObjectURL(file));
  };

  return [input, handleInput];
};

const Profile = () => {
  const [pic1, setPic1] = useInput("images/aespa.jpg");

  const pic2 = {
    src: "images/medal.jpg",
  };

  const text =
    "최애의스폰지밥을먹는뚱이가잡는해파리를회쳐먹는쯔양을보고있는나를\n바라보는팀원들의따까운눈빛으로구운소시지를먹는희창이의한숨😢";

  const instagram = {
    src: "images/instagram.png",
  };

  const meta = {
    src: "images/meta.png",
  };

  const gmail = {
    src: "images/gmail.png",
  };

  const { isOpen, changeOpen } = useModal();

  const modify = {
    src: "images/modify.png",
    onClick: changeOpen,
  };

  const example = "admin@admin.kr";
  const fileInput = useRef(null);

  return (
    <>
      <Box1>
        <Box2>
          <SRowProfileImg>
            <SColProfileImg>
              <ProfileImg {...pic1}></ProfileImg>
            </SColProfileImg>
            <SCol>
              <ProfileTier {...pic2}></ProfileTier>
            </SCol>
          </SRowProfileImg>
        </Box2>

        <Nickname>주성시치</Nickname>
        <Text>{text}</Text>

        <SRowInfo>
          <ImgInfo {...instagram}></ImgInfo>
          <InfoDetail>{example}</InfoDetail>
        </SRowInfo>
        <SRowInfo>
          <ImgInfo {...meta}></ImgInfo>
          <InfoDetail>{example}</InfoDetail>
        </SRowInfo>
        <SRowInfo>
          <ImgInfo {...gmail}></ImgInfo>
          <InfoDetail>{example}</InfoDetail>
        </SRowInfo>
        <SRowModify>
          <ImgModify {...modify}></ImgModify>
        </SRowModify>
      </Box1>

      {isOpen ? (
        <ModalOverlay>
          <ModalContent>
            <SRowClose>
              <Button onClick={changeOpen}>X</Button>
            </SRowClose>
            <input
              type="file"
              accept="image/jpg, image/png, image/jpeg"
              name="profileImg"
              ref={fileInput}
              onChange={setPic1}
            ></input>
          </ModalContent>
        </ModalOverlay>
      ) : null}
    </>
  );
};

export { Profile };
