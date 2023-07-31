import * as Template from "./ProfileTemplate";
import * as Img from "./ProfileImg";
import * as Info from "./ProfileInfo";
import * as Modify from "./ProfileModifiy";
import * as hooks from "./hooks";
import * as Sty from "./style";

const Profile = () => {
  const { isOpen, handleIsOpen } = hooks.useModal();
  const [Img1, setImg1] = hooks.useInputImg("images/MyPage/0001.jpg");
  const message =
    "최애의스폰지밥을먹는뚱이가잡는해파리를회쳐먹는쯔양을보고있는나를\n바라보는팀원들의따까운눈빛으로구운소시지를먹는희창이의한숨😢";
  const [statusMessage, setStatusMessage] = hooks.useInputText(
    message,
    (value) => value.length <= 150
  );
  const [nickName, setNickName] = hooks.useInputText(
    "주성시치",
    (value) => value.length <= 16
  );
  const modify = {
    src: "images/MyPage/modify.png",
    onClick: handleIsOpen,
  };

  return (
    <>
      <Template.ProfileOuter>
        <Template.ProfileInner>
          <Sty.RowProfile>
            <Sty.ColProfileImg>
              <Img.ProfileImg {...Img1}></Img.ProfileImg>
            </Sty.ColProfileImg>
            <Sty.Colw100>
              {nickName.length < 3 ? (
                <Info.NickName>3글자+</Info.NickName>
              ) : (
                <Info.NickName>{nickName}</Info.NickName>
              )}
              <Info.StatusText>{statusMessage}</Info.StatusText>
              <Sty.RowModify>
                <Info.Modify {...modify}></Info.Modify>
              </Sty.RowModify>
            </Sty.Colw100>
          </Sty.RowProfile>
        </Template.ProfileInner>
      </Template.ProfileOuter>

      <Modify.Modal isOpen={isOpen} handleIsOpen={handleIsOpen}>
        <Sty.RowClose>
        <Modify.Button onClick={handleIsOpen}>X</Modify.Button>
        </Sty.RowClose>
        <label htmlFor="profileImg">이미지 변경</label>
        <Modify.InputImg onChange={setImg1}></Modify.InputImg>
        <br />
        <label htmlFor="statusText">상태메시지</label>
        <Modify.InputText value={statusMessage} onChange={setStatusMessage}></Modify.InputText>
        <br />
        <label htmlFor="nickName">닉네임</label>
        <Modify.InputNick value={nickName} onChange={setNickName}></Modify.InputNick>
      </Modify.Modal>
    </>
  );
};

export { Profile };