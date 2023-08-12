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
        <Route path="/feed" element= {<AuthComponent authenticated={isLogin} component={<FeedPage />} />} />
        <Route path="/login" element={<LoginDupPreventComponent authenticated={isLogin} component={<LoginPage/>}/>} />
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<AuthComponent authenticated={isLogin} component={<MyPage />}/>} />
        <Route path="/normallist" element={<AuthComponent authenticated={isLogin} component={<NormalListPage />} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/rank" element={<AuthComponent authenticated={isLogin} component={<RankPage />} />} />
        <Route path="/team" element={<TeamPage/>} />
        <Route path="/login/redirect" element={<LoginDupPreventComponent authenticated={isLogin} component={<NaverRedirect />}/>} />
        <Route path="/logout" element={<LogoutDupPreventComponent authenticated={isLogin} component={<LogoutRedirectPage />} />} />
        <Route path="/test" element={<TestPage />}></Route>
      </Routes>

    </>
  );
}

export default App;
