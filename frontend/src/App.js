import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import FAQPage from './pages/FAQPage';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';

import NormalListPage from './pages/NormalListPage';
import RankPage from './pages/RankPage';
import RegisterPage from './pages/RegisterPage';
import TeamPage from './pages/TeamPage';

import ResponsiveAppBar from 'components/common/NavBar';
import NaverRedirect from 'components/login/NaverRedirect';
import LogoutRedirectPage from 'components/logout/LogoutRedirectPage';

import AuthComponent from 'components/auth/AuthComponent'; // 사용자가 로그인되었는지 확인하고, 로그인이 안됬다면 로그인페이지로 이동
import LoginDupPreventComponent from 'components/auth/LoginDupPreventComponent'; // 중복 로그인 방지
import LogoutDupPreventComponent from 'components/auth/LogoutDupPreventComponent'; // 로그인되어 있지 않는데 로그아웃 방지

import TestPage from 'apiList/TestPage';

function App() {
  const { isJoinSession } = useSelector((state) => state.session);
	const isLogin = useSelector((state) => state.user.isLogin);
  const [prevLocation, setPrevLocation] = useState("");

  // 뒤로가기 방지
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/rank' && isJoinSession) {
      window.location.reload();
    }
  }, [location, isJoinSession]);

  useEffect(()=>{
    if (location.pathname !== '/normallist' && prevLocation === '/normallist'){
      window.location.reload();
    }
    setPrevLocation(location.pathname)
  }, [location])

  return (
    <>
      {!isJoinSession && <ResponsiveAppBar />}
      <Routes>
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/feed" element= {<AuthComponent authenticated={isLogin} component={<FeedPage />} />} />
        <Route path="/login" element={<LoginDupPreventComponent authenticated={isLogin} component={<LoginPage/>}/>} />
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage/:email" element={<AuthComponent authenticated={isLogin} component={<MyPage />}/>} />
        <Route path="/normallist" element={<AuthComponent authenticated={isLogin} component={<NormalListPage />} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/rank" element={<AuthComponent authenticated={isLogin} component={<RankPage />} />} />
        <Route path="/team" element={<TeamPage/>} />
        <Route path="/NotFoundPage" element={<AuthComponent authenticated={isLogin} component={<NotFoundPage />} />} />

        <Route path="/login/redirect" element={<LoginDupPreventComponent authenticated={isLogin} component={<NaverRedirect />}/>} />
        <Route path="/logout" element={<LogoutDupPreventComponent authenticated={isLogin} component={<LogoutRedirectPage />} />} />
       
        {/* 예외처리: 없는 페이지 -> MainPage로 보냄 */}
				
				<Route path="/test" element={<TestPage />}></Route>
				<Route path="*" element={<Navigate to="/NotFoundPage" />}></Route>
      </Routes>
    </>
  );
}

export default App;
