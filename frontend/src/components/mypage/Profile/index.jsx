import { useModal, useInputImg, useInputText } from "./hooks";
import { Box1, Box2 } from "./ProfileTemplete";
import { ProfileImg } from "./ProfileImg/index";
import { Nickname, StatusText, ImgModify } from "./ProfileInfo";
import {
  Modal,
  Button,
  InputImg,
  InputText,
  InputNick,
} from "./ProfileModify/index";
import {
  SRowProfile,
  SColProfileImg,
  SRowModify,
  SRowClose,
  SColw100,
} from "./style";

// 문제점
// - 디자인 -> tailwind 적용, 단순 외관 디자인 등...
// - 후에 입력에 대한 변화 -> 변수 사용 대한 구체화 필요
// - label은 아직 컴포넌트를 만들지 않았음
// - 추후 수정 사항이 많을 것으로 보임.
// - import 해올 때 as를 사용할 수 있지만 사용하지 않았음. 나중에 사용할지는 생각해봐야 할 것으로 보임.
// - 닉네임 제한이 3 ~ 16인데, 3글자 이하 입력했을 때에 대한 구체적인 대처법이 필요함.

const Profile = () => {
  const { isOpen, handleIsOpen } = useModal();

  const [Img1, setImg1] = useInputImg("images/tes.jpg");

  const message =
    "최애의스폰지밥을먹는뚱이가잡는해파리를회쳐먹는쯔양을보고있는나를\n바라보는팀원들의따까운눈빛으로구운소시지를먹는희창이의한숨😢";
  const [statusMessage, setStatusMessage] = useInputText(
    message,
    (value) => value.length <= 150,
  );

  const nick = "주성시치";
  const [nickName, setNickName] = useInputText(nick, (value) => {
    const length = value.length;
    return length <= 16;
  });

  const modify = {
    src: "images/modify.png",
    onClick: handleIsOpen,
  };

  return (
    <>
      <Box1>
        <Box2>
          <SRowProfile>
            <SColProfileImg>
              <ProfileImg {...Img1}></ProfileImg>
            </SColProfileImg>
            <SColw100>
              <Nickname>{nickName}</Nickname>
              <StatusText>{statusMessage}</StatusText>
              <SRowModify>
                <ImgModify {...modify}></ImgModify>
              </SRowModify>
            </SColw100>
          </SRowProfile>
        </Box2>
      </Box1>

      <Modal isOpen={isOpen} handleIsOpen={handleIsOpen}>
        <SRowClose>
          <Button onClick={handleIsOpen}>X</Button>
        </SRowClose>
        <label htmlFor="profileImg">이미지 변경</label>
        <InputImg onChange={setImg1}></InputImg>
        <br />
        <label htmlFor="statusText">상태메시지</label>
        <InputText
          value={statusMessage}
          onChange={setStatusMessage}
        ></InputText>
        <br />
        <label htmlFor="nickName">닉네임</label>
        <InputNick value={nickName} onChange={setNickName}></InputNick>
      </Modal>
    </>
  );
};

export { Profile };
