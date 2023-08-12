import { Navigate } from 'react-router-dom';

const AuthComponent = ({ authenticated, component }) => {
  return authenticated ? (
    component
  ) : (
    <Navigate
      to="/login"
      {...alert('로그인이 필요한 페이지입니다.')}
    ></Navigate>
  );
};

export default AuthComponent;