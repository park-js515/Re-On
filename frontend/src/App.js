import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
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
				<Route path="/login/redirect" element={<NaverRedirect/>}></Route>
				<Route path="/test" element={<TestPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
