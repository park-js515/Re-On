const NaverLogin = () => {
  const NAVER_AUTHORIZATION_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_LOCAL}/login/redirect&state=${process.env.REACT_APP_STATE}`;

  return (
    <a
      href={NAVER_AUTHORIZATION_URL}
      className=" flex w-full  h-full  justify-center items-center"
    >
      <img src="image/login/naver_white1.png" alt="naverLogin"/>
    </a>
  );
};

export default NaverLogin;