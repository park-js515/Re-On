import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from "sweetalert2";

const clearLocalStorage = () => {
  localStorage.clear();
};

const loginRedirect = () => {
  window.location.replace('/login');
}

const AuthComponent = ({ authenticated, component }) => {
  const check = useRef(false);
  const [navigateToLogin, setNavigateToLogin] = useState(false); // 확인 누른 상태

  useEffect(() => {
    if (!authenticated && check.current === false) {
      Swal.fire({
        icon: 'error',
        title: '로그인',
        text: '로그인을 먼저 해주세요',
        willClose: () => {
          clearLocalStorage();
          loginRedirect();
        }
      })
    }

    return () => {
      check.current = true;
    };
  }, []);

  if (navigateToLogin) {
    return <Navigate to="/login"></Navigate>;
  }

  return authenticated ? component : null;
};

export default AuthComponent;
