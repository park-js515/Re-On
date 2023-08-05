import { useState } from 'react';
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

  // profile

  // img
  const [profileImg, setProfileImg] = useState({
    src: 'images/MyPage/0001.jpg',
    alt: 'profileImg',
  });
  const tier = {
    src: 'images/MyPage/gold-medal.png',
  };
  const per = Math.min(88, 100);

  // introduce
  const message = ' 기타 alert...';
  const [introduce, setIntroduce] = useState(message);

  // nick
  const nick = '주성시치';
  const [nickName, setNickName] = useState(nick);

  // email
  const eMail = 'admin@naver.com';

  // modify button
  const modify = {
    src: 'images/MyPage/modify.png',
    onClick: handleIsOpen,
  };

  const formProps = {
    setProfileImg: setProfileImg,
    introduce: introduce,
    setIntroduce: setIntroduce,
    nickName: nickName,
    setNickName: setNickName,
  };

  return (
    <>
      <Template.ProfileOuter>
        <Template.ProfileInner>
          <Sty.RowProfile>
            <Sty.ColProfileImg>
              <Sty.ImgWrapper>
                <Img.ProfileImg {...profileImg}></Img.ProfileImg>
                <Img.ProfiletierImg {...tier}></Img.ProfiletierImg>
              </Sty.ImgWrapper>
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
        <Modify.ModifyForm {...formProps}></Modify.ModifyForm>
      </Modify.Modal>
    </>
  );
};

export { Profile };
