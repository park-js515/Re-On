import { Navigate } from 'react-router-dom';

const LoginDupPreventComponent = ({ authenticated, component }) => {
  return authenticated ? <Navigate to="/"></Navigate> : component;
};

export default LoginDupPreventComponent;
