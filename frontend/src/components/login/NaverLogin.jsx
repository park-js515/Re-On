const NaverLogin = () => {
  const NAVER_AUTHORIZATION_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${process.env.REACT_APP_STATE}&redirect_uri=${process.env.REACT_APP_LOCAL_REDIRECT_URI}`;

  return (
    <a
      href={NAVER_AUTHORIZATION_URL}
      className=" flex w-full  h-full  justify-center items-center"
    >
      <div className="hover:brightness-95 ease-in-out duration-150" style={{ boxShadow: '5px 5px 5px 3px #c6f6d5' }}>
        <img src="image/login/naver_white1.png" alt="naverLogin" />
      </div>
    </a>
  );
};

export default NaverLogin;
