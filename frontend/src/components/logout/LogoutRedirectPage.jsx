// import { logoutMember } from 'apiList/member';
import { useEffect, useRef } from 'react';
import { userLogout } from 'redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogoutRedirectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const check = useRef(false);

  // 로그아웃 시 로컬에 담긴 정보를 삭제
  useEffect(() => {
    if (check.current === false) {
      const clearLocalStorage = () => {
        localStorage.clear();
      };
      clearLocalStorage();
      dispatch(userLogout());
      navigate('/');
    }

    return () => {
      check.current = true;
    };
  }, []);

  const loading = '/image/login/loading.svg';

  return (
    <>
      <div
        className="flex w-screen justify-center align-middle"
        style={{ height: '90vh' }}
      >
        <img src={loading} alt="loading" width="150px" height="150px" />
      </div>
    </>
  );
};

export default LogoutRedirectPage;
