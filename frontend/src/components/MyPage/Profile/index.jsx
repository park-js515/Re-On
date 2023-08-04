import * as Template from './ProfileTemplate';
import * as Img from './ProfileImg';
import * as Info from './ProfileInfo';
import * as Modify from './ProfileModifiy';
import * as hooks from './hooks';
import * as Sty from './style';

const Profile = () => {
  const { isOpen, handleIsOpen } = hooks.useModal();
  const [Img1, setImg1] = hooks.useInputImg('images/MyPage/0001.jpg');
  const message =
    '네이버 이메일, 티어, 티어-프로그레스바, 수정기능: onchange -> onSubmit, 회원탈퇴, 기타 alert...';
  const [statusMessage, setStatusMessage] = hooks.useInputText(
    message,
    (value) => value.length <= 150,
  );
  const [nickName, setNickName] = hooks.useInputText(
    '주성시치',
    (value) => value.length <= 16,
  );
  const modify = {
    src: 'images/MyPage/modify.png',
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
              <br />

              <div>
                <Info.StatusText>{statusMessage}</Info.StatusText>
              </div>

              <Sty.RowModify>
                <Info.Modify {...modify}></Info.Modify>
              </Sty.RowModify>
            </Sty.Colw100>
          </Sty.RowProfile>
        </Template.ProfileInner>
      </Template.ProfileOuter>

      <Modify.Modal isOpen={isOpen} handleIsOpen={handleIsOpen}>
        <Sty.RowClose>
          <Modify.Button onClick={handleIsOpen}>❌</Modify.Button>
        </Sty.RowClose>
        <label htmlFor="profileImg">이미지 변경: </label>
        <Modify.InputImg onChange={setImg1}></Modify.InputImg>
        <br />
        <label htmlFor="statusText">상태메시지: </label>
        <Sty.Rolw100CC>
          <Modify.InputText
            value={statusMessage}
            onChange={setStatusMessage}
          ></Modify.InputText>
        </Sty.Rolw100CC>
        <br />
        <label htmlFor="nickName">닉네임: </label>
        <Modify.InputNick
          value={nickName}
          onChange={setNickName}
        ></Modify.InputNick>
      </Modify.Modal>
    </>
  );
};

export { Profile };
