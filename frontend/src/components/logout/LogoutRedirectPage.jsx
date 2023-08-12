// import { logoutMember } from 'apiList/member';
import { useEffect } from 'react';
import { userLogout } from 'redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogoutRedirectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // 아직 id가 없어서 일단 1번으로 하겠습니다. -> id를 사용하지 않기로 하기에 나중에 수정이 필요합니다.
    // const id = localStorage.getItem('id');
    const clearLocalStorage = () => {
      localStorage.removeItem('accessToken');
      // localStorage.removeItem('id');
      // localStorage.clear(); // 전체를 지우려고 한다면
      // 추가사항
    };
    // logoutMember(
    //   id,
    //   (response) => {
    //     if (response.data.success) {
    //       alert('정상적으로 로그아웃 되었습니다.');
    //       clearLocalStorage();
    //       dispatch(userLogout());
    //       navigate('/');
    //     } else {
    //       clearLocalStorage();
    //       dispatch(userLogout());
    //       navigate('/');
    //     }
    //   },
    //   (error) => {
    //     // console.log(error);
    //     clearLocalStorage();
    //     dispatch(userLogout());
    //     navigate('/');
    //   },
    // );

    // 서버와의 통신의 개선이 이뤄지면 위와 같이 사용할 것입니다.
    clearLocalStorage();
    dispatch(userLogout());
    navigate('/');
    // 후에 삭제할 코드

    return () => {};
  }, []);

  return (
    <>
      {/* 로딩창 만들기 */}
      <div>로그아웃 시 나와야 할 로딩창</div>
    </>
  );
};

export default LogoutRedirectPage;
