import axios from 'axios';

import { useEffect } from 'react';
import { userLogin } from 'redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const NaverRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const state = process.env.REACT_APP_STATE;
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  useEffect(() => {
    const NaverLogin = async () => {
      axios
        .post(
          process.env.REACT_APP_API + `/api/auth/naver`,
          { authorizationCode: code, state: state },
          {
            headers: {
              accept: '*/*',
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          localStorage.setItem('accessToken', response.data.accessToken);
          // 액세스 토큰 설정
          // dispatch(
          //   userLogin({
          //     accessToken: accessToken,
            // }),
          // );
        })
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch((error) => {
          console.error(error);
          alert(
            '로그인에 문제가 발생했습니다. 로그인페이지로 다시 이동합니다.',
          );
          navigate('/login', { replace: true });
        });
    };

    NaverLogin();
  }, []);

  return (
    <>
      <div>네이버 로그인 중입니다. 기다리세요.</div>
      {/* 로딩창을 넣어야함. */}
    </>
  );
};

export default NaverRedirect;
