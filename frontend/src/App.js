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
  useEffect(() => {
    if (location.pathname !== '/rank' && isJoinSession) {
      window.location.reload();
    }
  }, [location, isJoinSession]);

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
      </Routes>
    </>
  );
}

export default App;
