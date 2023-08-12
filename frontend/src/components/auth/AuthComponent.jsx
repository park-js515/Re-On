import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthComponent = ({ authenticated, component }) => {
  const check = useRef(false);
  
  useEffect(() => {

    if (check.current === false) {
      alert('로그인이 필요한 페이지입니다.');

    }
    return () => {
      check.current = true;
    }
  }, []);

  return authenticated ? component : <Navigate to="/login"></Navigate>;
};

export default AuthComponent;
