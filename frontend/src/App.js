import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FAQPage from './pages/FAQPage';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import NormalGamePage from './pages/NormalGamePage';
import NormalListPage from './pages/NormalListPage';
import RankPage from './pages/RankPage';
import RegisterPage from './pages/RegisterPage';

import ResponsiveAppBar from 'components/common/NavBar';

import OpenViduApp from 'components/NewRank/OpenViduApp';

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/normalgame" element={<NormalGamePage />} />
        <Route path="/normallist" element={<NormalListPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/newrank" element={<OpenViduApp />} />
      </Routes>
    </>
  );
}

export default App;
