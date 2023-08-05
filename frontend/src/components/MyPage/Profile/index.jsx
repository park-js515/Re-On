import * as Template from './ProfileTemplate';
import * as Img from './ProfileImg';
import * as Info from './ProfileInfo';
import * as Modify from './ProfileModifiy';
import * as hooks from './hooks';
import * as Sty from './style';
import * as ProgressBar from './ProfileProgressBar';

const Profile = () => {
  // 데이터 받아오기
  // useEffect(() => {
  //   axios...
  // }, [])

  const { isOpen, handleIsOpen } = hooks.useModal();
  const [profileImg, setProfileImg] = hooks.useInputImg(
    'images/MyPage/0001.jpg',
  );
  const message =
    '네이버 이메일, 티어, 티어-프로그레스바, 수정기능: onchange -> onSubmit, 회원탈퇴, 기타 alert...';
  const [introduce, setIntroduce] = hooks.useInputText(
    message,
    (value) => value.length <= 150,
  );
  const [nickName, setNickName] = hooks.useInputText(
    '주성시치',
    (value) => value.length <= 16,
  );
  const eMail = 'admin@naver.com';

  const modify = {
    src: 'images/MyPage/modify.png',
    onClick: handleIsOpen,
  };

  const per = Math.min(88, 100);

  return (
    <>
      <Template.ProfileOuter>
        <Template.ProfileInner>
          <Sty.RowProfile>
            <Sty.ColProfileImg>
              <Img.ProfileImg {...profileImg}></Img.ProfileImg>
              <ProgressBar.ProgressBar per={per}></ProgressBar.ProgressBar>
            </Sty.ColProfileImg>
            <Sty.Colw100>
              {nickName.length < 3 ? (
                <Info.NickName>3글자+</Info.NickName>
              ) : (
                <Info.NickName>{nickName}</Info.NickName>
              )}
              <br />

              <div>
                <Info.StatusText>{introduce}</Info.StatusText>
              </div>

              <Sty.DivModify>
                <Sty.DivAbs0>
                  <img
                    src={'./images/MyPage/naver.png'}
                    style={{ height: '35px', display: 'inline' }}
                    alt="naver"
                  />{' '}
                  {`${eMail}`}
                </Sty.DivAbs0>
                <Info.Modify {...modify}></Info.Modify>
              </Sty.DivModify>
            </Sty.Colw100>
          </Sty.RowProfile>
        </Template.ProfileInner>
      </Template.ProfileOuter>

      <Modify.Modal isOpen={isOpen} handleIsOpen={handleIsOpen}>
        <Sty.RowClose>
          <Modify.Button onClick={handleIsOpen}>❌</Modify.Button>
        </Sty.RowClose>
        <label htmlFor="profileImg">이미지 변경: </label>
        <Modify.InputImg onChange={setProfileImg}></Modify.InputImg>
        <br />
        <label htmlFor="statusText">상태메시지: </label>
        <Sty.Rolw100CC>
          <Modify.InputText
            value={introduce}
            onChange={setIntroduce}
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
