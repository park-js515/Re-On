import { Navigate } from 'react-router-dom';

const LogoutDupPreventComponent = ({ authenticated, component }) => {
  return authenticated ? component : <Navigate to="/"></Navigate>;
};

export default LogoutDupPreventComponent;
