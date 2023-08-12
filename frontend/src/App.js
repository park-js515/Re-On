import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import FAQPage from './pages/FAQPage';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';

import NormalListPage from './pages/NormalListPage';
import RankPage from './pages/RankPage';
import RegisterPage from './pages/RegisterPage';
import TeamPage from './pages/TeamPage';

import ResponsiveAppBar from 'components/common/NavBar';
import NaverRedirect from 'components/login/NaverRedirect';
import TestPage from 'apiList/TestPage';

function App() {
  const { isJoinSession } = useSelector((state) => state.session);

  // 뒤로가기 방지
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location);
  useEffect(() => {
    // 페이지가 이동되었으면서
    if (prevLocation.pathname !== location.pathname) {
      // 페이지 기록
      setPrevLocation(location);
      // 이전 페이지가 rank이면서 세션에 접속된 상태라면 새로고침
      if (prevLocation.pathname === '/rank' && isJoinSession) {
        console.log('이전페이지는 랭크');
        window.location.reload();
      }
    }
  }, [location, prevLocation]);

  return (
    <>
      {!isJoinSession && <ResponsiveAppBar />}
      <Routes>
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/normallist" element={<NormalListPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/login/redirect" element={<NaverRedirect/>}/>
      </Routes>
    </>
  );
}

export default App;
